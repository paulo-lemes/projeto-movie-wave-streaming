import React from "react";
import { dataProps } from "@/types";
import { CardSearchContent } from "../CardSearchContent";

export function ContentSearch({ results, children }: dataProps) {
  const searchResult = results?.filter(
    ({ media_type, backdrop_path, overview, poster_path, title, name }) =>
      media_type !== "person" &&
      backdrop_path &&
      overview &&
      poster_path &&
      (title || name)
  );

  console.log(searchResult);

  return (
    <section className="p-10 px-2">
      {searchResult.length ? (
        <>
          <h2 className="font-bold text-3xl text-center mb-8">
            {children}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 p-2">
            {searchResult.map((content, i) => (
              <CardSearchContent key={content.id} {...content} index={i} />
            ))}
          </div>
        </>
      ) : (
        <h2 className="font-semibold text-2xl sm:text-3xl text-center">
          Nenhum resultado encontrado
        </h2>
      )}
    </section>
  );
}
