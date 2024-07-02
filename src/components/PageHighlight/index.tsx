"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Content, DataProps } from "@/types";
import { randomContent } from "@/utils";
import { Banner } from "../Banner";
import { Loading } from "../Loading";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export function PageHighlight({ results, contentType }: DataProps) {
  const [content, setContent] = useState<Content | null>(null);
  const [carousel, setCarousel] = useState<Content[] | null>(null);

  const handleContentChange = (order: string) => {
    if (carousel && content) {
      const currentIndex = carousel.findIndex(({ id }) => id === content.id);
      let nextContent;
      switch (order) {
        case "next":
          currentIndex === carousel.length - 1
            ? (nextContent = carousel[0])
            : (nextContent = carousel[currentIndex + 1]);
          break;
        case "prev":
          currentIndex === 0
            ? (nextContent = carousel[carousel.length - 1])
            : (nextContent = carousel[currentIndex - 1]);
          break;
        default:
          nextContent = content;
          break;
      }
      setContent(nextContent);
    }
  };

  useEffect(() => {
    const filterWithBackdropAndOverview = results.filter(
      ({ backdrop_path, overview }) => backdrop_path && overview
    );

    const highlightContent = filterWithBackdropAndOverview.length
      ? filterWithBackdropAndOverview
      : results.filter(({ backdrop_path }) => backdrop_path);

    if (highlightContent.length) {
      setCarousel(highlightContent);
      setContent(randomContent(highlightContent));
    } else {
      setCarousel(results);
      setContent(randomContent(results));
    }
  }, [results]);

  return content ? (
    <Banner
      backdrop={content.backdrop_path}
      title={content.title || content.name}
    >
      <button
        type="button"
        title="Trocar conteúdo"
        className="absolute left-1 h-full opacity-30 hover:opacity-100"
        onClick={() => handleContentChange("prev")}
      >
        <SlArrowLeft size={17} />
      </button>
      <div className="flex flex-col gap-2 sm:w-[60vw] lg:w-[40vw]">
        <h2 className="text-3xl lg:text-5xl font-bold drop-shadow-2xl line-clamp-4 py-1.5">
          {(content.title || content.name)?.toUpperCase()}
        </h2>
        {content.overview && (
          <p className="line-clamp-3 mb-2">{content.overview}</p>
        )}
        <Link
          href={`/${contentType}/${content.id}?title=${(
            content.title || content.name
          )?.toLowerCase()}`}
          className="btn btn-secondary w-max"
        >
          Veja detalhes
        </Link>
      </div>
      <button
        type="button"
        title="Trocar conteúdo"
        className="absolute right-1 h-full opacity-30 hover:opacity-100"
        onClick={() => handleContentChange("next")}
      >
        <SlArrowRight size={17} />
      </button>
    </Banner>
  ) : (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex justify-center px-4 sm:px-16 mb-6">
      <Loading />
    </div>
  );
}
