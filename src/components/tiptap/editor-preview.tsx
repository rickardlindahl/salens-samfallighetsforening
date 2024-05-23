"use client";

import Typography from "@tiptap/extension-typography";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorContext } from "./editor-context";

interface TipTapEditorProps {
  content: JSONContent;
}

export function EditorPreview(props: TipTapEditorProps) {
  const editor = useEditor({
    editable: true,
    extensions: [StarterKit, Typography],
    content: props.content,
    editorProps: {
      editable: () => false,
    },
  });
  if (!editor) {
    return (
      <div className="w-full animate-pulse rounded-md border">
        <div className="h-20" />
      </div>
    );
  }
  return (
    <EditorContext.Provider value={editor}>
      <EditorContent
        editor={editor}
        className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
      />
    </EditorContext.Provider>
  );
}
