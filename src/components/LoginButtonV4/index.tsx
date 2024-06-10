"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionV4, getV4AccessToken, getV4Login } from "@/app/actions";
import { useModal } from "@/app/contexts/ModalContext";
import { useAuth } from "@/app/contexts/AuthContext";

export function LoginButtonV4({ v4 }: { v4: boolean | undefined }) {
  const { login } = useAuth();
  const { openModal, setRedirectAfterClose, setIsModalOpen } = useModal();

  const navigate = useRouter();

  const requestV4Login = async () => {
    const data = await getV4Login();
    console.log(data);

    if (!data?.success) {
      openModal("Não foi possível criar a sessão");
      return;
    }

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
    const approvedToken = localStorage.getItem("v4");
    if (approvedToken && v4) validateV4Login(approvedToken);
  }, [v4]);

  return (
    <div className="flex flex-col justify-center items-center pt-6">
      <button className="btn btn-outline" onClick={requestV4Login}>
        v4 Login
      </button>
    </div>
  );
}
