import type { CollectionConfig } from "payload/types";

export const Documents: CollectionConfig = {
	slug: "documents",
	access: {
		read: () => true,
	},
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
			name: "file",
			type: "upload",
			required: false, // TODO: should be true but validation fails. Remove when fixed.
			relationTo: "media",
			label: {
				en: "File",
				sv: "Fil",
			},
		},
		{
			name: "description",
			type: "text",
			required: false,
			label: {
				en: "Description",
				sv: "Beskrivning",
			},
		},
		{
			name: "date",
			type: "date",
			required: true,
			defaultValue: () => new Date(),
			label: {
				en: "Date",
				sv: "Datum",
			},
		},
	],
};
