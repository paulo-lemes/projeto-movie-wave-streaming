import React from "react";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { ContentDetails } from "@/components/ContentDetails";
import { ContentVideo } from "@/components/ContentVideo";
import { Loading } from "@/components/Loading";
import { ContentRow } from "@/components/ContentRow";
import { WatchProvider } from "@/components/WatchProvider";
import { CreditsContent } from "@/components/CreditsContent";

export default async function Content({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;
  const credits = type === "tv" ? "aggregate_credits" : "credits";

  const contentDetailsData = getApiContent(
    `${type}/${id}?language=pt-BR`
  );
  const contentClassificationData = getApiContent(
    `${type}/${id}/${type === "movie" ? "release_dates" : "content_ratings"}`
  );
  const contentImagesData = getApiContent(
    `${type}/${id}/images?language=null`
  );
  const contentCreditsData = getApiContent(
    `${type}/${id}/${credits}?language=pt-BR`
  );
  const contentVideosData = getApiContent(
    `${type}/${id}/videos?language=pt-BR`
  );
  const contentProvidersData = getApiContent(
    `${type}/${id}/watch/providers`
  );
  const recommendedContentData = getApiContent(
    `${type}/${id}/recommendations?language=pt-BR&page=1`
  );

  const [
    contentDetails,
    contentClassification,
    contentImages,
    contentCredits,
    contentVideos,
    contentProviders,
    recommendedContent,
  ] = await Promise.all([
    contentDetailsData,
    contentClassificationData,
    contentImagesData,
    contentCreditsData,
    contentVideosData,
    contentProvidersData,
    recommendedContentData,
  ]);

  if (process.env.NODE_ENV === "development") {
    console.log(contentDetails);
    console.log(contentClassification);
    console.log(contentImages);
    console.log(contentCredits);
    console.log(contentVideos);
    console.log(contentProviders);
    console.log(recommendedContent);
  }

  return contentDetails.id ? (
    <FadeInContent duration={1.5}>
      <ContentDetails
        {...contentDetails}
        classification={contentClassification}
        images={contentImages}
        contentType={type}
      />
      <CreditsContent
        {...contentCredits}
        created_by={contentDetails.created_by}
        contentType={type}
      />
      <WatchProvider {...contentProviders.results.BR} />
      <ContentVideo {...contentVideos} />
      <ContentRow {...recommendedContent}>Recomendados</ContentRow>
    </FadeInContent>
  ) : (
    <Loading />
  );
}
