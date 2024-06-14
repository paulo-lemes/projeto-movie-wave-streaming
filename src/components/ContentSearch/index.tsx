import React from "react";
import { DataProps } from "@/types";
import { CardSearchContent } from "../CardSearchContent";

export function ContentSearch({ results, children }: DataProps) {
  return (
    <section className="p-10 px-4 sm:px-16">
      {results.length ? (
        <>
          <h2 className="font-bold text-3xl text-center mb-8">{children}</h2>
          <div className="flex flex-wrap justify-center gap-4 p-2">
            {results.map((content, i) => (
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
