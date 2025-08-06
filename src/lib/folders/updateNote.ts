"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateNote(noteId: string, title: string, content: string) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", noteId);

  if (error) {
    console.error("Error updating note:", error);
    return null;
  }

  return true;
}
