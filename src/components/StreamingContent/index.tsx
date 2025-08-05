import React from "react";
import watchProviders from "../../watch_providers.json";
import { getApiContent } from "@/api";
import { ContentRow } from "../ContentRow";
import { StreamingRowTitle } from "../StreamingRowTitle";
import { SpotlightContent } from "../SpotlightContent";
import { StreamingContentProps, StreamingContentRowProps } from "@/types";

const popularStreamings = watchProviders
  .filter(({ logo }) => logo)
  .sort((a, b) => a.order - b.order);

export function StreamingContent({ type, category }: StreamingContentProps) {
  return popularStreamings.map(
    ({ provider_name, provider_id, logo }, index) => (
      <StreamingContentRow
        key={provider_id}
        provider_name={provider_name}
        provider_id={provider_id}
        logo={logo}
        type={type}
        category={category}
        index={index}
      />
    )
  );
}

async function StreamingContentRow({
  provider_name,
  provider_id,
  logo,
  type,
  category,
  index,
}: StreamingContentRowProps) {
  const moviesData = await getApiContent(
    `discover/movie?language=pt-BR&sort_by=popularity.desc
&watch_region=BR&with_watch_providers=${provider_id}${
      category ? `&with_genres=${category.id}&page=${category.page || 1}` : ""
    }`
  );
  const seriesData = await getApiContent(
    `discover/tv?language=pt-BR&sort_by=popularity.desc
&watch_region=BR&with_watch_providers=${provider_id}${
      category ? `&with_genres=${category.id}&page=${category.page || 1}` : ""
    }`
  );

  return (
    <>
      {(!type || type === "movie") && (
        <ContentRow {...moviesData} contentType="movie">
          <StreamingRowTitle name={provider_name} logo={logo}>
            Filmes {category ? `de ${category.categoryName}` : "populares"}
          </StreamingRowTitle>
        </ContentRow>
      )}
      {(!type || type === "tv") && (
        <ContentRow {...seriesData} contentType="tv">
          <StreamingRowTitle name={provider_name} logo={logo}>
            Séries {category ? `de ${category.categoryName}` : "populares"}
          </StreamingRowTitle>
        </ContentRow>
      )}
      {!type ? (
        moviesData.results?.length ? (
          <SpotlightContent {...moviesData} contentType="movie" />
        ) : (
          <SpotlightContent {...seriesData} contentType="tv" />
        )
      ) : type === "movie" ? (
        index % 2 !== 0 && (
          <SpotlightContent {...moviesData} contentType="movie" />
        )
      ) : (
        index % 2 !== 0 && <SpotlightContent {...seriesData} contentType="tv" />
      )}
    </>
  );
}
