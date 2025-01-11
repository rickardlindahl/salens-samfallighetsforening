import {
	HTMLConverterFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import {
	getPayload,
	type CollectionAfterChangeHook,
	type CollectionConfig,
} from "payload";
import slugify from "@sindresorhus/slugify";
import { sendEmail } from "@/lib/email";
import config from "@payload-config";
import { Post } from "@/payload-types";

const sendEmailAfterPostCreated: CollectionAfterChangeHook<Post> = async ({
	doc,
	operation,
}) => {
	// Only trigger the hook when creating a new post
	if (operation !== "create") {
		return doc;
	}

	const payload = await getPayload({
		config,
	});
	const users = await payload.find({
		collection: "users",
	});

	const postUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/posts/${doc.slug}`;

	await sendEmail({
		to: users.docs.map((user) => user.email).join(";"),
		subject: "Nytt inlägg publicerat",
		html: `
    <p>Ett nytt inlägg har publicerats på Salens Samfällighetsförenings hemsida.</p>
    <p>Klicka på länken nedan för att läsa inlägget:<br>
      <a href="${postUrl}" style="color: #1a73e8; text-decoration: none;">${doc.title}</a>
    </p>
    <p>Vänliga hälsningar,<br>Salens Samfällighetsförening</p>`,
	});

	return doc;
};

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "title",
	},
	labels: {
		singular: {
			en: "Post",
			sv: "Inlägg",
		},
		plural: {
			en: "Posts",
			sv: "Inlägg",
		},
	},
	hooks: {
		afterChange: [sendEmailAfterPostCreated],
	},
	fields: [
		{
			name: "publishDate",
			type: "date",
			required: true,
			defaultValue: () => new Date(),
			label: {
				en: "Publish date",
				sv: "Publiceringsdatum",
			},
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			hooks: {
				beforeChange: [
					async ({ data, originalDoc, operation, req }) => {
						// Ensure the hook only runs on create and update operations
						if (
							!data ||
							!data.title ||
							(operation !== "create" && operation !== "update")
						) {
							return;
						}

						let slug = slugify(data.title || "");

						if (!slug) return;

						// If we are updating an existing post, we can skip uniqueness check if the title is unchanged
						if (operation === "update" && originalDoc.slug === slug) {
							data.slug = slug;
							return;
						}

						const existingPosts = await req.payload.find({
							collection: "posts",
							where: {
								slug: {
									equals: slug,
								},
							},
						});

						// If a post with the same slug exists, add a suffix until it's unique
						let suffix = 1;
						while (existingPosts.docs.length > 0) {
							slug = `${slug}-${suffix}`;
							suffix++;

							const slugCheck = await req.payload.find({
								collection: "posts",
								where: {
									slug: {
										equals: slug,
									},
								},
							});

							if (slugCheck.docs.length === 0) {
								break;
							}
						}

						data.slug = slug;
					},
				],
			},
			admin: {
				readOnly: true,
				hidden: true,
			},
		},
		{
			name: "title",
			type: "text",
			required: true,
			label: {
				en: "Title",
				sv: "Rubrik",
			},
		},
		{
			name: "content",
			type: "richText",
			required: true,
			label: {
				en: "Content",
				sv: "Innehåll",
			},
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					// The HTMLConverter Feature is the feature which manages the HTML serializers.
					// If you do not pass any arguments to it, it will use the default serializers.
					HTMLConverterFeature({}),
				],
			}),
		},
	],
};
