import type { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
	slug: "documents",
	upload: true,
	labels: {
		singular: {
			en: "Document",
			sv: "Dokument",
		},
		plural: {
			en: "Documents",
			sv: "Dokument",
		},
	},
	fields: [
		{
			name: "date",
			type: "date",
			required: true,
			label: {
				en: "Date",
				sv: "Datum",
			},
		},
		{
			name: "description",
			type: "text",
			required: true,
			label: {
				en: "Description",
				sv: "Beskrivning",
			},
		},
	],
};
