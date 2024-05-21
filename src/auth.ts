import { db, getUser } from "@/db";
import {
  type User as DrizzleUser,
  type Role,
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schema";
import { comparePasswords } from "@/lib/utils.server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidLoginError, authConfig } from "./auth.config";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DrizzleUser {}

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      role: Role;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const [user] = await getUser(email);
        if (!user) {
          throw new InvalidLoginError();
        }

        const passwordsMatch = await comparePasswords(password, user.password);
        if (!passwordsMatch) {
          throw new InvalidLoginError();
        }

        return user;
      },
    }),
  ],
});
