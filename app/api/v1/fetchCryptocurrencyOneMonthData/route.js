import { binanceFetcher } from "@/utils/fetchers/fetcher";
import { processedDataForTables } from "@/utils/processData/crypto";
import { NextResponse } from "next/server";

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  const symbol = request.nextUrl.searchParams.get("symbol");
  const url = `/v3/uiKlines?symbol=${symbol}USDT&interval=1M&limit=500`;

  try {
    const response = await binanceFetcher(url);

    const data = await response.json();

    const processedData = await processedDataForTables(
      data,
      lang === "en" || (lang === "es" && process.env.NODE_ENV === "production") ? "en-US" : "es-ES"
    );

    return NextResponse.json({ data: processedData }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
