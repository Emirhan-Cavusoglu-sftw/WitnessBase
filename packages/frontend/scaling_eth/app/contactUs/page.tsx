"use client";
import React from "react";
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
  getContract
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { gnosisChiado } from "viem/chains";
import { accountABI, accountFactoryABI } from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { m } from "framer-motion";
const endpointUrl =
  "https://api.pimlico.io/v2/10200/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b";

const AF_ADDRESS = "0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58";
const ownerPrivateKey = generatePrivateKey();
const owner = privateKeyToAccount(ownerPrivateKey);

const publicClient = createPublicClient({
  transport: http("https://rpc.chiadochain.net"),
  chain: gnosisChiado,
});

const bundlerClient = createClient({
  chain: gnosisChiado,
  transport: http(endpointUrl),
}).extend(bundlerActions(ENTRYPOINT_ADDRESS_V07)).extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));

const paymasterClient = createClient({
  transport: http(endpointUrl),
  chain: gnosisChiado,
}).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));


const factory = AF_ADDRESS;

const factoryData = encodeFunctionData({
  abi: accountFactoryABI,
  functionName: "createAccount",
  args: [owner.address],
});

const callData = encodeFunctionData({
  abi: accountABI,
  functionName: "increment",
});

const contactUs = async () => {
  

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



  const executeUserOperation = async () => {
    
    
    const gasPrice = await getGasPrice();
    
    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: "0xdabebe1f35842cd865b49d601f672ebd873b216e",
        nonce: BigInt("2"),
        callData,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: BigInt(1_000_000),
        verificationGasLimit: BigInt(1_000_000),
        preVerificationGas:BigInt(1_000_000),
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
      <button onClick={() => executeUserOperation()}>BAAAASSSSSS</button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(contactUs), {
  ssr: false,
});
