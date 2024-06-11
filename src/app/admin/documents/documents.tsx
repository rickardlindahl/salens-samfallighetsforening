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
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight">
          Inga dokument uppladdade ännu
        </h3>
        <p className="text-sm text-muted-foreground">
          Använd formuläret ovan for att ladda upp dokument.
        </p>
      </div>
    );
  }

  return <DocumentsTable documents={documents} />;
}
