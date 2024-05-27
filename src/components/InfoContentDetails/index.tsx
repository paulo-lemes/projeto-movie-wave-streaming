import React, { ReactNode } from "react";

export function InfoContentDetails({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <p className="font-bold sm:text-lg">
      {title} <span className="font-normal">{children}</span>
    </p>
  );
}
