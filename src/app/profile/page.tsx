import React from "react";
import { FadeInContent } from "@/components/FadeInContent";
import { AccountInfo } from "@/components/AccountInfo";
import { ProfileContentSection } from "@/components/ProfileContentSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Profile() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth");
  const user = cookieStore.get("userInfo");

  if (!auth || !user) {
    redirect("/login");
  }

  const userInfo = JSON.parse(user.value);

  return (
    <FadeInContent duration={1.5}>
      <AccountInfo user={userInfo} />
      <ProfileContentSection toggle="recommended">
        Recomendações
      </ProfileContentSection>
      <ProfileContentSection toggle="watchlist">
        Lista de interesses
      </ProfileContentSection>
      <ProfileContentSection toggle="favorite">Favoritos</ProfileContentSection>
      <ProfileContentSection toggle="rated">Avaliações</ProfileContentSection>
    </FadeInContent>
  );
}
