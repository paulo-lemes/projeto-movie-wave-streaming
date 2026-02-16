import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getApiContent } from '@/api';

import { ContentSearch } from '@/components/ContentSearch';
import { FadeInContent } from '@/components/FadeInContent';
import { Loading } from '@/components/Loading';
import { PageButton } from '@/components/PageButton';
import { SearchInput } from '@/components/SearchInput';

interface Props {
  searchParams: {
    page: string | undefined;
    text: string | undefined;
  };
}

export default async function Search({ searchParams }: Props) {
  const params = await searchParams;
  const searchText = params.text;
  const page = params.page;
  const resultText = `Resultados para "${searchText}"`;

  const searchData = await getApiContent(
    `search/multi?query=${searchText || ''}&language=pt-BR&page=${page || 1}`,
  );

  if (process.env.NODE_ENV === 'development') {
    console.log(searchData);
    console.log(searchData.total_pages);
  }

  async function handleSearch(formData: FormData) {
    'use server';

    const textInput = formData.get('text') as string;
    const encodedText = encodeURIComponent(textInput);
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
          Encontre facilmente seus filmes e séries favoritos. Digite o título ou palavra-chave e
          descubra informações detalhadas. Explore nosso catálogo e encontre o que assistir em
          segundos!
        </p>
      )}
    </FadeInContent>
  );
}
