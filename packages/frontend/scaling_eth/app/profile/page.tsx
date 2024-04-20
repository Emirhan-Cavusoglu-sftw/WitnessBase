"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import MyDocument from "../components/pdfviewer";
import Section from "../components/Section";
import { motion, MotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "../components/google-gemini-effect";
import { useMotionValue } from "framer-motion";
import { useScroll, useTransform } from "framer-motion"
import NFTCard from "../components/NFTCard";




const Profile = () => {

  return (
    <div className="flex justify-center mt-24 " >
    <NFTCard />
    </div>
  );
};

export default Profile;
