import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import FoldersList from "@/components/folder/FolderList";
import { fetchFolders } from "@/lib/folders/fetchFolders";

export default async function DashboardPage() {
  const folders = await fetchFolders();
  const supabase = createServerComponentClient({
    cookies: () => cookies(), // async function returning Promise<ReadonlyRequestCookies>
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <FoldersList folders={folders} />
    </div>
  );
}
