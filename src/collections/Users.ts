import { User } from "@/payload-types";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { CollectionAfterChangeHook } from "payload";
import type { CollectionConfig } from "payload/types";
import { adminsAndUser } from "./access/adminsAndUser";
import { admins } from "./access/admins";
import { checkRole } from "./access/checkRole";
import { sendEmail } from "../lib/email";

const sendInviteEmailAfterUserCreated: CollectionAfterChangeHook<
	User
> = async ({ doc, operation }) => {
	// Only trigger the hook when creating a new user
	if (operation === "create") {
		// Generate the reset password token for the new user
		const payload = await getPayloadHMR({
			config,
		});
		const resetToken = await payload.forgotPassword({
			collection: "users",
			data: { email: doc.email },
			disableEmail: true, // Disable default Payload email so you can send a custom one
		});

		// Create a reset-password link with the generated token
		const resetPasswordUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/reset-password?token=${resetToken}`;

		// Send the reset-password email
		await sendEmail({
			to: doc.email,
			subject: "Du har blivit inbjuden till Salens Samfällighetsförening",
			html: `
    <p>Hej ${doc.firstName},</p>
    <p>Du har blivit inbjuden till <strong>Salens Samfällighetsförening</strong>!</p>
    <p>För att komma igång behöver du skapa ett lösenord genom att klicka på länken nedan:<br>
      <a href="${resetPasswordUrl}" style="color: #1a73e8; text-decoration: none;">Skapa ditt lösenord</a>
    </p>
    <p>Vänliga hälsningar,<br>Salens Samfällighetsförening</p>`,
		});

		return doc;
	}
};

export const Users: CollectionConfig = {
	slug: "users",
	auth: {
		tokenExpiration: 60 * 60 * 8, // 8 hours
		verify: false, // Require email verification before being allowed to authenticate
		cookies: {
			sameSite: "None",
			secure: true,
			domain: process.env.COOKIE_DOMAIN,
		},
		forgotPassword: {
			generateEmailHTML(args) {
				if (!args) {
					throw new Error("No token to generate forgotPassword email with");
				}

				const { token, user } = args;

				const resetPasswordUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/reset-password?token=${token}`;

				return `
    <p>Hej ${(user as User).firstName},</p>
    <p>Du får detta för att du (eller någon annan) har begärt återställning av lösenordet för ditt konto.</p>
    <p>För att slutföra processen och klicka på länken nedan:<br>
      <a href="${resetPasswordUrl}" style="color: #1a73e8; text-decoration: none;">Återställ lösenord</a>
    </p>
    <p>Om du inte begärde detta, ignorera detta e-postmeddelande och ditt lösenord kommer att förbli oförändrat.</p>
    <p>Vänliga hälsningar,<br>Salens Samfällighetsförening</p>`;
			},
			generateEmailSubject() {
				return "Återställ ditt lösenord";
			},
		},
	},
	access: {
		read: adminsAndUser,
		create: admins,
		update: adminsAndUser,
		delete: admins,
		admin: ({ req: { user } }) => checkRole("admin", user),
	},
	/*	hooks: {
		afterChange: [sendInviteEmailAfterUserCreated],
	},
  */
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
			required: true,
			label: {
				en: "First name",
				sv: "Förnamn",
			},
		},
		{
			name: "lastName",
			type: "text",
			required: true,
			label: {
				en: "Last name",
				sv: "Efternamn",
			},
		},
		{
			name: "phoneNumber",
			type: "text",
			label: {
				en: "Phone number",
				sv: "Telefonnummer",
			},
		},
		{
			name: "role",
			type: "select",
			required: true,
			hasMany: false,
			saveToJWT: true,
			defaultValue: "user",
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
				en: "Role",
				sv: "Roll",
			},
		},
	],
};
