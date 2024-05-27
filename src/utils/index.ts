import { imageContent } from "@/types";

const defaultImageContent = {
  aspect_ratio: 0,
  height: 0,
  iso_639_1: null,
  file_path: "",
  vote_average: 0,
  vote_count: 0,
  width: 0
}

export function randomImage(arr: imageContent[]): imageContent {
  const img = arr[Math.floor(Math.random() * arr.length)];

  if (img && img.file_path) return img

  return defaultImageContent
}