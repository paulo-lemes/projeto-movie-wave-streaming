import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const iconSize = 30;

export default function Footer() {
  return (
    <footer className="flex flex-col py-14 gap-11 items-center justify-center">
      <div className="flex gap-2">
        <a
          href="https://github.com/paulo-lemes"
          target="blank"
          className="hover:scale-125"
        >
          <FaGithub size={iconSize} />
        </a>
        <a
          href="https://www.linkedin.com/in/-paulolemes/"
          target="blank"
          className="hover:scale-125"
        >
          <FaLinkedin size={iconSize} />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=5511993385824&text&type=phone_number&app_absent=0"
          target="blank"
          className="hover:scale-125"
        >
          <IoLogoWhatsapp size={iconSize} />
        </a>
      </div>
      <div className="w-full h-px bg-gray-400" />
      <p className="text-gray-300">Projeto realizado por Paulo Lemes</p>
    </footer>
  );
}
