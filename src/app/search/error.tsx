"use client";

import { ErrorPageProps } from "@/types";
import { useEffect } from "react";
import { DivError } from "@/components/DivError";

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <DivError reset={reset} />;
}
