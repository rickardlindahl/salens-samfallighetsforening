import { DocumentsTable } from "@/components/documents-table";
import { db } from "@/db";
import { documents } from "@/db/schema";

async function getDocuments() {
  return await db.select().from(documents);
}

export async function DocumentsWrapper() {
  const documents = await getDocuments();

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No documents yet</h3>
        <p className="text-sm text-muted-foreground">
          Use the form to upload documents.
        </p>
      </div>
    );
  }

  return <DocumentsTable documents={documents} />;
}
