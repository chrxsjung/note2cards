import { getNotes } from "@/lib/folders/fetchNotes";
import Navbar from "@/components/Navbar";
import FolderPageClient from "@/components/folder/FolderPageClient";
import { notFound } from "next/navigation";

export default async function FolderPage({
  params,
}: {
  params: { folderId: string };
}) {
  const folder = await getNotes(params.folderId);
  if (!folder) notFound();

  return (
    <>
      <Navbar />
      <FolderPageClient folder={folder} />
    </>
  );
}
