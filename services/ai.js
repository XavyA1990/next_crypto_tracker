"use server";

import { localAPIFetcher } from "@/utils/fetchers/fetcher";

export const sendAiCryptoSuggestionRequest = async (data) => {
  const url = "/sendAiCryptoSuggestionRequest";

  const res = await localAPIFetcher(url, "POST", { data });

  const response = await res.json();

  return response.data;
};
