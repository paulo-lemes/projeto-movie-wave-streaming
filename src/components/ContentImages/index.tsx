"use client";

import React, { useEffect, useState } from "react";
import { ContentImagesProps, ImageContent } from "@/types";
import { SlideshowWrapper } from "../SlideshowWrapper";
import { Banner } from "../Banner";

export function ContentImages({
  children,
  title,
  images,
  randomImg,
}: ContentImagesProps) {
  const [image, setImage] = useState<ImageContent | null>(null);
  const [autoChange, setAutoChange] = useState<boolean>(true);

  const handleImageChange = (order: string) => {
    if (images && image) {
      const currentIndex = images.findIndex(
        ({ file_path }) => file_path === image.file_path
      );
      let nextImage;
      switch (order) {
        case "next":
          currentIndex === images.length - 1
            ? (nextImage = images[0])
            : (nextImage = images[currentIndex + 1]);
          break;
        case "prev":
          currentIndex === 0
            ? (nextImage = images[images.length - 1])
            : (nextImage = images[currentIndex - 1]);
          break;
        default:
          nextImage = image;
          break;
      }
      setImage(nextImage);
    }
  };

  const manualImageChange = (order: string) => {
    setAutoChange(false);
    handleImageChange(order);
  };

  useEffect(() => {
    setImage(randomImg);
  }, [randomImg, images]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoChange)
      timeout = setTimeout(() => {
        handleImageChange("next");
      }, 13000);
    return () => clearTimeout(timeout);
  }, [autoChange, image, images]);

  return (
    <SlideshowWrapper carousel={images} changeContent={manualImageChange}>
      {image ? (
        <Banner backdrop={image.file_path} title={title}>
          {children}
        </Banner>
      ) : (
        <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex px-4 sm:px-16 items-end mb-6">
          {children}
        </div>
      )}
    </SlideshowWrapper>
  );
}
