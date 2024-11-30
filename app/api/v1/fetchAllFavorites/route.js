import { cmcFetcher } from "@/utils/fetchers/fetcher";
import { processCryptoData } from "@/utils/processData/crypto";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("user_cryptocurrency_preferences")
      .select(`cryptocurrencies (slug, id, name, symbol)`)
      .eq("user_id", userId)
      .eq("is_favorite", true);

    if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json(
        {
          message: "No data found",
          data: [],
        },
        { status: 200 }
      );
    }

    let fetchApiSymbols = [];

    data.map((crypto) => {
      fetchApiSymbols.push(crypto.cryptocurrencies.slug);
    });

    const url = `/v1/cryptocurrency/quotes/latest?slug=${fetchApiSymbols.join(
      ","
    )}`;

    const response = await cmcFetcher(url);

    if (!response.ok) {
      console.log("🚀 ~ POST ~ response:", response)
      throw new Error(`${response.message} ${response.status}`);
    }

    const responseData = await response.json();

    const cryptocurrenciesArray = Object.values(responseData.data);

    const cryptocurrenciesForFavorites = processCryptoData(cryptocurrenciesArray);

    return NextResponse.json({ message: "Success", data: cryptocurrenciesForFavorites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
