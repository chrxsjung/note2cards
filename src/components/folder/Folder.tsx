// FolderCard.tsx

import Link from "next/link";
import { Folder } from "@/types";

export default function FolderCard({
  folder,
  onDelete,
}: {
  folder: Folder;
  onDelete: (folderId: string) => Promise<void>;
}) {
  return (
    <div className="p-4 border rounded-lg shadow flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">{folder.name}</h2>
        <p className="text-sm text-gray-500">{folder.desc}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {/* open button */}
        <Link
          href={`/dashboard/folder/${folder.id}`}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
        >
          Open
        </Link>
        <button
          onClick={async () => {
            if (
              window.confirm(
                "Are you sure you want to delete this folder? This cannot be undone and all notes in this folder will be deleted. FOREVER!!!"
              )
            ) {
              await onDelete(folder.id);
            }
          }}
          className="bg-red-600 text-white font-bold px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer flex items-center gap-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
