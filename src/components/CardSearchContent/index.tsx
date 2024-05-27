"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/types";
import { motion } from "framer-motion";
import { GenreName } from "../GenreName";
import { FadeInImage } from "../FadeInImage";

export function CardSearchContent({
  poster_path,
  backdrop_path,
  title,
  name,
  genre_ids,
  id,
  media_type,
  contentType,
  index,
}: content) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          delay: index / 5,
        },
      }}
      className="relative w-72 flex flex-col"
    >
      <Link
        href={`/${media_type || contentType}/${id}?title=${(
          title || name
        ).toLowerCase()}`}
      >
        <FadeInImage
          src={`https://image.tmdb.org/t/p/original/${
            backdrop_path || poster_path
          }`}
          type="poster"
          width={288}
          height={162}
          alt={`Capa de ${title || name}`}
          classCSS="max-w-full max-h-[162px]"
        />
        <h3 className="font-semibold line-clamp-2">{title || name}</h3>
        <section className="flex flex-wrap gap-1">
          {genre_ids?.map((id) => (
            <GenreName
              key={id}
              genreId={id}
              classCSS="no-animation hover:bg-neutral"
            />
          ))}
        </section>
      </Link>
    </motion.div>
  );
}
