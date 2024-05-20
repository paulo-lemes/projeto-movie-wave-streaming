import { getApiContent } from "@/api";
import { ContentDetails } from "@/components/ContentDetails";
import { ContentVideo } from "@/components/ContentVideo";
import { Loading } from "@/components/Loading";
import React from "react";

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

  const [contentDetails, contentVideos] = await Promise.all([
    contentDetailsData,
    contentVideosData,
  ]);

  console.log(contentDetails);
  console.log(contentVideos);

  return contentDetails.id ? (
    <>
      <ContentDetails {...contentDetails} />
      <ContentVideo {...contentVideos} />
    </>
  ) : (
    <Loading />
  );
}
