import { ReactNode } from "react";
import { CreatedBy, Person } from "./person";

type Movie = {
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

type Tv = {
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
  seasons: SeasonsContent[];
  type: string;
  vote_average: number;
  vote_count: number;
};

type DefaultProps = {
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

  rating: number;
};

export type ContentProps = {
  index: number;
  images: { backdrops: ImageContent[] };
  bigCard?: boolean;
  contentType?: string;
};

export type Content = DefaultProps &
  Movie &
  Tv &
  Person &
  ContentProps &
  ClassificationContentProps;

export type ImageContent = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export interface ContentImagesProps {
  children: ReactNode;
  title: string;
  imageList: ImageContent[];
  randomImg: ImageContent;
}

export interface ContentVideoProps {
  results: VideoContent[];
}

export type VideoContent = {
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

export interface LinkProviderProps {
  children: ReactNode;
  provider_id: number;
}

export type WatchProviderProps = {
  link: string;
  rent?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
};

export interface ProviderRowProps {
  providers: Provider[] | undefined;
  children: ReactNode;
}

type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type DataProps = {
  results: Content[];
  children?: ReactNode;
  contentType?: string;
  top10?: boolean;
  bigCard?: boolean;
};

export interface InfoContentDetailsProps {
  title: string;
  children: ReactNode;
}

export interface GenreNameProps {
  genreId: number;
  classCSS?: string;
}

export type Credits = {
  cast: Person[];
  crew: Person[];
  id: number;
  contentType: string;
  created_by: CreatedBy[];
};

export interface ClassificationContentProps {
  classification: ClassificationMovie | ClassificationTV;
}

export type Certifcation = {
  certification: string;
  meaning: string;
  order: number;
};

export type ClassificationTV = {
  results: {
    descriptors: [];
    iso_3166_1: string;
    rating: string;
  }[];
  id: number;
};

export type ClassificationMovie = {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: [];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
};

export interface RatingStarsProps {
  isOpen: boolean;
  onClose: () => void;
  isRated: boolean | null;
  handleAction: (value: string) => void;
  rating: number | string;
  handleStarSelection: (value: number) => void;
}

export interface RatingContentProps {
  id: number;
  contentType: string | undefined;
}

export interface PostContentObj {
  [key: string]: string | undefined | number | boolean;
}

export interface ToggleContentAccountProps {
  toggle: string;
  id: number;
  contentType: string | undefined;
}

export interface ContentAccountProps {
  toggle: string;
  contentType: string | undefined;
  children: ReactNode;
}

export interface SortContentAccountProps {
  toggle: string;
  sortFunction: (option: string) => void;
  orderAsc: boolean;
  changeOrder: () => void;
}

export interface StreamingRowTitleProps {
  children: ReactNode;
  logo: string | undefined;
  name: string;
}

export interface StreamingContentProps {
  type?: string;
  category?: { id: string; categoryName: string; page: number };
}

export interface StreamingContentRowProps {
  provider_name: string;
  provider_id: number;
  logo: string | undefined;
  type?: string;
  category?: { id: string; categoryName: string; page: number };
  index: number;
}

export interface ContentSeasonsProps {
  contentType: string | undefined
  seasons: SeasonsContent[]
}

type SeasonsContent = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};