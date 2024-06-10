import React from "react";
import { Login } from "@/components/Login";
import { LoginButtonV4 } from "@/components/LoginButtonV4";

export default function Page({
  searchParams,
}: {
  searchParams: { v4: boolean | undefined };
}) {
  const v4Login = searchParams.v4;
  return (
    <Login>
      <LoginButtonV4 v4={v4Login} />
    </Login>
  );
}
