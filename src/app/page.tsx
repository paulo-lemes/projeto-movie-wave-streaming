import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { Suspense } from "react";

export default async function Home() {
  const featuredMoviesData = getApiContent("movie/now_playing?language=pt-BR&page=1")
  const topRatedMoviesData = getApiContent("movie/top_rated?language=pt-BR&page=1")

  const [featuredMovies, topRatedMovies] = await Promise.all([featuredMoviesData, topRatedMoviesData])

  console.log(featuredMovies.results);
  console.log(topRatedMovies.results);

  return (
    <main className="mb-auto pb-20">
      <Suspense fallback={<div>Loading...</div>}>
        <ContentRow {...featuredMovies}>Em destaque</ContentRow>
        <ContentRow {...topRatedMovies}>Melhores avaliados</ContentRow>
      </Suspense>
    </main>
  );
}
