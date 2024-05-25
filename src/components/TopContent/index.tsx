import React from "react";
import { dataProps } from "@/types";
import { ContentRow } from "../ContentRow";

const letterStyle = "letter-shadow-r -ml-2 lg:-ml-2.5";

export function TopContent({ results, contentType }: dataProps) {
  const topContent = results.slice(0, 10);

  console.log(topContent);

  return (
    <section className="">
      <div className="flex gap-3 items-center">
        <h3 className="font-bold text-secondary text-outline text-6xl sm:text-7xl lg:text-9xl ml-4 sm:ml-16 -mb-2">
          <span className={`${letterStyle} ml-0`}>T</span>
          <span className={letterStyle}>O</span>
          <span className={letterStyle}>P</span>{" "}
          <span className={letterStyle}>1</span>
          <span className={letterStyle}>O</span>
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
