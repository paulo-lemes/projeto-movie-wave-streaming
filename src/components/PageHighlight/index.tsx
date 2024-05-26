"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { content, dataProps } from "@/types";
import { Banner } from "../Banner";

export function PageHighlight({ results, contentType }: dataProps) {
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
    <Banner
      backdrop={content?.backdrop_path}
      title={content?.title || content?.name}
    >
      <div className="flex flex-col gap-2 sm:w-[60vw] lg:w-[40vw]">
        <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl line-clamp-3 py-1.5">
          {(content?.title || content?.name)?.toUpperCase()}
        </h2>
        <p className="line-clamp-3 mb-2">{content?.overview}</p>
        <Link
          href={`/${contentType}/${content?.id}?title=${(
            content?.title || content?.name
          )?.toLowerCase()}`}
        >
          <button className="btn btn-secondary w-max">Veja detalhes</button>
        </Link>
      </div>
    </Banner>
  );
}
