"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-36 px-2 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-semibold text-center">Erro ao carregar a página</h2>
      <div className="flex gap-1 sm:gap-2">
        <Link href={"/"} className="btn btn-sm sm:btn-md btn-secondary btn-outline">
          Página inicial
        </Link>
        <button
          className="btn btn-sm sm:btn-md btn-secondary btn-outline"
          onClick={() => reset()}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
