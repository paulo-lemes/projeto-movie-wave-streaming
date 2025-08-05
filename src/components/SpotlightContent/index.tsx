"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Content, DataProps } from "@/types";
import { randomContent } from "@/utils";
import { Banner } from "../Banner";

export function SpotlightContent({ results, contentType }: DataProps) {
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const filterWithBackdropAndOverview = results.filter(
      ({ backdrop_path, overview }) => backdrop_path && overview
    );

    const spotlightContent = filterWithBackdropAndOverview?.length
      ? filterWithBackdropAndOverview
      : results.filter(({ backdrop_path }) => backdrop_path);
    setContent(randomContent(spotlightContent));
  }, [results]);

  return (
    content && (
      <Banner
        backdrop={content.backdrop_path}
        title={content.title || content.name}
        spotlight
      >
        <section className="flex justify-end w-full">
          <div className="flex flex-col gap-2 sm:w-[60vw] lg:w-[40vw] justify-items-end items-end">
            <h2 className="text-right text-3xl lg:text-5xl font-bold drop-shadow-2xl line-clamp-3 py-1.5">
              {(content.title || content.name)?.toUpperCase()}
            </h2>
            <p className="line-clamp-3 mb-2 text-right drop-shadow-2xl">
              {content.overview}
            </p>
            <Link
              href={`/${contentType}/${content.id}?title=${(
                content.title || content.name
              )?.toLowerCase()}`}
              className="btn btn-secondary btn-outline w-max"
            >
              Veja detalhes
            </Link>
          </div>
        </section>
      </Banner>
    )
  );
}
