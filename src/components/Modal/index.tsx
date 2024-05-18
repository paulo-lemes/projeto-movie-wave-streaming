"use client";

import React, { useEffect } from "react";
import { modalProps } from "@/types";
import { motion } from "framer-motion";

export function Modal({ isOpen, onClose, children }: modalProps) {
  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        className="fixed inset-0 flex z-40 items-center justify-center"
      >
        <div
          className="modal-overlay fixed inset-0 z-40 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="modal-container rounded-lg z-50 overflow-y-auto">
          {children}
        </div>
      </motion.div>
    )
  );
}
