import React from "react";
import Link from "next/link";
import { Content } from "@/types";
import { Banner } from "../Banner";
import { GenreName } from "../GenreName";
import { FadeInImage } from "../FadeInImage";
import { CiLink } from "react-icons/ci";
import { MdStarRate } from "react-icons/md";
import { InfoContentDetails } from "../InfoContentDetails";
import { randomImage, getClassification } from "@/utils";
import { ClassificationContent } from "../ClassificationContent";
import { ToggleContentAccount } from "../ToggleContentAccount";
import { RatingContent } from "../RatingContent";
import { ContentImages } from "../ContentImages";

export function ContentDetails({
  poster_path,
  backdrop_path,
  title,
  original_title,
  original_name,
  name,
  tagline,
  genres,
  overview,
  vote_average,
  vote_count,
  release_date,
  first_air_date,
  last_air_date,
  number_of_episodes,
  number_of_seasons,
  runtime,
  homepage,
  images,
  classification,
  id,
  contentType,
}: Content) {
  const bannerImg = randomImage(images.backdrops);
  const rating = getClassification(classification);

  if (process.env.NODE_ENV === "development") {
    console.log(bannerImg);
    console.log(rating);
  }

  return (
    <>
      <ContentImages
        imageList={images.backdrops}
        randomImg={bannerImg || backdrop_path || poster_path}
        title={title || name}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl">
            {(title || name)?.toUpperCase()}
          </h2>
          <p className="text-lg sm:text-xl font-semibold">{tagline}</p>
          <ul className="flex flex-wrap gap-2">
            {genres.map(({ id }) => (
              <li key={id}>
                <Link href={`/category/${id}`}>
                  <GenreName genreId={id} classCSS="text-lg sm:text-xl" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentImages>
      <div className="flex flex-wrap gap-4 px-4 sm:px-16 mb-6">
        {rating.length > 0 && <ClassificationContent {...rating[0]} />}
        {overview && <p className="mb-2 w-full sm:text-lg">{overview}</p>}
        {poster_path && (
          <div className="relative max-w-[262.5px]">
            <FadeInImage
              src={poster_path}
              type="poster"
              alt={`Poster de ${title || name}`}
              width={225}
              height={300}
              classCSS="h-[262.5px] w-[175px]"
            />
          </div>
        )}
        <div>
          {homepage && (
            <div
              className="lg:tooltip lg:tooltip-right"
              data-tip={`Página oficial de ${original_title || original_name}`}
            >
              <Link
                href={homepage}
                target="_blank"
                className="flex items-center"
                aria-label={`Link para a página oficial de ${original_title || original_name}`}
              >
                <CiLink size={30} />{" "}
                <p className="text-xs lg:hidden pl-2">Página oficial</p>
              </Link>
            </div>
          )}
          {vote_average > 0 && (
            <div className={`flex gap-1 mb-1 ${homepage ? "lg:-mt-2" : ""}`}>
              <MdStarRate fill="yellow" size={25} />
              <p className="font-bold text-lg">{vote_average.toFixed(1)}</p>
              <p className="font-light text-sm mt-1">({vote_count})</p>
            </div>
          )}
          <RatingContent contentType={contentType} id={id} />
          {(original_title || original_name) && (
            <InfoContentDetails title="Título original:">
              {original_title || original_name}
            </InfoContentDetails>
          )}
          {(release_date || first_air_date) && (
            <InfoContentDetails title="Data de lançamento:">
              {(release_date || first_air_date).split("-").reverse().join("/")}
            </InfoContentDetails>
          )}
          {runtime > 0 && (
            <InfoContentDetails title="Duração:">
              {runtime} min.
            </InfoContentDetails>
          )}
          {number_of_episodes > 0 && (
            <InfoContentDetails title="Episódios:">
              {number_of_episodes}
            </InfoContentDetails>
          )}
          {number_of_seasons > 0 && (
            <InfoContentDetails title="Temporadas:">
              {number_of_seasons}
            </InfoContentDetails>
          )}
          {last_air_date && (
            <InfoContentDetails title="Último episódio no ar:">
              {last_air_date.split("-").reverse().join("/")}
            </InfoContentDetails>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <ToggleContentAccount
              toggle="favorite"
              id={id}
              contentType={contentType}
            />
            <ToggleContentAccount
              toggle="watchlist"
              id={id}
              contentType={contentType}
            />
          </div>
        </div>
      </div>
    </>
  );
}
