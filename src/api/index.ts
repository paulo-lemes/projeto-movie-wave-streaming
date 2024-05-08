const baseURL = "https://api.themoviedb.org/3/";

const apiToken = process.env.API_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiToken}`,
};

export async function getApiContent(path: string) {
  const response = await fetch(baseURL + path, {
    method: "GET",
    headers,
  })

  return response.json()
}
