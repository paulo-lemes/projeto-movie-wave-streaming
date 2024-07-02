"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Content, DataProps } from "@/types";
import { randomContent } from "@/utils";
import { Banner } from "../Banner";
import { Loading } from "../Loading";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoDot, GoDotFill } from "react-icons/go";

const changeContentBtnStyle = "absolute h-full opacity-15 hover:opacity-100 z-10";
const dotIconStyle = "fill-secondary opacity-40 hover:opacity-100";

export function PageHighlight({ results, contentType }: DataProps) {
  const [content, setContent] = useState<Content | null>(null);
  const [carousel, setCarousel] = useState<Content[] | null>(null);
  const [autoChange, setAutoChange] = useState<boolean>(true);

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

  const selectContent = (id: number) => {
    const content = carousel?.find((content) => content.id === id);
    content ? setContent(content) : null;
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

  useEffect(() => {
    if (autoChange)
      setTimeout(() => {
        handleContentChange("next");
      }, 13000);
  }, [content, carousel]);

  return content && carousel ? (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full mb-6">
      <button
        type="button"
        title="Conteúdo anterior"
        className={`${changeContentBtnStyle} left-0 sm:left-1`}
        onClick={() => {
          setAutoChange(false);
          handleContentChange("prev");
        }}
      >
        <SlArrowLeft size={17} />
      </button>
      <button
        type="button"
        title="Próximo conteúdo"
        className={`${changeContentBtnStyle} right-0 sm:right-1`}
        onClick={() => {
          setAutoChange(false);
          handleContentChange("next");
        }}
      >
        <SlArrowRight size={17} />
      </button>
      {carousel.length > 1 && (
        <div className="absolute -bottom-6 right-0 left-0 hidden sm:flex sm:justify-center">
          <div className="flex justify-center w-max">
            {carousel.map(({ id, title }) => (
              <button
                key={id}
                type="button"
                title={title}
                onClick={() => {
                  setAutoChange(false);
                  selectContent(id);
                }}
              >
                {id === content.id ? (
                  <GoDotFill className={dotIconStyle} />
                ) : (
                  <GoDot className={dotIconStyle} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      <Banner
        backdrop={content.backdrop_path}
        title={content.title || content.name}
      >
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
      </Banner>
    </div>
  ) : (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex justify-center px-4 sm:px-16 mb-6">
      <Loading />
    </div>
  );
}
