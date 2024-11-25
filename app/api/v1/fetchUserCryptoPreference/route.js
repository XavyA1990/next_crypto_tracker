import { calculateVoteStatistics } from "@/utils/processData/crypto";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const { userId, slug } = body;

    if (!userId || !slug) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("user_cryptocurrency_preferences")
      .select(
        `is_favorite, is_bullish, is_bearish, cryptocurrencies!inner (slug)`
      )
      .eq("user_id", userId)
      .eq("cryptocurrencies.slug", slug)
      .single();

    const { data: voteTotals, error: voteTotalsError } = await supabase
      .from("user_cryptocurrency_preferences")
      .select(`is_bullish, is_bearish, cryptocurrencies!inner (slug)`)
      .eq("cryptocurrencies.slug", slug);
      
      let totals = {};
      
      if (voteTotals && voteTotals.length > 0) {
        const { percentages, totalBearishVotes, totalBullishVotes, totalVotes } = calculateVoteStatistics(voteTotals);
        
        totals = {
          total_votes: totalVotes,
          total_bullish_votes: totalBullishVotes,
          total_bearish_votes: totalBearishVotes,
          percentages,
        };
      }

    let vote = null;
      
    if (!data || error) {
      return NextResponse.json(
        {
          message: "No data found",
          data: {
            vote,
            is_favorite: false,
            is_bullish: null,
            is_bearish: null,
            cryptocurrencies: null,
            totals,
          },
        },
        { status: 200 }
      );
    }

    if (data && !error) {
     if (data.is_bullish) {
        vote = "is_bullish";
      } else if (data.is_bearish) {
        vote = "is_bearish";
      }
    }

    return NextResponse.json(
      { message: "Success", data: { ...data, totals, vote } },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}