"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useModal } from "@/app/contexts/ModalContext";
import { LogoutButtonProps } from "@/types";
import { CiLogout } from "react-icons/ci";

export function LogoutButton({ classCSS, dataTest }: LogoutButtonProps) {
  const { logout } = useAuth();
  const { openModal, setRedirectAfterClose } = useModal();

  const handleLogout = async () => {
    const res = await logout();

    if (res) {
      setRedirectAfterClose("/login");
      openModal("Logout realizado com sucesso");
    } else openModal("Não foi possível realizar o logout. Tente novamente.");
  };

  return (
    <button
      onClick={handleLogout}
      className={`${classCSS || ""} flex items-center gap-2`}
      data-test={dataTest}
    >
      <p>Logout</p>
      <CiLogout />
    </button>
  );
}
