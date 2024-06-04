import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successfull" }
  );

  response.headers.set(
    "Set-Cookie",
    serialize("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );

  return response;
}
