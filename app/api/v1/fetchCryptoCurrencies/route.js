import { processCryptoData } from "@/utils/procesData/crypto";
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
