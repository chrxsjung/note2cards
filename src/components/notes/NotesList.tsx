import NoteCard from "@/components/notes/NoteCard";
import { Note } from "@/types";

export default function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-40">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
