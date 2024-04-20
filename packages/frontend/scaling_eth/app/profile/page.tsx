"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import MyDocument from "../components/pdfviewer";
import Section from "../components/Section";
import { motion, MotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "../components/google-gemini-effect";
import { useMotionValue } from "framer-motion";
import { useScroll, useTransform } from "framer-motion"




const Profile = () => {
  const pathLengths = [useMotionValue(0), useMotionValue(0)];
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <div className="h-[400vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip" ref={ref}>
      

      <GoogleGeminiEffect pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}/>

    </div>
  );
};

export default Profile;
