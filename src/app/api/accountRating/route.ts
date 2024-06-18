import { NextRequest, NextResponse } from "next/server";

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get("contentType");
  const page = searchParams.get("page");

  const authCookie = request.cookies.get("auth");
  const userInfoCookie = request.cookies.get("userInfo");

  if (!authCookie || !userInfoCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = authCookie.value;

  let userInfo;
  try {
    userInfo = JSON.parse(userInfoCookie.value);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid cookie format" },
      { status: 400 }
    );
  }

  try {
    const externalRes = await fetch(
      process.env.BASE_URL +
        `account/${userInfo.id}/rated/${contentType}?session_id=${sessionId}&language=pt-BR&page=${page}`,
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
    if (process.env.NODE_ENV === "development") console.log(data);

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", error: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { id, contentType, rating } = await request.json();

  const authCookie = request.cookies.get("auth");
  const userInfoCookie = request.cookies.get("userInfo");

  if (!authCookie || !userInfoCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = authCookie.value;

  try {
    const response = await fetch(
      process.env.BASE_URL +
        `${contentType}/${id}/rating?session_id=${sessionId}&language=pt-BR&page=1`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    if (process.env.NODE_ENV === "development") console.log(data);

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id, contentType, rating } = await request.json();

  const authCookie = request.cookies.get("auth");
  const userInfoCookie = request.cookies.get("userInfo");

  if (!authCookie || !userInfoCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = authCookie.value;

  try {
    const response = await fetch(
      process.env.BASE_URL +
        `${contentType}/${id}/rating?session_id=${sessionId}&language=pt-BR&page=1`,
      {
        method: "DELETE",
        headers,
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    if (process.env.NODE_ENV === "development") console.log(data);

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", error: err },
      { status: 500 }
    );
  }
}
