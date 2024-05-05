const baseURL = "https://api.themoviedb.org/3/";

const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiToken}`,
};

export async function requestAPI(method: string, path: string) {
  fetch(baseURL + path, {
    method,
    headers,
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
