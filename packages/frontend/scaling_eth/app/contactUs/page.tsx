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
  callData,
  publicClient,
  bundlerClient,
  factory,
  factoryData,
  calculateSenderAddress,
  getGasPrice,
  getNonce,
} from "../utils/helper";
import { useReadContract } from 'wagmi';
import { readContract } from '@wagmi/core'
import { get } from "http";
import { config } from "../utils/config";


const entryPointContract = getContract({
  address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  abi: entryPointABI,
  client: publicClient,
});

const contactUs = async () => {

  const [nonce, setNonce] = useState<Number>();
  const result = useReadContract({
    abi: entryPointABI,
    address: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
    functionName: 'getNonce',
    args: ["0xdabebe1f35842cd865b49d601f672ebd873b216e", 0],
    chainId: 10200,
    config: config
  })
  console.log(result , "result")
  useEffect(() => {
    const getNoncee = async () => {
      const nonce = await entryPointContract.read.getNonce([
        "0xdabebe1f35842cd865b49d601f672ebd873b216e",
        0,
      ]);
      setNonce(nonce as Number);
    };

    getNoncee();
  }, []);
  const getSenderAddress = async () => {
    console.log("Sender Address: ", await calculateSenderAddress());
    console.log("Sender Address: ", factoryData);

  }
  const getNonce = async () => {
    const result = await readContract(config, {
      abi: entryPointABI,
      address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      functionName: "getNonce",
      args: ["0xdabebe1f35842cd865b49d601f672ebd873b216e", 0],
      
    });
    console.log("Nonce: ", result);
  };
  const executeUserOperation = async () => {
    const gasPrice = await getGasPrice();

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: await calculateSenderAddress(),
        nonce: BigInt(0),
        factory: factory,
        factoryData: factoryData,
        callData: "0x",
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
  };

  return (
    <div>
      scasd
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
        onClick={() => getNonce()}
      >
        SenderAddress
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(contactUs), {
  ssr: false,
});
