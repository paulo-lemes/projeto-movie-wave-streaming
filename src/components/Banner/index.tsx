import React from "react";
import { bannerProps } from "@/types";
import { FadeInImage } from "../FadeInImage";

const divHighlightStyle = "h-[90vh] items-end mb-6";
const divSpotlightStyle = "h-[90vh] items-center my-10 shadow-top-bottom";
const imgHighlightStyle = "h-[100vh] w-full mask-top-bottom";
const imgSpotlightStyle = "h-full w-[90vw] mask-left-right";

export function Banner({ children, backdrop, title, spotlight }: bannerProps) {
  return (
    <div
      className={`relative max-h-[735px] w-full flex px-4 sm:px-16 
    ${spotlight ? divSpotlightStyle : divHighlightStyle}
    `}
    >
      <FadeInImage
        src={`https://image.tmdb.org/t/p/original/${backdrop}`}
        type="banner"
        priority
        alt={`Capa de ${title}`}
        width={1440}
        height={810}
        classCSS={`-z-10 h-[100vh] max-h-[815px] absolute inset-0 
        ${spotlight ? imgSpotlightStyle : imgHighlightStyle}
        `}
      />
      {children}
    </div>
  );
}
