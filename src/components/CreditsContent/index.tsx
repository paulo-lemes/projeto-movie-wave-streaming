import React from "react";
import { Credits } from "@/types";
import { CardPerson } from "../CardPerson";
import { cardPersonComplement } from "@/utils";

const titleStyle = "px-4 sm:px-16 font-bold text-2xl";
const divStyle = "px-4 sm:px-16 py-1 flex flex-wrap gap-2 line-clamp-2";

export function CreditsContent({
  cast,
  crew,
  created_by,
  contentType,
}: Credits) {
  const actors = cast.slice(0, 15);
  const directedBy = crew
    .filter((person) => person.job?.toLowerCase() === "director")
    .filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    )
    .slice(0, 10);

  if (process.env.NODE_ENV === "development") {
    console.log(actors);
    console.log(created_by);
    console.log(directedBy);
  }

  return (
    <section className="flex flex-col gap-3 mb-6">
      {actors?.length > 0 && (
        <>
          <h3 className={titleStyle}>Elenco principal</h3>
          <div className={divStyle}>
            {actors.map((person, i) => (
              <CardPerson key={person.id} {...person} index={i} />
            ))}
          </div>
        </>
      )}
      {contentType === "movie" && directedBy.length > 0 && (
        <>
          <h3 className={titleStyle}>Direção</h3>
          <div className={divStyle}>
            {directedBy.map((person, i) => (
              <CardPerson key={person.id} {...person} index={i} />
            ))}
          </div>
        </>
      )}
      {contentType === "tv" && created_by.length > 0 && (
        <>
          <h3 className={titleStyle}>Criado por</h3>
          <div className={divStyle}>
            {created_by.map((person, i) => (
              <CardPerson
                key={person.id}
                {...person}
                {...cardPersonComplement}
                index={i}
                type="tv"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
