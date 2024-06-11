import { Suspense } from "react";
import { Documents } from "./documents";
import { DocumentsTableLoading } from "@/components/documents-table";

export default async function DocumentsPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
            Dokument
          </h1>
          <p className="text-xl text-muted-foreground">
            Här samlas dokument från Samfälligheten.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      <Suspense fallback={<DocumentsTableLoading />}>
        <Documents />
      </Suspense>
    </div>
  );
}
