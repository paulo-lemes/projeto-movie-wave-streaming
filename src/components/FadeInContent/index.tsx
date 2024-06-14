"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeInContentProps } from "@/types";

export function FadeInContent({
  children,
  classCSS,
  duration,
}: FadeInContentProps) {
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
