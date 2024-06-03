import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { sessionId } = await request.json();

  if (sessionId) {
    const response = NextResponse.json(
      { message: "Login successfull" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      serialize("auth", sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
