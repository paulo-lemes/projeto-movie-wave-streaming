import React from "react";
import { dataProps } from "@/types";
import { Card } from "../Card";

export function ContentSearch({ results, children }: dataProps) {
  return results.length ? (
    <section className="p-10 pl-0.5 pr-0">
      <h2 className="font-bold text-4xl text-center mb-8">{children}</h2>
      <div className="flex flex-wrap items-center justify-center gap-3 p-1">
        {results?.map(
          (content) =>
            content.media_type !== "person" && (
              <Card key={content.id} {...content} />
            )
        )}
      </div>
    </section>
  ) : (
    <h2 className="font-semibold text-3xl text-center mt-8">
      Nenhum resultado encontrado
    </h2>
  );
}
