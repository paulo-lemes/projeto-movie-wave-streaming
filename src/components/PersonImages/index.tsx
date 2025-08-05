import React from "react";
import { PersonImagesProps } from "@/types";
import { FadeInContent } from "../FadeInContent";
import { FadeInImage } from "../FadeInImage";

export function PersonImages({ name, profiles }: PersonImagesProps) {
  const photos = profiles.slice(1);

  return (
    photos?.length > 0 && (
      <section className="px-4 sm:px-16 mb-10 flex flex-col gap-2">
        <h3 className="font-bold text-xl sm:text-2xl text-secondary">Fotos</h3>
        <div className="flex flex-wrap gap-2">
          {photos.map(({ file_path, width, height }, index) => (
            <FadeInContent
              key={file_path}
              duration={1}
              delay
              index={index}
              classCSS="relative"
            >
              <FadeInImage
                src={file_path}
                alt={`Foto de ${name}`}
                width={width}
                height={height}
                type="profile"
                classCSS="w-[132px] h-[220px]"
              />
            </FadeInContent>
          ))}
        </div>
      </section>
    )
  );
}
