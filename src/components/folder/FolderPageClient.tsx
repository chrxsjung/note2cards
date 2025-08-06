"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import NotesList from "@/components/notes/NotesList";
import CreateNoteForm from "@/components/notes/CreateNoteForm";
import { FolderWithNotes } from "@/types";

export default function FolderPageClient({
  folder,
}: {
  folder: FolderWithNotes;
}) {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor) {
    return (
      <div className="fixed inset-0 bg-white text-black z-50 overflow-y-auto px-4 py-6 w-screen h-screen">
        <div className="max-w-5xl mx-auto">
          <CreateNoteForm
            folderId={folder.id}
            onCancel={() => setShowEditor(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <div>
          <h1 className="text-4xl font-bold">Folder for "{folder.name}"</h1>
          <p className="text-gray-400 mt-2">{folder.desc}</p>
        </div>
        <button
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2 mb-8 mt-4 md:mt-0"
          onClick={() => setShowEditor(true)}
        >
          <span>Create Note</span>
          <Plus size={20} />
        </button>
      </div>

      {folder.notes.length === 0 ? (
        <p className="text-gray-300 text-2xl font-bold text-center px-4 mt-12 ">
          No notes yet. Create one to get started!
        </p>
      ) : (
        <NotesList notes={folder.notes} />
      )}
    </div>
  );
}
