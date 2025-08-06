"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import CreateNoteForm from "./CreateNoteForm";
import { Note } from "@/types";

export default function NoteCard({ note }: { note: Note }) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      <div className="p-4 border rounded-lg shadow flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">{note.title}</h2>
        </div>

        <div className="text-sm text-gray-400 mt-4 flex justify-between items-center">
          <span>Created at: {new Date(note.created_at).toLocaleDateString()}</span>
          <button
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
            onClick={() => setShowEditor(true)}
          >
            <span>Edit</span>
            <Pencil size={20} />
          </button>
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <CreateNoteForm
              folderId={note.folder_id}
              note={note}
              onCancel={() => setShowEditor(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
