import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { Suspense } from "react";

export default async function Home() {
  const trendingData = getApiContent("trending/all/day?language=pt-br");
  const featuredMoviesData = getApiContent(
    "movie/now_playing?language=pt-BR&page=1"
  );
  const topRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=1"
  );

  const [trending, featuredMovies, topRatedMovies] = await Promise.all([
    trendingData,
    featuredMoviesData,
    topRatedMoviesData,
  ]);

  console.log(trending.results);
  console.log(featuredMovies.results);
  console.log(topRatedMovies.results);

  return (
    <main className="mb-auto pb-20">
      <Suspense fallback={<div>Loading...</div>}>
        <ContentRow {...trending}>Em alta</ContentRow>
        <ContentRow {...featuredMovies}>Filmes em destaque</ContentRow>
        <ContentRow {...topRatedMovies}>Filmes mais bem avaliados</ContentRow>
      </Suspense>
    </main>
  );
}
