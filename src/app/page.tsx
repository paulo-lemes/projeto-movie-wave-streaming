import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { HighlightHome } from "@/components/HighlightHome";
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

  const highlightMovie =
    featuredMovies.results[
      Math.floor(Math.random() * featuredMovies.results.length)
    ];

  console.log(trending.results);
  console.log(topRatedMovies.results);
  console.log(featuredMovies.results);
  console.log(highlightMovie);

  return (
    <main className="mb-auto pb-20">
      <Suspense fallback={<div>Loading...</div>}>
        <HighlightHome {...highlightMovie} />
        <ContentRow {...trending}>Em alta</ContentRow>
        <ContentRow {...topRatedMovies}>Filmes mais bem avaliados</ContentRow>
        <ContentRow {...featuredMovies}>Filmes em destaque</ContentRow>
      </Suspense>
    </main>
  );
}
