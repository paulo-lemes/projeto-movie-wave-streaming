"use server";

import {
  content,
  LoginData,
  PostContentObj,
  RequestSessionResponse,
  RequestTokenResponse,
} from "@/types";

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

export async function getRequestToken(): Promise<
  RequestTokenResponse | undefined
> {
  try {
    const response = await fetch(
      process.env.BASE_URL + `authentication/token/new`,
      {
        method: "GET",
        headers,
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

export async function postLogin(
  loginData: LoginData
): Promise<RequestTokenResponse | undefined> {
  try {
    const response = await fetch(
      process.env.BASE_URL + `authentication/token/validate_with_login`,
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
    const response = await fetch(
      process.env.BASE_URL + `authentication/session/new`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ request_token: requestToken }),
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

export async function getContentAccount(
  toggle: string,
  accountId: string,
  contentType: string | undefined
): Promise<content[] | [] | undefined> {
  try {
    const response = await fetch(
      process.env.BASE_URL +
        `account/${accountId}/${toggle}/${contentType}?language=pt-BR&page=1`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    console.log(data);

    return data.results;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function postContentList(
  toggle: string,
  accountId: string,
  bodyParam: PostContentObj
) {
  try {
    const response = await fetch(
      process.env.BASE_URL + `account/${accountId}/${toggle}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify(bodyParam),
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
