import type {
	SerializedAutoLinkNode,
	SerializedHeadingNode,
	SerializedLinkNode,
	SerializedListItemNode,
	SerializedListNode,
	SerializedParagraphNode,
	SerializedQuoteNode,
	SerializedTextNode,
	SerializedUploadNode,
} from "@payloadcms/richtext-lexical";

import {} from "@payloadcms/richtext-lexical";
import escapeHTML from "escape-html";

import { cn } from "@/lib/utils";
import type { Document as DocumentCollection } from "@/payload-types";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import {
	IS_BOLD,
	IS_CODE,
	IS_ITALIC,
	IS_STRIKETHROUGH,
	IS_SUBSCRIPT,
	IS_SUPERSCRIPT,
	IS_UNDERLINE,
} from "./richtext-node-format";
import React from "react";

export type SerializedLexicalEditorState = {
	root: {
		type: string;
		format: string;
		indent: number;
		version: number;
		children: SerializedLexicalNode[];
	};
};

export type SerializedLexicalNode = {
	children?: SerializedLexicalNode[];
	direction: string;
	format: number;
	indent?: string | number;
	type: string;
	version: number;
	style?: string;
	mode?: string;
	text?: string;
	[other: string]: unknown;
};

function getLinkForPage(_doc: unknown) {
	return "implement this";
}

export function render(children: SerializedLexicalNode[]) {
	return children
		.filter(Boolean)
		.map<React.ReactNode>((node, index) => {
			if (node.type === "text") {
				const textNode = node as unknown as SerializedTextNode;
				const text = `${escapeHTML(textNode.text)}`;

				if (textNode.format & IS_BOLD) {
					return (
						<strong key={`${text}${index}`} className="font-bold">
							{text}
						</strong>
					);
				}

				if (textNode.format & IS_ITALIC) {
					return (
						<em key={`${text}${index}`} className="italic">
							{text}
						</em>
					);
				}

				if (textNode.format & IS_STRIKETHROUGH) {
					return (
						<span key={`${text}${index}`} className="line-through">
							{text}
						</span>
					);
				}

				if (textNode.format & IS_UNDERLINE) {
					return (
						<span key={`${text}${index}`} className="underline">
							{text}
						</span>
					);
				}

				if (textNode.format & IS_CODE) {
					return (
						<code
							key={`${text}${index}`}
							className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
						>
							{text}
						</code>
					);
				}

				if (textNode.format & IS_SUBSCRIPT) {
					return <sub key={`${text}${index}`}>{text}</sub>;
				}

				if (textNode.format & IS_SUPERSCRIPT) {
					return <sup key={`${text}${index}`}>{text}</sup>;
				}

				return <React.Fragment key={`${text}${index}`}>{text}</React.Fragment>;
			}

			switch (node.type) {
				case "linebreak": {
					return <br key={`br-${index}`} />;
				}
				case "link": {
					return renderLinkNode(node as unknown as SerializedLinkNode, index);
				}
				case "autolink": {
					return renderLinkNode(
						node as unknown as SerializedAutoLinkNode,
						index,
					);
				}
				case "list": {
					const listNode = node as unknown as SerializedListNode;
					if (listNode.listType === "bullet") {
						return (
							<ul
								key={`ul-${index}`}
								className="my-6 ml-6 list-disc [&>li]:mt-2"
							>
								{render(listNode.children as SerializedLexicalNode[])}
							</ul>
						);
					}
					return (
						<ol
							key={`ol-${index}`}
							className="my-6 ml-6 list-decimal [&>li]:mt-2"
						>
							{render(listNode.children as SerializedLexicalNode[])}
						</ol>
					);
				}
				case "listitem": {
					const listItemNode = node as unknown as SerializedListItemNode;
					return (
						<li key={`li-${index}`}>
							{render(listItemNode.children as SerializedLexicalNode[])}
						</li>
					);
				}
				case "heading": {
					const headingNode = node as unknown as SerializedHeadingNode;
					const Component = headingNode.tag;
					const styles = {
						h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
						h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
						h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
						h4: "scroll-m-20 text-xl font-semibold tracking-tight",
						h5: "scroll-m-20 text-xl font-semibold tracking-tight",
						h6: "scroll-m-20 text-xl font-semibold tracking-tight",
					};

					return (
						<Component
							key={`${Component}-${index}`}
							className={styles[headingNode.tag]}
						>
							{render(headingNode.children as SerializedLexicalNode[])}
						</Component>
					);
				}
				case "paragraph": {
					const paragraphNode = node as unknown as SerializedParagraphNode;
					return (
						<p
							key={`p-${index}`}
							className="leading-7 [&:not(:first-child)]:mt-6"
						>
							{render(paragraphNode.children as SerializedLexicalNode[])}
						</p>
					);
				}
				case "upload": {
					const uploadNode = node as unknown as SerializedUploadNode;
					if (uploadNode.relationTo === "documents") {
						const values = uploadNode.value as DocumentCollection;
						return values.url ? (
							<a
								key={`a-${index}`}
								download
								href={values.url}
								className={cn(
									"flex flex-row gap-2 items-center",
									buttonVariants({ variant: "link" }),
									"p-0",
								)}
							>
								<Icons.download className="w-4 h-4" />

								<span>{values.filename}</span>
							</a>
						) : null;
					}

					return null;
				}
				case "quote": {
					const quoteNode = node as unknown as SerializedQuoteNode;
					return (
						<blockquote
							key={`quote-${index}`}
							className="mt-6 border-l-2 pl-6 italic"
						>
							{render(quoteNode.children as SerializedLexicalNode[])}
						</blockquote>
					);
				}
				default: {
					console.log("Default rendering node", node);
					return null;
				}
			}
		})
		.filter((node) => node !== null);
}

function renderLinkNode(
	linkNode: SerializedLinkNode | SerializedAutoLinkNode,
	index: number,
): React.ReactNode {
	const attributes = linkNode.fields;

	if (linkNode.fields.linkType === "custom") {
		return (
			<a
				key={`a-${index}`}
				className={cn(buttonVariants({ variant: "link" }), "p-0")}
				href={attributes.url}
				target="_blank"
			>
				{render(linkNode.children as SerializedLexicalNode[])}
			</a>
		);
	}

	return (
		<a
			key={`a-${index}`}
			className={cn(buttonVariants({ variant: "link" }), "p-0")}
			href={getLinkForPage(attributes.doc)}
			target={attributes.newTab ? "_blank" : undefined}
		>
			{render(linkNode.children as SerializedLexicalNode[])}
		</a>
	);
}
