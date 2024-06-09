import { content } from "@/types";

export interface ApiResponse {
  page: number;
  results: content[];
  total_pages: number;
  total_results: number;
}

async function fetchPage(page: number, url: string): Promise<ApiResponse> {
  const response = await fetch(url + `&page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function fetchAllData(url: string): Promise<content[] | []> {
  let allData: content[] = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
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

  console.log(allData);

  return allData;
}
