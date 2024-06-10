import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import { generateJSON } from "@tiptap/html";
import { extensions } from "./tiptap-extensions";

export function jsonToHTML(json: JSONContent) {
  return generateHTML(json, extensions);
}

export function htmlToJSON(html: string): JSONContent {
  return generateJSON(html, extensions);
}
