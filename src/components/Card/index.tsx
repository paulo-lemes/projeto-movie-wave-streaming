import React from "react";
import Link from "next/link";
import { Content } from "@/types";
import { FadeInImage } from "../FadeInImage";
import { FadeInContent } from "../FadeInContent";

export function Card({
  title,
  name,
  poster_path,
  media_type,
  id,
  index,
  contentType,
  bigCard,
}: Content) {
  return (
    <FadeInContent
      duration={1}
      delay
      index={index > 20 ? index - (index - 20) * 2 : index}
      scale={1.05}
      classCSS={`relative ${
        bigCard ? "max-w-[275px]" : "max-w-[200px]"
      } hover:ring-2 ring-white`}
    >
      <Link
        href={`/${media_type || contentType}/${id}?title=${(
          title || name
        ).toLowerCase()}`}
      >
        <FadeInImage
          src={poster_path}
          type="poster"
          alt={`Poster de ${title || name}`}
          title={title || name}
          width={275}
          height={412.5}
          classCSS={`${
            bigCard ? "h-[412.5px] w-[275px]" : "h-[300px] w-[200px]"
          }`}
        />
      </Link>
    </FadeInContent>
  );
}
