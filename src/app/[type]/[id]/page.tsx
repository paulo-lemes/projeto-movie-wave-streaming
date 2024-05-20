import { getApiContent } from "@/api";
import { ContentDetails } from "@/components/ContentDetails";
import { Loading } from "@/components/Loading";
import React from "react";

export default async function Content({ params }: { params: { type: string; id: string } }) {
  const { type, id } = params;

  const contentDetailsData = await getApiContent(`${type}/${id}`);

  console.log(contentDetailsData);

  return contentDetailsData.id ? <ContentDetails {...contentDetailsData} /> : <Loading />;
}
