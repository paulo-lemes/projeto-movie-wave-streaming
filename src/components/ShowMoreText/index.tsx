"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChildrenProps } from "@/types";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export function ShowMoreText({ children }: ChildrenProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [lines, setLines] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const countLines = () => {
    const paragraph = textRef.current;
    const pHeight = paragraph?.offsetHeight || 0;
    const qtyLines = pHeight / 24;

    if (qtyLines > 6) setLines(true);
  };

  useEffect(() => {
    if (textRef.current) countLines();
  }, [children, textRef]);

  return (
    <div className={`${!lines ? "" : "lg:-mb-4"} flex flex-col`}>
      <p
        className={`${
          !lines ? "" : showMore ? "" : "line-clamp-6"
        } leading-normal`}
        ref={textRef}
      >
        {children}
      </p>
      {lines && (
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-secondary self-end flex items-center gap-2 opacity-85 hover:opacity-100"
        >
          {showMore ? (
            <>
              Mostrar menos
              <SlArrowUp />
            </>
          ) : (
            <>
              Mostrar mais
              <SlArrowDown />
            </>
          )}
        </button>
      )}
    </div>
  );
}
