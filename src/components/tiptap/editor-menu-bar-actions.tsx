import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading,
  Italic,
  List,
  ListOrdered,
  type LucideIcon,
  SplitSquareVertical,
  Strikethrough,
  TextQuote,
} from "lucide-react";

type EditorAction =
  | "bold"
  | "italic"
  | "strike"
  | "code"
  | "heading"
  | "bulletList"
  | "codeBlock"
  | "orderedList"
  | "blockquote"
  | "hr";

export interface MenuBarAction {
  name: EditorAction;
  Icon: LucideIcon;
  tooltip: string;
  handleOnClick: (editor: Editor) => void;
  isDisabled?: (editor: Editor) => boolean;
  isActive?: (editor: Editor) => boolean;
  active?: boolean;
}

export const editorActions: MenuBarAction[] = [
  {
    name: "bold",
    Icon: Bold,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBold().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    tooltip: "Bold",
  },
  {
    name: "italic",
    Icon: Italic,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleItalic().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    tooltip: "Italic",
  },
  {
    name: "strike",
    Icon: Strikethrough,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleStrike().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
    tooltip: "Strikethrough",
  },
  {
    name: "code",
    Icon: Code,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleCode().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleCode().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
    tooltip: "Code",
  },
  {
    name: "heading",
    Icon: Heading,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
    tooltip: "Heading",
  },
  {
    name: "blockquote",
    Icon: TextQuote,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBlockquote().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive("blockquote"),
    tooltip: "Quote",
  },
  {
    name: "bulletList",
    Icon: List,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
    tooltip: "Bullet List",
  },
  {
    name: "orderedList",
    Icon: ListOrdered,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isDisabled: (editor: Editor) =>
      !editor.can().chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive("orderedList"),
    tooltip: "Numbered List",
  },
  {
    name: "hr",
    Icon: SplitSquareVertical,
    handleOnClick: (editor: Editor) =>
      editor.chain().focus().setHorizontalRule().run(),
    tooltip: "Horizontal Rule",
  },
];
