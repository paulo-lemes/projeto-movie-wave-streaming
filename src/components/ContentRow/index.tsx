"use client";

import React, { UIEvent, useRef, useState } from "react";
import { dataProps } from "@/types";
import { Card } from "../Card";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { motion } from "framer-motion";

export function ContentRow({ results, children }: dataProps) {
  const carousel = useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleScrollLeft = () => {
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleScrollRight = () => {
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  const handleScroll = (e: UIEvent) => {
    const divEventTarget = e.target as HTMLDivElement;
    const currentScrollLeft = Math.ceil(divEventTarget.scrollLeft);
    setScrollLeft(currentScrollLeft);
  };

  const btnRightScrollDisabled =
    scrollLeft ===
    (carousel.current &&
      carousel.current?.scrollWidth - carousel.current?.offsetWidth);

  return (
    <section className="py-4">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        className="font-semibold text-xl sm:text-2xl ml-4 sm:ml-10 -mb-2"
      >
        {children}
      </motion.h3>
      <div className="flex items-center">
        <button
          type="button"
          className={`absolute left-0 h-[320px] z-10 sm:pl-2
          bg-gradient-to-l from-transparent to-base-100 ${
            !scrollLeft && "opacity-0"
          }`}
          disabled={!scrollLeft}
          onClick={handleScrollLeft}
        >
          <SlArrowLeft size={30} className="opacity-50 hover:opacity-100" />
        </button>
        <div
          className="flex flex-col overflow-hidden overflow-x-auto px-4 sm:px-10
           no-scrollbar scroll-smooth"
          onScroll={(e) => handleScroll(e)}
          ref={carousel}
        >
          <div className="w-max flex gap-3 py-3">
            {results?.map((content, i) => (
              <Card key={content.id} {...content} index={i} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`absolute right-0 h-[320px] z-10 sm:pr-2
          bg-gradient-to-r from-transparent to-base-100 ${
            btnRightScrollDisabled && "opacity-0"
          }`}
          disabled={btnRightScrollDisabled}
          onClick={handleScrollRight}
        >
          <SlArrowRight size={30} className="opacity-50 hover:opacity-100" />
        </button>
      </div>
    </section>
  );
}
