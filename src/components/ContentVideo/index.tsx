import React from "react";
import { ContentVideoProps } from "@/types";

export function ContentVideo({ results }: ContentVideoProps) {
  const videos = results.filter(({ site }) => site.toLowerCase() === "youtube");

  return (
    videos.length > 0 && (
      <section className="flex flex-col gap-4 px-4 sm:px-16 mb-6">
        <h4 className="text-2xl font-bold">Multimídia</h4>
        <div className="flex flex-wrap gap-4">
          {videos.map(({ key, name }) => (
            <iframe
              key={key}
              title={name}
              rel="preconnect"
              src={`https://www.youtube-nocookie.com/embed/${key}`}
              allowFullScreen
              width={1920}
              height={1080}
              className="w-[400px] max-w-full max-h-[225px]"
            />
          ))}
        </div>
      </section>
    )
  );
}
