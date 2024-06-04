"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoWhite from "./assets/moviewavelogo.png";
import Link from "next/link";
import { CiBookmarkPlus, CiSearch, CiUser } from "react-icons/ci";
import { DrawerMenu } from "../DrawerMenu";
import { usePathname } from "next/navigation";
import LogoutButton from "../LogoutButton";
import { useAuth } from "@/app/contexts/AuthContext";

const navItemStyle = "text-lg lg:text-2xl font-semibold hover:opacity-100";

export function Navbar() {
  const pathname = usePathname();
  const [isTop, setIsTop] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scrolled = document?.scrollingElement?.scrollTop;

      scrolled &&
      scrolled >=
        (pathname === "/categories" ||
        pathname === "/search" ||
        pathname === "/login"
          ? 5
          : 200)
        ? setIsTop(false)
        : setIsTop(true);
    });
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex flex-col items-stretch z-20 
    ${!isTop && "bg-base-100/90"}`}
    >
      <div className="flex w-full items-center justify-between p-2 lg:px-8 lg:py-4 gap-2 sm:gap-0">
        <DrawerMenu />
        <Link href="/">
          <Image
            src={LogoWhite}
            alt="Logotipo da Movie Wave"
            priority
            className="w-32"
          />
        </Link>
        <nav>
          <ul className="hidden sm:flex justify-center w-max gap-4">
            <li>
              <Link
                href="/"
                className={`${navItemStyle} ${
                  pathname === "/" ? "opacity-100" : "opacity-75"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                className={`${navItemStyle} ${
                  pathname === "/movies" ? "opacity-100" : "opacity-75"
                }`}
              >
                Filmes
              </Link>
            </li>
            <li>
              <Link
                href="/series"
                className={`${navItemStyle} ${
                  pathname === "/series" ? "opacity-100" : "opacity-75"
                }`}
              >
                Séries
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`${navItemStyle} ${
                  pathname === "/categories" ? "opacity-100" : "opacity-75"
                }`}
              >
                Categorias
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-2">
          <Link href="/search">
            <CiSearch size={40} className="w-8" />
          </Link>
          <Link href="/watchlist">
            <CiBookmarkPlus size={40} className="w-8" />
          </Link>
          <div className="dropdown lg:dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="">
              <CiUser size={40} className="w-8" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
            >
              {user ? (
                <>
                  <li>
                    <Link href="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link href="/favorite">Favoritos</Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
