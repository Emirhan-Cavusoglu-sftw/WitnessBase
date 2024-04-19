"use client";
import React, { useState } from "react";
import { uploadFileToIPFS } from "../utils/pinata";
import MyDocument from "../components/pdfviewer";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const CreateYourDesignStamp = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  const [enableButton, setEnableButton] = useState(false);
  const [message, setMessage] = useState("");
  const [proofName, setProofName] = useState("");
  const [proofDescription, setProofDescription] = useState("");
  const [ipfsData, setIpfsData] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage("Uploading image to IPFS... Please wait!");

      try {
        const response = await uploadFileToIPFS(selectedFile);
        if (response.success) {
          console.log("Uploaded image to Pinata: ", response.pinataURL);
          setIpfsData({
            name: proofName,
            description: proofDescription,
            file: {
              type: selectedFile.type.split("/")[0], // "image" or "application"
              url: response.pinataURL,
            },
          });
          setFileURL(response.pinataURL);
          setIsFileUploaded(true);
          setMessage("Image uploaded successfully! You can now click on Create NFT.");
          setEnableButton(true);
        } else {
          throw new Error("Failed to upload image to IPFS.");
        }
      } catch (error) {
        console.error("Error during file upload", error);
        setMessage("Error uploading image. Please try again.");
      }
    }
  };

  const handleNameChange = (e) => {
    setProofName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProofDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform NFT creation or any other actions here using the ipfsData state.
    // For now, let's log the ipfsData.
    console.log("IPFS Data:", ipfsData);
  };

  return (
    <>
      <form className="flex flex-row" onSubmit={handleSubmit}>
      <div className="flex items-center mt-24 ml-10">
        <label htmlFor="file" className="cursor-pointer">
        <div className="border-2 border-black w-[700px] h-[700px] flex items-center justify-center flex-col space-y-5">
            {preview ? (
              <div className="w-full h-80 flex items-center justify-center">
                {file.type === "application/pdf" ? (
                  <p className="text-3xl">PDF</p>
                ) : (
                  <img src={preview} alt="Preview" className="w-[500px] h-80" />
                )}
              </div>
            ) : (
              <svg
                width="80px"
                height="80px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3 15.2346C3 14.7446 3.35523 14.3552 3.15224 14.1522C3 14 3 14 3 14C3 13.9994 3 13.9987 3 13.9981C3 11.7941 4.79406 10 6.9981 10H9.6M12 15V4M12 4L15 7M12 4L9 7"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <h1 className="font-bold">Upload Your Proof</h1>
            <h1 className="font-bold">
              Drag and Drop or Choose your Image, Advertisement or PDF
            </h1>
            <h1 className="font-bold">(Max size 2GB)</h1>
          </div>
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
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
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      </form>
      <PDFDownloadLink document={<MyDocument ipfsData={ipfsData} />} fileName="loki.pdf">
      {({ loading }) =>
          loading ? (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Loading Document...
            </button>
          ) : (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Download
            </button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

export default CreateYourDesignStamp;

  

