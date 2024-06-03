import React from "react";
import Image from "next/image";
import TMDBLogo from "./assets/themoviedatabase-logo.svg";
import { FadeInContent } from "@/components/FadeInContent";
import { StyledTitle } from "@/components/StyledTitle";
import { FaUser } from "react-icons/fa";
import { MdOutlineKey } from "react-icons/md";
import { getRequestToken, getSessionId, postLogin } from "../actions";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const requestToken = await getRequestToken();

    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
      request_token: requestToken?.request_token,
    };

    const login = await postLogin(loginData);
    const session = await getSessionId(requestToken?.request_token);

    const host = headers().get("host");
    const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
    const auth = await fetch(`${protocal}://${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: session?.session_id }),
    });

    if (auth.ok) {
      console.log("Login realizado com sucesso!");
      redirect("/");
    } else console.log("Login não realizado. Tente novamente.");
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
                className="grow rounded-lg pl-1"
              />
              <FaUser size={17} />
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
          <p className="text-center">
            Não possui uma conta na TMDB?{" "}
            <a
              href="https://www.themoviedb.org/signup?language=pt-BR"
              target="_blank"
              className="text-secondary font-semibold"
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </FadeInContent>
  );
}
