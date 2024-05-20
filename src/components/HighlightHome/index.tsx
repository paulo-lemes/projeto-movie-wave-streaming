"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import WallpaperDefault from "../../../public/wallpaper-preview.jpg";
import { content, dataProps } from "@/types";
import Link from "next/link";

export function HighlightHome({ results, contentType }: dataProps) {
  const [content, setContent] = useState<content | null>(null);

  useEffect(() => {
    const highlightContent = results.filter(
      ({ title, name, backdrop_path, overview }) =>
        (title || name) && backdrop_path && overview
    );
    setContent(
      highlightContent[Math.floor(Math.random() * highlightContent.length)]
    );
  }, [results]);

  return (
    <div className="h-[85vh] flex items-end px-4 sm:px-16 mb-6">
      <Image
        src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
        alt=""
        width={1440}
        height={810}
        className="mask-top-bottom -z-10 h-[85vh] w-full object-cover absolute inset-0"
      />
      <div className="flex flex-col gap-2 sm:w-[60vw] lg:w-[40vw] z-10">
        <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl line-clamp-2 py-1.5">
          {(content?.title || content?.name)?.toUpperCase()}
        </h2>
        <p className="line-clamp-3 mb-2">{content?.overview}</p>
        <Link href={`/${contentType}/${content?.id}`}>
          <button className="btn btn-secondary w-max">Veja detalhes</button>
        </Link>
      </div>
    </div>
  );
}
