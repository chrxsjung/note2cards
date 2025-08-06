export interface Note {
  id: string;
  title: string;
  content: string;
  folder_id: string;
  created_at: string;
  updated_at?: string;
}

export interface Folder {
  id: string;
  name: string;
  desc: string;
  created_at: string;
}

export interface FolderWithNotes extends Folder {
  notes: Note[];
}
