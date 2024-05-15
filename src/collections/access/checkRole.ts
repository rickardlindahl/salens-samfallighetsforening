import type { User } from "@/payload-types";

export const checkRole = (
	user: User | null,
	allRoles: User["roles"] = [],
): boolean => {
	if (user) {
		if (
			allRoles?.some((role) => {
				return user?.roles?.some((individualRole) => {
					return individualRole === role;
				});
			})
		) {
			return true;
		}
	}

	return false;
};
