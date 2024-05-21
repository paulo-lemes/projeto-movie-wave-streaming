import React from "react";
import { watchProviderProps } from "@/types";
import Image from "next/image";

export function WatchProvider({
  flatrate,
  rent,
  buy,
  link,
}: watchProviderProps) {
  const existProvider =
    flatrate.length > 0 || rent.length > 0 || buy.length > 0;

  return (
    existProvider && (
      <section className="flex flex-col gap-2 px-4 sm:px-16 mb-6">
        <h4 className="text-2xl font-bold">Onde Assistir</h4>
        {flatrate.length > 0 && (
          <>
            <h4 className="text-xl font-semibold text-secondary px-4">
              Streaming
            </h4>
            <div className="flex flex-wrap gap-2 px-4">
              {flatrate.map(({ provider_id, provider_name, logo_path }) => (
                <Image
                  key={provider_id}
                  src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                  alt={`Logo de ${provider_name}`}
                  width={50}
                  height={50}
                  priority
                  className="rounded"
                />
              ))}
            </div>
          </>
        )}
      </section>
    )
  );
}
