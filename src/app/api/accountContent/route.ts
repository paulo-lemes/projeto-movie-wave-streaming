import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const toggle = searchParams.get("toggle");
  const contentType = searchParams.get("contentType");

  const cookie = request.headers.get("cookie");
  const authCookie = cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("auth="));

  if (!authCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = authCookie.split("=")[1];

  try {
    const externalRes = await fetch(
      process.env.BASE_URL +
        `account/${accountId}/${toggle}/${contentType}?session_id=${sessionId}&language=pt-BR&page=1`,
      {
        method: "GET",
        headers,
      }
    );

    if (!externalRes.ok) {
      return NextResponse.json(
        { message: "External API request failed" },
        { status: externalRes.status }
      );
    }

    const data = await externalRes.json();
    console.log(data);

    return NextResponse.json(data.results);
  } catch (err) {
    NextResponse.json(
      { message: "An error occurred", error: err },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  
}
