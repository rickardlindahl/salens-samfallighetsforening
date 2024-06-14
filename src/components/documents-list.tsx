import { Skeleton } from "@/components/ui/skeleton";
import type { Document } from "@/db/schema";
import { cn, formatDate, readableFileSize } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

export function DocumentsList({ documents }: { documents: Document[] }) {
  return (
    <div className="grid gap-4">
      {documents.map(({ id, name, description, url, size, createdAt }) => (
        <div
          key={id}
          className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4"
        >
          <div className="grid gap-1">
            <h3 className="font-medium">{name}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span>{formatDate(createdAt.toString())}</span> &middot;{" "}
              <span>{readableFileSize(size)}</span>
            </div>
            <p className="text-sm line-clamp-2">{description}</p>
          </div>
          <a
            href={url}
            download
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Ladda ner
          </a>
        </div>
      ))}
    </div>
  );
}

export function DocumentsListLoading() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4"
        >
          <div className="grid gap-1">
            <h3 className="font-medium">
              <Skeleton className="h-[20px] w-[260px]" />
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-row gap-2">
              <Skeleton className="h-[20px] w-[60px] " />
              &middot; <Skeleton className="h-[20px] w-[60px] " />
            </div>
            <Skeleton className="h-[20px]" />
          </div>
          <Button variant="outline" size="sm">
            Ladda ner
          </Button>
        </div>
      ))}
    </div>
  );
}
