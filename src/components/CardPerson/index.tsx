"use client";

import React from "react";
import Image from "next/image";
import DefaultProfilePicture from "./assets/default-profile-picture.png";
import { person } from "@/types";
import { motion } from "framer-motion";

export function CardPerson({
  index,
  name,
  character,
  job,
  profile_path,
}: person) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
          delay: index / 5,
        },
      }}
      className="w-24 sm:w-32 flex flex-col bg-primary-content rounded-lg"
    >
      <Image
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/original/${profile_path}`
            : DefaultProfilePicture
        }
        width={430}
        height={646}
        alt={`Foto de ${name}`}
        priority
        className="object-cover rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="font-semibold line-clamp-3 text-xs sm:text-base break-words">
          {name}
        </h3>
        <p className="text-xs sm:text-base break-words">{character || job}</p>
      </div>
    </motion.div>
  );
}
