import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { TopContent } from "@/components/TopContent";
import { SpotlightContent } from "@/components/SpotlightContent";

export default async function Home() {
  const featuredMoviesData = getApiContent(
    "movie/now_playing?language=pt-BR&page=1"
  );
  const trendingData = getApiContent(
    "trending/all/week?language=pt-br"
  );
  const topMoviesData = getApiContent(
    "trending/movie/day?language=pt-BR"
  );
  const topRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=1"
  );
  const dramaMoviesData = getApiContent(
    "discover/movie?language=pt-BR&with_genres=18"
  );
  const topRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=1"
  );
  const topSeriesData = getApiContent(
    "trending/tv/day?language=pt-BR"
  );
  const featuredSeriesData = getApiContent(
    "tv/airing_today?language=pt-BR&page=1"
  );
  const moreTopRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=2"
  );

  const [
    featuredMovies,
    trending,
    topMovies,
    topRatedMovies,
    dramaMovies,
    topRatedSeries,
    topSeries,
    featuredSeries,
    moreTopRatedMovies,
  ] = await Promise.all([
    featuredMoviesData,
    trendingData,
    topMoviesData,
    topRatedMoviesData,
    dramaMoviesData,
    topRatedSeriesData,
    topSeriesData,
    featuredSeriesData,
    moreTopRatedMoviesData,
  ]);

  console.log(featuredMovies.results);
  console.log(trending.results);
  console.log(topMovies.results);
  console.log(topRatedMovies.results);
  console.log(dramaMovies.results);
  console.log(topRatedSeries.results);
  console.log(topSeries.results);
  console.log(featuredSeries.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...featuredMovies} contentType="movie" />
        <ContentRow {...trending}>Em alta na semana</ContentRow>
        <TopContent {...topMovies} contentType="movie" />
        <ContentRow {...topRatedMovies} contentType="movie">
          Filmes mais bem avaliados
        </ContentRow>
        <ContentRow {...dramaMovies} contentType="movie" bigCard>
          Filmes de drama
        </ContentRow>
        <ContentRow {...topRatedSeries} contentType="tv">
          Séries mais bem avaliadas
        </ContentRow>
        <TopContent {...topSeries} contentType="tv" />
        <ContentRow {...featuredMovies} contentType="movie">
          Filmes em destaque
        </ContentRow>
        <SpotlightContent {...moreTopRatedMovies} contentType="movie" />
        <ContentRow {...featuredSeries} contentType="tv">
          Séries em destaque
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
