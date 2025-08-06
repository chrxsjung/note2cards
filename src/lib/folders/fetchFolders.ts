"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function fetchFolders() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id);
    
  //only get folders that are owned by the user

  if (error) throw error;

  return data;
}
