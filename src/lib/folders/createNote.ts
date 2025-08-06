"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createNote(
  title: string,
  content: string,
  folderId: string
) {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  await supabase.from("notes").insert({
    title,
    content,
    folder_id: folderId,
    user_id: session.user.id,
  });
}
