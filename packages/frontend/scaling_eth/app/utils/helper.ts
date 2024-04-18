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
import { accountABI, accountFactoryABI, entryPointABI } from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";

const endpointUrl =
  "https://api.pimlico.io/v2/10200/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b";
const AF_ADDRESS = "0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58";
const ownerPrivateKey = generatePrivateKey();
const owner = privateKeyToAccount(ownerPrivateKey);

export const publicClient = createPublicClient({
  transport: http("https://rpc.chiadochain.net"),
  chain: gnosisChiado,
});

export const bundlerClient = createClient({
  chain: gnosisChiado,
  transport: http(endpointUrl),
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));

const paymasterClient = createClient({
  transport: http(endpointUrl),
  chain: gnosisChiado,
}).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));

export const factory = AF_ADDRESS;

export const factoryData = encodeFunctionData({
  abi: accountFactoryABI,
  functionName: "createAccount",
  args: [owner.address],
});

export const callData = encodeFunctionData({
  abi: accountABI,
  functionName: "increment",
});

export const senderAddress = await getSenderAddress(publicClient, {
    factory,
    factoryData,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
  });


// Contracts

export const entryPointContract = getContract({
    address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    abi: entryPointABI,
    client: publicClient,
  });