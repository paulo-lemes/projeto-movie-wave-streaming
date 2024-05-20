"use client";

import React from "react";
import { content } from "@/types";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export function Card({
  title,
  name,
  poster_path,
  backdrop_path,
  overview,
  index,
}: content) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col gap-3 max-w-64 cursor-pointer hover:ring-2 ring-white"
        onClick={handleModalOpen}
      >
        <motion.img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : "../../../public/unavailable-image.png"
          }
          alt={`Poster de ${title || name}`}
          width={430}
          height={646}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
              delay: index / 5,
            },
          }}
          className="object-cover h-[300px] w-[200px]"
        />
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div
          className="relative flex items-end bg-black h-[70vh] sm:h-[85vh] rounded 
        sm:max-w-2xl max-h-[90vh] max-w-[95vw]"
        >
          <div
            className="absolute top-2 right-2 z-20 cursor-pointer"
            onClick={handleModalClose}
          >
            <IoCloseCircleOutline size={30} aria-label="Fechar" />
          </div>
          {backdrop_path && (
            <motion.img
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt={`Capa de ${title || name}`}
              width={700}
              height={250}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: 1,
                },
              }}
              className="absolute inset-0 object-cover mask-bottom max-h-[40vh] sm:max-h-[50vh]"
            />
          )}
          <div className="relative flex flex-col p-5 gap-2 sm:p-10 h-[45vh] sm:h-[55vh]">
            <h4 className="font-bold drop-shadow-2xl text-xl sm:text-2xl">
              {title || name}
            </h4>
            <p className="text-ellipsis">{overview}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
