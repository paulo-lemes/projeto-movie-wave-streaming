import React from "react";
import tmdbGenres from "../../../tmdb_genres.json";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { ContentRow } from "@/components/ContentRow";
import { CategoryContent } from "@/components/CategoryContent";

export default async function Category({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = tmdbGenres.genres.filter(
    (genre) => genre.id.toString() === id
  );
  const categoryName = category[0].name.toLowerCase();

  const moviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&with_genres=${id}`
  );
  const seriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&with_genres=${id}`
  );
  const searchMoviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&page=2&with_genres=${id}`
  );
  const searchSeriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&page=2&with_genres=${id}`
  );

  const [
    moviesCategory,
    seriesCategory,
    searchMoviesCategory,
    searchSeriesCategory,
  ] = await Promise.all([
    moviesCategoryData,
    seriesCategoryData,
    searchMoviesCategoryData,
    searchSeriesCategoryData,
  ]);

  let highlightContent;
  let highlightContentType;

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
      <h2 className="font-bold text-2xl sm:text-3xl text-center my-8 px-2">
        Explore a categoria{" "}
        <span className="text-secondary">{categoryName}</span>
      </h2>
      <CategoryContent {...searchSeriesCategory} contentType="tv" />
      <CategoryContent {...searchMoviesCategory} contentType="movie" />
    </FadeInContent>
  );
}
