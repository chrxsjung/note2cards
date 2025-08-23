"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignup(_: unknown, formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  // Basic validation
  if (email.length > 254) {
    return { error: "Email too long" };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }
  
  const supabase = createServerActionClient({
    cookies: () => cookies(),
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
