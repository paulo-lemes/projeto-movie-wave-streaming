import Image from "next/image";
import React from "react";
import Logo from "./assets/moviewave-logo.png";
import Link from "next/link";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";

const navItemStyle = "text-3xl w-44 text-center";

export function Navbar() {
  return (
    <header className="flex items-center lg:flex-col lg:items-stretch">
      <div className="dropdown lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <BsMenuButtonWideFill size={30} />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-black shadow rounded-box w-52"
        >
          <li>
            <Link href="/filmes" className={``}>
              Filmes
            </Link>
          </li>
          <li>
            <Link href="/series" className={``}>
              Séries
            </Link>
          </li>
          <li>
            <Link href="/categorias" className={``}>
              Categorias
            </Link>
          </li>
          <li>
            <Link href="/favoritos" className={``}>
              Favoritos
            </Link>
          </li>
          <hr />
          <li>
            <Link href="/perfil" className={``}>
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
          src={Logo}
          alt="Logotipo da Movie Wave"
          className="w-24 lg:w-36"
        />
      </Link>
      <div className="hidden lg:flex justify-between content-center -mt-24 mx-14">
        <Link href="pesquisar">
          <IoSearchCircleSharp style={{ color: "white" }} size={50} />
        </Link>
        <nav className="flex justify-center">
          <Link href="/categorias" className={navItemStyle}>
            Categorias
          </Link>
          <Link href="/filmes" className={`${navItemStyle} mt-12`}>
            Filmes
          </Link>
          <Link href="/" className={`${navItemStyle} mt-24`}>
            Home
          </Link>
          <Link href="/series" className={`${navItemStyle} mt-12`}>
            Séries
          </Link>
          <Link href="/favoritos" className={navItemStyle}>
            Favoritos
          </Link>
        </nav>
        <Link href="perfil">
          <FaRegUserCircle style={{ color: "white" }} size={50} />
        </Link>
      </div>
    </header>
  );
}
