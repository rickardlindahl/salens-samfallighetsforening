"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { User } from "@/payload-types";

function renderInitials(user: User) {
	return `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;
}

export function UserNavbar({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					<Avatar>
						<AvatarFallback>
							{renderInitials(user) ?? <Icons.user />}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					{user.firstName} {user.lastName}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{user.role === "admin" && (
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link href="/admin">Admin</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link href="/logout">Logga ut</Link>
					</DropdownMenuItem>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
