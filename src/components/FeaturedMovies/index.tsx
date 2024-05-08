import { content, dataProps } from "@/types";
import React from "react";

export function FeaturedMovies(data: dataProps) {
  console.log(data);

  return (
    <div>
      {data && data?.results.map((movie: content) => (
        <p>{movie.title}</p>
      ))}
    </div>
  );
}
