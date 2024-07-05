import React from "react";
import Link from "next/link";
import { CiHome, CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { MdOutlineLocalMovies } from "react-icons/md";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

const iconSize = 20;
const textStyle = "text-lg";

export function DrawerMenu() {
  return (
    <div className="drawer w-max sm:hidden">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex-none">
          <label
            htmlFor="drawer"
            aria-label="abrir barra lateral"
            className="btn btn-square btn-ghost"
            data-test="menu-burger-button"
          >
            <CiMenuBurger size={32} />
          </label>
        </div>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="drawer"
          aria-label="fechar barra lateral"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200">
          <label
            htmlFor="drawer"
            aria-label="fechar barra lateral"
            className="btn btn-square btn-ghost mb-2"
            data-test="close-menu-burger"
          >
            <TfiClose size={16} />
          </label>
          <ul>
            <li data-test="home-anchor-menu">
              <Link href="/" className={textStyle}>
                <CiHome size={iconSize} />
                Home
              </Link>
            </li>
            <li data-test="movies-anchor-menu">
              <Link href="/movies" className={textStyle}>
                <MdOutlineLocalMovies size={iconSize} />
                Filmes
              </Link>
            </li>
            <li data-test="series-anchor-menu">
              <Link href="/series" className={textStyle}>
                <PiTelevisionSimpleThin size={iconSize} />
                Séries
              </Link>
            </li>
            <li data-test="categories-anchor-menu">
              <Link href="/categories" className={textStyle}>
                <TbCategory size={iconSize} />
                Categorias
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
