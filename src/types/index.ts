import { ReactNode } from "react";

export type contentProps = {
  index: number;
  images: {backdrops: imageContent[]};
  contentType?: string;
};

export type content = defaultProps & movie & tv & contentProps;

export type imageContent = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

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
  children?: ReactNode;
  contentType?: string;
  top10?: boolean;
};

export interface modalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export interface genreNameProps {
  genreId: number;
  classCSS?: string;
}

export interface fadeInContentProps {
  children: ReactNode;
  classCSS?: string;
  duration: number;
}

export interface fadeInImageProps {
  src: string;
  type: string;
  alt?: string;
  width?: number;
  height?: number;
  classCSS?: string;
  priority?: boolean;
}

export interface bannerProps {
  children: ReactNode;
  backdrop?: string;
  title?: string;
  spotlight?: boolean;
}

export type credits = {
  cast: person[];
  crew: person[];
  id: number;
};

export type person = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  character: string;
  roles: roles[];
  order: number;
  department: string;
  job: string;
  jobs: jobArray[];
  index: number;
};

type jobArray = {
  credit_id: string;
  job: string;
  episode_count: number;
};

type roles = {
  credit_id: string;
  character: string;
  episode_count: number;
};

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
