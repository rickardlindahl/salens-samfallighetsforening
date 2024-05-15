import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import {
	lexicalEditor,
	FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";
import nodemailer from "nodemailer";
import { MailgunTransport } from "mailgun-nodemailer-transport";
import path from "node:path";
import { buildConfig } from "payload/config";
// import sharp from 'sharp'
import { fileURLToPath } from "node:url";
import { en } from "payload/i18n/en";
import { sv } from "payload/i18n/sv";

import { Users } from "@/collections/Users";
import { Posts } from "@/collections/Posts";
import { Media } from "@/collections/Media";
import { Documents } from "./collections/Documents";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
	},
	collections: [Users, Posts, Media, Documents],
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			FixedToolbarFeature(),
		],
	}),
	plugins: [
		vercelBlobStorage({
			collections: {
				[Media.slug]: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || "",
		}),
	],
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
	}),
	localization: {
		locales: ["en", "sv"],
		defaultLocale: "sv",
		fallback: true,
	},
	i18n: {
		supportedLanguages: { en, sv },
		fallbackLanguage: "en",
	},
	// Sharp is now an optional dependency -
	// if you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.

	// This is temporary - we may make an adapter pattern
	// for this before reaching 3.0 stable

	// sharp,
	//
	//
	email: nodemailerAdapter({
		defaultFromName: "Admin",
		defaultFromAddress: "admin@salenssamfallighetsforening.com",
		transport: nodemailer.createTransport(
			new MailgunTransport({
				auth: {
					apiKey: process.env.MAILGUN_API_KEY ?? "",
					domain: "salenssamfallighetsforening.se",
				},
				hostname: "api.eu.mailgun.net",
			}),
		),
	}),
	onInit: async (payload) => {
		if (process.env.NODE_ENV === "development") {
			console.log("onInit");

			const numberOfUsers = (
				await payload.find<"users">({ collection: "users", limit: 2 })
			).totalDocs;

			if (numberOfUsers === 0) {
				console.log("Creating user with admin role");
				await payload.create({
					collection: "users",
					data: {
						email: "admin@salen.com",
						password: "password",
						roles: ["admin"],
						firstName: "Admin",
						lastName: "Adminsson",
					},
				});

				console.log("Creating user with user role");
				await payload.create({
					collection: "users",
					data: {
						email: "user@salen.com",
						password: "password",
						roles: ["user"],
						firstName: "User",
						lastName: "Usersson",
					},
				});
			}
		}
		/*
    await mapAsync([...Array(11)], async () => {
      await payload.create({
        collection: "posts",
        data: {
          title: 'title',

          description: 'description',
        },
      });
    });
  */
	},
});

/*
async function mapAsync<T, U>(
  arr: T[],
  callbackfn: (item: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  return Promise.all(arr.map(callbackfn));
}
*/
