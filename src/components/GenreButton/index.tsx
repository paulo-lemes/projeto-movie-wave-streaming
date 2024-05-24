import React from "react";
import tmdbGenres from "../../tmdb_genres.json";
import Link from "next/link";

export function GenreButton({
  genreId,
  classCSS,
}: {
  genreId: number;
  classCSS?: string;
}) {
  const genre = tmdbGenres.genres.filter((genre) => genre.id === genreId);

  return (
    <Link href={`/category/${genreId}`}>
      <button
        className={`${
          classCSS || ""
        } btn btn-xs btn-neutral disabled w-max h-max`}
      >
        {genre[0].name}
      </button>
    </Link>
  );
}
