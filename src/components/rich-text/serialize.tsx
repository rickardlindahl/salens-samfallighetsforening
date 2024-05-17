import escapeHTML from "escape-html";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";
import { Media } from "@/payload-types";
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
} from "./rich-text-node-format";
import type { SerializedLexicalNode } from "./types";

interface Props {
  nodes: SerializedLexicalNode[];
}

export function Serialize({ nodes }: Props): JSX.Element {
  return (
    <>
      {nodes?.filter(Boolean).map((node, index): JSX.Element | null => {
        if (node.type === "text") {
          let text = (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
            />
          );
          if (
            typeof node.format === "number" ||
            typeof node.format === "bigint"
          ) {
            if (node.format & IS_BOLD) {
              text = <strong key={index}>{text}</strong>;
            }
            if (node.format & IS_ITALIC) {
              text = <em key={index}>{text}</em>;
            }
            if (node.format & IS_STRIKETHROUGH) {
              text = (
                <span key={index} className="line-through">
                  {text}
                </span>
              );
            }
            if (node.format & IS_UNDERLINE) {
              text = (
                <span key={index} className="underline">
                  {text}
                </span>
              );
            }
            if (node.format & IS_CODE) {
              text = <code key={index}>{text}</code>;
            }
            if (node.format & IS_SUBSCRIPT) {
              text = <sub key={index}>{text}</sub>;
            }
            if (node.format & IS_SUPERSCRIPT) {
              text = <sup key={index}>{text}</sup>;
            }
          }

          return text;
        }

        // alignment
        let className = "";
        if (node.format === "center") {
          className = twMerge(className, "text-center");
        }
        if (node.format === "right") {
          className = twMerge(className, "text-right");
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedLexicalNode,
        ): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === "list" && node?.listType === "check") {
              for (const item of node.children) {
                if (!item?.checked) {
                  item.checked = false;
                }
              }
              return Serialize({ nodes: node.children });
            } else {
              return Serialize({ nodes: node.children });
            }
          }
        };

        const serializedChildren = serializedChildrenFn(node);

        switch (node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            return (
              <p className={className} key={index}>
                {serializedChildren}
              </p>
            );
          }
          case "heading": {
            type Heading = Extract<
              keyof JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5"
            >;
            const Tag = node?.tag as Heading;

            // Generate anchor for headings
            const anchor = node.children?.length
              ? slugify(node.children[0]?.text || `${index}`, { lower: true })
              : `${index}`;

            return (
              <Tag key={index} className={twMerge(className, "group")}>
                <div className="vertical relative inline">
                  <a
                    id={anchor}
                    href={`#${anchor}`}
                    className="hover-text-gray-400 absolute right-[100%] hidden pr-2 pt-0.5 text-gray-300 group-hover:block"
                    key={index}
                  >
                    <div className="i-ion:ios-link text-xl" />
                  </a>
                  {serializedChildren}
                </div>
              </Tag>
            );
          }
          case "list": {
            type List = Extract<keyof JSX.IntrinsicElements, "ul" | "ol">;
            const Tag = node?.tag as List;
            return (
              <Tag key={index} className={node?.listType}>
                {serializedChildren}
              </Tag>
            );
          }
          case "listitem": {
            if (node?.checked != null) {
              return (
                <li
                  key={index}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? "component--list-item-checkbox-checked"
                      : "component--list-item-checked-unchecked"
                  }`}
                  value={node?.value}
                  role="checkbox"
                  aria-checked={node.checked ? "true" : "false"}
                  tabIndex={-1}
                >
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              );
            }
          }
          case "quote": {
            return (
              <blockquote className={className} key={index}>
                {serializedChildren}
              </blockquote>
            );
          }

          case "autolink":
          case "link": {
            const fields: {
              doc?: any;
              linkType?: "custom" | "internal";
              newTab?: boolean;
              url?: string;
              appendix?: string;
            } = node.fields;

            const rel = "noopener noreferrer nofollow";
            return (
              <a
                key={index}
                href={fields.url + (fields.appendix || "")}
                target={fields.newTab ? 'target="_blank"' : undefined}
                rel={rel}
                className="text-key-500 underline"
              >
                {serializedChildren}
              </a>
            );
          }
          case "upload": {
            const media = node.value as Media;
            const caption = node.fields?.caption;
            if (!media || !media.mimeType?.startsWith("application/pdf")) {
              return <p key={index}>only pdfs can be used in upload block</p>;
            }

            return (
              <a href={media.url ?? ""} download>
                {media.alt}
              </a>
            );
          }
          case "autolink": {
            console.log(node);
          }

          default:
            return <p key={index}>unimplemented node type {node.type}</p>;
        }
      })}
    </>
  );
}
