import { createClient } from "@/utils/supabase/client";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { userId, symbol, name, slug, isFavorite } = body;

    if (!userId || !symbol || !name || !slug || isFavorite === undefined) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { data: fetchCryptoData, error: fetchCryptoError } = await supabase
      .from("cryptocurrencies")
      .select("id")
      .eq("symbol", symbol)
      .single();

    let cryptocurrencyId = null;

    if (!fetchCryptoData) {
      const { data: newCryptocurrency, error: newCryptocurrencyError } =
        await supabase
          .from("cryptocurrencies")
          .insert([{ symbol, name, slug }])
          .single();

      if (newCryptocurrencyError) {
        return NextResponse.json(
          { message: "Error creating new cryptocurrency" },
          { status: 500 }
        );
      }

      const { data: fetchNewCryptoData, error: fetchNewCryptoError } =
        await supabase
          .from("cryptocurrencies")
          .select("id")
          .eq("symbol", symbol)
          .single();

      cryptocurrencyId = fetchNewCryptoData.id;
    } else {
      cryptocurrencyId = fetchCryptoData.id;
    }

    const { error: favoriteError } = await supabase
      .from("user_cryptocurrency_preferences")
      .upsert(
        {
          user_id: userId,
          cryptocurrency_id: cryptocurrencyId,
          is_favorite: isFavorite,
        },
        { onConflict: ["user_id", "cryptocurrency_id"] }
      );

    if (favoriteError) {
      console.log("🚀 ~ POST ~ favoriteError:", favoriteError);
      return NextResponse.json(
        { message: "Error setting favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Success", data: { is_favorite: isFavorite } },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚀 ~ POST ~ error", error.message);
    return NextResponse.json(
      { message: "Error setting favorite" },
      { status: 500 }
    );
  }
}
