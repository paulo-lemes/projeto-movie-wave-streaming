import React from "react";
import { credits } from "@/types";
import { CardPerson } from "../CardPerson";

const titleStyle = "font-bold text-2xl";
const divStyle = "flex flex-wrap gap-2";

export function CreditsContent({ cast, crew }: credits) {
  const actors = cast.slice(0, 10);
  const directors = crew
    .filter(
      ({ job }) =>
        job?.toLowerCase() === "director" ||
        job?.toLowerCase() === "executive producer"
    )
    .filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    );

  console.log(actors);
  console.log(directors);

  return (
    <section className="flex flex-col gap-4 px-4 sm:px-16 mb-6">
      <h3 className={titleStyle}>Elenco principal</h3>
      <div className={divStyle}>
        {actors.map((person, i) => (
          <CardPerson key={person.id} {...person} index={i} />
        ))}
      </div>
      <h3 className={titleStyle}>Produção</h3>
      <div className={divStyle}>
        {directors.map((person, i) => (
          <CardPerson key={person.id} {...person} index={i} />
        ))}
      </div>
    </section>
  );
}
