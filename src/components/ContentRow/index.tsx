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
    <section className="p-10 pl-0.5 pr-0">
      <h3 className="font-bold text-4xl mb-3 ml-12">{children}</h3>
      <div className="flex items-center">
        <button
          type="button"
          className={`absolute left-0 h-full bg-gradient-to-l from-transparent to-base-100 ${
            !scrollLeft && "opacity-0"
          }`}
          disabled={!scrollLeft}
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
          className={`absolute right-0 h-full bg-gradient-to-r from-transparent to-base-100 ${
            btnRightScrollDisabled && "opacity-0"
          }`}
          disabled={btnRightScrollDisabled}
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
