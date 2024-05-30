import {
  certifcation,
  classificationMovie,
  classificationTV,
  imageContent,
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

export function randomImage(arr: imageContent[]): imageContent {
  const img = arr[Math.floor(Math.random() * arr.length)];

  if (img && img.file_path) return img;

  return defaultImageContent;
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
  classification: classificationMovie | classificationTV
): classification is classificationMovie {
  return (
    (classification as classificationMovie)?.results[0]?.release_dates !==
    undefined
  );
}

export function getClassification(
  data: classificationMovie | classificationTV
): certifcation[] | [] {
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
