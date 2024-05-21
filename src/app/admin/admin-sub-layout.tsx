import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AdminSideNavbar } from "./admin-side-navbar";

type AdminSubLayoutProps = React.PropsWithChildren<{
  routeLinks: { href: string; title: string }[];
  title: string;
}>;

export default function AdminSubLayout({
  children,
  routeLinks,
  title,
}: AdminSubLayoutProps) {
  return (
    <div className="container grid max-w-screen-2xl gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <AdminSideNavbar routeLinks={routeLinks} />
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
