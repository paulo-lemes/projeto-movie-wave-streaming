import React from "react";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { ContentDetails } from "@/components/ContentDetails";
import { ContentVideo } from "@/components/ContentVideo";
import { Loading } from "@/components/Loading";
import { ContentRow } from "@/components/ContentRow";

export default async function Content({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;

  const contentDetailsData = getApiContent(`${type}/${id}?language=pt-BR`);
  const contentVideosData = getApiContent(
    `${type}/${id}/videos?language=pt-BR`
  );
  const recommendedContentData = getApiContent(
    `${type}/${id}/recommendations?language=pt-BR&page=1`
  );

  const [contentDetails, contentVideos, recommendedContent] = await Promise.all(
    [contentDetailsData, contentVideosData, recommendedContentData]
  );

  console.log(contentDetails);
  console.log(contentVideos);
  console.log(recommendedContent);

  return contentDetails.id ? (
    <FadeInContent duration={1.5}>
      <ContentDetails {...contentDetails} />
      <ContentVideo {...contentVideos} />
      <ContentRow {...recommendedContent} contentType="">
        Recomendados
      </ContentRow>
    </FadeInContent>
  ) : (
    <Loading />
  );
}
