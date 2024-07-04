"use client";

import React from "react";
import { FadeInContentProps } from "@/types";
import { motion } from "framer-motion";

export function FadeInContent({
  children,
  classCSS,
  duration,
  delay,
  index,
  scale,
}: FadeInContentProps) {
  return delay && index !== undefined ? (
    <motion.div
      whileHover={{ scale: scale }}
      whileTap={{ scale: scale ? scale - 0.03 : 0.95 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          delay: index / 5,
        },
      }}
      className={classCSS || ""}
    >
      {children}
    </motion.div>
  ) : (
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
