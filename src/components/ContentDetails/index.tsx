import React from "react";
import { content } from "@/types";
import { GenreButton } from "../GenreButton";
import { Banner } from "../Banner";

export function ContentDetails({
  backdrop_path,
  title,
  name,
  tagline,
  genres,
  overview,
  release_date,
  first_air_date,
  runtime,
}: content) {
  return (
    <>
      <Banner backdrop={backdrop_path} title={title || name}>
        <div className="flex flex-col gap-2 z-10">
          <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl">
            {(title || name)?.toUpperCase()}
          </h2>
          <p className="text-lg sm:text-xl font-semibold">{tagline}</p>
          <div className="flex flex-wrap gap-2">
            {genres.map(({ id }) => (
              <GenreButton
                key={id}
                genreId={id}
                classCSS="text-lg sm:text-xl"
              />
            ))}
          </div>
        </div>
      </Banner>
      <div className="px-4 sm:px-16 mb-6">
        <p className="mb-2">{overview}</p>
        <p className="font-bold">
          Data de lançamento:{" "}
          <span className="font-normal">
            {(release_date || first_air_date)?.split("-").reverse().join("/")}
          </span>
        </p>
        {runtime ? (
          <p className="font-bold">
            Duração: <span className="font-normal">{runtime} min.</span>
          </p>
        ) : null}
      </div>
    </>
  );
}
