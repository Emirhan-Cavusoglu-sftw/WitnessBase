"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";

const CreateYourDesignStamp = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <div className="flex items-center mt-24 ml-10">
        <label htmlFor="file" className="cursor-pointer">
          <div className="border-2 border-black w-[700px] h-[700px] flex items-center justify-center flex-col space-y-5">
            {preview ? (
              <div className="w-80 h-80 flex items-center justify-center">
                {file.type === "application/pdf" ? (
                  <p className="text-3xl">PDF</p>
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-full" />
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
        ></textarea>
        <button className="h-10 w-40 bg-[#93A6EB] rounded-lg text-center border border-black border-l-4 border-b-4 font-bold">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateYourDesignStamp;

