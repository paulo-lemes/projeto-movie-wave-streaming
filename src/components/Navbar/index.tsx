import React from "react";
import Image from "next/image";
import LogoWhite from "./assets/moviewave-logo.png";
// import LogoBlack from "./assets/moviewave-logo-black.png";
import Link from "next/link";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";

const navItemStyle = "text-3xl w-40 text-center h-max";

export function Navbar() {
  return (
    <header className="flex items-center lg:flex-col lg:items-stretch">
      <div className="dropdown lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <BsMenuButtonWideFill size={30} />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-300 shadow rounded-box w-52"
        >
          <li>
            <Link href="/movies" className={``}>
              Filmes
            </Link>
          </li>
          <li>
            <Link href="/series" className={``}>
              Séries
            </Link>
          </li>
          <li>
            <Link href="/categories" className={``}>
              Categorias
            </Link>
          </li>
          <li>
            <Link href="/favorites" className={``}>
              Favoritos
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/profile" className={``}>
              Perfil
            </Link>
          </li>
        </ul>
      </div>
      <Link
        href="/"
        className="flex w-full justify-center content-center mt-0.5 lg:mt-2"
      >
        <Image
          src={LogoWhite}
          alt="Logotipo da Movie Wave"
          className="w-24 lg:w-36"
        />
      </Link>
      <div className="hidden lg:flex w-full justify-between content-center -mt-24 px-8">
        <Link href="/search">
          <IoSearchCircleSharp size={50} />
        </Link>
        <nav className="flex justify-center">
          <Link href="/categories" className={navItemStyle}>
            Categorias
          </Link>
          <Link href="/movies" className={`${navItemStyle} mt-12`}>
            Filmes
          </Link>
          <Link href="/" className={`${navItemStyle} pt-24`}>
            Home
          </Link>
          <Link href="/series" className={`${navItemStyle} mt-12`}>
            Séries
          </Link>
          <Link href="/favorites" className={navItemStyle}>
            Favoritos
          </Link>
        </nav>
        <Link href="profile">
          <FaRegUserCircle size={50} />
        </Link>
      </div>
    </header>
  );
}
