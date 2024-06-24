"use client";

import React, { useState } from "react";
import { ChildrenProps } from "@/types";
import Image from "next/image";
import TMDBLogo from "./assets/themoviedatabase-logo.svg";
import { FadeInContent } from "@/components/FadeInContent";
import { StyledTitle } from "@/components/StyledTitle";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineKey } from "react-icons/md";
import { useAuth } from "@/app/contexts/AuthContext";
import { useModal } from "@/app/contexts/ModalContext";
import { getRequestToken, getSessionId, postLogin } from "@/app/actions";

export function Login({ children }: ChildrenProps) {
  const { login } = useAuth();
  const { openModal, setRedirectAfterClose } = useModal();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (formData: FormData) => {
    const requestToken = await getRequestToken();

    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
      request_token: requestToken?.request_token,
    };

    const validateLogin = await postLogin(loginData);
    if (!validateLogin?.success) {
      openModal("Usuário e/ou senha inválidos");
      return;
    }

    const session = await getSessionId(requestToken?.request_token);
    if (!session?.success) {
      openModal("Não foi possível criar a sessão");
      return;
    }

    const auth = await login(session?.session_id);
    if (auth) {
      setRedirectAfterClose("/");
      openModal("Login realizado com sucesso!");
    } else openModal("Login não realizado. Tente novamente.");
  };

  return (
    <FadeInContent duration={1.5}>
      <div className="mt-28 mb-10">
        <form
          action={handleLogin}
          className="flex flex-col justify-center items-center gap-6 px-4"
        >
          <h2 className="text-6xl sm:text-7xl font-bold text-secondary">
            <StyledTitle title="LOGIN" />
          </h2>
          <a
            href="https://www.themoviedb.org/?language=pt-BR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 -mt-4"
          >
            <p className="italic text-xs">powered by</p>
            <Image
              src={TMDBLogo}
              alt="The Movie Data Base logo"
              unoptimized
              width={80}
              height={80}
            />
          </a>
          <div className="flex flex-col gap-1 w-full max-w-xs lg:max-w-lg">
            <label htmlFor="username" className="font-semibold sm:text-xl">
              Nome de usuário
            </label>
            <label className="input input-bordered input-secondary flex items-center gap-2">
              <input
                type="text"
                name="username"
                id="username"
                className="w-[calc(100%-16px)] rounded-lg pl-1"
              />
              <FaUser size={16} className="mx-[2px]" />
            </label>
            <label htmlFor="password" className="font-semibold sm:text-xl">
              Senha
            </label>
            <label className="input input-bordered input-secondary flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-[calc(100%-38px)] rounded-lg pl-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <IoMdEye size={18} />
                ) : (
                  <IoMdEyeOff size={18} />
                )}
              </button>
              <MdOutlineKey size={20} />
            </label>
          </div>
          <button type="submit" className="btn btn-wide btn-secondary">
            Entrar
          </button>
          <p className="text-center flex flex-wrap justify-center gap-1">
            Não possui uma conta na TMDB?
            <a
              href="https://www.themoviedb.org/signup?language=pt-BR"
              target="_blank"
              className="text-secondary font-semibold"
            >
              Cadastre-se
            </a>
          </p>
        </form>
        {children}
      </div>
    </FadeInContent>
  );
}
