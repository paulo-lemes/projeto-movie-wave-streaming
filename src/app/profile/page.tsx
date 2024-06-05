import React from "react";
import { FadeInContent } from "@/components/FadeInContent";
import { ContentAccount } from "@/components/ContentAccount";
import { AccountInfo } from "@/components/AccountInfo";

export default function Profile() {
  return (
    <FadeInContent duration={1.5}>
      <AccountInfo />
      {/* <ContentAccount toggle="favorite" contentType="movie">
        Filmes favoritos
      </ContentAccount> */}
      <ContentAccount toggle="favorite" contentType="tv">
        Séries favoritas
      </ContentAccount>
      {/* <ContentAccount toggle="watchlist" contentType="movie">
        Filmes na lista de interesse
      </ContentAccount>
      <ContentAccount toggle="watchlist" contentType="tv">
        Séries na lista de interesse
      </ContentAccount> */}
    </FadeInContent>
  );
}
