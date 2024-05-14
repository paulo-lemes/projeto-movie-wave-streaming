import React from "react";
import { getApiContent } from "@/api";
import { IoSearchCircleSharp } from "react-icons/io5";
import { redirect } from "next/navigation";
import { ContentRow } from "@/components/ContentRow";

export default async function Search({
  searchParams,
}: {
  searchParams: { text: string | undefined };
}) {
  const searchData = await getApiContent(
    `search/multi?query=${searchParams.text || ""}&include_adult=false&language=pt-BR&page=1`
  );
  
  console.log(searchData);

  async function handleSearch(formData: FormData) {
    'use server'

    const textInput = formData.get("search");
    redirect(`/search?text=${textInput}`);
  }

  return (
    <main className="">
      <form action={handleSearch}>
        <label className="input input-bordered bg-black flex items-center gap-2 w-max m-auto">
          <input
            name="search"
            type="text"
            className="text-white grow"
            placeholder="Search"
          />
          <button type="submit" className="cursor-pointer">
            <IoSearchCircleSharp size={40} />
          </button>
        </label>
      </form>
      {searchParams.text ? <ContentRow {...searchData}>Resultados</ContentRow> : null}
    </main>
  );
}
