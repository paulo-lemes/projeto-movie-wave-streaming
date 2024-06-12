import React from "react";
import Link from "next/link";
import { PersonDetailsProps } from "@/types";
import { FadeInImage } from "../FadeInImage";
import { InfoContentDetails } from "../InfoContentDetails";
import { CiLink } from "react-icons/ci";

const genderList: { [key: number]: string } = {
  1: "Feminino",
  2: "Masculino",
  3: "Não binário",
};

export function PersonDetails({
  name,
  profile_path,
  biography,
  homepage,
  known_for_department,
  gender,
  birthday,
  deathday,
  place_of_birth,
}: PersonDetailsProps) {
  return (
    <section className="mt-20 lg:mt-28 mb-10 px-4 sm:px-16 flex flex-wrap lg:flex-nowrap gap-8 items-center">
      <div className="relative shadow-2xl shadow-neutral">
        <FadeInImage
          src={`https://image.tmdb.org/t/p/original/${profile_path}`}
          type="profile"
          alt={`Foto de ${name}`}
          classCSS="max-w-[250px] lg:max-w-[300px] lg:min-w-[300px] rounded"
          width={300}
          height={450}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-4xl sm:text-5xl">{name}</h2>
        {biography && (
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-xl sm:text-2xl text-secondary">
              Biografia
            </h4>
            <p className="">{biography}</p>
          </div>
        )}
        <div>
          <h4 className="font-bold text-xl sm:text-2xl text-secondary pb-2">
            Infomações pessoais
          </h4>
          {homepage && (
            <div
              className="lg:tooltip lg:tooltip-right"
              data-tip={`Página oficial de ${name}`}
            >
              <Link
                href={homepage}
                target="_blank"
                className="flex items-center"
              >
                <CiLink size={30} />{" "}
                <p className="text-xs lg:hidden pl-2">Página oficial</p>
              </Link>
            </div>
          )}
          {known_for_department && (
            <InfoContentDetails title="Conhecido(a) por:">
              {known_for_department}
            </InfoContentDetails>
          )}
          {gender && (
            <InfoContentDetails title="Gênero:">
              {genderList[gender]}
            </InfoContentDetails>
          )}
          {birthday && (
            <InfoContentDetails title="Data de nascimento:">
              {birthday.split("-").reverse().join("/")}
            </InfoContentDetails>
          )}
          {deathday && (
            <InfoContentDetails title="Data de falecimento:">
              {deathday.split("-").reverse().join("/")}
            </InfoContentDetails>
          )}
          {place_of_birth && (
            <InfoContentDetails title="Local de nascimento:">
              {place_of_birth}
            </InfoContentDetails>
          )}
        </div>
      </div>
    </section>
  );
}
