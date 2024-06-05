"use client";

import { AuthContextType, UserInfo } from "@/types";
import { getUserInfo } from "../actions";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => undefined,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async (session_id: string | undefined) => {
    const userInfo = await getUserInfo(session_id);
    if (userInfo) {
      await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: session_id, userInfo: userInfo }),
      });

      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);

      return true;
    }

    return false;
  };

  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      localStorage.removeItem("user");
      setUser(null);
    } else {
      const { message } = await res.json();
      alert(`Logout failed: ${message}`);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
