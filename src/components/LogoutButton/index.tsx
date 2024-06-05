"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    alert("Logout realizado com sucesso.");
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className="flex items-center gap-2">
      <p>Logout</p>
      <CiLogout />
    </button>
  );
}
