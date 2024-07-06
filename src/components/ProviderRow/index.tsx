import React from "react";
import Image from "next/image";
import { ProviderRowProps } from "@/types";
import { LinkProvider } from "../LinkProvider";

export function ProviderRow({ providers, children }: ProviderRowProps) {
  return (
    providers &&
    providers.length > 0 && (
      <>
        <h4 className="text-xl font-semibold text-secondary pl-4">
          {children}
        </h4>
        <div className="flex flex-wrap gap-2 pl-4">
          {providers.map(({ provider_id, provider_name, logo_path }) => (
            <LinkProvider key={provider_id} provider_id={provider_id}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                alt={`Logo de ${provider_name}`}
                width={50}
                height={50}
                title={provider_name}
                unoptimized
                className="rounded"
              />
            </LinkProvider>
          ))}
        </div>
      </>
    )
  );
}
