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
import { documents } from "@/db/schema";

async function getDocuments() {
  return await db.select().from(documents);
}

export async function DocumentsTable() {
  const documents = await getDocuments();

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No documents yet</h3>
        <p className="text-sm text-muted-foreground">
          Use the form to upload documents.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="hidden sm:table-cell">Size</TableHead>
            <TableHead className="text-right">Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="bg-accent">
              <TableCell>
                <div className="font-medium">{doc.name}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{doc.description}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {doc.size}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <a href={doc.url} download>
                  <Icons.download className="w-4 h-4" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function DocumentsTableLoading() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="hidden sm:table-cell">Size</TableHead>
          <TableHead className="text-right">Download</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
