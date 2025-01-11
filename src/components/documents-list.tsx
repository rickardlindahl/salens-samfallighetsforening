import { Skeleton } from "@/components/ui/skeleton";
import { formatRelative, readableFileSize } from "@/lib/utils";
import type { Document } from "@payload-types";
import { Icons } from "./icons";

export function DocumentsList({ documents }: { documents: Document[] }) {
  return (
    <div className="grid gap-4">
      {documents.map(({ id, filename, description, url, filesize, date }) => (
        <div
          key={id}
          className="grid gap-1 border-b border-gray-200 dark:border-gray-800 pb-4"
        >
          <h3 className="font-medium">{description}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>{formatRelative(new Date(date))}</span> &middot;{" "}
            {typeof filesize === "number" && (
              <span>{readableFileSize(filesize)}</span>
            )}
          </div>
          <p className="text-sm line-clamp-2">
            {typeof url === "string" && (
              <a
                href={url}
                download
                className="flex flex-row gap-2 items-center hover:underline"
              >
                <Icons.download className="w-4 h-4" />
                {filename}
              </a>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export function DocumentsListLoading({ limit = 5 }: { limit?: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: limit }, (_value, index) => index).map((num) => (
        <div
          key={num}
          className="grid gap-1 border-b border-gray-200 dark:border-gray-800 pb-4"
        >
          <h3 className="font-medium">
            <Skeleton className="h-[20px] w-[260px]" />
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-row gap-2">
            <Skeleton className="h-[20px] w-[60px] " />
            &middot; <Skeleton className="h-[20px] w-[60px] " />
          </div>
          <Skeleton className="h-[20px]" />
        </div>
      ))}
    </div>
  );
}
