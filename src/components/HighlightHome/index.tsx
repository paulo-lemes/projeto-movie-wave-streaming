"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import WallpaperDefault from "./wallpaper-preview.jpg";
import { content, dataProps } from "@/types";
import { motion } from "framer-motion";
import { Loading } from "../Loading";

export function HighlightHome({ results }: dataProps) {
  const [content, setContent] = useState<content | null>(null);

  useEffect(() => {
    setContent(results[Math.floor(Math.random() * results.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.5,
      }}
      className="h-[85vh] flex items-end px-4 sm:px-16 mb-6"
    >
      {content ? (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
            alt=""
            width={1440}
            height={810}
            className="mask-top-bottom -z-10 h-[85vh] w-full object-cover absolute inset-0"
          />
          <div className="flex flex-col gap-2 sm:w-[40vw] z-10">
            <h2 className="text-3xl sm:text-5xl font-bold drop-shadow-2xl line-clamp-2">
              {(content?.title || content?.name)?.toUpperCase()}
            </h2>
            <p className="line-clamp-3">{content?.overview}</p>
            <button className="btn btn-secondary w-max">Veja detalhes</button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </motion.div>
  );
}
