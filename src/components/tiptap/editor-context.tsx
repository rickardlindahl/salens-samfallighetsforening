import React from "react";
import type { Editor } from "@tiptap/react";

export const EditorContext = React.createContext<Editor | null>(null);

export function useEditor() {
  return React.useContext(EditorContext) as Editor;
}
