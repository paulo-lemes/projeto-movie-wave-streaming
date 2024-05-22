import { ReactNode } from "react";

export type contentProps = {
  index: number;
  contentType?: string;
};

export type content = defaultProps & movie & tv & contentProps;

export type videoProps = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type watchProviderProps = {
  link: string;
  rent?: provider[];
  buy?: provider[];
  flatrate?: provider[];
};

export interface providerRowProps {
  providers: provider[] | undefined;
  children: ReactNode;
}

type provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type dataProps = {
  results: content[];
  children: ReactNode;
  contentType?: string;
};

export type modalProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export interface fadeInContentProps {
  children: ReactNode;
  classCSS?: string;
  duration: number;
}

export interface bannerProps {
  children: ReactNode;
  backdrop?: string;
  title?: string;
}

type defaultProps = {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;

  genre_ids: number[];
  media_type: string;
};

type movie = {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
};

type tv = {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: boolean;
    profile_path: string;
  }[];
  episode_run_time: [];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  type: string;
  vote_average: number;
  vote_count: number;
};
