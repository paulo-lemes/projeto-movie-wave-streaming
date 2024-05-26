"use client";

import React from "react";
import { bannerProps } from "@/types";
import { motion } from "framer-motion";

const divHighlightStyle = "h-[90vh] items-end mb-6";
const divSpotlightStyle = "h-[90vh] items-center my-10 shadow-top-bottom";
const imgHighlightStyle = "h-[100vh] w-full mask-top-bottom";
const imgSpotlightStyle = "h-full w-[90vw] mask-left-right";

export function Banner({ children, backdrop, title, spotlight }: bannerProps) {
  return (
    <div
      className={`relative max-h-[735px] w-full flex px-4 sm:px-16 
    ${spotlight ? divSpotlightStyle : divHighlightStyle}
    `}
    >
      <motion.img
        src={
          backdrop
            ? `https://image.tmdb.org/t/p/original/${backdrop}`
            : "../../../public/wallpaper-preview.jpg"
        }
        alt={`Capa de ${title}`}
        width={1440}
        height={810}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 0.5,
          },
        }}
        className={`-z-10 h-[100vh] max-h-[815px] object-cover absolute inset-0 
        ${spotlight ? imgSpotlightStyle : imgHighlightStyle}
        `}
      />
      {children}
    </div>
  );
}
