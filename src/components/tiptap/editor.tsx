"use client";

import Typography from "@tiptap/extension-typography";
import { type Content, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContext } from "./editor-context";

interface RenderProps {
  getJSON: () => JSONContent | undefined;
}

interface TipTapEditorProps {
  children: (renderProps: RenderProps) => React.ReactNode;
  content?: Content;
}

export function Editor(props: TipTapEditorProps) {
  const editor = useEditor({
    editable: true,
    extensions: [StarterKit, Typography],
    content: props.content,
  });

  return (
    <EditorContext.Provider value={editor}>
      {props.children({
        getJSON: () => editor?.getJSON(),
      })}
    </EditorContext.Provider>
  );
}
