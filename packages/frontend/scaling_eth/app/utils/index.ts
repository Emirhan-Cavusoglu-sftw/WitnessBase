// import "dotenv/config"
import { writeFileSync } from "fs"
import {
    ENTRYPOINT_ADDRESS_V07,
    UserOperation,
    bundlerActions,
    getSenderAddress,
    signUserOperationHashWithECDSA,
} from "permissionless"
import { pimlicoBundlerActions, pimlicoPaymasterActions } from "permissionless/actions/pimlico"
import { Address, Hex, createClient, createPublicClient, encodeFunctionData, http } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { gnosisChiado, sepolia } from "viem/chains"

const apiKey = "382125ba-467a-4a7a-8ac8-05dae90d873b"

if (!apiKey) throw new Error("Missing PIMLICO_API_KEY")
const paymasterUrl = "https://api.pimlico.io/v2/10200/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b"

export const publicClient = createPublicClient({
	transport: http("https://rpc.ankr.com/eth_sepolia"),
	chain: sepolia,
})
 

const endpointUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`
 
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




// const privateKey =
// 	(process.env.PRIVATE_KEY as Hex) ??
// 	(() => {
// 		const pk = generatePrivateKey()
// 		writeFileSync(".env", `PRIVATE_KEY=${pk}`)
// 		return pk
// 	})()

// export const publicClient = createPublicClient({
// 	transport: http("https://rpc.ankr.com/eth_sepolia"),
// })

// export const paymasterClient = createPimlicoPaymasterClient({
// 	transport: http(paymasterUrl),
// 	entryPoint: ENTRYPOINT_ADDRESS_V07,
// })

// const account = await privateKeyToSimpleSmartAccount(publicClient, {
// 	privateKey,
// 	entryPoint: ENTRYPOINT_ADDRESS_V07, // global entrypoint
// 	factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985", 
// })

// console.log(`Smart account address: https://sepolia.etherscan.io/address/${account.address}`)

// const bundlerUrl = `https://api.pimlico.io/v2/10200/rpc?apikey=382125ba-467a-4a7a-8ac8-05dae90d873b`

// const bundlerClient = createPimlicoBundlerClient({
// 	transport: http(bundlerUrl),
// 	entryPoint: ENTRYPOINT_ADDRESS_V07,
//     chain:gnosisChiado,
// })







