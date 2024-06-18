import React from "react";
import watchProviders from "../../watch_providers.json";
import { getApiContent } from "@/api";
import { ContentRow } from "../ContentRow";
import { StreamingRowTitle } from "../StreamingRowTitle";
import { SpotlightContent } from "../SpotlightContent";
import { StreamingContentRowProps } from "@/types";

const popularStreamings = watchProviders
  .filter(({ logo }) => logo)
  .sort((a, b) => a.order - b.order);

export function StreamingContent({ type }: { type?: string }) {
  return popularStreamings.map(({ provider_name, provider_id, logo }) => (
    <StreamingContentRow
      key={provider_id}
      provider_name={provider_name}
      provider_id={provider_id}
      logo={logo}
      type={type}
    />
  ));
}

async function StreamingContentRow({
  provider_name,
  provider_id,
  logo,
  type,
  category,
}: StreamingContentRowProps) {
  const moviesData = await getApiContent(
    `discover/movie?language=pt-BR&sort_by=popularity.desc
&watch_region=BR&with_watch_providers=${provider_id}${
      category ? `&with_genres=${category}` : ""
    }`
  );
  const seriesData = await getApiContent(
    `discover/tv?language=pt-BR&sort_by=popularity.desc
&watch_region=BR&with_watch_providers=${provider_id}${
      category ? `&with_genres=${category}` : ""
    }`
  );

  return (
    <>
      {(!type || type === "movie") && (
        <ContentRow {...moviesData} contentType="movie">
          <StreamingRowTitle name={provider_name} logo={logo}>
            Filmes populares
          </StreamingRowTitle>
        </ContentRow>
      )}
      {(!type || type === "tv") && (
        <ContentRow {...seriesData} contentType="tv">
          <StreamingRowTitle name={provider_name} logo={logo}>
            Séries populares
          </StreamingRowTitle>
        </ContentRow>
      )}
      {!type || type === "movie" ? (
        <SpotlightContent {...moviesData} contentType="movie" />
      ) : (
        <SpotlightContent {...seriesData} contentType="tv" />
      )}
    </>
  );
}
