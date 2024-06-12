"use client";

import React from "react";
import { PersonImagesProps } from "@/types";
import { FadeInImage } from "../FadeInImage";
import { motion } from "framer-motion";

export function PersonImages({ name, profiles }: PersonImagesProps) {
  const photos = profiles.slice(1);

  return (
    photos.length && (
      <section className="px-4 sm:px-16 mb-10 flex flex-col gap-2">
        <h3 className="font-bold text-xl sm:text-2xl text-secondary">Fotos</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map(({ file_path, width, height }, index) => (
            <motion.div
              key={file_path}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: index / 5,
                },
              }}
              className="relative"
            >
              <FadeInImage
                src={`https://image.tmdb.org/t/p/original/${file_path}`}
                alt={`Foto de ${name}`}
                width={width}
                height={height}
                type="profile"
                classCSS="w-[132px] h-[220px]"
              />
            </motion.div>
          ))}
        </div>
      </section>
    )
  );
}
