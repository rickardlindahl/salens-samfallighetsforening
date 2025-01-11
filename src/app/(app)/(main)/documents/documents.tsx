import { DocumentsList } from "@/components/documents-list";

import configPromise from "@payload-config";
import { getPayload } from "payload";

async function getDocuments(publishedBefore: Date, limit?: number) {
	const payload = await getPayload({ config: configPromise });

	const documents = await payload.find({
		collection: "documents",
		limit: limit ?? 999,
		sort: "-date",
		where: {
			date: {
				less_than_equal: publishedBefore.toISOString(),
			},
		},
	});

	return documents.docs;
}

export async function Documents({
	publishedBefore,
	limit,
	showBorder,
}: { limit?: number; publishedBefore: Date; showBorder: boolean }) {
	const documents = await getDocuments(publishedBefore, limit);

	return <DocumentsList documents={documents} showBorder={showBorder} />;
}
