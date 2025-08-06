// src/actions/logout.ts
"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogout() {
  const supabase = createServerActionClient({ cookies: () => cookies() });

  await supabase.auth.signOut();

  redirect("/login");
}
