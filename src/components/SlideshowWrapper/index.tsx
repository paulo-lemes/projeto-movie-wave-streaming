"use client";

import React from "react";
import { SlideshowWrapperProps } from "@/types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const changeContentBtnStyle =
  "absolute h-full opacity-15 hover:opacity-100 z-10";

export function SlideshowWrapper({
  children,
  carousel,
  changeContent,
}: SlideshowWrapperProps) {
  return (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full mb-6">
      {carousel.length > 1 && (
        <>
          <button
            type="button"
            title="Conteúdo anterior"
            className={`${changeContentBtnStyle} left-0 sm:left-3`}
            onClick={() => changeContent("prev")}
          >
            <SlArrowLeft size={17} />
          </button>
          <button
            type="button"
            title="Próximo conteúdo"
            className={`${changeContentBtnStyle} right-0 sm:right-3`}
            onClick={() => changeContent("next")}
          >
            <SlArrowRight size={17} />
          </button>
        </>
      )}
      {children}
    </div>
  );
}
