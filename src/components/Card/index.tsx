"use client";

import React from "react";
import Link from "next/link";
import { content } from "@/types";
import { motion } from "framer-motion";

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
    <Link
      href={`/${media_type || contentType}/${id}?title=${(
        title || name
      ).toLowerCase()}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col gap-3 max-w-64 cursor-pointer hover:ring-2 ring-white"
      >
        <motion.img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : "../../../public/unavailable-image.png"
          }
          alt={`Poster de ${title || name}`}
          width={430}
          height={646}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
              delay: index / 5,
            },
          }}
          className="object-cover h-[300px] w-[200px]"
        />
      </motion.div>
    </Link>
  );
}
