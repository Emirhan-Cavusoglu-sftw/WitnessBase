"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import path from "path";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="z-[999] relative items-center justify-center text-center ">
      <motion.div
        className="justify-center fixed top-0 left-1/2 h-[4.5rem] -traslate-x-1/2 w-full
          rounded-xl border border-black border-l-4 border-b-4 bg-white
          bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]
          sm:top-6 sm:h-[3.5rem] sm:w-[60rem] sm:flex"
        initial={{ y: -100, x: "-85%", opacity: 0 }}
        animate={{ y: 0, x: "-85%", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      ></motion.div>

      <motion.div
        className="flex justify-center fixed top-6 left-1/2 -translate-x-1/2 w-full"
        initial={{ y: -100, x: "-30%", opacity: 0 }}
        animate={{ y: 0, x: "-30%", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 w-96 h-[3.5rem] border border-black border-l-4 border-b-4 rounded-xl focus:outline-none focus:border-gray-800 bg-white
      bg-opacity-80"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="21" y1="21" x2="15.8" y2="15.8" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="flex fixed top-6 right-64 h-[3.5rem] translate-x-1/2 w-[3.5rem] rounded-xl bg-white bg-opacity-80 justify-center items-center 
        border border-black border-l-4 border-b-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <svg
        className="h-6 w-6 m-2"
          width="15px"
          height="15px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Edit / Add_Plus">
            <path
              id="Vector"
              d="M6 12H12M12 12H18M12 12V18M12 12V6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </motion.div>

      <motion.div 
      className="flex justify-center fixed top-6 right-28 h-[3.5rem] -traslate-x-1/2 w-32
      rounded-xl bg-white bg-opacity-80 text-black text-center items-center font-bold border border-black border-l-4 border-b-4 "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      >
        Profile
      </motion.div>
    </header>
  );
};
