"use client";
import React from "react";
import { WavyBackground } from "./components/wavy-background";

export default function Home() {
  return (
      <div className="">
      <WavyBackground className="pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-blue-300 font-bold inter-var text-center mt-12">
      WitnessBase
      </p>
      <p className="text-base md:text-lg mt-4 text-blue-300 font-normal inter-var text-center">
      WitnessBase: Securing unregistered product designs and enhancing user experience with decentralized wallets.
      </p>
      {/* <div className="flex justify-center ">
      <div className="bg-[#52D3D8] w-full h-10"></div>

    </div> */}
    </WavyBackground>

  

      </div>
  );
}
