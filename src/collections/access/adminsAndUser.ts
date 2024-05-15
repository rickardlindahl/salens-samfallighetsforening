import type { Access } from "payload/types";
import { checkRole } from "./checkRole";

export const adminsAndUser: Access = ({ req: { user } }) => {
	if (!user) {
		return false;
	}

	if (checkRole(user, ["admin"])) {
		return true;
	}

	return {
		id: {
			equals: user.id,
		},
	};
};
