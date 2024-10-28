'use server';

import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(req) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin);
}