import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export default async function AdminUsersPage() {
  return (
    <div className="container grid max-w-screen-2xl gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
    </div>
  );
}
