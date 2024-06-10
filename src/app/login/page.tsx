"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import TMDBLogo from "./assets/themoviedatabase-logo.svg";
import { FadeInContent } from "@/components/FadeInContent";
import { StyledTitle } from "@/components/StyledTitle";
import { FaUser } from "react-icons/fa";
import { MdOutlineKey } from "react-icons/md";
import {
  getRequestToken,
  postLogin,
  getSessionId,
  getV4Login,
  getV4AccessToken,
  getSessionV4,
} from "../actions";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const { openModal, setRedirectAfterClose, setIsModalOpen } = useModal();

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

  const navigate = useRouter();
  const searchParams = useSearchParams();
  const v4Access = searchParams.get("v4Access");

  const requestV4Login = async () => {
    const data = await getV4Login();
    console.log(data);

    const requestToken = data?.request_token;
    localStorage.setItem("v4", requestToken || "");

    navigate.push(
      `https://www.themoviedb.org/auth/access?request_token=${requestToken}`
    );
  };

  const validateV4Login = async (token: string) => {
    setRedirectAfterClose(null);
    openModal("Aguarde enquanto o login é realizado");

    const access = await getV4AccessToken(token);
    console.log(access);

    const sessionV4 = await getSessionV4(access?.access_token);

    const auth = await login(sessionV4?.session_id, access);
    if (auth) {
      setIsModalOpen(false);
      setRedirectAfterClose("/");
      openModal("Login realizado com sucesso!");
    } else openModal("Login não realizado. Tente novamente.");
  };

  useEffect(() => {
    const approvedToken = localStorage.getItem("v4");
    if (v4Access && approvedToken) validateV4Login(approvedToken);
  }, [v4Access]);

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
                className="grow rounded-lg pl-1"
              />
              <FaUser size={16} className="mx-[2px]" />
            </label>
            <label htmlFor="password" className="font-semibold sm:text-xl">
              Senha
            </label>
            <label className="input input-bordered input-secondary flex items-center gap-2">
              <input
                type="password"
                name="password"
                id="password"
                className="grow rounded-lg pl-1"
              />
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
        <div className="flex flex-col justify-center items-center pt-6">
          <button className="btn btn-outline" onClick={requestV4Login}>
            v4 Login
          </button>
        </div>
      </div>
    </FadeInContent>
  );
}
