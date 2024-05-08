const baseURL = "https://api.themoviedb.org/3/";

const apiToken = process.env.API_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiToken}`,
};

type contentProps = {
  adult: boolean;
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

export async function getMoviesOrSeries(path: string): Promise<contentProps[] | void> {
  const response = await fetch(baseURL + path, {
    method: "GET",
    headers,
  })

  return response.json()
}
