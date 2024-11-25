import { calculateVoteStatistics } from "@/utils/processData/crypto";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { userId, slug, symbol, name, vote } = body;

    if (!userId || !slug || !symbol || !name || !vote) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

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
          { message: newCryptocurrencyError.message },
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

    const preferenceUpdate =
      vote === "is_bullish"
        ? { is_bullish: true, is_bearish: false }
        : { is_bullish: false, is_bearish: true };

    const { error: preferenceError } = await supabase
      .from("user_cryptocurrency_preferences")
      .upsert(
        {
          user_id: userId,
          cryptocurrency_id: cryptocurrencyId,
          ...preferenceUpdate,
        },
        {
          onConflict: ["user_id", "cryptocurrency_id"],
        }
      );

    if (preferenceError) {
      return NextResponse.json(
        {
          message: "Error updating preferences",
          error: preferenceError.message,
        },
        { status: 500 }
      );
    }

    const { data: voteTotals, error: voteTotalsError } = await supabase
      .from("user_cryptocurrency_preferences")
      .select("is_bullish, is_bearish")
      .eq("cryptocurrency_id", cryptocurrencyId);

    if (voteTotalsError) {
      return NextResponse.json(
        {
          message: "Error fetching vote totals",
          error: voteTotalsError.message,
        },
        { status: 500 }
      );
    }

    const { totalVotes, totalBearishVotes, totalBullishVotes, percentages } =
      calculateVoteStatistics(voteTotals);

    return NextResponse.json(
      {
        message: "Success",
        vote,
        totals: {
          total_votes: totalVotes,
          total_bullish_votes: totalBullishVotes,
          total_bearish_votes: totalBearishVotes,
          percentages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
