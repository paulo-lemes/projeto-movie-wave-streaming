import React from "react";
import { DataProps } from "@/types";
import { CardSearchContent } from "../CardSearchContent";

export function CategoryContent({ results, contentType }: DataProps) {
  return (
    results &&
    results.length > 0 && (
      <div className="flex flex-wrap justify-center gap-4 px-10 pb-4 mb-10">
        <h3 className="w-full text-center font-semibold text-2xl sm:text-3xl">
          {(contentType === "movie" && "Mais filmes") ||
            (contentType === "tv" && "Mais séries")}
        </h3>
        {results.map((content, i) => (
          <CardSearchContent
            key={content.id}
            {...content}
            index={i}
            contentType={contentType}
          />
        ))}
      </div>
    )
  );
}
