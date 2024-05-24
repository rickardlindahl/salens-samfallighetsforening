import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { formatRelative } from "@/lib/utils";
import Link from "next/link";

async function getPosts() {
  return await db.select().from(posts);
}

export async function PostsTable() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Use the button to create the first post.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="hidden sm:table-cell">Updated</TableHead>
            <TableHead>Publish date</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="bg-accent">
              <TableCell>
                <div className="font-medium">
                  <Link href={`/admin/posts/editor/${post.id}`}>
                    {post.title}
                    {post.draft ? " (Draft)" : ""}
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {formatRelative(post.createdAt)}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {post.updatedAt ? formatRelative(post.updatedAt) : "-"}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {post.publishDate ? formatRelative(post.publishDate) : "-"}
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/admin/posts/editor/${post.id}`}>
                  <Icons.edit className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function PostsTableLoading() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="hidden sm:table-cell">Updated</TableHead>
          <TableHead>Publish date</TableHead>
          <TableHead>Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((number) => (
          <TableRow key={number}>
            <TableCell>
              <Skeleton className="h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px]" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
