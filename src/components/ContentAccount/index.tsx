"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentAccountProps, Content } from "@/types";
import { fetchAllData } from "@/app/fetchData";
import { Loading } from "../Loading";
import { ContentRow } from "../ContentRow";
import { SortContentAccount } from "../SortContentAccount";

export function ContentAccount({
  toggle,
  contentType,
  children,
}: ContentAccountProps) {
  const [content, setContent] = useState<Content[] | [] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [orderAsc, setOrderAsc] = useState<boolean>(true);

  const sortContent = async (option: string) => {
    if (!content) return;
    let sortedArray = [...content];

    const compare = (a: number, b: number) => {
      return orderAsc ? b - a : a - b;
    };

    switch (option) {
      case "adition":
        getContent();
        return;
      case "popularity":
        sortedArray.sort((a: Content, b: Content) =>
          compare(a.popularity, b.popularity)
        );
        break;
      case "voting":
        sortedArray.sort((a: Content, b: Content) =>
          compare(a.vote_average, b.vote_average)
        );
        break;
      case "rating":
        sortedArray.sort((a: Content, b: Content) =>
          compare(a.rating, b.rating)
        );
        break;
      default:
        getContent();
        return;
    }
    setContent(sortedArray);
  };

  const changeOrderContent = () => {
    setOrderAsc((prev) => !prev);
  };

  const getContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType;
    const urlContent =
      toggle === "rated"
        ? `/api/accountRating?contentType=${content}`
        : `/api/accountContent?toggle=${toggle}&contentType=${content}`;

    try {
      const data = await fetchAllData(urlContent);
      if (process.env.NODE_ENV === "development") console.log(data);
      orderAsc ? setContent(data) : setContent(data.reverse());
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (!content) return;
    const reversedArray = [...content].reverse();
    setContent(reversedArray);
  }, [orderAsc]);

  if (error) {
    return (
      <div className="mx-4 sm:mx-16 pt-12 pb-16 flex flex-col gap-2">
        <p className="text-lg sm:text-xl">Erro ao carregar o conteúdo</p>
      </div>
    );
  }

  return content ? (
    <div>
      <div className="mt-2 px-4 sm:px-16 -mb-5 sm:-mb-6 flex flex-wrap gap-1 sm:gap-4 items-center">
        <h3 className="mr-2 sm:mr-0 font-semibold text-xl sm:text-2xl">
          {children}
        </h3>
        {content.length > 1 && (
          <SortContentAccount
            toggle={toggle}
            sortFunction={sortContent}
            orderAsc={orderAsc}
            changeOrder={changeOrderContent}
          />
        )}
      </div>
      {content.length > 0 ? (
        <ContentRow results={content} contentType={contentType} />
      ) : (
        <div className="mx-4 sm:mx-16 pt-12 pb-16 flex flex-col gap-2">
          <p className="text-lg sm:text-xl">Nenhum conteúdo encontrado</p>
          <Link
            href={`/${contentType === "tv" ? "series" : "movies"}`}
            className="btn btn-sm sm:btn-md btn-secondary btn-outline w-max"
          >
            Explore
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className="h-[295px] sm:h-[300px]">
      <Loading />
    </div>
  );
}
