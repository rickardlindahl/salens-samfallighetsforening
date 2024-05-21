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

export default async function AdminUsersPage() {
  return (
    <AdminSubLayout routeLinks={routeLinks} title="Users">
      <>
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>hejmsan</div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-04-chunk-2">
          <CardHeader>
            <CardTitle>Plugins Directory</CardTitle>
            <CardDescription>
              The directory within your project, in which your plugins are
              located.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>lalala</div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </>
    </AdminSubLayout>
  );
}
