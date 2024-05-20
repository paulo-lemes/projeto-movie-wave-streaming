"use client";

import React from "react";
import { videoProps } from "@/types";
import { motion } from "framer-motion";

export function ContentVideo({ results }: { results: videoProps[] }) {
  const videos = results.filter(({ site }) => site.toLowerCase() === "youtube");

  return (
    videos.length > 0 && (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-col gap-4 px-4 sm:px-16 mb-6"
      >
        <h4 className="text-2xl font-bold">Multimídia</h4>
        <div className="flex flex-wrap gap-4">
          {videos.map(({ key }) => (
            <iframe
              key={key}
              src={`https://www.youtube.com/embed/${key}`}
              allowFullScreen
              title="Embedded youtube"
              width={1920}
              height={1080}
              className="w-[400px] max-w-full max-h-[225px]"
            />
          ))}
        </div>
      </motion.section>
    )
  );
}
