import { auth } from "@/auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth();
  return (
    <>
      <SiteHeader session={session} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
