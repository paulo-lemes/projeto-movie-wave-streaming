"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function PageButton({
  page,
  total_pages,
  otherParam,
}: {
  page: number;
  total_pages: number;
  otherParam?: string;
}) {
  const pathname = usePathname();
  const previousPageActive = page > 1;
  const nextPageActive = total_pages > page;

  return (
    <div className="join flex items-center justify-center">
      {previousPageActive && (
        <Link
          href={`${pathname}?${otherParam ? otherParam : ""}page=${page - 1}`}
          className={`${
            nextPageActive ? "join-item" : ""
          } btn btn-secondary btn-outline btn-md`}
        >
          Página anterior
        </Link>
      )}
      {nextPageActive && (
        <Link
          href={`${pathname}?${otherParam ? otherParam : ""}page=${page + 1}`}
          className={`${
            previousPageActive ? "join-item" : ""
          } btn btn-secondary btn-outline btn-md`}
        >
          Próxima página
        </Link>
      )}
    </div>
  );
}
