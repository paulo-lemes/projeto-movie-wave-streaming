import React from "react";
import { dataProps } from "@/types";
import { CardSearchContent } from "../CardSearchContent";

export function CategoryContent({ results, contentType }: dataProps) {
  const content = results?.filter(
    ({ backdrop_path, overview, poster_path, title, name }) =>
      backdrop_path &&
      overview &&
      poster_path &&
      (title || name)
  );

  console.log(content);

  return content.length ? (
          <div className="flex flex-wrap justify-center gap-4 px-10 pb-4">
            {content.map((content, i) => (
              <CardSearchContent key={content.id} {...content} index={i} contentType={contentType} />
            ))}
          </div>
      ) : null;
}
