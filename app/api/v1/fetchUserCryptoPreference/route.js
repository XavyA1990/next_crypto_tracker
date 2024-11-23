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
      .select(`is_favorite, cryptocurrencies!inner (slug)`)
      .eq("user_id", userId)
      .eq("cryptocurrencies.slug", slug)
      .single();

    if (!data || error) {
      console.log("🚀 ~ POST ~ error:", error)
      return NextResponse.json(
        {
          message: "No data found",
          data: { is_favorite: false, cryptocurrencies: null },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
