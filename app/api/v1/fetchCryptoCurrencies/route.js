import { cmcFetcher } from "@/utils/fetchers/fetcher";
import { processCryptoData } from "@/utils/processData/crypto";
import { NextResponse } from "next/server";

  export async function GET(request) {
    const url = "/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins";
  
    try {
      const response = await cmcFetcher(url, true);
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      const cryptocurrencies = data.data;
  
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
