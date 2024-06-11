import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPostAction } from "./actions";
import { PostsTable, PostsTableLoading } from "./posts-table";
import { Suspense } from "react";
import { AdminLayout } from "../admin-layout";

export default async function AdminPostsPage() {
  return (
    <AdminLayout title="Posts">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Inlägg</CardTitle>
          <CardDescription>Hantera dina inlägg</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPostAction}>
            <Button type="submit">Skapa nytt inlägg</Button>
          </form>
          <Suspense fallback={<PostsTableLoading />}>
            <PostsTable />
          </Suspense>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
