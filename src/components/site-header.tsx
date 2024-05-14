import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import { UserNavbar } from "./user-navbar";

const routeLinks = [
	{
		title: "Posts",
		href: "/posts",
	},
	{
		title: "Documents",
		href: "/documents",
	},
	{
		title: "Households",
		href: "/households",
	},
];

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<MainNav routeLinks={routeLinks} />
				<MobileNav routeLinks={routeLinks} />
				<div className="flex flex-1 space-x-2 justify-end">
					<ModeToggle />
					<UserNavbar />
				</div>
			</div>
		</header>
	);
}
