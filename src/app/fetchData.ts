import { ApiResponse, Content } from "@/types";

async function fetchPage(page: number, url: string): Promise<ApiResponse> {
  const response = await fetch(url + `&page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (process.env.NODE_ENV === "development") console.log(data);
  return data;
}

export async function fetchAllData(url: string): Promise<Content[] | []> {
  let allData: Content[] = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
    if (process.env.NODE_ENV === "development")
      console.log(`Página: ${currentPage}`);
    const {
      results,
      page: current,
      total_pages: total,
    } = await fetchPage(currentPage, url);
    allData = allData.concat(results);
    currentPage = current + 1;
    totalPages = total;
  } while (currentPage <= totalPages);

  if (process.env.NODE_ENV === "development") console.log(allData);

  return allData;
}
