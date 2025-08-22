import NoteCard from "@/components/notes/NoteCard";
import { Note } from "@/types";

export default function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="flex flex-wrap gap-6">
      {notes.map((note) => (
        <div key={note.id} className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)]">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}
