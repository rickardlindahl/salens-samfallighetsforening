"use client";

import { extensions } from "@/lib/tiptap-extensions";
import { type Content, type JSONContent, useEditor } from "@tiptap/react";
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
    extensions,
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
