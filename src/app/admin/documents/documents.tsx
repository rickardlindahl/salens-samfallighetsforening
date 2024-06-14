import { DocumentsList } from "@/components/documents-list";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getDocuments() {
  return await db.select().from(documents).orderBy(desc(documents.createdAt));
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

  return <DocumentsList documents={documents} />;
}
