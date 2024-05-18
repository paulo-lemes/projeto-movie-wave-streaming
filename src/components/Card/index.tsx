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
        <div className="bg-black rounded sm:max-w-2xl max-h-[90vh] max-w-[95vw]">
          <div
            className="relative float-right -mb-14 mt-2 mr-2 z-50 cursor-pointer"
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
              className="mask-bottom max-h-[45vh] w-full"
            />
          )}
          <div className="flex flex-col p-10 pt-0 max-h-[45vh]">
            <h4
              className={`font-bold text-2xl ${
                backdrop_path ? "-mt-4" : "mt-4"
              } mb-2`}
            >
              {title || name}
            </h4>
            <p className="overflow-y-auto">{overview}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
