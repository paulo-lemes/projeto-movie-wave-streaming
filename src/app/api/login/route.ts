import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { sessionId, userInfo, v4Info } = await request.json();

  if (sessionId && userInfo) {
    const response = NextResponse.json({ message: "Login successfull" });

    response.cookies.set("auth", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    response.cookies.set("userInfo", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    if (v4Info) {
      response.cookies.set("v4Info", JSON.stringify(v4Info), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });
    }

    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
