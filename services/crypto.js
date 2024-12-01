"use server";

import { localAPIFetcher } from "@/utils/fetchers/fetcher";


export const fetchCryptoCurrencies = async () => {

  const url = `/fetchCryptoCurrencies`;

  try {
    const response = await localAPIFetcher(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const cryptocurrencies = data.data;

    return cryptocurrencies;
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return { error: error.message };
  }
};

export const fetchCryptoCurrency = async (slug) => {

  const url = `/fetchCryptoCurrency?slug=${slug}`;

  try {
    const response = await localAPIFetcher(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const cryptocurrencies = data.data;

    return cryptocurrencies;
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return { error: error.message };
  }
};


export const fetchCryptocurrencyInfo  = async (slug) => {

  const url = `/fetchCryptocurrencyMetaData?slug=${slug}`;

  try {
    const response = await localAPIFetcher(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const cryptocurrencyInfo = data.data;

    return cryptocurrencyInfo;

  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return { error: error.message };
  }
};

export const fetchHistoricalData = async (symbol) => {

  const url = `/fetchCryptocurrencyHistoricalData?symbol=${symbol}`;

  try {
    const response = await localAPIFetcher(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const formattedCandles = data.data;

    return formattedCandles;

  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return { error: error.message };
  }
};

export const postFavorites = async (body) => {
  const url = `/toggleFavorites`;
  const res = await localAPIFetcher(url, "POST", body);

  const data = await res.json();

  return data;
};

export const postVotes = async (body) => {
  const url = `/insertVotes`;
  const res = await localAPIFetcher(url, "POST", body);

  const data = await res.json();

  return data;
};

export const fetchUserCryptoPreference = async (userId, slug) => {
  const url = `/fetchUserCryptoPreference`;
  const res = await localAPIFetcher(url, "POST", { userId, slug });

  const data = await res.json();

  return data;
};

export const fetchAllFavorites = async (userId) => {
  const url = `/fetchAllFavorites`;
  const res = await localAPIFetcher(url, "POST", { userId });

  const data = await res.json();

  return data;
};

export const fetchFearGreedStats = async () => {
  const url = `/fetchLatestFearAndGreed`;
  const res = await localAPIFetcher(url);

  const data = await res.json();

  return data;
};

export const fetchCryptoNewsRanking = async () => {
  const url = `/fetchCryptoNewsRanking`;
  const res = await localAPIFetcher(url);

  const data = await res.json();

  return data;
};
