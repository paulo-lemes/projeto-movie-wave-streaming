import { getApiContent } from "@/api";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { TopContent } from "@/components/TopContent";
import { ContentRow } from "@/components/ContentRow";

export default async function Series() {
  const popularSeriesData = getApiContent(
    "tv/popular?language=pt-BR&page=1"
  );
  const topSeriesData = getApiContent(
    "trending/tv/day?language=pt-BR"
  );
  const topRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=1"
  );
  const onTheAirSeriesData = getApiContent(
    "tv/on_the_air?language=pt-BR&page=1"
  );
  const featuredSeriesData = getApiContent(
    "tv/airing_today?language=pt-BR&page=1"
  );
  const moreTopRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=2"
  );

  const [
    popularSeries,
    topSeries,
    topRatedSeries,
    onTheAirSeries,
    featuredSeries,
    moreTopRatedSeries
  ] = await Promise.all([
    popularSeriesData,
    topSeriesData,
    topRatedSeriesData,
    onTheAirSeriesData,
    featuredSeriesData,
    moreTopRatedSeriesData
  ]);

  console.log(popularSeries.results);
  console.log(topSeries.results);
  console.log(topRatedSeries.results);
  console.log(onTheAirSeries.results);
  console.log(featuredSeries.results);
  console.log(moreTopRatedSeries.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...popularSeries} contentType="tv" />
        <TopContent {...topSeries} contentType="tv" />
        <ContentRow {...topRatedSeries} contentType="tv">
          Séries mais bem avaliadas
        </ContentRow>
        <ContentRow {...onTheAirSeries} contentType="tv">
          Séries no ar
        </ContentRow>
        <ContentRow {...featuredSeries} contentType="tv">
          Séries em destaque
        </ContentRow>
        <ContentRow {...moreTopRatedSeries} contentType="tv">
          Mais séries aclamadas
        </ContentRow>
        <ContentRow {...popularSeries} contentType="tv">
          Séries populares
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
