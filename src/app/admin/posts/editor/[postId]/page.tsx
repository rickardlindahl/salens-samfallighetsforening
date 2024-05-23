import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import AdminSubLayout from "../../../admin-sub-layout";
import { EditorFormWrapper } from "./editor-form-wrapper";

export default async function AdminPostsEditor({
  params,
}: { params: { postId: string } }) {
  console.log("AdminPostsEditor", params.postId);
  return (
    <AdminSubLayout title="Editor">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Editing post</CardTitle>
          <CardDescription>Edit your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <EditorFormWrapper postId={params.postId} />
          </Suspense>
        </CardContent>
      </Card>
    </AdminSubLayout>
  );
}
