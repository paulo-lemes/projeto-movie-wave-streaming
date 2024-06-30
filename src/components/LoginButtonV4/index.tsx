"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionV4, getV4AccessToken, getV4Login } from "@/app/actions";
import { useModal } from "@/app/contexts/ModalContext";
import { useAuth } from "@/app/contexts/AuthContext";

const v4Description =
  "Nesta opção, faça login através da TMDB utilizando outro modo de autenticação";

export function LoginButtonV4({ v4 }: { v4: boolean | undefined }) {
  const { login } = useAuth();
  const { openModal, setRedirectAfterClose, setIsModalOpen } = useModal();

  const navigate = useRouter();

  const requestV4Login = async () => {
    const data = await getV4Login();
    if (process.env.NODE_ENV === "development") console.log(data);

    if (!data?.success) {
      openModal("Não foi possível criar a sessão");
      return;
    }

    const requestToken = data?.request_token;
    document.cookie = `v4=${encodeURIComponent(
      JSON.stringify(requestToken)
    )}; path=/; secure; samesite=strict`;

    navigate.push(
      `https://www.themoviedb.org/auth/access?request_token=${requestToken}`
    );
  };

  const validateV4Login = async (token: string) => {
    setRedirectAfterClose(null);
    openModal("Aguarde enquanto o login é realizado");

    const access = await getV4AccessToken(token);
    if (!access?.success) {
      openModal("Não foi possível criar a sessão");
      return;
    }

    const sessionV4 = await getSessionV4(access?.access_token);
    if (!sessionV4?.success) {
      openModal("Não foi possível criar a sessão");
      return;
    }

    const auth = await login(sessionV4?.session_id, access);
    if (auth) {
      setIsModalOpen(false);
      setRedirectAfterClose("/");
      openModal("Login realizado com sucesso!");
    } else openModal("Login não realizado. Tente novamente.");
  };

  useEffect(() => {
    const v4Cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("v4="));
    const approvedToken = v4Cookie
      ? JSON.parse(decodeURIComponent(v4Cookie.split("=")[1]))
      : null;

    if (approvedToken && v4) validateV4Login(approvedToken);
  }, [v4]);

  return (
    <div className="flex flex-col justify-center items-center pt-8 gap-2">
      <div className="lg:tooltip lg:tooltip-bottom" data-tip={v4Description}>
        <button className="btn btn-outline" onClick={requestV4Login}>
          v4 Login
        </button>
      </div>
      <p className="text-xs lg:hidden text-center px-10 sm:px-44">
        {v4Description}
      </p>
    </div>
  );
}
