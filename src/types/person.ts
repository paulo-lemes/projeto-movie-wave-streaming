export type Person = {
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
  roles: Role[];
  order: number;
  department: string;
  job: string;
  jobs: Job[];
  index: number;
  type: string;
};

type Job = {
  credit_id: string;
  job: string;
  episode_count: number;
};

type Role = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
};

export type CardPersonProps = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  roles: Role[];
  index: number;
  type: string;
};

export interface PersonDetailsProps {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PersonImagesProps {
  id: number;
  profiles: {
    aspect_ratio: number;
    height: number;
    iso_639_1: null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  name: string;
}
