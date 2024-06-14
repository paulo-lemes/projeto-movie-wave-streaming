"use client";

import React from "react";
import Link from "next/link";
import { Content } from "@/types";
import { motion } from "framer-motion";
import { FadeInImage } from "../FadeInImage";

export function Card({
  title,
  name,
  poster_path,
  media_type,
  id,
  index,
  contentType,
  bigCard
}: Content) {
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
      className={`relative ${
        bigCard ? "max-w-[275px]" : "max-w-[200px]"
      } hover:ring-2 ring-white`}
    >
      <Link
        href={`/${media_type || contentType}/${id}?title=${(
          title || name
        ).toLowerCase()}`}
      >
        <FadeInImage
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
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
    </motion.div>
  );
}
