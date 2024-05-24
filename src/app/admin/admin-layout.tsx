import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
type AdminContentProps = React.PropsWithChildren<{ title?: string }>;

export function AdminLayout({ children, title }: AdminContentProps) {
  return (
    <>
      <div className="p-4 sm:px-6 sm:py-0 max-w-screen-2xl">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {title && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="p-4 sm:px-6 sm:py-0 max-w-screen-2xl">{children}</main>
    </>
  );
}
