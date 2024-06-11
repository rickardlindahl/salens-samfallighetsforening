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
import type { Document } from "@/db/schema";
import { readableFileSize } from "@/lib/utils";

export function DocumentsTable({ documents }: { documents: Document[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Namn</TableHead>
            <TableHead>Beskrivning</TableHead>
            <TableHead className="hidden sm:table-cell">Storlek</TableHead>
            <TableHead className="text-center">Ladda ner</TableHead>
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
                  {readableFileSize(doc.size)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <a href={doc.url} download className="flex justify-center">
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
          <TableHead>Namn</TableHead>
          <TableHead>Beskrivning</TableHead>
          <TableHead className="hidden sm:table-cell">Storlek</TableHead>
          <TableHead className="text-center">Ladda ner</TableHead>
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
