import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import path from "path";
import { buildConfig } from "payload";
import { sv } from "payload/i18n/sv";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Documents } from "./collections/Documents";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function createEmailTransport() {
	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: 587,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});
}

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Posts, Media, Documents],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	i18n: {
		supportedLanguages: { sv },
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
		prodMigrations: migrations,
	}),
	email: process.env.SMTP_HOST
		? nodemailerAdapter({
				defaultFromAddress: "info@salenssamfallighetsforening.se",
				defaultFromName: "Salens Samfällighetsförening",
				// Any Nodemailer transport
				transport: createEmailTransport(),
			})
		: undefined,
	plugins: [
		vercelBlobStorage({
			enabled: true,
			collections: {
				media: {
					prefix: "media",
				},
				documents: {
					prefix: "documents",
				},
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || "",
		}),
	],
});
