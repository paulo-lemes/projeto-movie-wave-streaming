"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StyledTitle } from "../StyledTitle";
import { TfiClose } from "react-icons/tfi";
import { RatingStarsProps } from "@/types";

export function RatingStars({
  isOpen,
  onClose,
  isRated,
  handleAction,
  rating,
  handleStarSelection,
}: RatingStarsProps) {
  const [hover, setHover] = useState<number | null>(null);
  const totalStars = 10;

  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
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
      <div className="modal-container flex justify-center rounded-lg z-50">
        <div className="modal-box px-8 py-8 sm:px-28 sm:py-10 min-w-max max-w-[100vw] flex flex-col items-center gap-4">
          <button
            className="absolute right-3 top-3"
            title="fechar"
            onClick={onClose}
          >
            <TfiClose size={20} className="fill-secondary" />
          </button>
          <h3 className="font-bold text-secondary text-5xl sm:text-7xl">
            <StyledTitle title="AVALIAÇÃO" />
          </h3>
          <div className="flex">
            {[...Array(totalStars)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => handleStarSelection(currentRating)}
                    className="hidden"
                  />
                  <span className="-mb-2 font-semibold sm:text-lg">
                    {currentRating}
                  </span>
                  <span
                    className={`text-3xl sm:text-4xl ${
                      currentRating <= (hover || Number(rating))
                        ? ""
                        : "text-neutral"
                    }`}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    data-test="rating-star"
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button
              className={`btn btn-secondary btn-sm sm:btn-md ${
                isRated ? "sm:w-44" : "sm:btn-wide"
              }`}
              onClick={() => handleAction("POST")}
              data-test="send-rating-button"
            >
              Enviar
            </button>
            {isRated && (
              <button
                className={`btn btn-secondary btn-outline btn-sm sm:btn-md ${
                  isRated ? "sm:w-44" : "sm:btn-wide"
                }`}
                onClick={() => handleAction("DELETE")}
                data-test="delete-rating-button"
              >
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
