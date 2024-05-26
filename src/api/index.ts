const baseURL = process.env.BASE_URL;
const apiToken = process.env.API_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiToken}`,
};

export async function getApiContent(path: string) {
  try {
    const response = await fetch(baseURL + path, {
      method: "GET",
      headers,
    });

    if (!response.ok)
      throw new Error(`Status ${response.status}- ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
