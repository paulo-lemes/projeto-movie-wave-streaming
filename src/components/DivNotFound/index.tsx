import React from 'react'
import Link from 'next/link';

export function DivNotFound() {
  return (
    <div className="mt-36 px-2 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-semibold text-center">
        Página não encontrada
      </h2>
      <div className="flex gap-1 sm:gap-2">
        <Link
          href={"/"}
          className="btn btn-sm sm:btn-md btn-secondary btn-outline"
        >
          Retornar para home
        </Link>
      </div>
    </div>
  );
}
