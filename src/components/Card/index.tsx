"use client";

import React from "react";
import Image from "next/image";
import { content } from "@/types";
import { Modal } from "../Modal";
import { useModal } from "@/hooks/useModal";
import { IoCloseCircleOutline } from "react-icons/io5";

export function Card({
  title,
  name,
  poster_path,
  backdrop_path,
  overview,
}: content) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <div
        className="flex flex-col gap-3 max-w-64 cursor-pointer"
        onClick={handleModalOpen}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={`Capa de ${title || name}`}
          width={250}
          height={250}
          className=""
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="bg-black rounded max-w-2xl max-h-[90vh]">
          <div
            className="relative float-right -mb-14 mt-2 mr-2 z-50 cursor-pointer"
            onClick={handleModalClose}
          >
            <IoCloseCircleOutline size={30} aria-label="Fechar" />
          </div>
          <Image
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={`Capa de ${title || name}`}
            width={700}
            height={250}
            className="mask max-h-[45vh]"
          />
          <div className="flex flex-col p-10 pt-0 max-h-[45vh]">
            <h4 className="font-bold text-2xl -mt-4 mb-2">{title || name}</h4>
            <p className="overflow-y-auto">{overview}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
