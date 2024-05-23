import React from "react";
import Link from "next/link";
import tmdbGenres from "../../tmdb_genres.json";
import { FadeInContent } from "@/components/FadeInContent";

export default function Categories() {
  const genres = tmdbGenres.genres;

  return (
    <FadeInContent duration={1.5}>
      <div className="mt-28 px-5 sm:px-20 flex flex-col gap-4">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold">
          Explore uma seleção de filmes e séries organizados por categorias.
        </h2>
        <p className="lg:px-44 text-center">
          Encontre uma diversidade de gêneros, desde clássicos até as últimas
          novidades. Mergulhe em aventuras, romances, comédias, dramas,
          terrores, documentários e mais. Navegue pelas nossas categorias e
          encontre a próxima grande história que vai capturar sua imaginação.
        </p>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 lg:gap-3 mt-5">
          {genres.map(({ id, name }, i) => (
            <Link key={id} href={`/category/${id}`}>
              <button
                className={`btn lg:text-2xl btn-outline ${
                  i % 2 === 0 && "btn-secondary"
                }
              `}
              >
                {name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </FadeInContent>
  );
}
