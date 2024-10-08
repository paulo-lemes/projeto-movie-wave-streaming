import React from "react";
import Link from "next/link";
import { Content } from "@/types";
import { GenreName } from "../GenreName";
import { FadeInImage } from "../FadeInImage";
import { FadeInContent } from "../FadeInContent";

const mediaType: { [key: string]: string } = {
  person: "Pessoa",
  movie: "Filme",
  tv: "Série",
};

export function CardSearchContent({
  poster_path,
  backdrop_path,
  profile_path,
  title,
  name,
  genre_ids,
  id,
  media_type,
  contentType,
  index,
}: Content) {
  return (
    <FadeInContent
      duration={1}
      scale={1.05}
      delay
      index={index}
      classCSS="relative w-72 flex flex-col"
    >
      <Link
        href={`/${media_type || contentType}/${id}${
          media_type !== "person"
            ? `?title=` + (title || name).toLowerCase()
            : ""
        }`}
        aria-label={`Link para detalhes de ${title || name}`}
      >
        <div className="relative">
          <FadeInImage
            src={backdrop_path || poster_path || profile_path}
            type={media_type === "person" ? "profileBackdrop" : "backdrop"}
            width={288}
            height={162}
            alt={`Capa de ${title || name}`}
            classCSS={"max-w-full max-h-[162px]"}
          />
        </div>
        <h3 className="font-semibold line-clamp-2">{title || name}</h3>
        <section className="flex flex-wrap gap-1">
          {!contentType && (
            <p
              className="no-animation hover:bg-secondary btn btn-xs btn-secondary w-max h-max"
            >
              {mediaType[media_type]}
            </p>
          )}
          {contentType &&
            genre_ids?.map((id) => (
              <GenreName
                key={id}
                genreId={id}
                classCSS="no-animation hover:bg-neutral"
              />
            ))}
        </section>
      </Link>
    </FadeInContent>
  );
}
