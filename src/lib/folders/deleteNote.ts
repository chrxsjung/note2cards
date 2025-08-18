"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteNote(noteId: string) {
  const supabase = createServerActionClient({
    cookies: () => cookies(),
  }); 

  const { data, error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }

  

  revalidatePath("/dashboard");

  return data;
}
