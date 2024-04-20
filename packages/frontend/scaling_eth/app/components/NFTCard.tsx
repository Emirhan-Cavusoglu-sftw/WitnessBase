import React from "react";
import Image from "next/image";
import Link from "next/link";

const NFTCard = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center relative">
      <Image
        src={"/pixelScrolll.png"}
        alt="Scroll"
        className="z-0"
        height={400}
        width={400}
      />
      <div className="absolute center">
        <p>Username:</p>
        <p>Proof name:</p>
        <p>Proof description:</p>
      </div>
      {/* <Link href={ipfsUrl} download>
        <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
          Download PDF from IPFS
        </button>
      </Link> */}
    </div>
  );
};

export default NFTCard;
