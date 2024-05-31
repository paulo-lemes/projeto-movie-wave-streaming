import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { TopContent } from "@/components/TopContent";
import { SpotlightContent } from "@/components/SpotlightContent";

export default async function Movies() {
  const popularMoviesData = getApiContent(
    "movie/popular?language=pt-BR&page=1"
  );
  const topMoviesData = getApiContent(
    "trending/movie/day?language=pt-BR"
  );
  const topRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=1"
  );
  const upcomingMoviesData = getApiContent(
    "movie/upcoming?language=pt-BR&page=1"
  );
  const documentaryMoviesData = getApiContent(
    "discover/movie?language=pt-BR&page=1&sort_by=vote_count.desc&with_genres=99"
  );
  const featuredMoviesData = getApiContent(
    "movie/now_playing?language=pt-BR&page=1"
  );
  const moreTopRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=2"
  );
  const otherTopRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=3"
  );

  const [
    popularMovies,
    topMovies,
    topRatedMovies,
    upcomingMovies,
    documentaryMovies,
    moreTopRatedMovies,
    otherTopRatedMovies,
    featuredMovies,
  ] = await Promise.all([
    popularMoviesData,
    topMoviesData,
    topRatedMoviesData,
    upcomingMoviesData,
    documentaryMoviesData,
    moreTopRatedMoviesData,
    otherTopRatedMoviesData,
    featuredMoviesData,
  ]);

  console.log(popularMovies.results);
  console.log(topMovies.results);
  console.log(topRatedMovies.results);
  console.log(upcomingMovies.results);
  console.log(moreTopRatedMovies.results);
  console.log(otherTopRatedMovies.results);
  console.log(featuredMovies.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...popularMovies} contentType="movie" />
        <TopContent {...topMovies} contentType="movie" />
        <ContentRow {...topRatedMovies} contentType="movie">
          Filmes mais bem avaliados
        </ContentRow>
        <ContentRow {...upcomingMovies} contentType="movie">
          Em breve
        </ContentRow>
        <ContentRow {...documentaryMovies} contentType="movie" bigCard>
          Documentários populares
        </ContentRow>
        <ContentRow {...featuredMovies} contentType="movie">
          Filmes em destaque
        </ContentRow>
        <ContentRow {...moreTopRatedMovies} contentType="movie">
          Mais filmes aclamados
        </ContentRow>
        <SpotlightContent {...otherTopRatedMovies} contentType="movie" />
        <ContentRow {...popularMovies} contentType="movie">
          Filmes populares
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
