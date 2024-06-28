import React from "react";
import { BannerProps } from "@/types";
import { FadeInImage } from "../FadeInImage";

const divHighlightStyle = "items-end mb-6";
const divSpotlightStyle = "items-center my-10 shadow-top-bottom";
const imgHighlightStyle = "h-[100vh] w-full mask-top-bottom";
const imgSpotlightStyle = "h-full w-[90vw] mask-left-right";

export function Banner({ children, backdrop, title, spotlight }: BannerProps) {
  return (
    <div
      className={`relative h-[70vh] sm:h-[90vh] max-h-[735px] w-full flex px-4 sm:px-16 
    ${spotlight ? divSpotlightStyle : divHighlightStyle}
    `}
    >
      <FadeInImage
        src={backdrop}
        type="banner"
        alt={`Capa de ${title}`}
        width={1440}
        height={810}
        classCSS={`-z-10 h-[70vh] sm:h-[100vh] max-h-[815px] absolute inset-0 
        ${spotlight ? imgSpotlightStyle : imgHighlightStyle}
        `}
      />
      {children}
    </div>
  );
}
