import type { Access } from "payload";
import { checkRole } from "./checkRole";

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (!user) {
    return false;
  }

  if (checkRole("admin", user)) {
    return true;
  }

  return {
    and: [
      {
        id: {
          equals: user.id,
        },
      },
    ],
  };
};
