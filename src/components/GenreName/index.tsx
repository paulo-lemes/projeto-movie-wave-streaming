import React from "react";
import tmdbGenres from "../../tmdb_genres.json";

export function GenreName({
  genreId,
  classCSS,
}: {
  genreId: number;
  classCSS?: string;
}) {
  const genre = tmdbGenres.genres.filter((genre) => genre.id === genreId);

  return (
    <p
      className={`${
        classCSS || ""
      } btn btn-xs btn-neutral no-animation w-max h-max hover:bg-neutral`}
    >
      {genre[0].name}
    </p>
  );
}
