import { DocumentsList } from "@/components/documents-list";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getDocuments(limit?: number) {
  const query = db.select().from(documents).orderBy(desc(documents.createdAt));

  if (typeof limit === "number" && limit > 0) {
    query.limit(limit);
  }

  return await query;
}

type DocumentsProps = { limit?: number };

export async function Documents({ limit }: DocumentsProps) {
  const documents = await getDocuments(limit);

  if (documents.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-bold tracking-tight">
          Inga dokument uppladdade ännu
        </h3>
      </div>
    );
  }

  return <DocumentsList documents={documents} />;
}
