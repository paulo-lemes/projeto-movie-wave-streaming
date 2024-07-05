import React from "react";
import Link from "next/link";
import { CardPersonProps } from "@/types";
import { FadeInContent } from "../FadeInContent";
import { FadeInImage } from "../FadeInImage";

export function CardPerson({
  id,
  name,
  character,
  roles,
  profile_path,
  index,
  type,
}: CardPersonProps) {
  const personRole = roles?.length > 0 ? roles[0].character : character;

  return (
    <FadeInContent
      duration={1}
      index={index}
      delay
      classCSS="relative w-24 sm:w-32 flex flex-col bg-base-300 
      hover:ring-1 hover:ring-white"
    >
      <Link
        href={`/person/${id}`}
        aria-label={`Link para detalhes de ${name}`}
      >
        <div className="relative">
          <FadeInImage
            src={profile_path}
            type="profile"
            width={430}
            height={646}
            alt={`Foto de ${name}`}
            classCSS=""
          />
        </div>
        <div className="p-2">
          <h3 className="font-semibold line-clamp-3 text-xs sm:text-base break-words">
            {name}
          </h3>
          <p className="text-xs sm:text-base break-words italic">
            {type === "tv" ? "" : personRole || ""}
          </p>
        </div>
      </Link>
    </FadeInContent>
  );
}
