import {
  Certifcation,
  ClassificationMovie,
  ClassificationTV,
  Content,
  ImageContent,
} from "@/types";
import classifications from "../classifications.json";

const defaultImageContent = {
  aspect_ratio: 0,
  height: 0,
  iso_639_1: null,
  file_path: "",
  vote_average: 0,
  vote_count: 0,
  width: 0,
};

export function randomImage(arr: ImageContent[]): ImageContent {
  const img = arr[Math.floor(Math.random() * arr.length)];

  return img && img.file_path ? img : defaultImageContent;
}

export function randomContent(arr: Content[]): Content {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const cardPersonComplement = {
  character: "",
  roles: [
    {
      credit_id: "",
      character: "",
      episode_count: 0,
    },
  ],
};

function isClassificationMovie(
  classification: ClassificationMovie | ClassificationTV
): classification is ClassificationMovie {
  return (
    (classification as ClassificationMovie)?.results[0]?.release_dates !==
    undefined
  );
}

export function getClassification(
  data: ClassificationMovie | ClassificationTV
): Certifcation[] | [] {
  if (isClassificationMovie(data)) {
    const arr = data.results
      .filter((obj: any) => obj.iso_3166_1 === "BR")
      .map((obj: any) =>
        obj.release_dates.map((obj: any) => obj.certification)
      );

    return arr[0]
      ? classifications.filter((obj) => obj.certification === arr[0][0])
      : [];
  } else {
    const arr = data.results.filter((obj: any) => obj.iso_3166_1 === "BR");

    return arr[0]
      ? classifications.filter((obj) => obj.certification === arr[0].rating)
      : [];
  }
}
