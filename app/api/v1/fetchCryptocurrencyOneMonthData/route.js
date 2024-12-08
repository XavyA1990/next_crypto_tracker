import { binanceFetcher } from "@/utils/fetchers/fetcher";
import { processedDataForTables } from "@/utils/processData/crypto";
import { NextResponse } from "next/server";

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  const symbol = request.nextUrl.searchParams.get("symbol");
  const url = `/v3/uiKlines?symbol=${symbol}USDT&interval=1M&limit=500`;

  try {
    const response = await binanceFetcher(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const processedData = await processedDataForTables(
      data,
      lang === "en" ? "en-US" : "es-ES"
    );

    return NextResponse.json({ data: processedData }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
  }
}
