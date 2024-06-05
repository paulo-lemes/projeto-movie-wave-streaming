"use client";

import React from "react";
import Image from "next/image";
import TMDBLogo from "./assets/tmdb-logo-2.svg";
import { FadeInContent } from "@/components/FadeInContent";
import { useAuth } from "../contexts/AuthContext";
import { FadeInImage } from "@/components/FadeInImage";
import LogoutButton from "@/components/LogoutButton";

export default function Profile() {
  const { user } = useAuth();

  return (
    <FadeInContent duration={1.5}>
      {user && (
        <div className="mt-28 mb-10 flex flex-wrap items-center px-6 sm:px-10 gap-6">
          <div className="relative">
            <FadeInImage
              src={`https://image.tmdb.org/t/p/original/${user.avatar.tmdb.avatar_path}`}
              alt="Foto do perfil"
              width={150}
              height={150}
              type="profile"
              unoptimized
              classCSS="mask mask-circle h-[150px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
              {user.name || user.username}
            </h2>
            <a
              href="https://www.themoviedb.org/settings/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <p>Acessar configurações</p>
              <Image
                src={TMDBLogo}
                alt="The Movie Data Base logo"
                unoptimized
                width={80}
                height={80}
              />
            </a>
            <LogoutButton classCSS="btn btn-neutral btn-wide" />
          </div>
        </div>
      )}
    </FadeInContent>
  );
}
