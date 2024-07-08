import React from "react";
import { ContentSeasonsProps } from "@/types";
import { FadeInImage } from "../FadeInImage";
import { MdStarRate } from "react-icons/md";
import { ShowMoreText } from "../ShowMoreText";

export function ContentSeasons({ contentType, seasons }: ContentSeasonsProps) {
  return (
    contentType === "tv" && (
      <section className="px-4 sm:px-16 mb-6 flex flex-col gap-4">
        <h3 className="font-bold text-2xl">Temporadas</h3>
        {seasons.map(
          ({
            id,
            poster_path,
            name,
            vote_average,
            overview,
            air_date,
            episode_count,
          }) =>
            air_date &&
            episode_count > 0 && (
              <div className="flex gap-4 lg:pr-20" key={id}>
                {poster_path && (
                  <div className="relative min-w-[140px]">
                    <FadeInImage
                      src={poster_path}
                      type="poster"
                      alt={`Poster de ${name}`}
                      width={140}
                      height={210}
                      classCSS="h-[210px] w-[140px]"
                    />
                  </div>
                )}
                <div className="flex flex-col pt-1">
                  <h4 className="font-bold sm:text-lg">{name}</h4>
                  {vote_average > 0 && (
                    <div className="flex gap-1 mb-1">
                      <MdStarRate fill="yellow" size={20} />
                      <p className="font-semibold">{vote_average.toFixed(1)}</p>
                    </div>
                  )}
                  {air_date && (
                    <p className="font-semibold">
                      Início:{" "}
                      <span className="font-normal">
                        {air_date.split("-").reverse().join("/")}
                      </span>
                    </p>
                  )}
                  {episode_count > 0 && (
                    <p className="font-semibold mb-2">
                      Episódios:{" "}
                      <span className="font-normal">{episode_count}</span>
                    </p>
                  )}
                  {overview && (
                    <ShowMoreText maxLines={3}>{overview}</ShowMoreText>
                  )}
                </div>
              </div>
            )
        )}
      </section>
    )
  );
}
