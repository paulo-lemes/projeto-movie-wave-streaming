import React, { Suspense } from "react";
import { getApiContent } from "@/api";
import { redirect } from "next/navigation";
import { ContentSearch } from "@/components/ContentSearch";
import { Loading } from "@/components/Loading";
import { SearchInput } from "@/components/SearchInput";

export default async function Search({
  searchParams,
}: {
  searchParams: { text: string | undefined };
}) {
  const searchText = searchParams.text;
  const resultText = `Principais resultados para "${searchText}"`;
  
  const searchData = await getApiContent(
    `search/multi?query=${
      searchText || ""
    }&include_adult=false&language=pt-BR&page=1`
  );

  console.log(searchData);

  async function handleSearch(formData: FormData) {
    "use server";

    const textInput = formData.get("text");
    redirect(`/search?text=${textInput}`);
  }

  return (
    <main className="mb-auto pb-20">
      <SearchInput handleSearch={handleSearch} />
      {searchText ? (
        <Suspense fallback={<Loading />}>
          <ContentSearch {...searchData}>{resultText}</ContentSearch>
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
