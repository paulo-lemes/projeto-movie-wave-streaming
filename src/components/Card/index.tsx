import React from "react";
import Image from "next/image";
import { content } from "@/types";

export function Card({ title, name, poster_path, backdrop_path, overview }: content) {
  return (
    <div className="flex flex-col gap-3 max-w-64 cursor-pointer">
      <Image
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={`Capa de ${title || name}`}
        width={250}
        height={250}
        className=""
      />
      {/* <div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={`Capa de ${title || name}`}
          width={250}
          height={250}
          className=""
        />
        <div className="flex flex-col">
          <h4 className="font-bold">{title || name}</h4>
          <p>{overview}</p>
        </div>
      </div> */}
    </div>
  );
}
