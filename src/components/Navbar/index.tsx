import Image from "next/image";
import React from "react";
import Logo from "./assets/moviewave-logo.png";
import { IoSearchCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

const navItemStyle = "text-3xl w-44 text-center";

export function Navbar() {
  return (
    <header className="flex flex-col">
      <Link href="/" className="flex justify-center content-center mt-2">
        <Image src={Logo} alt="Logotipo da Movie Wave" className="w-36" />
      </Link>
      <div className="flex justify-between content-center -mt-24 mx-14">
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
