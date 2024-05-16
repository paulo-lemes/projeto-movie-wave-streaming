import React from "react";
import Image from "next/image";
import LogoWhite from "./assets/moviewavelogo.png";
import Link from "next/link";
import { CiBookmarkPlus, CiSearch, CiUser } from "react-icons/ci";

const navItemStyle = "text-xl lg:text-2xl font-semibold opacity-90 hover:opacity-100";

export function Navbar() {
  return (
    <header className="absolute inset-0 z-10 flex flex-col items-stretch">
      <div className="flex w-full items-center justify-between px-8 py-4">
        <Link href="/">
          <Image
            src={LogoWhite}
            alt="Logotipo da Movie Wave"
            className="w-28 lg:w-32"
          />
        </Link>
        <nav className="flex justify-center gap-4">
          <Link href="/" className={navItemStyle}>
            Home
          </Link>
          <Link href="/movies" className={navItemStyle}>
            Filmes
          </Link>
          <Link href="/series" className={navItemStyle}>
            Séries
          </Link>
          <Link href="/categories" className={navItemStyle}>
            Categorias
          </Link>
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
