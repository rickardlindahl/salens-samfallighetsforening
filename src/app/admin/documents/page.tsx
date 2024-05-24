import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { DocumentsTable, DocumentsTableLoading } from "./documents-table";
import { UploadDocumentForm } from "./upload-document-form";
import { AdminLayout } from "../admin-layout";

export default async function AdminUsersPage() {
  return (
    <AdminLayout title="Documents">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Manage your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-y-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Upload document</AccordionTrigger>
                <AccordionContent>
                  <UploadDocumentForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Suspense fallback={<DocumentsTableLoading />}>
              <DocumentsTable />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
