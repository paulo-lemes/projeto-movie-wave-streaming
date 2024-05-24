import React from "react";
import { credits } from "@/types";

export function CreditsContent({ cast, crew }: credits) {
  const actors = cast.slice(0, 10);
  const directors = crew.filter(
    ({ job }) =>
      job.toLowerCase() === "director" ||
      job.toLowerCase() === "executive producer"
  );

  console.log(actors);
  console.log(directors);

  return (
    <div className="flex flex-col gap-1 px-4 sm:px-16 mb-6">
      <div className="flex flex-wrap gap-1">
        {actors.map(({ name, id }) => (
          <p key={id}>{name}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {directors.map(({ name, id }) => (
          <p key={id}>{name}</p>
        ))}
      </div>
    </div>
  );
}
