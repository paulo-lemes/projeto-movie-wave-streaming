"use client";

import { ContentAccountProps, content } from "@/types";
import { useEffect, useState } from "react";
import { ContentRow } from "../ContentRow";

export function ContentAccount({
  toggle,
  contentType,
  children,
}: ContentAccountProps) {
  const [content, setContent] = useState<content[] | []>([]);
  const getContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType
    const data = await fetch(
      `/api/accountContent?toggle=${toggle}&contentType=${content}`
    );

    const results = await data.json();
    console.log(results);

    if (results.length) {
      setContent(results);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    content.length > 0 && (
      <div>
        <ContentRow results={content} contentType={contentType}>
          {children}
        </ContentRow>
      </div>
    )
  );
}
