import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload/types";

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
	},
	hooks: {
		afterChange: [
			({ doc }) => {
				revalidatePath("/posts", "page");
				return doc;
			},
		],
	},
	labels: {
		singular: {
			en: "Post",
			sv: "Inlägg",
		},
		plural: {
			en: "Posts",
			sv: "Inlägg",
		},
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			label: {
				en: "Title",
				sv: "Rubrik",
			},
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: false,
			label: {
				en: "Image",
				sv: "Bild",
			},
		},
		{
			name: "content",
			type: "richText",
			required: true,
			label: {
				en: "Content",
				sv: "Innehåll",
			},
		},
	],
};
