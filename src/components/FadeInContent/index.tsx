"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInContentProps } from "@/types";

export function FadeInContent({
  children,
  classCSS,
  duration,
}: fadeInContentProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration,
      }}
      className={classCSS || ""}
    >
      {children}
    </motion.main>
  );
}
