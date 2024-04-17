// import "dotenv/config"
import { writeFileSync } from "fs";
import {
  ENTRYPOINT_ADDRESS_V07,
  UserOperation,
  bundlerActions,
  getSenderAddress,
  signUserOperationHashWithECDSA,
} from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  Address,
  Hex,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { gnosisChiado, sepolia } from "viem/chains";
import { accountFactoryABI ,accountABI} from "./constants";

// https://rpc.ankr.com/eth_sepolia
// https://rpc.chiadochain.net
// https://api.pimlico.io/v2/10200/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b
// https://api.pimlico.io/v2/sepolia/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b
// gnosis chiado factory 0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58
// sepolia factory 0xD05fD5De46ec531538DbedA3138Bb5304b630ebf
const endpointUrl =
  "https://api.pimlico.io/v2/sepolia/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b";
const AF_ADDRESS = "0xD05fD5De46ec531538DbedA3138Bb5304b630ebf";

const publicClient = createPublicClient({
  transport: http("https://rpc.ankr.com/eth_sepolia"),
  chain: gnosisChiado,
});

const bundlerClient = createClient({
  transport: http(endpointUrl),
  chain: gnosisChiado,
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));

const paymasterClient = createClient({
  transport: http(endpointUrl),
  chain: gnosisChiado,
}).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));

const ownerPrivateKey = generatePrivateKey();
const owner = privateKeyToAccount(ownerPrivateKey);

console.log("Owner address:", owner.address);

const factory = AF_ADDRESS;

const factoryData = encodeFunctionData({
  abi: accountFactoryABI,
  functionName: "createAccount",
  args: [owner.address],
});

console.log("factoryData", factoryData);

const senderAddress = await getSenderAddress(publicClient, {
	factory,
	factoryData,
	entryPoint: ENTRYPOINT_ADDRESS_V07,
  });

console.log("Sender address:", senderAddress);

const callData = encodeFunctionData({
  abi: accountABI,
  functionName: "increment",
});

const gasPrice = await bundlerClient.getUserOperationGasPrice()

const userOperation = {
  sender: senderAddress,
  nonce: BigInt("0"),
  factory: factory as Address,
  factoryData,
  callData,
  maxFeePerGas: gasPrice.fast.maxFeePerGas,
  maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
  // dummy signature, needs to be there so the SimpleAccount doesn't immediately revert because of invalid signature length
  signature:
    "0x" as Hex,
}
const sponsorUserOperationResult = await paymasterClient.sponsorUserOperation({
  userOperation,
})

const result = await publicClient.request({ 
  // @ts-ignore
  method: "pm_sponsorUserOperation", 
  params: [userOperation, { entryPoint: ENTRYPOINT_ADDRESS_V07 } as { entryPoint: string }] 
})
const paymasterAndData = result.paymasterAndData

const sponsoredUserOperation: UserOperation<"v0.7"> = {
  ...userOperation,
  ...sponsorUserOperationResult,
}
 
console.log("Received paymaster sponsor result:", sponsorUserOperationResult)

const userOperationHash = await bundlerClient.sendUserOperation({
	userOperation: sponsoredUserOperation,
})
 
console.log("Received User Operation hash:", userOperationHash)
 
// let's also wait for the userOperation to be included, by continually querying for the receipts
console.log("Querying for receipts...")
const receipt = await bundlerClient.waitForUserOperationReceipt({
	hash: userOperationHash,
})
const txHash = receipt.receipt.transactionHash
 
console.log(`UserOperation included: https://sepolia.etherscan.io/tx/${txHash}`)

