"use client";

import React from "react";
import { cardPersonProps } from "@/types";
import { motion } from "framer-motion";
import { FadeInImage } from "../FadeInImage";
import Link from "next/link";

export function CardPerson({
  id,
  name,
  character,
  roles,
  profile_path,
  index,
  type,
}: cardPersonProps) {
  const personRole = roles?.length > 0 ? roles[0].character : character;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          delay: index / 5,
        },
      }}
      className="relative w-24 sm:w-32 flex flex-col bg-primary-content rounded-lg"
    >
      <Link href={`/person/${id}`}>
        <div className="relative">
          <FadeInImage
            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
            type="profile"
            width={430}
            height={646}
            alt={`Foto de ${name}`}
            classCSS="rounded-t-lg"
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
    </motion.div>
  );
}
