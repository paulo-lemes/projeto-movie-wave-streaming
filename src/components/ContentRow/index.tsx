"use client";

import React, { useRef, useState } from "react";
import { dataProps } from "@/types";
import { Card } from "../Card";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export function ContentRow({ results, children }: dataProps) {
  const carousel = useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleScrollLeft = () => {
    if (carousel.current) {
      const offset = carousel.current.offsetWidth;
      carousel.current.scrollLeft -= offset;
      setScrollLeft((prev) => (prev - offset >= offset ? prev - offset : 0));
    }
  };

  const handleScrollRight = () => {
    if (carousel.current) {
      const offset = carousel.current.offsetWidth;
      const maxWidth = carousel.current.scrollWidth;
      carousel.current.scrollLeft += offset;
      setScrollLeft((prev) =>
        prev + offset <= maxWidth - offset ? prev + offset : maxWidth
      );
    }
  };

  return (
    <section className="p-10 pl-0.5 pr-0">
      <h3 className="font-bold text-4xl mb-3 ml-12 pl-2">{children}</h3>
      <div className="flex">
        <button
          type="button"
          className={
            scrollLeft
              ? "opacity-50 hover:opacity-100"
              : "opacity-0 cursor-default"
          }
          onClick={handleScrollLeft}
        >
          <IoMdArrowDropleft size={50} />
        </button>
        <div
          className="flex flex-col overflow-hidden overflow-x-auto no-scrollbar scroll-smooth"
          ref={carousel}
        >
          <div className="w-max flex gap-3 p-1">
            {results?.map((movie) => (
              <Card key={movie.id} {...movie} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className={
            scrollLeft === carousel.current?.scrollWidth
              ? "opacity-0 cursor-default"
              : "opacity-50 hover:opacity-100"
          }
          onClick={handleScrollRight}
        >
          <IoMdArrowDropright size={50} />
        </button>
      </div>
    </section>
  );
}
