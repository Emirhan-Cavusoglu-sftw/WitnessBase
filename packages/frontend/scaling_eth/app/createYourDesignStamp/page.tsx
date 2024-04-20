"use client";
import React, { useState } from "react";
import { uploadFileToIPFS } from "../utils/pinata";
import MyDocument from "../components/pdfviewer";
import dynamic from "next/dynamic";
import { pdf } from "@react-pdf/renderer";
import Link from "next/link";
import { accountABI } from "../utils/constants";
import { encodeFunctionData, Hex } from "viem";
import { accountContract, bundlerClient, factory, factoryData, getCreateTSD, getGasPrice, getTSDContract } from "../utils/helper";
import { create } from "domain";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const CreateYourDesignStamp = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileURLs, setFileURLs] = useState([]);
  const [enableButton, setEnableButton] = useState(false);
  const [message, setMessage] = useState("");
  const [proofName, setProofName] = useState("");
  const [proofDescription, setProofDescription] = useState("");
  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

      const dataUrls = await Promise.all(newFiles.map(convertFileToDataUrl));
      setFileDataUrls((prevDataUrls) => [...prevDataUrls, ...dataUrls]);

      setIsFileUploaded(true);
      setMessage(
        "Image(s) ready for PDF creation. You can now click on Create NFT."
      );
      setEnableButton(true);
    }
  };

  const convertFileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleNameChange = (e) => {
    setProofName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProofDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("Creating PDF... Please wait.");

      // Create PDF document
      const pdfDocument = (
        <MyDocument
          proofName={proofName}
          proofDescription={proofDescription}
          images={fileDataUrls}
        />
      );
      console.log("PDF Document:", pdfDocument);
      // Convert PDF document to blob
      const pdfBlob = await pdf(pdfDocument).toBlob();

      // Upload PDF to Pinata
      await uploadPDFToPinata(pdfBlob);

      const createTSD = await getCreateTSD(proofName, proofDescription, ipfsUrl);

      let gasPrice = await getGasPrice();

      const userOperationHash = await bundlerClient.sendUserOperation({
        userOperation: {
          sender: "0x95dcB08D52Fe1D79dd6F6D159C28798D7C4656E9",
          nonce: BigInt(3),
          callData: createTSD,
          maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
          maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
          paymasterVerificationGasLimit: BigInt(1000000),
          signature: "0x" as Hex,
          callGasLimit: BigInt(2_000_000),
          verificationGasLimit: BigInt(2_000_000),
          preVerificationGas: BigInt(2_000_000),
          
        },
      });
  
      console.log("Received User Operation hash:" + userOperationHash);
  
      console.log("Querying for receipts...");
      const receipt = await bundlerClient.waitForUserOperationReceipt({
        hash: userOperationHash,
      });
  
      const txHash = receipt.receipt.transactionHash;
  
      console.log(`UserOperation included: ${txHash}`);

      // Display success message
      setMessage("PDF uploaded to Pinata successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error creating and uploading PDF. Please try again.");
    }
  };
  const getTSD = async () => {
    const tsdContract = await getTSDContract("0xA8062732D4806e512b4Fba40fd8928C72b3Aa3A4")
    const tsd = await accountContract.read.tsds([2])
    console.log(tsd)
    const name = await tsdContract.read.projectName()
    const url = await tsdContract.read.dataURI()

    console.log(name)
    // console.log({ipfsUrl})
    console.log(url)
  }
  console.log("tsd")
  const uploadPDFToPinata = async (pdfBlob) => {
    try {
      // Upload PDF blob to Pinata
      const pdfUploadResponse = await uploadFileToIPFS(pdfBlob);
      console.log("PDF uploaded to Pinata:", pdfUploadResponse.pinataURL);
      setIpfsUrl(pdfUploadResponse.pinataURL);
      // Burada PDF'nin Pinata'ya yüklendiğini bildiren bir mesaj gösterebilirsiniz.
    } catch (error) {
      console.error("Error uploading PDF to Pinata:", error);
      // Hata durumunda uygun bir mesaj gösterebilirsiniz.
    }
  };

  return (
    <>
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <div className="flex items-center mt-24 ml-10">
          <label htmlFor="file" className="cursor-pointer">
            <div className="border-2 border-black w-[700px] h-[700px] flex items-center justify-center flex-col space-y-5">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="w-full h-80 flex items-center justify-center"
                >
                  <img
                    src={preview}
                    alt={`Preview-${index}`}
                    className="w-[500px] h-80"
                  />
                </div>
              ))}
              <h1 className="font-bold">Upload Your Proof</h1>
              <h1 className="font-bold">
                Drag and Drop or Choose your Image(s)
              </h1>
              <h1 className="font-bold">(Max size 2GB)</h1>
            </div>
          </label>
          <input
            id="file"
            type="file"
            accept="image/*" // Accept only images
            className="hidden"
            onChange={handleFileChange}
            multiple // Allow multiple file selection
          />
        </div>

        <div className="flex flex-col justify-center items-center ml-44 space-y-4 w-96">
          <label className="block text-black font-bold  text-xl" htmlFor="name">
            Proof Name
          </label>
          <input
            className="shadow appearance-none w-96 border border-black border-l-4 border-b-4 rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder=""
            value={proofName}
            onChange={handleNameChange}
          />

          <label
            className="block text-black font-bold text-xl "
            htmlFor="description"
          >
            Proof Description
          </label>
          <textarea
            className="shadow appearance-none border border-black border-l-4 border-b-4 rounded w-full h-44 py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={proofDescription}
            onChange={handleDescriptionChange}
          ></textarea>
          <button
            className="h-10 w-40 bg-gray-200 rounded-lg text-center border border-black border-l-4 border-b-4 font-bold"
            disabled={!enableButton}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {/* <PDFDownloadLink document={<MyDocument proofName={proofName} proofDescription={proofDescription} images={fileURLs} />} fileName="TSD.pdf" className="flex justify-center">
        {({ loading }) =>
          loading ? (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Loading Document...
            </button>
          ) : (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Download
            </button>
          )
        }
      </PDFDownloadLink> */}
      <div className="flex justify-center">
        {ipfsUrl && (
          <Link href={ipfsUrl} download>
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-gray-200 bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Download PDF from IPFS
            </button>
          </Link>
        )}
      </div>

      <button onClick={()=>getTSD()}>
        BAS
      </button>
    </>
  );
};

export default CreateYourDesignStamp;
