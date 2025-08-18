"use client";

import FolderCard from "@/components/folder/Folder";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { fetchFolders } from "@/lib/folders/fetchFolders";
import { createFolder } from "@/lib/folders/createFolder";
import { deleteFolder } from "@/lib/folders/deleteFolder";
import { Folder } from "@/types";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [allFolders, setAllFolders] = useState(folders);
  const router = useRouter();

  async function handleCreateFolder(name: string, desc: string) {
    if (!name.trim()) {
      return; // Don't create folder if name is empty or only whitespace
    }
    await createFolder(name, desc); // server action to save to db
    router.refresh(); // efficient revalidation like notes
    setFolderName(""); // clear input
    setIsCreatingFolder(false); // close the form
  }

  async function handleDeleteFolder(folderId: string) {
    // Optimistic update - remove from UI immediately
    setAllFolders((prev) => prev.filter((folder) => folder.id !== folderId));

    // Delete from database
    await deleteFolder(folderId);
  }
  if (isCreatingFolder) {
    return (
      <div className="flex items-center justify-center flex-col gap-6">
        <h1 className="text-5xl font-bold text-center mt-12">Create Folder</h1>

        <div className="w-full max-w-xl border border-gray-600 rounded-xl p-8 bg-[#1a1a1a] shadow-md">
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-4 py-3 rounded-md text-white-500 border-2 border-gray-400"
            />
            <input
              type="text"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              placeholder="Enter folder description"
              className="w-full px-4 py-3 rounded-md text-white-500 border-2 border-gray-400"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                className="bg-red-600 text-white font-bold px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={() => setIsCreatingFolder(false)}
              >
                Cancel
              </button>
              <button
                className={`font-bold px-4 py-2 rounded-md transition ${
                  folderName.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={() =>
                  handleCreateFolder(folderName, folderDescription)
                }
                disabled={!folderName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (folders.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <p className="text-gray-300 text-2xl font-bold text-center px-4 mt-12">
          No folders yet. Create one to get started!
        </p>
        <button
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
          onClick={() => setIsCreatingFolder(true)}
        >
          <span>Create Folder</span>
          <Plus size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto mt-12">
      {/* heading + button aligned */}
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <h1 className="text-4xl font-bold">Your Folders</h1>
        <button
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2 mt-4 md:mt-0"
          onClick={() => setIsCreatingFolder(true)}
        >
          <span>Create Folder</span>
          <Plus size={20} />
        </button>
      </div>

      {/* folder grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-40 mt-10">
        {allFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onDelete={handleDeleteFolder}
          />
        ))}
      </div>
    </div>
  );
}
