import { ReactNode } from "react";

export type content = {
  adult: boolean;
  media_type?: string;
  backdrop_path: string;
  genre_ids: number[];
  genres: {id: number, name: string}[];
  tagline: string;
  runtime: number;
  id: number;
  origin_country?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  index: number;
  contentType?: string;
};

export type dataProps = {
  results: content[];
  children?: ReactNode;
  contentType?: string;
};

export type modalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};
