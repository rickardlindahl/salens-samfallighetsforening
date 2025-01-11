import { DocumentsList } from "@/components/documents-list";

import configPromise from "@payload-config";
import { getPayload } from "payload";

async function getDocuments(limit?: number) {
	const payload = await getPayload({ config: configPromise });

	const documents = await payload.find({
		collection: "documents",
		limit: limit ?? 999,
		sort: "-date",
	});

	return documents.docs;
}

export async function Documents({ limit }: { limit?: number }) {
	const documents = await getDocuments(limit);

	if (documents.length === 0) {
		return (
			<div>
				<h3 className="text-2xl font-bold tracking-tight">
					Inga dokument uppladdade ännu
				</h3>
			</div>
		);
	}

	return <DocumentsList documents={documents} />;
}
