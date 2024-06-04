"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    alert("Logout realizado com sucesso.");
    if (pathname === "/profile" || pathname === "/watchlist")
      router.push("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
      <CiLogout />
    </button>
  );
}
