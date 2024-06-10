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
import { UsersTable, UsersTableLoading } from "./users-table";
import { Suspense } from "react";
import { AdminLayout } from "../admin-layout";

export default async function AdminUsersPage() {
  return (
    <AdminLayout title="Users">
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
    </AdminLayout>
  );
}
