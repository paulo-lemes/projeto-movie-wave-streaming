import React from "react";
import { content } from "@/types";
import { getApiContent } from "@/api";
import { FadeInContent } from "@/components/FadeInContent";
import { Loading } from "@/components/Loading";
import { ContentRow } from "@/components/ContentRow";
import { PersonDetails } from "@/components/PersonDetails";
import { PersonImages } from "@/components/PersonImages";

export default async function Content({ params }: { params: { id: string } }) {
  const { id } = params;

  const personDetailsData = getApiContent(`person/${id}?language=pt-BR`);
  const personImagesData = getApiContent(`person/${id}/images?language=pt-BR`);
  const personCreditsData = getApiContent(
    `person/${id}/combined_credits?language=pt-BR`
  );

  const [personDetails, personImages, personCredits] = await Promise.all([
    personDetailsData,
    personImagesData,
    personCreditsData,
  ]);

  console.log(personDetails);
  console.log(personImages);
  console.log(personCredits);

  const sortedCastContent = personCredits.cast
    .sort(
      (a: content, b: content) =>
        b.order - a.order &&
        b.vote_average - a.vote_average &&
        b.vote_count - a.vote_count
    )
    .slice(0, 30);
  console.log(sortedCastContent);

  const filteredCrewContent = personCredits.crew
    .filter(
      (value: content, index: number, self: content[]) =>
        index === self.findIndex((t) => t.id === value.id)
    )
    .slice(0, 30);
  console.log(filteredCrewContent);

  return personDetails.id ? (
    <FadeInContent duration={1.5}>
      <PersonDetails {...personDetails} />
      <PersonImages {...personImages} name={personDetails.name} />
      <ContentRow bigCard results={sortedCastContent}>
        Atuações
      </ContentRow>
      <ContentRow bigCard results={filteredCrewContent}>
        Produções
      </ContentRow>
    </FadeInContent>
  ) : (
    <Loading />
  );
}
