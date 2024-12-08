import { formatDate } from "./date";
import { formatLargeNumber } from "./numbers";

export const processCryptoData = (cryptocurrencies) => {
  return cryptocurrencies.map((crypto) => {
    return {
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      slug: crypto.slug,
      quote: {
        USD: {
          price: crypto.quote.USD.price,
          volume_24h: crypto.quote.USD.volume_24h,
          percent_change_24h: crypto.quote.USD.percent_change_24h,
          market_cap: crypto.quote.USD.market_cap,
          last_updated: crypto.quote.USD.last_updated,
        },
      },
      image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`,
    };
  });
};

export const calculateVoteStatistics = (voteTotals) => {
  const totalBullishVotes = voteTotals.filter((vote) => vote.is_bullish).length;
  const totalBearishVotes = voteTotals.filter((vote) => vote.is_bearish).length;

  const totalVotes = totalBullishVotes + totalBearishVotes;

  const bullishPercentage =
    totalVotes > 0 ? ((totalBullishVotes / totalVotes) * 100).toFixed(2) : 0;

  const bearishPercentage =
    totalVotes > 0 ? ((totalBearishVotes / totalVotes) * 100).toFixed(2) : 0;

  return {
    totalVotes,
    totalBullishVotes,
    totalBearishVotes,
    percentages: {
      bullish: bullishPercentage,
      bearish: bearishPercentage,
    },
  };
};

export const processedDataForTables = (data, lang = "es-ES") => {
  return data
    .map((candle) => {
      let priceIsHigh = null;

      if (candle[4] > candle[1]) {
        priceIsHigh = "up";
      } else if (candle[4] < candle[1]) {
        priceIsHigh = "down";
      } else {
        priceIsHigh = "flat";
      }

      return {
        openTime: formatDate(candle[0], lang),
        openPrice: formatLargeNumber(candle[1]),
        highPrice: formatLargeNumber(candle[2]),
        lowPrice: formatLargeNumber(candle[3]),
        closePrice: formatLargeNumber(candle[4]),
        volume: formatLargeNumber(candle[5]),
        closedTime: formatDate(candle[6], lang),
        numberOfTrades: formatLargeNumber(candle[8]),
        priceIsHigh: priceIsHigh,
      };
    })
    .reverse();
};

export const processedDataForAi = (data) => {
  return data.map((candle) => {
    let priceIsHigh = null;

    if (candle[4] > candle[1]) {
      priceIsHigh = "up";
    } else if (candle[4] < candle[1]) {
      priceIsHigh = "down";
    } else {
      priceIsHigh = "flat";
    }

    return {
      openTime: formatDate(candle[0]),
      openPrice: candle[1],
      highPrice: candle[2],
      lowPrice: candle[3],
      closePrice: candle[4],
      volume: candle[5],
      closedTime: formatDate(candle[6]),
      numberOfTrades: candle[8],
      priceIsHigh: priceIsHigh,
    };
  });
};
