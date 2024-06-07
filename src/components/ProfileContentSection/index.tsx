import React, { ReactNode } from "react";
import { ContentAccount } from "../ContentAccount";
import { BsBookmarkCheckFill, BsBookmarkHeartFill } from "react-icons/bs";

export function ProfileContentSection({
  children,
  toggle,
}: {
  children: ReactNode;
  toggle: string;
}) {
  return (
    <section className="-mt-4 pt-16 sm:pt-20" id={toggle}>
      <div className="px-3 sm:px-10 flex items-center gap-1">
        <h3 className="font-bold text-2xl sm:text-3xl">{children}</h3>
        {toggle === "watchlist" ? (
          <BsBookmarkCheckFill size={23} />
        ) : (
          <BsBookmarkHeartFill size={23} />
        )}
      </div>
      <ContentAccount toggle={toggle} contentType="movie">
        <span className="text-secondary">Filmes</span>
      </ContentAccount>
      <ContentAccount toggle={toggle} contentType="tv">
        <span className="text-secondary">Séries</span>
      </ContentAccount>
    </section>
  );
}
