import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successfull" });

  response.cookies.set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  });

  response.cookies.set("userInfo", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
