import React from "react";
import tmdbGenres from "../../tmdb_genres.json";
import { GenreNameProps } from "@/types";

export function GenreName({ genreId, classCSS }: GenreNameProps) {
  const genre = tmdbGenres.genres.filter((genre) => genre.id === genreId);

  return (
    <p className={`${classCSS || ""} btn btn-xs btn-neutral w-max h-max`}>
      {genre[0].name}
    </p>
  );
}
