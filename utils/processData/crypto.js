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
