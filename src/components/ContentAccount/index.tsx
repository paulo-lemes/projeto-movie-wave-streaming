"use client";

import { ContentAccountProps, content } from "@/types";
import { useEffect, useState } from "react";
import { ContentRow } from "../ContentRow";
import Link from "next/link";

export function ContentAccount({
  toggle,
  contentType,
  children,
}: ContentAccountProps) {
  const [content, setContent] = useState<content[] | [] | null>(null);

  const getContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType;
    const data = await fetch(
      `/api/accountContent?toggle=${toggle}&contentType=${content}`
    );

    if (data.ok) {
      const results = await data.json();
      console.log(results);
      setContent(results);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return content ? (
    <div>
      <h3 className="font-semibold text-xl sm:text-2xl ml-4 sm:ml-16 -mb-6 mt-2">
        {children}
      </h3>
      {content.length > 0 ? (
        <ContentRow results={content} contentType={contentType} />
      ) : (
        <div className="mx-4 sm:mx-16 pt-12 pb-16 flex flex-col gap-2">
          <p className="text-lg sm:text-xl">Nenhum conteúdo encontrado</p>
          <Link
            href={`/${contentType === "tv" ? "series" : "movies"}`}
            className="btn btn-sm sm:btn-md btn-secondary btn-outline w-max"
          >
            Explore
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className="h-[380px]"></div>
  );
}
