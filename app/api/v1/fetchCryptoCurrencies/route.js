import { NextResponse } from "next/server";

const apiKey = process.env.CMC_API_KEY;

  export async function GET(request) {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  
    try {
      const response = await fetch(url, {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      const cryptocurrencies = data.data;
  
      // Llama a la función de servicio para procesar los datos
      const cryptocurrenciesForIndex = processCryptoData(cryptocurrencies);
  
      return NextResponse.json(
        { data: cryptocurrenciesForIndex },
        { status: 200 }
      );
    } catch (error) {
      console.error("🚀 ~ GET ~ error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

const processCryptoData = (cryptocurrencies) => {
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
