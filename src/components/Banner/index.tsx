"use client";

import React from "react";
import { bannerProps } from "@/types";
import { motion } from "framer-motion";

export function Banner({ children, backdrop, title }: bannerProps) {
  return (
    <div className="h-[90vh] max-h-[735px] flex items-end px-4 sm:px-16 mb-6">
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
        className="mask-top-bottom -z-10 h-[100vh] max-h-[815px] w-full object-cover absolute inset-0"
      />
      {children}
    </div>
  );
}
