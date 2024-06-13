import React, { Suspense } from "react";
import { getApiContent } from "@/api";
import { redirect } from "next/navigation";
import { ContentSearch } from "@/components/ContentSearch";
import { Loading } from "@/components/Loading";
import { SearchInput } from "@/components/SearchInput";
import { FadeInContent } from "@/components/FadeInContent";
import { PageButton } from "@/components/PageButton";

export default async function Search({
  searchParams,
}: {
  searchParams: { page: string | undefined; text: string | undefined };
}) {
  const searchText = searchParams.text;
  const page = searchParams.page;
  const resultText = `Resultados para "${searchText}"`;

  const searchData = await getApiContent(
    `search/multi?query=${searchText || ""}&language=pt-BR&page=${page || 1}`
  );

  console.log(searchData);
  console.log(searchData.total_pages);

  async function handleSearch(formData: FormData) {
    "use server";

    const textInput = formData.get("text") as string;
    const encodedText = encodeURIComponent(textInput)
    redirect(`/search?text=${encodedText}`);
  }

  return (
    <FadeInContent duration={1.5}>
      <SearchInput handleSearch={handleSearch} />
      {searchText ? (
        <Suspense fallback={<Loading />}>
          <ContentSearch {...searchData}>{resultText}</ContentSearch>
          <PageButton {...searchData} otherParam={`text=${searchText}&`} />
        </Suspense>
      ) : (
        <p className="text-center px-10 sm:px-16 py-6 m-auto text-xl">
          Encontre facilmente seus filmes e séries favoritos. Digite o título ou
          palavra-chave e descubra informações detalhadas. Explore nosso
          catálogo e encontre o que assistir em segundos!
        </p>
      )}
    </FadeInContent>
  );
}
