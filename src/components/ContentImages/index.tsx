"use client";

import React, { useEffect } from "react";
import { ContentImagesProps } from "@/types";
import useSlideshow from "@/hooks/slideshow";
import { SlideshowWrapper } from "../SlideshowWrapper";
import { Banner } from "../Banner";

export function ContentImages({
  children,
  title,
  imageList,
  randomImg,
}: ContentImagesProps) {
  const {
    image,
    setImage,
    slideshowList,
    setSlideshowList,
    autoChange,
    handleSlideChange,
    manualSlideChange,
    isImageContentList,
  } = useSlideshow();

  useEffect(() => {
    setImage(randomImg);
    setSlideshowList(imageList);
  }, [randomImg, imageList]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoChange)
      timeout = setTimeout(() => {
        handleSlideChange("next");
      }, 13000);
    return () => clearTimeout(timeout);
  }, [autoChange, image, slideshowList]);

  return image && isImageContentList(slideshowList) ? (
    <SlideshowWrapper
      carousel={slideshowList}
      changeContent={manualSlideChange}
    >
      <Banner backdrop={image.file_path} title={title}>
        {children}
      </Banner>
    </SlideshowWrapper>
  ) : (
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex px-4 sm:px-16 items-end mb-6">
      {children}
    </div>
  );
}
