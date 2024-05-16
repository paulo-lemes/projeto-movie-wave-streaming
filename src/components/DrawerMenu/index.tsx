import Link from "next/link";
import React from "react";
import { CiHome, CiMenuBurger } from "react-icons/ci";
import { MdOutlineLocalMovies } from "react-icons/md";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";

export function DrawerMenu() {
  return (
    <div className="drawer w-max sm:hidden">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex-none">
          <label
            htmlFor="drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <CiMenuBurger size={24} />
          </label>
        </div>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="btn btn-square btn-ghost"
          >
            <TfiClose />
          </label>
          <li>
            <Link href="/" className="">
              <CiHome />
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className="">
              <MdOutlineLocalMovies />
              Filmes
            </Link>
          </li>
          <li>
            <Link href="/series" className="">
              <PiTelevisionSimpleThin />
              Séries
            </Link>
          </li>
          <li>
            <Link href="/categories" className="">
              <TbCategory />
              Categorias
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
