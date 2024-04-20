"use client";
import React, { useEffect, useState } from "react";
import {
  ENTRYPOINT_ADDRESS_V07,
  UserOperation,
  bundlerActions,
  getSenderAddress,
  signUserOperationHashWithECDSA,
  getRequiredPrefund,
  createSmartAccountClient,
} from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import {
  Address,
  Hex,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
  parseEther,
  getContract,
  concat,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { gnosisChiado } from "viem/chains";
import {
  accountABI,
  accountFactoryABI,
  entryPointABI,
} from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { m } from "framer-motion";
import {
  createTSD,
  attestTSD,
  publicClient,
  bundlerClient,
  factory,
  factoryData,
  calculateSenderAddress,
  getGasPrice,
  paymaster,
} from "../utils/helper";
import { useReadContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { get } from "http";
import { config } from "../utils/config";
import { create } from "domain";

const entryPointContract = getContract({
  address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  abi: entryPointABI,
  client: publicClient,
});

const contactUs = async () => {
  const [nonce, setNonce] = useState<Number>();

  const getNonce = async (address: string) => {
    const nonce = await entryPointContract.read.getNonce([address, 0]);
    setNonce(Number(nonce));
  };
  const getSenderAddress = async () => {
    console.log("Sender Address: ", await calculateSenderAddress());
  };

  const sleep = async () => {
    setTimeout(() => {
      console.log("Waiting 6 seconds");
    }, 6000);
  };

  console.log("Calldata: ", attestTSD);
  console.log("FactoryData: ", createTSD);

  const executeUserOperation = async () => {
    let gasPrice = await getGasPrice();
    const senderAddress = await calculateSenderAddress();
    // const creationOperationHash = await bundlerClient.sendUserOperation({
    //   userOperation: {
    //     sender: senderAddress,
    //     nonce: BigInt(0),
    //     factory: factory,
    //     factoryData: factoryData,
    //     callData: "0x",
    //     maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
    //     maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
    //     paymasterVerificationGasLimit: BigInt(1000000),
    //     signature: "0x" as Hex,
    //     callGasLimit: BigInt(1_000_000),
    //     verificationGasLimit: BigInt(1_000_000),
    //     preVerificationGas: BigInt(1_000_000),
    //   },
    // });

    // console.log("Received Create Operation hash:" + creationOperationHash);

    // console.log("Querying for receipts...");
    // const createOP = await bundlerClient.waitForUserOperationReceipt({
    //   hash: creationOperationHash,
    // });

    // const hash = createOP.receipt.transactionHash;

    // console.log(`CreateOP included: ${hash}`);

    gasPrice = await getGasPrice();

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: senderAddress,
        nonce: BigInt(0),
        factory: factory,
        factoryData: factoryData,
        callData: createTSD,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: BigInt(1_000_000),
        verificationGasLimit: BigInt(1_000_000),
        preVerificationGas: BigInt(1_000_000),
        
      },
    });

    console.log("Received User Operation hash:" + userOperationHash);

    console.log("Querying for receipts...");
    const receipt = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    const txHash = receipt.receipt.transactionHash;

    console.log(`UserOperation included: ${txHash}`);

    await sleep();

    gasPrice = await getGasPrice();

    const attestOperation = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: senderAddress,
        nonce: BigInt(1),
        callData: attestTSD,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: BigInt(1_000_000),
        verificationGasLimit: BigInt(1_000_000),
        preVerificationGas: BigInt(1_000_000),
      },
    });

    console.log("Received AttestOperation hash:" + attestOperation);

    console.log("Querying for receipts...");
    const attestReceipt = await bundlerClient.waitForUserOperationReceipt({
      hash: attestOperation,
    });

    const attestTxHash = attestReceipt.receipt.transactionHash;

    console.log(`AttestOperation included: ${attestTxHash}`);
  };

  const attest = async () => {
    let gasPrice = await getGasPrice();
    await getNonce("0x986649720B37F6434b2C65836410eA2b1Bb15d4c");
    const attestOperation = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: "0xBc4876FC7055DbEa707445121838e6cD39D0f36F",
        nonce: BigInt(2),
        callData: attestTSD,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: BigInt(1_000_000),
        verificationGasLimit: BigInt(1_000_000),
        preVerificationGas: BigInt(1_000_000),
      },
    });

    console.log("Received AttestOperation hash:" + attestOperation);

    console.log("Querying for receipts...");
    const attestReceipt = await bundlerClient.waitForUserOperationReceipt({
      hash: attestOperation,
    });

    const attestTxHash = attestReceipt.receipt.transactionHash;

    console.log(`AttestOperation included: ${attestTxHash}`);
  };

  return (
    <div>
      <button
        className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
        onClick={() => executeUserOperation()}
      >
        BAAAASSSSSS
      </button>

      <button
        className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
        onClick={() => getSenderAddress()}
      >
        SenderAddress
      </button>
      <button
        className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
        onClick={() => attest()}
      >
        ATTEST
      </button>
      {/* <button
        className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
        onClick={() => getNonce()}
      >
        SenderAddress
      </button> */}
      {/* <button
        className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
        onClick={() => getNonce()}
      >
        {paymaster.account.address}
      </button> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(contactUs), {
  ssr: false,
});
