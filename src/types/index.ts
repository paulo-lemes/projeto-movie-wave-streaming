import { ReactNode } from "react";

export type contentProps = {
  index: number;
  images: { backdrops: imageContent[] };
  bigCard?: boolean;
  contentType?: string;
};

export type content = defaultProps &
  movie &
  tv &
  contentProps &
  classificationContentProps;

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
  bigCard?: boolean;
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
  title?: string;
  priority?: boolean;
  unoptimized?: boolean;
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
  contentType: string;
  created_by: createdBy[];
};

export type cardPersonProps = {
  name: string;
  profile_path: string;
  character: string;
  roles: roles[];
  index: number;
  type: string;
};

export type createdBy = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
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
  type: string;
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

export interface classificationContentProps {
  classification: classificationMovie | classificationTV;
}

export type certifcation = {
  certification: string;
  meaning: string;
  order: number;
};

export type classificationTV = {
  results: {
    descriptors: [];
    iso_3166_1: string;
    rating: string;
  }[];
  id: number;
};

export type classificationMovie = {
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

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export type LoginData = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  request_token: string | undefined;
};

export interface RequestSessionResponse {
  success: boolean;
  session_id: string;
}

export interface AuthContextType {
  user: UserInfo | null;
  login: (session_id: string | undefined) => Promise<boolean> | undefined;
  logout: () => Promise<boolean> | undefined;
}

export interface ModalContextType {
  isModalOpen: boolean;
  openModal: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
  modalText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string) => void;
}

export type UserInfo = {
  avatar: {
    gravatar: {
      hash: string | null;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};