"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/types";
import { motion } from "framer-motion";
import { GenreButton } from "../GenreButton";

export function CardSearchContent({
  backdrop_path,
  title,
  name,
  genre_ids,
  id,
  media_type,
  index,
}: content) {
  return (
    <Link href={`/${media_type}/${id}?title=${(title || name).toLowerCase()}`}>
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
        className="w-72 flex flex-col hover:cursor-pointer"
      >
        <motion.img
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : "../../../public/unavailable-image.png"
          }
          width={384}
          height={216}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
              delay: index / 5,
            },
          }}
          alt={`Capa de ${title || name}`}
          className="object-cover"
        />
        <h3 className="font-semibold line-clamp-2">{title || name}</h3>
        <section className="flex flex-wrap gap-1">
          {genre_ids?.map((id) => (
            <GenreButton key={id} genreId={id} classCSS="no-animation" />
          ))}
        </section>
      </motion.div>
    </Link>
  );
}
