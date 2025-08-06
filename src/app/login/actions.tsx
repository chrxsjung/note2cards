// src/app/login/actions.ts
"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(_: unknown, formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  const supabase = createServerActionClient({
    cookies: () => cookies(),
  });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  //redirect to dashboard after login success
  redirect("/dashboard");
}
