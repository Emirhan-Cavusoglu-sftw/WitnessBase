import { http, createConfig } from "wagmi";
import { gnosisChiado } from "wagmi/chains";
import {  publicClient} from "./helper";
import { createClient } from "viem";

export const config = createConfig({
  chains: [gnosisChiado],
  transports:{[gnosisChiado.id]:http('https://rpc.chiadochain.net')},
});
