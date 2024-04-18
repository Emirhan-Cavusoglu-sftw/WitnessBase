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
} from "../utils/helper";

const entryPointContract = getContract({
  address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  abi: entryPointABI,
  client: publicClient,
});

const contactUs = async () => {
  const [nonce, setNonce] = useState<BigInt>();
  useEffect(() => {
    const getNoncee = async () => {
      const nonce = await entryPointContract.read.getNonce([
        "0xdabebe1f35842cd865b49d601f672ebd873b216e",
        0,
      ]);
      setNonce(nonce as BigInt);
    };
 
    getNoncee();
    
  }, []);
  

  const getGasPrice = async () => {
    const gasPrice = await bundlerClient.getUserOperationGasPrice();
    return gasPrice;
  };
  const calculateSenderAddress = async () => {
    const senderAddress = await getSenderAddress(publicClient, {
      factory,
      factoryData,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
    return senderAddress;
  };

  const getNonce = async () => {
    console.log(
      "Executing User Operation...",
      await entryPointContract.read.getNonce([
        "0xdabebe1f35842cd865b49d601f672ebd873b216e",
        0,
      ])
    );
  }

  console.log("Nonce: " + nonce);

  const executeUserOperation = async () => {
    const gasPrice = await getGasPrice();
   
    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: "0xDabEbE1f35842cD865B49d601F672eBd873b216E",
        nonce: nonce as BigInt,
        callData,
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
      <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4" onClick={() => executeUserOperation()}>BAAAASSSSSS</button>
      <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4" onClick={() => getNonce()}>GeTİİİİİİR</button>
    
    </div>
  );
};

export default dynamic(() => Promise.resolve(contactUs), {
  ssr: false,
});
