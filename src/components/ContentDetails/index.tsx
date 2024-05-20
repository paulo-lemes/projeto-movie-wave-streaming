"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/types";
import { GenreButton } from "../GenreButton";

export function ContentDetails({
  backdrop_path,
  title,
  name,
  tagline,
  genres,
  overview,
  release_date,
  runtime,
}: content) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
        }}
        className="h-[85vh] flex items-end px-4 sm:px-16 mb-6"
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=""
          width={1440}
          height={810}
          className="mask-top-bottom -z-10 h-[85vh] w-full object-cover absolute inset-0"
        />
        <div className="flex flex-col gap-2 z-10">
          <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl">
            {(title || name)?.toUpperCase()}
          </h2>
          <p className="text-lg font-semibold">{tagline}</p>
          <div className="flex gap-2">
            {genres.map(({ id }) => (
              <GenreButton key={id} genreId={id} classCSS="text-xl" />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
        }}
      >
        <div className="px-4 sm:px-16 mb-6">
          <p className="mb-2">{overview}</p>
          <p className="font-bold">
            Data de lançamento:{" "}
            <span className="font-normal">
              {release_date?.split("-").reverse().join("/")}
            </span>
          </p>
          <p className="font-bold">
            Duração: <span className="font-normal">{runtime} min.</span>
          </p>
        </div>
      </motion.div>
    </>
  );
}