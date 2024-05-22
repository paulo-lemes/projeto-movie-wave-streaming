import { getApiContent } from "@/api";
import { ContentRow } from "@/components/ContentRow";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

export default async function Series() {
  const popularSeriesData = getApiContent(
    "tv/popular?language=pt-BR&page=1"
  );
  const onTheAirSeriesData = getApiContent(
    "tv/on_the_air?language=pt-BR&page=1"
  );
  const featuredSeriesData = getApiContent(
    "tv/airing_today?language=pt-BR&page=1"
  );
  const topRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=1"
  );

  const [popularSeries, onTheAirSeries, featuredSeries, topRatedSeries] =
    await Promise.all([
      popularSeriesData,
      onTheAirSeriesData,
      featuredSeriesData,
      topRatedSeriesData,
    ]);

  console.log(popularSeries.results);
  console.log(onTheAirSeries.results);
  console.log(featuredSeries.results);
  console.log(topRatedSeries.results);

  return (
    <Suspense fallback={<Loading />}>
      <FadeInContent duration={1.5}>
        <PageHighlight {...popularSeries} contentType="tv" />
        <ContentRow {...onTheAirSeries} contentType="tv">
          Séries no ar
        </ContentRow>
        <ContentRow {...topRatedSeries} contentType="tv">
          Séries mais bem avaliadas
        </ContentRow>
        <ContentRow {...featuredSeries} contentType="tv">
          Séries em destaque
        </ContentRow>
        <ContentRow {...popularSeries} contentType="tv">
          Séries populares
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
