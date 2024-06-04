"use server";

import {
  LoginData,
  RequestSessionResponse,
  RequestTokenResponse,
  UserInfo,
} from "@/types";

const baseURL = process.env.BASE_URL;
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
