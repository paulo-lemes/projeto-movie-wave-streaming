import React from "react";
import { dataProps } from "@/types";
import { Card } from "../Card";

export function ContentRow({ results, children }: dataProps) {
  return (
    <section className="flex flex-col p-10 gap-3 overflow-hidden overflow-x-auto no-scrollbar">
      <h3 className="font-bold text-4xl">{children}</h3>
      <div className="w-max flex gap-3">
        {results?.map((movie) => (
          <Card key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
}
