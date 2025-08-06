"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import { createNote } from "@/lib/folders/createNote";
import { updateNote } from "@/lib/folders/updateNote";
import { Note } from "@/types";

type Props = {
  folderId: string;
  onCancel: () => void;
  note?: Pick<Note, "id" | "title" | "content">;
};

// if note prop is sent means its update if not show create

export default function CreateNoteForm({ folderId, onCancel, note }: Props) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const router = useRouter();

  const handleSubmit = async () => {
    if (note) {
      await updateNote(note.id, title, content); // editing
    } else {
      await createNote(title, content, folderId); // creating
    }

    router.refresh();
    onCancel();
  };

  return (
    <div className="space-y-6 border p-6 rounded-md bg-white text-black mt-6 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full px-4 py-3 border rounded"
      />
      <RichTextEditor content={content} onChange={setContent} />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {note ? "Update Note" : "Save Note"}
        </button>
      </div>
    </div>
  );
}
