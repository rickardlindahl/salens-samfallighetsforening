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
import { Role, users } from "@/db/schema";

async function getUsers() {
  return await db.select().from(users);
}

const roleToText: { [key in Role]: string } = {
  admin: "Administratör",
  user: "Användare",
};

export async function UsersTable() {
  const users = await getUsers();

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">Inga användare än</h3>
        <p className="text-sm text-muted-foreground">
          Använd formuläret ovan för att bjuda in användare.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Namn</TableHead>
            <TableHead className="hidden sm:table-cell">Epost</TableHead>
            <TableHead className="text-right">Roll</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="bg-accent">
              <TableCell>
                <div className="font-medium">{user.name}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {user.email}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {roleToText[user.role]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function UsersTableLoading() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Namn</TableHead>
          <TableHead className="hidden sm:table-cell">Epost</TableHead>
          <TableHead className="text-right">Roll</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((number) => (
          <TableRow key={number}>
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
