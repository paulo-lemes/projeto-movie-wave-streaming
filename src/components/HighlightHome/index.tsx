import React from "react";
import Image from "next/image";
import WallpaperDefault from "./wallpaper-preview.jpg";
import { content } from "@/types";

interface HighlightProps {
  results: content[];
}

export const dynamic = "force-dynamic";

export function HighlightHome({ results }: HighlightProps) {
  const { backdrop_path, title, name, overview } =
    results[Math.floor(Math.random() * results.length)];

  return (
    <div className="h-[85vh] flex items-end px-4 sm:px-16 mb-6">
      <Image
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        width={1440}
        height={810}
        className="mask-top-bottom -z-10 h-[85vh] w-full object-cover absolute inset-0"
      />
      <div className="flex flex-col gap-2 sm:w-[40vw] z-10">
        <h2 className="text-3xl sm:text-5xl font-bold drop-shadow-2xl line-clamp-2">
          {(title || name)?.toUpperCase()}
        </h2>
        <p className="line-clamp-3">{overview}</p>
        <button className="btn btn-secondary w-max">Veja detalhes</button>
      </div>
    </div>
  );
}
