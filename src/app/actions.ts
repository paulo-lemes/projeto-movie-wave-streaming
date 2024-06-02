"use server";

import { content } from "@/types";

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

export async function getFavoritesAccount(
  accountId: string,
  contentType: string | undefined
): Promise<content[] | [] | undefined> {
  try {
    const response = await fetch(
      process.env.BASE_URL +
        `account/${accountId}/favorite/${contentType}?language=pt-BR&page=1`,
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

export async function postFavorite(
  accountId: string,
  bodyParam: {
    media_type: string | undefined;
    media_id: number;
    favorite: boolean;
  }
) {
  try {
    const response = await fetch(
      process.env.BASE_URL + `account/${accountId}/favorite`,
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
