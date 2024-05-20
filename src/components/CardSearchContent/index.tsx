"use client";

import React from "react";
import { content } from "@/types";
import { motion } from "framer-motion";
import { GenreButton } from "../GenreButton";
import Link from "next/link";

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
    <Link href={`/${media_type}/${id}`}>
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
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
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
            <GenreButton key={id} genreId={id} />
          ))}
        </section>
      </motion.div>
    </Link>
  );
}
