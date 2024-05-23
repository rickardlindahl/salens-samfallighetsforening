"use client";

import { useEditor, EditorContent, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Tiptap({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? "<p>Hello World! 🌎</p>",
  });

  return <EditorContent editor={editor} />;
}
