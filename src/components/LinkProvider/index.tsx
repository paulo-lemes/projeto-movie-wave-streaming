"use client";

import React from "react";
import { LinkProviderProps } from "@/types";
import { useSearchParams } from "next/navigation";
import watchProviders from "../../watch_providers.json";
import { motion } from "framer-motion";

export function LinkProvider({ children, provider_id }: LinkProviderProps) {
  const searchTitle = useSearchParams();
  const title = searchTitle.get("title");

  const path = watchProviders
    .filter((provider) => provider.provider_id === provider_id)
    .map(({ search, url }) => (search ? url + title : url))[0];

  if (!path) return children;

  return (
    <motion.a
      whileHover={{ scale: 1.15 }}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </motion.a>
  );
}
