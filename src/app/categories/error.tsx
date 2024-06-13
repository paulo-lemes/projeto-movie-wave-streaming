"use client";

import { useEffect } from "react";
import { DivError } from "@/components/DivError";

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

  return <DivError reset={reset} />;
}
