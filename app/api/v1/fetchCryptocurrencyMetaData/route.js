import { translateText } from "@/services/translate";
import { cmcFetcher } from "@/utils/fetchers/fetcher";
import { NextResponse } from "next/server";

const apiKey = process.env.CMC_API_KEY;

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  const slug = request.nextUrl.searchParams.get("slug");
  const url = `/v2/cryptocurrency/info?slug=${slug}`;
  try {
    const response = await cmcFetcher(url, true);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const key = Object.keys(data.data)[0];

    const cryptocurrencyInfo = data.data[key];

    const translatedDescription =
      lang === "es" && process.env.NODE_ENV !== "production"
        ? await translateText(cryptocurrencyInfo.description)
        : cryptocurrencyInfo.description;

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
