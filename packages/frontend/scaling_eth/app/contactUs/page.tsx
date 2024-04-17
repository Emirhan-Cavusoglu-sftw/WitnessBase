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
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { gnosisChiado } from "viem/chains";
import { accountABI, accountFactoryABI } from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
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
	transport: http(endpointUrl),
	chain: gnosisChiado,
})
	.extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
	.extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))
 
const paymasterClient = createClient({
	transport: http(endpointUrl),
	chain: gnosisChiado,
}).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07))
// const paymasterClient = createPimlicoPaymasterClient({
//   transport: http(endpointUrl),
//   entryPoint: ENTRYPOINT_ADDRESS_V07,
// });

// const bundlerClient = createPimlicoBundlerClient({
//   transport: http(endpointUrl),
//   entryPoint: ENTRYPOINT_ADDRESS_V07,
// });

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
  // console.log("callData", callData);
  // console.log("owner address:", owner.address);
  // console.log("Generated factoryData:", factoryData);
  // console.log("Generated wallet with private key:", ownerPrivateKey);
  // console.log("Sender Address:", senderAddress);

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
  // const userOperation = await (async () => {
  

  //   return {
  //     sender: await calculateSenderAddress(),
  //     nonce: BigInt("0"),
  //     factory: factory as Address,
  //     factoryData,
  //     callData,
  //     maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas) + BigInt(1000000000),
  //     maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas) + BigInt(1000000000),
  //     paymasterVerificationGasLimit: BigInt(1000000),
  //     signature: "0x" as Hex,
  //   };
  // })();

  const executeUserOperation = async () => {
    // const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation({
    //   userOperation,
    // })

    // const sponsoredUserOperation: UserOperation<"v0.7"> = {
    //   ...userOperation,
    //   ...sponsorUserOperationResult,
    // }
const gasPrice = await getGasPrice();
    // console.log("Received paymaster sponsor result:", paymasterClient.account)

    // console.log("Received paymaster sponsor result:", sponsorUserOperationResult)

    const {callGasLimit, verificationGasLimit,preVerificationGas,} = await bundlerClient.estimateUserOperationGas({
      userOperation: {
          sender: await calculateSenderAddress(),
          nonce: BigInt("0"),
          
          initCode: factoryData,
          callData: callData,
          callGasLimit: gasPrice.fast.maxFeePerGas,
          maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
          paymasterAndData: "0x",
          signature: "0x",
        },
        
      
  })
    const userOperationHash = await bundlerClient.sendUserOperation({
      
      userOperation: {
        sender: await calculateSenderAddress(),
        nonce: BigInt("0"),
        factory: factory as Address,
        factoryData,
        callData,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas) 
      ,
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas) 
      ,
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: callGasLimit,
        verificationGasLimit: verificationGasLimit,
        preVerificationGas: preVerificationGas,
      },

      entryPoint: ENTRYPOINT_ADDRESS_V07,
     
      
    })

    console.log("Received User Operation hash:" + userOperationHash);

    console.log("Querying for receipts...");
    const receipt = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    })
    
    
    const txHash = receipt.receipt.transactionHash

    // FARKLI DENEME BURASIIIIIIIIIIIIIII
    // const account = await privateKeyToSimpleSmartAccount(publicClient, {
    //   privateKey: ownerPrivateKey,
    //   entryPoint: ENTRYPOINT_ADDRESS_V07, // global entrypoint
    //   factoryAddress: "0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58",
    // });

    // const smartAccountClient = createSmartAccountClient({
    //   account,
    //   entryPoint: ENTRYPOINT_ADDRESS_V07,
    //   chain: gnosisChiado,
    //   bundlerTransport: http(endpointUrl),
    //   middleware: {
    //     gasPrice: async () => {
    //       return (await bundlerClient.getUserOperationGasPrice()).fast;
    //     },
    //     sponsorUserOperation: paymasterClient.sponsorUserOperation,
    //   },
    // });

    // const txHash = await smartAccountClient.sendTransaction({
    //   to: account.address,
    //   data: encodeFunctionData({
    //     abi: accountABI,
    //     functionName: "increment",
    //     args: [],
    //   }),
    // });

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
