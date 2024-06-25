"use client";

import React from "react";
import { PageButtonProps } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function PageButton({ page, total_pages, otherParam }: PageButtonProps) {
  const pathname = usePathname();
  const previousPageActive = page > 1;
  const nextPageActive = total_pages > page;

  return (
    <div className="join flex items-center justify-center pb-6">
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
