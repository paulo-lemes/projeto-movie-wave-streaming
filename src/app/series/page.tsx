import { getApiContent } from "@/api";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { FadeInContent } from "@/components/FadeInContent";
import { PageHighlight } from "@/components/PageHighlight";
import { TopContent } from "@/components/TopContent";
import { ContentRow } from "@/components/ContentRow";
import { SpotlightContent } from "@/components/SpotlightContent";

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
  const otherTopRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=3"
  );
  const featuredSeriesData = getApiContent(
    "tv/airing_today?language=pt-BR&page=1"
  );
  const moreTopRatedSeriesData = getApiContent(
    "tv/top_rated?language=pt-BR&page=2"
  );
  const fantasySeriesData = getApiContent(
    "discover/tv?language=pt-BR&page=1&sort_by=vote_count.desc&with_genres=10765"
  );

  const [
    popularSeries,
    topSeries,
    topRatedSeries,
    onTheAirSeries,
    otherTopRatedSeries,
    featuredSeries,
    moreTopRatedSeries,
    fantasySeries,
  ] = await Promise.all([
    popularSeriesData,
    topSeriesData,
    topRatedSeriesData,
    onTheAirSeriesData,
    otherTopRatedSeriesData,
    featuredSeriesData,
    moreTopRatedSeriesData,
    fantasySeriesData,
  ]);

  if (process.env.NODE_ENV === "development") {
    console.log(popularSeries.results);
    console.log(topSeries.results);
    console.log(topRatedSeries.results);
    console.log(onTheAirSeries.results);
    console.log(otherTopRatedSeries.results);
    console.log(featuredSeries.results);
    console.log(moreTopRatedSeries.results);
    console.log(fantasySeries.results);
  }

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
        <SpotlightContent {...otherTopRatedSeries} contentType="tv" />
        <ContentRow {...featuredSeries} contentType="tv">
          Séries em destaque
        </ContentRow>
        <ContentRow {...moreTopRatedSeries} contentType="tv">
          Mais séries aclamadas
        </ContentRow>
        <ContentRow {...fantasySeries} contentType="tv" bigCard>
          Sci-Fi & Fantasy
        </ContentRow>
        <ContentRow {...popularSeries} contentType="tv">
          Séries populares
        </ContentRow>
      </FadeInContent>
    </Suspense>
  );
}
