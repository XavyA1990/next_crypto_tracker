import { translateText } from "@/services/translate";
import { NextResponse } from "next/server";

const apiKey = process.env.CMC_API_KEY;

export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("slug");
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${slug}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        Accept: "application/json",
      },
    });

    const data = await response.json();


    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const key = Object.keys(data.data)[0];

    const cryptocurrencyInfo = data.data[key];

    const translatedDescription = await translateText(cryptocurrencyInfo.description);

    const parsedCryptoInfo = {
      id: cryptocurrencyInfo.id,
      slug: cryptocurrencyInfo.slug,
      name: cryptocurrencyInfo.name,
      symbol: cryptocurrencyInfo.symbol,
      description: translatedDescription,
      logo: cryptocurrencyInfo.logo,
      website: cryptocurrencyInfo.urls.website[0],
    };
    
    return NextResponse.json({ data: parsedCryptoInfo }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
