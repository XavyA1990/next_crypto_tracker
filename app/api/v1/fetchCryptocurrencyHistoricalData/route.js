import { binanceFetcher } from "@/utils/fetchers/fetcher";
import { NextResponse } from "next/server";

export async function GET(request) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const url = `/v3/klines?symbol=${symbol}USDT&interval=1m&limit=500`;

  try {
    const response = await binanceFetcher(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const formattedCandles = data.map((candle) => ({
      time: candle[0] / 1000,
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
    }));

    return NextResponse.json({ data: formattedCandles }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
  }
}
