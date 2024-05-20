import React from "react";
import tmdbGenres from "../../tmdb_genres.json";

export function GenreButton({
  genreId,
  classCSS,
}: {
  genreId: number;
  classCSS?: string;
}) {
  const genre = tmdbGenres.genres.filter((genre) => genre.id === genreId);

  return (
    <button
      className={`${classCSS} btn btn-xs btn-neutral disabled w-max text-xs`}
    >
      {genre[0].name}
    </button>
  );
}
