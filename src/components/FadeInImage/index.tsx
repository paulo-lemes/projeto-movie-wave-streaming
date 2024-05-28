"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import DefaultBackdrop from "./assets/default-backdrop.png";
import DefaultPoster from "./assets/default-poster.png";
import DefaultProfilePicture from "./assets/default-profile-picture.png";
import { motion } from "framer-motion";
import { fadeInImageProps } from "@/types";

const defaultPaths: {
  [key: string]: StaticImageData;
} = {
  banner: DefaultBackdrop,
  backdrop: DefaultBackdrop,
  poster: DefaultPoster,
  profile: DefaultProfilePicture,
};

export function FadeInImage({
  src,
  type,
  alt = "",
  width = 500,
  height = 500,
  classCSS = "",
  title,
}: fadeInImageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const defaultImg = defaultPaths[type];

  return (
    <>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          className={`${classCSS} object-cover w-full transition-opacity ease-in duration-700 ${
            loading ? "invisible opacity-0" : "visible opacity-100"
          }`}
        />
      ) : (
        <>
          <Image
            src={defaultImg}
            alt={`Imagem de fundo genérica substituindo - ${alt}`}
            width={width}
            height={height}
            unoptimized
            className={`${classCSS} ${
              type === "banner" && "mask-default-img"
            } object-cover transition-opacity ease-in duration-700 ${
              !error ? "invisible opacity-0" : "visible opacity-100"
            }`}
          />
          {type === "poster" && (
            <p className="absolute bottom-0 w-full text-base-100 text-center font-semibold text-lg p-2">
              {title}
            </p>
          )}
        </>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`absolute inset-0 m-auto w-28 flex justify-center items-center
      ${loading && !error ? "block" : "hidden"}`}
      >
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </motion.div>
    </>
  );
}
