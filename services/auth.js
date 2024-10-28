"use server";

import { createClient } from "@/utils/supabase/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (provider) => {
  const origin = headers().get("origin");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
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

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  return user?.user_metadata || {};
};

export const signOut = async () => {
  const supabase = await createClient();
  const origin = headers().get("origin");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    return;
  } else {
    redirect(origin);
  }
};
