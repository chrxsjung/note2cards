"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FolderWithNotes } from "@/types";

export async function getNotes(
  folderId: string
): Promise<FolderWithNotes | null> {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: folder, error } = await supabase
    .from("folders")
    .select(
      "id, name, desc, created_at, notes(id, title, content, folder_id, created_at)"
    )
    .eq("id", folderId)
    .single();

  if (error || !folder) {
    console.error("error fetching folder", error);
    return null;
  }

  return folder;
}
