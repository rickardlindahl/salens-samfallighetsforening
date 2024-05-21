import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminSubLayout from "../admin-sub-layout";
import { routeLinks } from "./config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminUsersPage() {
  return (
    <AdminSubLayout routeLinks={routeLinks} title="Users">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="text-right">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "hej",
                  name: "Admin Person",
                  email: "tmp@example.com",
                  role: "admin",
                },
                {
                  id: "hej",
                  name: "User Person",
                  email: "tmp2@example.com",
                  role: "role",
                },
              ].map((user) => (
                <TableRow key={user.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminSubLayout>
  );
}
