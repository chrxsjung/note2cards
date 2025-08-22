"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { Extension } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full h-full text-base placeholder:text-gray-400",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    autofocus: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      className="border border-black bg-white text-black rounded-xl shadow-sm p-6 h-[650px] w-full cursor-text overflow-y-auto"
      onClick={() => editor.commands.focus()}
    >
      {/* === Toolbar === */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().setColor("#e11d48").run()}
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#000000").run()}
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Black
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: "36px" }) // or any size you want
              .run()
          }
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Header
        </button>

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontSize: "16px" }) // or any size you want
              .run()
          }
          className="px-2 py-1 border rounded text-sm  hover:bg-gray-200 transition cursor-pointer"
        >
          Normal
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
