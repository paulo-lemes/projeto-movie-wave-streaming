"use client";

import React, { ReactNode } from "react";
import watchProvidersUrl from "../../watch_providers_url.json";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export function LinkProvider({
  children,
  provider_id,
}: {
  children: ReactNode;
  provider_id: number;
}) {
  const searchTitle = useSearchParams();
  const title = searchTitle.get("title");

  const path = watchProvidersUrl
    .filter((provider) => provider.provider_id === provider_id)
    .map(({ search, url }) => (search ? url + title : url));

  console.log(path[0]);

  return path[0] ? (
    <motion.a whileHover={{ scale: 1.15 }} href={path[0]} target="blank">
      {children}
    </motion.a>
  ) : (
    <>{children}</>
  );
}
