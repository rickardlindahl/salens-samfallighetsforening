import { AdminLayout } from "@/app/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { EditorFormWrapper } from "./editor-form-wrapper";

export default async function AdminPostsEditor({
  params,
}: { params: { postId: string } }) {
  console.log("AdminPostsEditor", params.postId);
  return (
    <AdminLayout title="Editor">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Redigera inlägg</CardTitle>
          <CardDescription>
            Ange rubrik, brödtext och klicka Publicera när du är klar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <EditorFormWrapper postId={params.postId} />
          </Suspense>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
