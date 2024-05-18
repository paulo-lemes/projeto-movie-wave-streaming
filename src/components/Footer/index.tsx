import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { SlSocialGithub } from "react-icons/sl";
import TMDBLogo from "./assets/tmdb-logo.svg";

const iconStyle = "opacity-80 hover:opacity-100 hover:scale-125";
const linkStyle = "text-xs lg:text-base opacity-85 hover:opacity-100";

export function Footer() {
  return (
    <footer
      className="flex flex-wrap pt-32 sm:pt-36 px-8 sm:px-14 pb-6 gap-3 sm:gap-0
      items-center justify-between bg-gradient-to-b from-transparent to-neutral"
    >
      <p className="text-gray-300 w-full text-xs lg:text-base sm:text-end sm:mb-2">
        © 2024 Projeto realizado por Paulo Lemes. Todos os direitos reservados.
      </p>
      <div className="flex gap-4 items-center order-first sm:order-2">
        <a
          href="https://github.com/paulo-lemes"
          target="blank"
          className={iconStyle}
        >
          <SlSocialGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/-paulolemes/"
          target="blank"
          className={iconStyle}
        >
          <CiLinkedin size={25} />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=5511993385824&text&type=phone_number&app_absent=0"
          target="blank"
          className={iconStyle}
        >
          <PiWhatsappLogoLight size={23} />
        </a>
      </div>
      <ul className="font-bold flex flex-wrap items-center gap-2 sm:gap-6 order-last">
        <li className={linkStyle}>
          <Link href="https://github.com/paulo-lemes/projeto-movie-wave-streaming">
            Projeto GitHub
          </Link>
        </li>
        <li className={linkStyle}>
          <Link href="https://developer.themoviedb.org/docs/getting-started">
            TMDB API
          </Link>
        </li>
        <li className={linkStyle}>
          <Link
            href="https://www.themoviedb.org/?language=pt-BR"
            className="flex gap-2"
          >
            The Movie Data Base
            <Image src={TMDBLogo} alt="" width={30} height={30} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
