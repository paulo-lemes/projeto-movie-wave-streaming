import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default async function Home() {
  const trendingData = getApiContent("trending/all/day?language=pt-br");
  const featuredMoviesData = getApiContent("movie/now_playing?language=pt-BR&page=1");
  const topRatedMoviesData = getApiContent("movie/top_rated?language=pt-BR&page=1");

  const [trending, featuredMovies, topRatedMovies] = await Promise.all([
    trendingData,
    featuredMoviesData,
    topRatedMoviesData,
  ]);

  console.log(trending.results);
  console.log(topRatedMovies.results);
  console.log(featuredMovies.results);

  return (
    <div className="mb-auto pb-20">
      <Suspense fallback={<Loading />}>
        <FadeInContent duration={1.5}>
          <PageHighlight {...featuredMovies} contentType="movie" />
          <ContentRow {...trending} contentType="">
            Em alta
          </ContentRow>
          <ContentRow {...topRatedMovies} contentType="movie">
            Filmes mais bem avaliados
          </ContentRow>
          <ContentRow {...featuredMovies} contentType="movie">
            Filmes em destaque
          </ContentRow>
        </FadeInContent>
      </Suspense>
    </div>
  );
}
