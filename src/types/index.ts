import { ReactNode } from "react";

export type content = {
  adult: boolean;
  media_type?: string;
  backdrop_path: string;
  genre_ids: number[];
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
};

export type dataProps = {
  results: content[];
  children?: ReactNode;
};

export type modalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};
