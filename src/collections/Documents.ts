import type { CollectionConfig } from "payload";
import { adminsAndUser } from "./access/adminsAndUser";
import { admins } from "./access/admins";
import { checkRole } from "./access/checkRole";

export const Documents: CollectionConfig = {
	slug: "documents",
	upload: true,
	access: {
		read: adminsAndUser,
		create: admins,
		update: admins,
		delete: admins,
		admin: ({ req: { user } }) => checkRole("admin", user),
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
