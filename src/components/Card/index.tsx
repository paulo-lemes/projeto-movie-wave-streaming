"use client";

import React from "react";
import Image from "next/image";
import { content } from "@/types";
import { Modal } from "../Modal";
import { useModal } from "@/hooks/useModal";

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
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt={`Capa de ${title || name}`}
              width={250}
              height={250}
              className=""
            />
            <div className="flex flex-col">
              <h4 className="font-bold">{title || name}</h4>
              <p>{overview}</p>
            </div>
          </div>
        </Modal>
    </>
  );
}
