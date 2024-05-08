"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

type MobileMenuProps = {
	routeList: { label: string; href: string }[];
};

export function MobileMenu({ routeList }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="px-2">
				<Menu
					className="flex md:hidden h-5 w-5"
					onClick={() => setIsOpen(true)}
				>
					<span className="sr-only">Menu Icon</span>
				</Menu>
			</SheetTrigger>

			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle className="font-bold text-xl">Salen</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col justify-center items-center gap-2 mt-4">
					{routeList.map(({ href, label }) => (
						<a
							rel="noreferrer noopener"
							key={label}
							href={href}
							onClick={() => setIsOpen(false)}
							className={buttonVariants({ variant: "ghost" })}
						>
							{label}
						</a>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
