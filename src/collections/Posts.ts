import type { CollectionConfig } from "payload/types";

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
	},
	fields: [
		// Email added by default
		// Add more fields as needed
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "content",
			type: "richText",
			required: true,
		},
	],
};
