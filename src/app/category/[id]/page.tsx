import React from "react";
import tmdbGenres from "../../../tmdb_genres.json";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { ContentRow } from "@/components/ContentRow";
import { CategoryContent } from "@/components/CategoryContent";
import { StyledTitle } from "@/components/StyledTitle";
import { SpotlightContent } from "@/components/SpotlightContent";

export default async function Category({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = tmdbGenres.genres.filter(
    (genre) => genre.id.toString() === id
  );
  const categoryName = category[0].name.toLowerCase();

  const seriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&with_genres=${id}`
  );
  const moviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&with_genres=${id}`
  );
  const searchSeriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&page=2&with_genres=${id}`
  );
  const searchMoviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&page=2&with_genres=${id}`
  );

  const [
    seriesCategory,
    moviesCategory,
    searchSeriesCategory,
    searchMoviesCategory,
  ] = await Promise.all([
    seriesCategoryData,
    moviesCategoryData,
    searchSeriesCategoryData,
    searchMoviesCategoryData,
  ]);

  let highlightContent = [];
  let highlightContentType = "";

  if (moviesCategory.total_results) {
    highlightContent = moviesCategory;
    highlightContentType = "movie";
  } else {
    highlightContent = seriesCategory;
    highlightContentType = "tv";
  }

  console.log(moviesCategory);
  console.log(seriesCategory);
  console.log(searchMoviesCategory);
  console.log(searchSeriesCategory);

  return (
    <FadeInContent duration={1.5}>
      <PageHighlight {...highlightContent} contentType={highlightContentType} />
      <ContentRow {...seriesCategory} contentType="tv">
        Séries populares de {categoryName}
      </ContentRow>
      <ContentRow {...moviesCategory} contentType="movie">
        Filmes populares de {categoryName}
      </ContentRow>
      <div className="my-8 px-2 flex flex-col gap-2">
        <h3 className="font-bold text-3xl sm:text-4xl text-center">
          Explore a categoria{" "}
        </h3>
        <h2 className="font-bold text-6xl sm:text-8xl text-center text-secondary">
          <StyledTitle title={categoryName.toUpperCase()} />
        </h2>
      </div>
      <CategoryContent {...searchSeriesCategory} contentType="tv" />
      <CategoryContent {...searchMoviesCategory} contentType="movie" />
      <SpotlightContent {...highlightContent} contentType={highlightContentType}  />
    </FadeInContent>
  );
}
