import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { TopContent } from "@/components/TopContent";

export default async function Home() {
  const trendingData = getApiContent("trending/all/day?language=pt-br");
  const featuredMoviesData = getApiContent(
    "movie/now_playing?language=pt-BR&page=1"
  );
  const topRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=1"
  );
  const topRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=1"
  );
  const featuredSeriesData = getApiContent(
    "tv/airing_today?language=pt-BR&page=1"
  );

  const topMoviesData = getApiContent(`trending/movie/week?language=pt-BR`);
  const topSeriesData = getApiContent(`trending/tv/week?language=pt-BR`);

  const [
    trending,
    topRatedMovies,
    topRatedSeries,
    featuredMovies,
    featuredSeries,
    topMovies,
    topSeries,
  ] = await Promise.all([
    trendingData,
    topRatedMoviesData,
    topRatedSeriesData,
    featuredMoviesData,
    featuredSeriesData,
    topMoviesData,
    topSeriesData,
  ]);

  console.log(trending.results);
  console.log(topRatedMovies.results);
  console.log(topRatedSeries.results);
  console.log(featuredMovies.results);
  console.log(featuredSeries.results);
  console.log(topMovies.results);
  console.log(topSeries.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...featuredMovies} contentType="movie" />
        <TopContent {...topMovies} contentType="movie" />
        <TopContent {...topSeries} contentType="tv" />
        <ContentRow {...trending} contentType="">
          Em alta
        </ContentRow>
        <ContentRow {...topRatedMovies} contentType="movie">
          Filmes mais bem avaliados
        </ContentRow>
        <ContentRow {...topRatedSeries} contentType="tv">
          Séries mais bem avaliadas
        </ContentRow>
        <ContentRow {...featuredMovies} contentType="movie">
          Filmes em destaque
        </ContentRow>
        <ContentRow {...featuredSeries} contentType="tv">
          Séries em destaque
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
