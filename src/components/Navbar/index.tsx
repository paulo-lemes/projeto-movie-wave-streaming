import React from "react";
import Image from "next/image";
import LogoWhite from "./assets/moviewavelogo.png";
import Link from "next/link";
import { CiBookmarkPlus, CiSearch, CiUser } from "react-icons/ci";
import { DrawerMenu } from "../DrawerMenu";

const navItemStyle =
  "text-lg lg:text-2xl font-semibold opacity-90 hover:opacity-100";

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 flex flex-col items-stretch">
      <div className="flex w-full flex-wrap items-center justify-between p-2 lg:px-8 lg:py-4 gap-2 sm:gap-0">
        <DrawerMenu />
        <Link href="/">
          <Image
            src={LogoWhite}
            alt="Logotipo da Movie Wave"
            className="w-28 lg:w-32"
          />
        </Link>
        <nav>
          <ul className="hidden sm:flex justify-center w-max gap-4">
            <li>
              <Link href="/" className={navItemStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className={navItemStyle}>
                Filmes
              </Link>
            </li>
            <li>
              <Link href="/series" className={navItemStyle}>
                Séries
              </Link>
            </li>
            <li>
              <Link href="/categories" className={navItemStyle}>
                Categorias
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-2">
          <Link href="/search">
            <CiSearch size={40} className="w-6 lg:w-8" />
          </Link>
          <Link href="/watchlist">
            <CiBookmarkPlus size={40} className="w-6 lg:w-8" />
          </Link>
          <Link href="profile">
            <CiUser size={40} className="w-6 lg:w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}
