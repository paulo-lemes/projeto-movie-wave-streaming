"use client";

import React, { UIEvent, useRef, useState } from "react";
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
        prev + offset <= maxWidth - offset ? prev + offset : maxWidth - offset
      );
    }
  };

  const handleScroll = (e: UIEvent) => {
    const divEventTarget = e.target as HTMLDivElement;
    const currentScrollLeft = Math.round(divEventTarget.scrollLeft);
    setScrollLeft(currentScrollLeft);
  };

  return (
    <section className="p-10 pl-0.5 pr-0">
      <h3 className="font-bold text-4xl mb-3 ml-12">{children}</h3>
      <div className="flex items-center">
        <button
          type="button"
          className={`absolute left-0 h-[384px] bg-gradient-to-l from-transparent to-base-100 ${
            !scrollLeft && "opacity-0 cursor-default"
          }`}
          onClick={handleScrollLeft}
        >
          <IoMdArrowDropleft
            size={50}
            className="opacity-50 hover:opacity-100"
          />
        </button>
        <div
          className="flex flex-col overflow-hidden overflow-x-auto no-scrollbar scroll-smooth px-10"
          onScroll={(e) => handleScroll(e)}
          ref={carousel}
        >
          <div className="w-max flex gap-3 p-1">
            {results?.map((content) => (
              <Card key={content.id} {...content} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`absolute right-0 h-[384px] bg-gradient-to-r from-transparent to-base-100 ${
            scrollLeft ===
              (carousel.current &&
                carousel.current?.scrollWidth -
                  carousel.current?.offsetWidth) && "opacity-0 cursor-default"
          }`}
          onClick={handleScrollRight}
        >
          <IoMdArrowDropright
            size={50}
            className="opacity-50 hover:opacity-100"
          />
        </button>
      </div>
    </section>
  );
}
