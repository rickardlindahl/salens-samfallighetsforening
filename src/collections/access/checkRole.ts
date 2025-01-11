import type { User } from "@payload-types";

export const checkRole = (role: User["role"], user: User | null): boolean =>
  user?.role === role;
