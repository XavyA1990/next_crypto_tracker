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
  