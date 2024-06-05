"use client";

import React, { UIEvent, useEffect, useRef, useState } from "react";
import { dataProps } from "@/types";
import { Card } from "../Card";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { CardTopContent } from "../CardTopContent";

export function ContentRow({
  results,
  children,
  contentType,
  top10,
  bigCard,
}: dataProps) {
  const carousel = useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [btnRightScrollDisabled, setBtnRightScrollDisabled] = useState(true);

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

  useEffect(() => {
    if (carousel.current) {
      const isScrollDisabled =
        scrollLeft ===
        carousel.current.scrollWidth - carousel.current.offsetWidth;
      setBtnRightScrollDisabled(isScrollDisabled);
    }
  }, [scrollLeft, carousel.current]);

  return (
    results.length > 0 && (
      <section className="py-4">
        {children && (
          <h3 className="font-semibold text-xl sm:text-2xl ml-4 sm:ml-16 -mb-2">
            {children}
          </h3>
        )}
        <div className="flex items-center">
          <button
            type="button"
            title="Rolar para a esquerda"
            className={`absolute left-0 ${
              bigCard ? "h-[420px]" : "h-[320px]"
            } z-10 sm:pl-2
          bg-gradient-to-l from-transparent to-base-100 ${
            !scrollLeft ? "hidden" : ""
          }`}
            disabled={!scrollLeft}
            onClick={handleScrollLeft}
          >
            <SlArrowLeft size={30} className="opacity-50 hover:opacity-100" />
          </button>
          <div
            className="flex flex-col overflow-hidden overflow-x-auto px-4 sm:px-16
           no-scrollbar scroll-smooth"
            onScroll={(e) => handleScroll(e)}
            ref={carousel}
          >
            <div className="w-max flex gap-3 py-3">
              {top10
                ? results?.map((content, i) => (
                    <CardTopContent
                      key={content.id}
                      {...content}
                      index={i}
                      contentType={contentType}
                    />
                  ))
                : results?.map((content, i) => (
                    <Card
                      key={content.id}
                      {...content}
                      bigCard={bigCard}
                      index={i}
                      contentType={contentType}
                    />
                  ))}
            </div>
          </div>
          <button
            type="button"
            title="Rolar para a direita"
            className={`absolute right-0 ${
              bigCard ? "h-[420px]" : "h-[320px]"
            } z-10 sm:pr-2
          bg-gradient-to-r from-transparent to-base-100 ${
            btnRightScrollDisabled ? "hidden" : ""
          }`}
            disabled={btnRightScrollDisabled}
            onClick={handleScrollRight}
          >
            <SlArrowRight size={30} className="opacity-50 hover:opacity-100" />
          </button>
        </div>
      </section>
    )
  );
}
