import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateJSON } from "@tiptap/html";

const extensions = [
  Document,
  Paragraph,
  Text,
  Bold,
  // other extensions …
];

export function jsonToHTML(json: JSONContent) {
  return generateHTML(json, extensions);
}

export function htmlToJSON(html: string): JSONContent {
  return generateJSON(html, extensions);
}
