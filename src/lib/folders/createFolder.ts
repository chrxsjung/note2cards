"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createFolder(name: string, desc: string) {
  const supabase = createServerActionClient({
    cookies: () => cookies(),
  });

  const { data, error } = await supabase.from("folders").insert({ name, desc });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");

  return data;
}
