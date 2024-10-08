"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoWhite from "./assets/moviewavelogo.png";
import Link from "next/link";
import { CiBookmarkPlus, CiSearch, CiUser } from "react-icons/ci";
import { DrawerMenu } from "../DrawerMenu";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../LogoutButton";
import { useAuth } from "@/app/contexts/AuthContext";

const navItemStyle = "text-lg lg:text-2xl font-semibold hover:opacity-100";

export function Navbar() {
  const pathname = usePathname();
  const [isTop, setIsTop] = useState<boolean>(true);
  const { user } = useAuth();

  const pathnamesScroll = ["/categories", "/search", "/login", "/profile"];

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scrolled = document?.scrollingElement?.scrollTop;
      const scrollParam =
        pathnamesScroll.includes(pathname) || pathname.includes("/person")
          ? 1
          : 200;

      scrolled && scrolled >= scrollParam ? setIsTop(false) : setIsTop(true);
    });
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex flex-col items-stretch z-20 
        bg-base-100 transition ease-in duration-300
    ${!isTop ? "bg-opacity-90" : "bg-opacity-0"}`}
    >
      <div className="flex w-full items-center justify-between p-2 lg:px-8 lg:py-4 gap-2 sm:gap-0">
        <DrawerMenu />
        <Link
          href="/"
          data-test="logo-home-anchor"
          aria-label={`Link para homepage`}
        >
          <Image
            src={LogoWhite}
            alt="Logotipo da Movie Wave"
            priority
            className="w-32"
          />
        </Link>
        <nav>
          <ul className="hidden sm:flex justify-center w-max gap-4">
            <li data-test="home-anchor">
              <Link
                href="/"
                className={`${navItemStyle} ${
                  pathname === "/" ? "opacity-100" : "opacity-75"
                }`}
              >
                Home
              </Link>
            </li>
            <li data-test="movies-anchor">
              <Link
                href="/movies"
                className={`${navItemStyle} ${
                  pathname === "/movies" ? "opacity-100" : "opacity-75"
                }`}
              >
                Filmes
              </Link>
            </li>
            <li data-test="series-anchor">
              <Link
                href="/series"
                className={`${navItemStyle} ${
                  pathname === "/series" ? "opacity-100" : "opacity-75"
                }`}
              >
                Séries
              </Link>
            </li>
            <li data-test="categories-anchor">
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
          <Link
            href="/search"
            title="Pesquisa"
            data-test="search-anchor"
            aria-label={`Link para página de pesquisa`}
          >
            <CiSearch size={40} className="w-8" />
          </Link>
          <Link
            href="/profile#watchlist"
            title="Lista de interesses"
            data-test="watchlist-anchor"
            aria-label={`Link para lista de interesses`}
          >
            <CiBookmarkPlus size={40} className="w-8" />
          </Link>
          <div className="dropdown lg:dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              role="button"
              data-test="user-options-button"
              aria-label="Botão de opções para usuário"
            >
              <CiUser size={40} className="w-8" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-36 sm:w-52 min-w-max"
            >
              {user ? (
                <>
                  <li data-test="profile-anchor">
                    <Link href="/profile">
                      <h4 className="text-lg font-bold">
                        {user.name || user.username}
                      </h4>
                      <p className="text-xs font-light">Ver perfil</p>
                    </Link>
                  </li>
                  <li data-test="recommended-anchor">
                    <Link href="/profile#recommended">Recomendações</Link>
                  </li>
                  <li data-test="favorite-anchor">
                    <Link href="/profile#favorite">Favoritos</Link>
                  </li>
                  <li data-test="rated-anchor">
                    <Link href="/profile#rated">Avaliações</Link>
                  </li>
                  <li>
                    <LogoutButton dataTest="navbar-logout-button" />
                  </li>
                </>
              ) : (
                <li data-test="login-anchor">
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
