import { DocumentsTableLoading } from "@/components/documents-table";
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
import { AdminLayout } from "../admin-layout";
import { DocumentsWrapper } from "./documents";
import { UploadDocumentForm } from "./upload-document-form";

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
              <DocumentsWrapper />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
