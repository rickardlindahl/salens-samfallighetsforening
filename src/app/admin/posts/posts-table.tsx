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
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight">
          Inga inlägg skapade än
        </h3>
        <p className="text-sm text-muted-foreground">
          Använd knappen ovan för att skapa ett inlägg.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rubrik</TableHead>
            <TableHead>Skapad</TableHead>
            <TableHead className="hidden sm:table-cell">Uppdaterad</TableHead>
            <TableHead>Publicerad</TableHead>
            <TableHead>Redigera</TableHead>
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
          <TableHead>Rubrik</TableHead>
          <TableHead>Skapad</TableHead>
          <TableHead className="hidden sm:table-cell">Uppdaterad</TableHead>
          <TableHead>Publicerad</TableHead>
          <TableHead>Redigera</TableHead>
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
