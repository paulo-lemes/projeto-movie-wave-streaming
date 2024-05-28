"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/types";
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
      className="relative max-w-[200px] hover:ring-2 ring-white"
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
          width={225}
          height={300}
          classCSS="h-[300px] w-[200px]"
        />
      </Link>
    </motion.div>
  );
}
