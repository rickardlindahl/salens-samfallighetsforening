import { EditorContent as EditorContentPrimitive } from "@tiptap/react";

import { useEditor } from "./editor-context";

export function EditorContent({
  children,
  loadingContent,
}: {
  children: React.ReactNode;
  loadingContent?: React.ReactNode;
}) {
  const editor = useEditor();

  if (!editor && loadingContent) {
    return loadingContent;
  }

  return (
    <div className="rounded-md border">
      <EditorContentPrimitive
        editor={editor}
        className="prose prose-sm prose-slate dark:prose-invert min-h-[5rem] max-w-none resize-y rounded-md p-4 focus:outline-none"
      />
      {children}
    </div>
  );
}
