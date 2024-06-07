import React from "react";
import { FadeInContent } from "@/components/FadeInContent";
import { AccountInfo } from "@/components/AccountInfo";
import { ProfileContentSection } from "@/components/ProfileContentSection";

export default function Profile() {
  return (
    <FadeInContent duration={1.5}>
      <AccountInfo />
      <ProfileContentSection toggle="watchlist">
        Lista de interesses
      </ProfileContentSection>
      <ProfileContentSection toggle="favorite">Favoritos</ProfileContentSection>
    </FadeInContent>
  );
}
