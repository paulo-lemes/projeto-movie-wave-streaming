import { useState } from "react";
import { Content, ImageContent, SlideshowList } from "@/types";

export function useSlideshow() {
  const [content, setContent] = useState<Content | null>(null);
  const [image, setImage] = useState<ImageContent | null>(null);
  const [slideshowList, setSlideshowList] = useState<SlideshowList>(null);
  const [autoChange, setAutoChange] = useState<boolean>(true);

  function isContentList(
    slideshowArray: SlideshowList
  ): slideshowArray is Content[] {
    return (
      Array.isArray(slideshowArray) &&
      slideshowArray.every((item) => "id" in item)
    );
  }

  function isImageContentList(
    slideshowArray: SlideshowList
  ): slideshowArray is ImageContent[] {
    return (
      Array.isArray(slideshowArray) &&
      slideshowArray.every((item) => "file_path" in item)
    );
  }

  const handleSlideChange = (order: string) => {
    if (slideshowList) {
      let currentIndex = 0;
      if (isContentList(slideshowList) && content)
        currentIndex = slideshowList.findIndex(({ id }) => id === content.id);

      if (isImageContentList(slideshowList) && image)
        currentIndex = slideshowList.findIndex(
          ({ file_path }) => file_path === image.file_path
        );

      let nextContent;
      switch (order) {
        case "next":
          currentIndex === slideshowList?.length - 1
            ? (nextContent = slideshowList[0])
            : (nextContent = slideshowList[currentIndex + 1]);
          break;
        case "prev":
          currentIndex === 0
            ? (nextContent = slideshowList[slideshowList?.length - 1])
            : (nextContent = slideshowList[currentIndex - 1]);
          break;
        default:
          content ? (nextContent = content) : (nextContent = image);
          break;
      }
      nextContent && "id" in nextContent
        ? setContent(nextContent)
        : setImage(nextContent);
    }
  };

  const selectContent = (id: number) => {
    const newContent =
      isContentList(slideshowList) && content
        ? slideshowList?.find((content) => content.id === id)
        : null;
    if (newContent) {
      setContent(newContent);
    }
  };

  const manualSlideChange = (orderOrId: string | number) => {
    setAutoChange(false);
    typeof orderOrId === "string"
      ? handleSlideChange(orderOrId)
      : selectContent(orderOrId);
  };

  return {
    content,
    setContent,
    isContentList,
    image,
    setImage,
    isImageContentList,
    slideshowList,
    setSlideshowList,
    handleSlideChange,
    manualSlideChange,
    selectContent,
    autoChange,
  };
}
