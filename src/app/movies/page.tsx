import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default async function Movies() {
  const popularMoviesData = getApiContent(
    "movie/popular?language=pt-BR&page=1"
  );
  const upcomingMoviesData = getApiContent(
    "movie/upcoming?language=pt-BR&page=1"
  );
  const featuredMoviesData = getApiContent(
    "movie/now_playing?language=pt-BR&page=1"
  );
  const topRatedMoviesData = getApiContent(
    "movie/top_rated?language=pt-BR&page=1"
  );

  const [popularMovies, upcomingMovies, featuredMovies, topRatedMovies] =
    await Promise.all([
      popularMoviesData,
      upcomingMoviesData,
      featuredMoviesData,
      topRatedMoviesData,
    ]);

  console.log(popularMovies.results);
  console.log(upcomingMovies.results);
  console.log(featuredMovies.results);
  console.log(topRatedMovies.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...popularMovies} contentType="movie" />
        <ContentRow {...upcomingMovies} contentType="movie">
          Em breve
        </ContentRow>
        <ContentRow {...featuredMovies} contentType="movie">
          Filmes em destaque
        </ContentRow>
        <ContentRow {...topRatedMovies} contentType="movie">
          Filmes mais bem avaliados
        </ContentRow>
        <ContentRow {...popularMovies} contentType="movie">
          Filmes populares
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
