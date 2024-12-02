import { binanceFetcher } from "@/utils/fetchers/fetcher";
import { formatDate } from "@/utils/processData/date";
import { formatLargeNumber } from "@/utils/processData/numbers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const url = `/v3/uiKlines?symbol=${symbol}USDT&interval=1M&limit=500`;

  try {
    const response = await binanceFetcher(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const processedData = data
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
          openTime: formatDate(candle[0]),
          openPrice: formatLargeNumber(candle[1]),
          highPrice: formatLargeNumber(candle[2]),
          lowPrice: formatLargeNumber(candle[3]),
          closePrice: formatLargeNumber(candle[4]),
          volume: formatLargeNumber(candle[5]),
          closedTime: formatDate(candle[6]),
          numberOfTrades: formatLargeNumber(candle[8]),
          priceIsHigh: priceIsHigh,
        };
      })
      .reverse();

    return NextResponse.json({ data: processedData }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
  }
}
