"use client";
import React, { use, useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import Image from "next/image";
import TSDInfoCard from "../components/TSDInfoCard";
import {
  accountContract,
  getTSDContract,
  factoryContract,
} from "../utils/helper";
import motion from "framer-motion";
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { Hex } from "viem";

const Profile = () => {
  const { user, primaryWallet } = useDynamicContext();
  const [accountAddress, setaccountAddress] = useState<Hex>();
  const [TSDcards, setTSDcards] = useState([]);

  useEffect(() => {
    const address = primaryWallet?.address;
    const getAccountAddress = async () => {
      const userAccountAddress = await factoryContract.read.ownerToAccount([
        "0x633aDfb3430b96238c9FB7026195D1d5b0889EA6",
      ]);
      setaccountAddress(userAccountAddress as Hex);
    };
    setTimeout(() => {
      getAccountAddress();
    }, 2000);

    console.log(primaryWallet?.address);
    console.log(accountAddress);
  }, []);

  const getAccountAddress = async () => {
    const userAccountAddress = await factoryContract.read.ownerToAccount([
      primaryWallet?.address,
    ]);
    console.log(userAccountAddress);
  };
  const getTSD = async () => {
    const tsdContract = await getTSDContract(
      "0x858aEbFd12cB7fFd470516bAE1De5B12617b7d37"
    );
    const url = await tsdContract.read.dataURI();
    let ipfsUrl;
    const newTSDcards = [];
    for (let i = 0; i < 3; i++) {
      const tsd = await accountContract.read.tsds([i]);
      const tsdContract = await getTSDContract(tsd);
      const proofName = await tsdContract.read.projectName();
      const userName = await tsdContract.read.userName();
      ipfsUrl = await tsdContract.read.dataURI();
      newTSDcards.push({ ...tsd, userName, ipfsUrl, proofName });
      console.log(tsd);
      console.log(userName);
      console.log(proofName);
    }

    console.log(url);
    console.log(ipfsUrl);
    setTSDcards(newTSDcards);
    console.log(newTSDcards);
  };

  return (
    <main className="flex flex-col space-y-48 ">
      <div className="flex flex-col space-y-4 mt-12">
        <div className="flex flex-row bg-orange-400 h-[50px] w-[680px] ml-12 justify-center items-center text-center rounded-2xl">
          <h1 className="font-bold text-2xl">
            0x5167e9746264C5820f5B5741461EC2c2f1FdDA0f
          </h1>
          <svg
            width="30px"
            height="30px"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-row bg-orange-400 h-[50px] w-[230px] rounded-2xl ml-12 justify-center items-center text-center">
          <h1 className="font-bold text-xl">Total Registration: 3</h1>
        </div>
      </div>

      <div className="relative mt-24 ">
        <Image
          src={"/time.png"}
          alt="Timeline"
          height={400}
          className="w-full "
          width={2000}
        />

        <div className="absolute -top-20 left-[400px] ">
          <NFTCard />
        </div>
        <div className="absolute top-8 right-[60px]">
          <NFTCard />
        </div>
        <div className="absolute top-0 right-[800px]">
          <NFTCard />
        </div>
        <div className="absolute -bottom-10 left-[560px]">
          <NFTCard />
        </div>
        <div className="absolute -bottom-10 right-[300px] ">
          <NFTCard />
        </div>
        <div className="absolute -bottom-12 right-[700px] ">
          <NFTCard />
        </div>
      </div>

      <div className="space-y-24">
        <button
          className="flex justify-center  h-[3.5rem] w-52 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
          onClick={() => getTSD()}
        >
          BAS
        </button>
        <button
          className="flex justify-center  h-[3.5rem] w-52 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4"
          onClick={() => getAccountAddress()}
        >
          BAS
        </button>

        <div className="flex justify-center flex-col items-center space-y-5 ">
          <h1 className="font-bold text-4xl ml-12 mb-14">Registrations</h1>
          <div className="flex justify-center flex-wrap space-x-10 ml-12 pb-10">
            {TSDcards.map((tsd, index) => {
              return (
                <TSDInfoCard
                  key={index}
                  ipfsUrl={tsd.ipfsUrl}
                  userName={tsd.userName}
                  proofName={tsd.proofName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
