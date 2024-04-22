import type { CollectionConfig } from "payload/types";
import { admins } from "./access/admins";
import { adminsAndUser } from "./access/adminsAndUser";
import { checkRole } from "./access/checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { protectRoles } from "./hooks/protectRoles";

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		tokenExpiration: 28800, // 8 hours
		cookies: {
			sameSite: "None",
			secure: true,
			domain: process.env.COOKIE_DOMAIN,
		},
	},
	admin: {
		useAsTitle: "email",
	},
	access: {
		read: adminsAndUser,
		create: admins,
		update: adminsAndUser,
		delete: admins,
		admin: ({ req: { user } }) => checkRole(["admin"], user),
	},
	fields: [
		{
			name: "firstName",
			type: "text",
		},
		{
			name: "lastName",
			type: "text",
		},
		{
			name: "roles",
			type: "select",
			hasMany: true,
			saveToJWT: true,
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin, protectRoles],
			},
			defaultValue: ["user"],
			options: [
				{
					label: "Admin",
					value: "admin",
				},
				{
					label: "User",
					value: "user",
				},
			],
		},
	],
};
