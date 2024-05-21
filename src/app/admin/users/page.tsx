import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InviteUserForm } from "./invite-user-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UsersTable, UsersTableLoading } from "./users-table";
import { Suspense } from "react";

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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-y-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Invite user</AccordionTrigger>
                <AccordionContent>
                  <InviteUserForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Suspense fallback={<UsersTableLoading />}>
              <UsersTable />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
