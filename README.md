yooo

note taking app with AI summary and flash cards 

i wanna make folders for each class and notes inside. 

supabase foreign key for note to be linked to one folder id.

i wanna finish this before school starts so i can lowk use it 

tech:

folder grid component with individual folder card

open folder card

notes grid with individual note card


so if showEditor state is yes (meaing button is pressed) then we call CreateNoteForm which is responsible for displaying the text editor which cals RichTextEditor which is soley responsible for actually making the text editor  ...


# Rich Text Note Creation Flow

This document explains how rich text note creation works inside the `note2cards` app.

---

## Component Flow

The following flow is used when a user wants to create a new note inside a folder:

```txt
User clicks "Create Note" button
→ showEditor state becomes true in FolderPageClient
→ CreateNoteForm component is rendered
→ RichTextEditor component (Tiptap) is mounted inside CreateNoteForm
```

---

## Component Breakdown

### 1. `FolderPageClient.tsx`
- Controls the visibility of the `CreateNoteForm` using the `showEditor` state.
- Displays the "Create Note" button.

```tsx
const [showEditor, setShowEditor] = useState(false);

{showEditor && (
  <CreateNoteForm
    folderId={folder.id}
    onCancel={() => setShowEditor(false)}
  />
)}
```

### 2. `CreateNoteForm.tsx`
- Handles the UI for creating a new note.
- Accepts the `folderId` and `onCancel` props.
- Renders an input for the note title.
- Mounts the `RichTextEditor` for the content.
- On submission, calls the `createNote(title, content, folderId)` server action.
- Refreshes the page and closes the editor.

### 3. `RichTextEditor.tsx`
- This is the Tiptap-powered rich text editor.
- Accepts `content` and `onChange` props.
- Uses `useEditor()` from Tiptap with `StarterKit` extension.
- Handles SSR issues with `immediatelyRender: false`.

```tsx
const editor = useEditor({
  extensions: [StarterKit],
  content,
  onUpdate({ editor }) {
    onChange(editor.getHTML());
  },
  immediatelyRender: false, // prevents SSR hydration mismatch
});
```

✅ Make sure this file uses `"use client"` since it uses hooks.

---

## Summary

This structure separates logic cleanly:

- `FolderPageClient` → controls whether to show the form.
- `CreateNoteForm` → handles form state and submission.
- `RichTextEditor` → renders the editor.

