"use server";

import {
  LoginData,
  RequestAccessTokenV4Response,
  RequestSessionResponse,
  RequestTokenResponse,
  UserInfo,
} from "@/types";

const baseURL = process.env.BASE_URL;
const baseURLV4 = process.env.BASE_URLV4;
const apiToken = process.env.API_TOKEN;

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

export async function getRequestToken(): Promise<
  RequestTokenResponse | undefined
> {
  try {
    const response = await fetch(baseURL + `authentication/token/new`, {
      method: "GET",
      headers,
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function postLogin(
  loginData: LoginData
): Promise<RequestTokenResponse | undefined> {
  try {
    const response = await fetch(
      baseURL + `authentication/token/validate_with_login`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(loginData),
      }
    );

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function getSessionId(
  requestToken: string | undefined
): Promise<RequestSessionResponse | undefined> {
  try {
    const response = await fetch(baseURL + `authentication/session/new`, {
      method: "POST",
      headers,
      body: JSON.stringify({ request_token: requestToken }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function getUserInfo(
  sessionId: string | undefined
): Promise<UserInfo | undefined> {
  try {
    const response = await fetch(baseURL + `account?session_id=${sessionId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function deleteSession(
  sessionId: string | undefined
): Promise<{ success: boolean } | undefined> {
  try {
    const response = await fetch(baseURL + `authentication/session`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function getV4Login(): Promise<
  | {
      request_token: string;
      status_code: number;
      status_message: string;
      success: boolean;
    }
  | undefined
> {
  try {
    const redirectUrl =
      process.env.NODE_ENV !== "development"
        ? "https://movie-wave-streaming.vercel.app/"
        : "http://localhost:3000/";

    const response = await fetch(baseURLV4 + "auth/request_token", {
      method: "POST",
      headers,
      body: JSON.stringify({
        redirect_to: redirectUrl + "login?v4Access=true",
      }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function getV4AccessToken(
  requestToken: string
): Promise<RequestAccessTokenV4Response | undefined> {
  try {
    const response = await fetch(baseURLV4 + "auth/access_token", {
      method: "POST",
      headers,
      body: JSON.stringify({ request_token: requestToken }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function getSessionV4(
  accessToken: string | undefined
): Promise<RequestSessionResponse | undefined> {
  try {
    const response = await fetch(baseURL + "authentication/session/convert/4", {
      method: "POST",
      headers,
      body: JSON.stringify({ access_token: accessToken }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function deleteV4Session(
  accessToken: string | undefined
): Promise<{ success: boolean } | undefined> {
  try {
    const response = await fetch(baseURLV4 + `auth/access_token`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ access_token: accessToken }),
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
