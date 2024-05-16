"use client";

import React from "react";
import { motion } from "framer-motion";

export function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
      }}
      className="flex items-center justify-center z-10"
    >
      <span className="loading loading-spinner loading-lg text-neutral"></span>
    </motion.div>
  );
}
