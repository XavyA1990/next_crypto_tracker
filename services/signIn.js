"use server";

import { createClient } from "@/utils/supabase/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (provider) => {
  const origin = headers().get("origin");
  const supabase = await createClient();
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/v1/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return;
  } else {
    redirect(data.url);
  }

};
