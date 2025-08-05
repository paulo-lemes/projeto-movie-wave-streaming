"use client";

import React, { useEffect } from "react";
import { DataProps } from "@/types";
import { randomContent } from "@/utils";
import { Loading } from "../Loading";
import { motion } from "framer-motion";
import { SlideshowWrapper } from "../SlideshowWrapper";
import { Banner } from "../Banner";
import { GoDot, GoDotFill } from "react-icons/go";
import Link from "next/link";
import { useSlideshow } from "@/hooks/slideshow";

const dotIconStyle = "fill-secondary opacity-40 hover:opacity-100";

const fadeSlideUp = (yStart: number, duration?: number) => {
  return {
    hidden: { opacity: 0, y: `${yStart}%` },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: duration || 0.4,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };
};

export function PageHighlight({ results, contentType }: DataProps) {
  const {
    content,
    setContent,
    slideshowList,
    setSlideshowList,
    autoChange,
    handleSlideChange,
    manualSlideChange,
    isContentList,
  } = useSlideshow();

  useEffect(() => {
    const filterWithBackdropAndOverview = results.filter(
      ({ backdrop_path, overview }) => backdrop_path && overview
    );

    const highlightContent = filterWithBackdropAndOverview?.length
      ? filterWithBackdropAndOverview
      : results.filter(({ backdrop_path }) => backdrop_path);

    if (highlightContent?.length) {
      setSlideshowList(highlightContent);
      setContent(randomContent(highlightContent));
    } else {
      setSlideshowList(results);
      setContent(randomContent(results));
    }
  }, [results]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoChange && slideshowList?.length)
      timeout = setTimeout(() => {
        handleSlideChange("next");
      }, 13000);
    return () => clearTimeout(timeout);
  }, [autoChange, content, slideshowList]);

  return content && isContentList(slideshowList) ? (
    <SlideshowWrapper
      carousel={slideshowList}
      changeContent={manualSlideChange}
    >
      {slideshowList?.length > 1 && (
        <div className="absolute -bottom-6 right-0 left-0 hidden sm:flex sm:justify-center">
          <div className="flex justify-center w-max">
            {slideshowList.map(({ id, title, name }) => (
              <button
                key={id}
                type="button"
                title={title || name}
                onClick={() => manualSlideChange(id)}
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
          <motion.h2
            className="text-3xl lg:text-5xl font-bold drop-shadow-2xl line-clamp-4 py-1.5"
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp(15)}
          >
            {(content.title || content.name)?.toUpperCase()}
          </motion.h2>
          {content.overview && (
            <motion.p
              className="line-clamp-3 mb-2"
              initial="hidden"
              animate="visible"
              variants={fadeSlideUp(5, 0.3)}
            >
              {content.overview}
            </motion.p>
          )}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeSlideUp(15)}
          >
            <Link
              href={`/${contentType}/${content.id}?title=${(
                content.title || content.name
              )?.toLowerCase()}`}
              className="btn btn-secondary w-max"
            >
              Veja detalhes
            </Link>
          </motion.div>
        </div>
      </Banner>
    </SlideshowWrapper>
  ) : (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex justify-center px-4 sm:px-16 mb-6">
      <Loading />
    </div>
  );
}
