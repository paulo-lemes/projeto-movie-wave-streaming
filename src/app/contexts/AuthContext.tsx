"use client";

import {
  AuthContextType,
  RequestAccessTokenV4Response,
  UserInfo,
} from "@/types";
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
  logout: () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const checkUserLogin = async () => {
    const res = await fetch("/api/login");
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  const login = async (
    session_id: string | undefined,
    v4Info?: RequestAccessTokenV4Response
  ) => {
    const userInfo = await getUserInfo(session_id);
    if (userInfo) {
      await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: session_id,
          userInfo: userInfo,
          v4Info: v4Info,
        }),
      });

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
      setUser(null);
      return true;
    } else {
      console.log(`Logout failed`);
      return false;
    }
  };

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
