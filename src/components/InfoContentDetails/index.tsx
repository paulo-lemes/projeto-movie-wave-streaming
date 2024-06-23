import React from "react";
import { InfoContentDetailsProps } from "@/types";

export function InfoContentDetails({
  title,
  children,
}: InfoContentDetailsProps) {
  return (
    <p className="font-bold sm:text-lg">
      {title} <span className="font-normal">{children}</span>
    </p>
  );
}
