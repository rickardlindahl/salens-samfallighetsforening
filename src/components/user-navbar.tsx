"use client";

import { useAuth } from "@/lib/providers/Auth";
import type { User } from "@/payload-types";
import Link from "next/link";
import * as Icons from "./icons";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

function renderInitials(user: User | null | undefined) {
	if (!user || !user.firstName || !user.lastName) {
		return null;
	}

	return `${user.firstName.at(0)}${user.lastName.at(0)}`;
}

export function UserNavbar() {
	const { user } = useAuth();

	if (!user) {
		return (
			<Link
				href="/login"
				className={cn(
					buttonVariants({ variant: "outline", size: "icon" }),
					"overflow-hidden rounded-full",
				)}
			>
				<Avatar>
					<AvatarFallback>
						{renderInitials(user) ?? <Icons.User />}
					</AvatarFallback>
				</Avatar>
			</Link>
		);
	}

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
							{renderInitials(user) ?? <Icons.User />}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					{user.firstName} {user.lastName}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer" disabled>
					<Link href="/account/settings">Settings</Link>
				</DropdownMenuItem>
				{user.roles?.includes("admin") && (
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link href="/admin">Admin</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href="/logout">Logout</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
