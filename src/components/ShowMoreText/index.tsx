"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ShowMoreTextProps } from "@/types";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export function ShowMoreText({ children, maxLines }: ShowMoreTextProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [lines, setLines] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const paragraphStyle = classNames("leading-normal", {
    [`line-clamp-${maxLines}`]: lines && !showMore,
    "border border-red-500": true,
  });

  const countLines = () => {
    const paragraph = textRef.current;
    const pHeight = paragraph?.offsetHeight || 0;
    const qtyLines = pHeight / 24;
    console.log(
      `pHeight: ${pHeight}, qtyLines: ${qtyLines}, maxLines: ${maxLines}`
    );

    if (qtyLines > maxLines) setLines(true);
  };

  useEffect(() => {
    if (textRef.current) countLines();
  }, [children, textRef]);

  return (
    <div className={classNames("flex flex-col", { "lg:-mb-4": lines })}>
      <p
        className={paragraphStyle}
        ref={textRef}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {children}
      </p>
      {lines && (
        <button
          type="button"
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
