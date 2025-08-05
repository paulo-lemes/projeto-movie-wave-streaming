"use client";

import React, { UIEvent, useEffect, useRef, useState } from "react";
import { DataProps } from "@/types";
import { Card } from "../Card";
import { CardTopContent } from "../CardTopContent";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export function ContentRow({
  results,
  children,
  contentType,
  top10,
  bigCard,
}: DataProps) {
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

  const updateBtnRightScroll = () => {
    if (carousel.current) {
      const isScrollDisabled =
        scrollLeft ===
        carousel.current.scrollWidth - carousel.current.offsetWidth;
      setBtnRightScrollDisabled(isScrollDisabled);
    }
  };

  useEffect(() => {
    updateBtnRightScroll();
  }, [scrollLeft, carousel.current]);

  useEffect(() => {
    if (carousel.current) {
      carousel.current.scrollLeft = 0;
      setScrollLeft(0);
    }
    updateBtnRightScroll();
  }, [results]);

  return (
    results?.length > 0 && (
      <section className="py-4">
        {children && (
          <h3 className="font-semibold text-xl sm:text-2xl ml-4 sm:ml-16 -mb-2">
            {children}
          </h3>
        )}
        <div className="flex items-center">
          <div
            className={`${!scrollLeft ? "hidden" : ""} ${
              bigCard ? "h-[440px]" : "h-[320px]"
            } absolute flex items-center left-0 z-10 sm:pl-2
          bg-gradient-to-l from-transparent to-base-100`}
          >
            <button
              type="button"
              title="Rolar para a esquerda"
              className="h-full opacity-50 hover:opacity-100"
              disabled={!scrollLeft}
              onClick={handleScrollLeft}
            >
              <SlArrowLeft size={25} />
            </button>
          </div>
          <div
            className="flex flex-col overflow-hidden overflow-x-auto px-4 sm:px-16
           no-scrollbar scroll-smooth"
            onScroll={(e) => handleScroll(e)}
            ref={carousel}
          >
            <div className="w-max flex gap-3 py-3" data-test="content-row">
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
          <div
            className={`${btnRightScrollDisabled ? "hidden" : ""} ${
              bigCard ? "h-[440px]" : "h-[320px]"
            } absolute flex items-center right-0 z-10 sm:pr-2
          bg-gradient-to-r from-transparent to-base-100`}
          >
            <button
              type="button"
              title="Rolar para a direita"
              className="h-full opacity-50 hover:opacity-100"
              disabled={btnRightScrollDisabled}
              onClick={handleScrollRight}
            >
              <SlArrowRight size={25} />
            </button>
          </div>
        </div>
      </section>
    )
  );
}
