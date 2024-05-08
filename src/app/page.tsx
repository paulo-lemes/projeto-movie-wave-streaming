import { getApiContent } from "@/api";
import { FeaturedMovies } from "@/components/FeaturedMovies";
import { Suspense } from "react";

export default async function Home() {
  const featuredMovies = await getApiContent("movie/now_playing?language=pt-BR&page=1")

  return (
    <main className="mb-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedMovies {...featuredMovies} />
      </Suspense>
    </main>
  );
}
