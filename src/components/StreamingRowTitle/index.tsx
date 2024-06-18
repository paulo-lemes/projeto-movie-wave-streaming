import React from "react";
import { StreamingRowTitleProps } from "@/types";

export function StreamingRowTitle({
  children,
  logo,
  name,
}: StreamingRowTitleProps) {
  return (
    <div className="flex gap-2 items-center">
      <span>{children}</span>
      <img
        src={`https://image.tmdb.org/t/p/${logo}`}
        alt={`Logotipo de ${name}`}
        className="h-5 sm:h-6"
      />
    </div>
  );
}
