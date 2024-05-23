import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminSubLayout from "../admin-sub-layout";
import { Button } from "@/components/ui/button";
import { createPostAction } from "./actions";

export default async function AdminPostsPage() {
  return (
    <AdminSubLayout title="Posts">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Manage your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPostAction}>
            <Button type="submit">Create new post</Button>
          </form>
          <div className="grid gap-y-8">Posts be here</div>
        </CardContent>
      </Card>
    </AdminSubLayout>
  );
}
