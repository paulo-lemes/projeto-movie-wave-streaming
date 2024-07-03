"use client";

import React, { useEffect, useState } from "react";
import { ContentImagesProps, ImageContent } from "@/types";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Banner } from "../Banner";

const changeContentBtnStyle =
  "absolute h-full opacity-15 hover:opacity-100 z-10";

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
    <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full mb-6">
      {images.length > 1 && (
        <>
          <button
            type="button"
            title="Conteúdo anterior"
            className={`${changeContentBtnStyle} left-0 sm:left-3`}
            onClick={() => {
              setAutoChange(false);
              handleImageChange("prev");
            }}
          >
            <SlArrowLeft size={17} />
          </button>
          <button
            type="button"
            title="Próximo conteúdo"
            className={`${changeContentBtnStyle} right-0 sm:right-3`}
            onClick={() => {
              setAutoChange(false);
              handleImageChange("next");
            }}
          >
            <SlArrowRight size={17} />
          </button>
        </>
      )}
      {image ? (
        <Banner backdrop={image.file_path} title={title}>
          {children}
        </Banner>
      ) : (
        <div className="relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex px-4 sm:px-16 items-end mb-6">
          {children}
        </div>
      )}
    </div>
  );
}
