import type { CollectionConfig } from "payload";
import { adminsAndUser } from "./access/adminsAndUser";
import { admins } from "./access/admins";
import { checkRole } from "./access/checkRole";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: adminsAndUser,
		create: admins,
		update: admins,
		delete: admins,
		admin: ({ req: { user } }) => checkRole("admin", user),
	},
	fields: [
		{
			name: "text",
			type: "text",
		},
	],
	upload: true,
};
