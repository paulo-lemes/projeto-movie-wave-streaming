"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/app/contexts/ModalContext";
import { useRouter } from "next/navigation";

export function Modal() {
  const router = useRouter();
  const { isModalOpen, setIsModalOpen, modalText, redirectAfterClose } =
    useModal();

  const closeModal = () => {
    setIsModalOpen(false);
    if (redirectAfterClose) router.push(redirectAfterClose);
  };

  useEffect(() => {
    isModalOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    isModalOpen && (
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
          onClick={closeModal}
        ></div>
        <div className="modal-container max-w-full flex justify-center rounded-lg z-50">
          <div className="modal-box w-full p-8 sm:p-10 max-w-full">
            <div className="flex flex-col justify-center items-center gap-4">
              <h3 className="text-center font-semibold text-lg sm:text-2xl" data-test="modal-text">
                {modalText}
              </h3>
              <button
                className="btn btn-sm sm:btn-md btn-secondary btn-outline"
                onClick={closeModal}
                data-test="close-modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}
