import React from "react";
import { DataProps } from "@/types";
import { ContentRow } from "../ContentRow";

const letterStyle = "letter-shadow-r -ml-2 lg:-ml-3";

export function TopContent({ results, contentType }: DataProps) {
  const topContent = results.slice(0, 10);

  if (process.env.NODE_ENV === "development") console.log(topContent);

  return (
    <section className="py-2">
      <div className="flex gap-3 items-center ml-4 sm:ml-16">
        <h3 className="font-bold text-secondary text-outline text-6xl sm:text-8xl lg:text-9xl lg:ml-2.5">
          <span className={`${letterStyle} ml-0`}>T</span>
          <span className={letterStyle}>O</span>
          <span className={letterStyle}>P</span>{" "}
          <span className={letterStyle}>1</span>
          <span className={`${letterStyle} -ml-2.5 lg:-ml-5`}>0</span>
        </h3>
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl tracking-[10px]">
            {contentType === "movie" ? "FILMES" : "SÉRIES"}
          </h3>
          <h3 className="font-semibold text-xl tracking-[10px]">HOJE</h3>
        </div>
      </div>
      <ContentRow
        results={topContent}
        contentType={contentType}
        top10
      ></ContentRow>
    </section>
  );
}
