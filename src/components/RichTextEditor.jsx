import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: { HTMLAttributes: { class: "tiptap-paragraph" } },
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor-area",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper">
      <div className="tiptap-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}>B</button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}>I</button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}>U</button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}>H1</button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}>H2</button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "active" : ""}>H3</button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}>• List</button>

        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}>1. List</button>

        <button onClick={() => editor.chain().focus().undo().run()}>↺</button>
        <button onClick={() => editor.chain().focus().redo().run()}>↻</button>
      </div>
      <EditorContent editor={editor} className="tiptap-editor" />

      <style>{`
        .tiptap-wrapper {
          border: 1px solid #d1d5db;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          font-family: Inter;
        }

        .tiptap-toolbar {
          display: flex;
          gap: 6px;
          padding: 10px;
          border-bottom: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .tiptap-toolbar button {
          border: none;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .tiptap-toolbar button.active {
          background: #0b63f8;
          color: white;
        }

        .tiptap-editor {
          min-height: 180px;
          padding: 14px;
        }

        .tiptap-editor-area:focus {
          outline: none;
        }

        @media (max-width: 900px) {
          .tiptap-toolbar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
