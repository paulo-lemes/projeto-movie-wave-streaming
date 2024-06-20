import React from "react";
import tmdbGenres from "../../../tmdb_genres.json";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { ContentRow } from "@/components/ContentRow";
import { CategoryContent } from "@/components/CategoryContent";
import { StyledTitle } from "@/components/StyledTitle";
import { PageButton } from "@/components/PageButton";
import { StreamingContent } from "@/components/StreamingContent";

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string | undefined };
}) {
  const { id } = params;
  const page = Number(searchParams.page);
  const category = tmdbGenres.genres.filter(
    (genre) => genre.id.toString() === id
  );
  const categoryName = category[0].name.toLowerCase();

  const seriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&page=${page ? page + 2 : 1}&with_genres=${id}`
  );
  const moviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&page=${page ? page + 2 : 1}&with_genres=${id}`
  );
  const searchSeriesCategoryData = getApiContent(
    `discover/tv?language=pt-BR&page=${page ? page + 2 : 2}&with_genres=${id}`
  );
  const searchMoviesCategoryData = getApiContent(
    `discover/movie?language=pt-BR&page=${page ? page + 2 : 2}&with_genres=${id}`
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

  let highlightContent;
  let highlightContentType = "";
  let maxTotalPages = 1;

  if (moviesCategory.total_results) {
    highlightContent = moviesCategory;
    highlightContentType = "movie";
    if (seriesCategory.total_results) {
      maxTotalPages =
        moviesCategory.total_results > seriesCategory.total_results
          ? seriesCategory.total_pages - 2
          : moviesCategory.total_pages - 2;
    } else maxTotalPages = moviesCategory.total_pages - 2;
  } else {
    highlightContent = seriesCategory;
    highlightContentType = "tv";
    maxTotalPages = seriesCategory.total_pages - 2;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(moviesCategory);
    console.log(seriesCategory);
    console.log(searchMoviesCategory);
    console.log(searchSeriesCategory);
    console.log(maxTotalPages);
  }

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
      <PageButton
        page={page || 1}
        total_pages={maxTotalPages > 498 ? 498 : maxTotalPages}
      />
      <StreamingContent category={{id, categoryName, page}} />
    </FadeInContent>
  );
}
