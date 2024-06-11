import { deleteSession, deleteV4Session } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const userCookie = request.cookies.get("userInfo");
  const v4Cookie = request.cookies.get("v4Info");

  if (!authCookie || !userCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = authCookie.value;
  const logout = await deleteSession(sessionId);
  console.log(logout);
  
  const response = NextResponse.json({ message: "Logout successfull" });
  
  if (v4Cookie) {
    const v4Info = JSON.parse(v4Cookie?.value || "");
    const logoutV4 = await deleteV4Session(v4Info.access_token);
    console.log(logoutV4);

    response.cookies.set("v4Info", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    });
  }

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
