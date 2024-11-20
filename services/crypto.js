"use server";

import { headers } from "next/headers";

export const fetchCryptoCurrencies = async () => {

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchCryptoCurrencies`;

  try {
    const response = await fetch(url);
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchCryptoCurrency?slug=${slug}`;

  try {
    const response = await fetch(url);
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchCryptocurrencyMetaData?slug=${slug}`;

  try {
    const response = await fetch(url);
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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchCryptocurrencyHistoricalData?symbol=${symbol}`;

  try {
    const response = await fetch(url);
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