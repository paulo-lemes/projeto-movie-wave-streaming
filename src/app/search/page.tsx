import React, { Suspense } from "react";
import { getApiContent } from "@/api";
import { redirect } from "next/navigation";
import { MdOutlineManageSearch } from "react-icons/md";
import { ContentSearch } from "@/components/ContentSearch";
import { Loading } from "@/components/Loading";

export default async function Search({
  searchParams,
}: {
  searchParams: { text: string | undefined };
}) {
  const searchData = await getApiContent(
    `search/multi?query=${
      searchParams.text || ""
    }&include_adult=false&language=pt-BR&page=1`
  );

  console.log(searchData);

  async function handleSearch(formData: FormData) {
    "use server";

    const textInput = formData.get("search");
    redirect(`/search?text=${textInput}`);
  }

  return (
    <main className="mb-auto pb-20">
      <form action={handleSearch} className="mt-32">
        <label className="input input-bordered input-secondary flex w-[80vw] sm:w-[50vw] m-auto">
          <input
            name="search"
            type="text"
            className="grow"
            placeholder="Pesquisar"
          />
          <button type="submit" className="cursor-pointer">
            <MdOutlineManageSearch size={30} />
          </button>
        </label>
      </form>
      {searchParams.text ? (
        <Suspense fallback={<Loading />}>
          <ContentSearch {...searchData} />
        </Suspense>
      ) : (
        <p className="text-center px-10 sm:px-16 py-6 m-auto text-xl">
          Encontre facilmente seus filmes e séries favoritos. Digite o título ou
          palavra-chave e descubra informações detalhadas. Explore nosso
          catálogo e encontre o que assistir em segundos!
        </p>
      )}
    </main>
  );
}
