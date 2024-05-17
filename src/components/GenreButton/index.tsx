import React from "react";
import tmdbGenres from "../../tmdb_genres.json";

export function GenreButton({ genreId }: { genreId: number }) {
  const genres = tmdbGenres.genres.filter((genre) => genre.id === genreId);

  return genres.map(({id, name}) => (
    <button key={id} className="btn btn-xs btn-neutral disabled w-max text-xs">
      {name}
    </button>
  ));
}
