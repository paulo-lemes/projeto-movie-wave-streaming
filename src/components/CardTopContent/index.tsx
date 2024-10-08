"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Content } from "@/types";
import { motion } from "framer-motion";
import { FadeInImage } from "../FadeInImage";

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
}: Content) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={hover ? "hover" : "default"}
      className="relative max-w-64 mr-2"
    >
      <Link
        href={`/${media_type || contentType}/${id}?title=${(
          title || name
        ).toLowerCase()}`}
        className="flex items-baseline"
        aria-label={`Link para detalhes de ${title || name}`}
      >
        <motion.p
          variants={variants}
          className={`font-bold text-secondary text-8xl sm:text-9xl -z-10 -mr-3 
          ${!hover && "text-outline"}`}
        >
          {index < 9 ? (
            <span className="letter-shadow-r">{index + 1}</span>
          ) : (
            <>
              <span className="letter-shadow-r">{(index + 1) / 10}</span>
              <span className="letter-shadow-r -ml-5">0</span>
            </>
          )}
        </motion.p>
        <FadeInImage
          src={poster_path}
          type="poster"
          alt={`Poster de ${title || name}`}
          title={title || name}
          width={150}
          height={225}
          unoptimized={false}
          classCSS="h-[225px] w-[150px] hover:ring-2 ring-white"
        />
      </Link>
    </motion.div>
  );
}
