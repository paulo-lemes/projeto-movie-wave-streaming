"use client";

import React, { useState } from "react";
import Link from "next/link";
import { content } from "@/types";
import { motion } from "framer-motion";

const variants = {
  default: {
    x: 0,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  hover: {
    x: -10,
    scale: 1.05,
    transition: {
      x: { stiffness: 1000 },
    },
    delay: 0.3,
  },
};

export function CardTopContent({
  title,
  name,
  poster_path,
  media_type,
  id,
  index,
  contentType,
}: content) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={hover ? "hover" : "default"}
      className="max-w-64 mr-2"
    >
      <Link
        href={`/${media_type || contentType}/${id}?title=${(
          title || name
        ).toLowerCase()}`}
        className="flex items-baseline"
      >
        <motion.h5
          variants={variants}
          className={`font-bold text-secondary text-8xl sm:text-9xl -z-10 -mr-3 
          ${!hover && "text-outline"}`}
        >
          {index < 9 ? (
            <span className={`${!hover && "letter-shadow-r"}`}>
              {index + 1}
            </span>
          ) : (
            <>
              <span className="letter-shadow-r">{(index + 1) / 10}</span>
              <span className={`${!hover && "letter-shadow-r"} -ml-5`}>0</span>
            </>
          )}
        </motion.h5>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : "../../../public/unavailable-image.png"
          }
          alt={`Poster de ${title || name}`}
          width={430}
          height={646}
          className="object-cover h-[225px] w-[150px] hover:ring-2 ring-white"
        />
      </Link>
    </motion.div>
  );
}
