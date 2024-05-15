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
		admin: ({ req: { user } }) => checkRole(user, ["admin"]),
	},
	labels: {
		singular: {
			en: "User",
			sv: "Användare",
		},
		plural: {
			en: "Users",
			sv: "Användare",
		},
	},
	fields: [
		{
			name: "firstName",
			type: "text",
			label: {
				en: "First name",
				sv: "Förnamn",
			},
		},
		{
			name: "lastName",
			type: "text",
			label: {
				en: "Last name",
				sv: "Efternamn",
			},
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
			label: {
				en: "Roles",
				sv: "Roller",
			},
		},
	],
};
