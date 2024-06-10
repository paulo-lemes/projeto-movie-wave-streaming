import React from "react";
import { Login } from "@/components/Login";

export default function Page({
  searchParams,
}: {
  searchParams: { v4: boolean | undefined };
}) {
  const v4Login = searchParams.v4;
  return <Login v4={v4Login} />;
}
