import { DocumentsList } from "@/components/documents-list";
import { db } from "@/db";
import { documents } from "@/db/schema";

async function getDocuments() {
  return await db.select().from(documents);
}

export async function Documents() {
  const documents = await getDocuments();

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
