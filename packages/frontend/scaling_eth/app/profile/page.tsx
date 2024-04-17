"use client";
import React from "react";
import dynamic from "next/dynamic";
import MyDocument from "../components/pdfviewer";

// PDFDownloadLink'i dinamik olarak import ediyoruz
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false } // Bu, bileşenin sadece client tarafında render edilmesini sağlar
);

const Profile = () => {
  return (
    <div className="flex justify-center">
      <PDFDownloadLink document={<MyDocument />} fileName="loki.pdf">
        {({ loading }) =>
          loading ? (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">Loading Document...</button>
          ) : (
            <button className="flex justify-center mt-6 h-[3.5rem] w-32 rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4">
              Download
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Profile;
