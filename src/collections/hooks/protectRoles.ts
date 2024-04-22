import { User } from "@/payload-types";
import type { FieldHook } from "payload/types";

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User, User["roles"]> = async ({
	req,
	value,
	operation,
}) => {
	if (operation !== "update") {
		return value;
	}

	const isAdmin = req.user?.roles?.includes("admin");

	if (!isAdmin) {
		return ["user"];
	}

	const userRoles = new Set(value || []);
	userRoles.add("user");

	return Array.from(userRoles.values());
};
