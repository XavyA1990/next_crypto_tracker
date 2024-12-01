"use server";

const CMC_API_KEY = process.env.CMC_API_KEY;

const CMS_API_URL = "https://pro-api.coinmarketcap.com";

const BINANCE_API_URL = "https://api.binance.com/api";

const CRYPTO_NEWS_API_KEY = process.env.CRYPTO_NEWS_API_KEY;

const CRYPTO_NEWS_API_URL = "https://cryptonews-api.com/api/v1";

const LOCAL_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const cmcFetcher = async (path, forceCache) => {
  const response = await fetch(CMS_API_URL + path, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
    cache: forceCache ? "force-cache" : "no-store",
  });
  return response;
};

export const binanceFetcher = async (path) => {
  const response = await fetch(BINANCE_API_URL + path);
  return response;
};

export const cryptoNewsFetcher = async (path) => {
  const response = await fetch(CRYPTO_NEWS_API_URL + path + `&token=${CRYPTO_NEWS_API_KEY}`);
  return response;
};

export const localAPIFetcher = async (path, method, body, headers) => {
  const response = await fetch(LOCAL_API_URL + path, {
    method: method || "GET",
    body: body ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response;
};
