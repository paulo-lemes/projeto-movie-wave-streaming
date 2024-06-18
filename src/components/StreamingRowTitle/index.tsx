import React, { ReactNode } from "react";
import Image from "next/image";

export function StreamingRowTitle({
  children,
  logo,
  name,
}: {
  children: ReactNode;
  logo: string | undefined;
  name: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <span>{children}</span>
      <Image
        src={`https://image.tmdb.org/t/p/original/${logo}`}
        alt={`Logotipo de ${name}`}
        unoptimized
        height={28}
        width={105}
        className="h-6 w-[90px] sm:h-7"
      />
    </div>
  );
}
