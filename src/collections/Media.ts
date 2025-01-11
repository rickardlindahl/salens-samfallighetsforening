import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	fields: [
		{
			name: "text",
			type: "text",
		},
	],
	upload: true,
};
