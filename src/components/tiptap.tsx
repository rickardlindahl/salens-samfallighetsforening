import {
  type Content,
  EditorContent,
  type JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Tiptap({
  content,
  onChange,
}: { content: Content; onChange: (json: JSONContent) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? "<p>Hello World! 🌎</p>",
    onTransaction: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  return <EditorContent editor={editor} />;
}
