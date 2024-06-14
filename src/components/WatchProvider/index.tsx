import React from "react";
import { WatchProviderProps } from "@/types";
import { ProviderRow } from "../ProviderRow";

export function WatchProvider({ flatrate, rent, buy }: WatchProviderProps) {
  const existProvider = flatrate || rent || buy;

  return (
    existProvider && (
      <section className="flex flex-col gap-2 px-4 sm:px-16 mb-6">
        <h4 className="text-2xl font-bold">Onde Assistir</h4>
        <ProviderRow providers={flatrate}>Streaming</ProviderRow>
        <ProviderRow providers={rent}>Alugar</ProviderRow>
        <ProviderRow providers={buy}>Comprar</ProviderRow>
      </section>
    )
  );
}
