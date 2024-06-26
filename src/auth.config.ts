import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import type { Role } from "./db/schema";

const adminPaths = ["/admin"];
const protectedPaths = ["/posts", "/documents", "/households"];

export class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = Boolean(user);

      const isOnAdminPath = adminPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isOnAdminPath) {
        if (isLoggedIn && user?.role === "admin") {
          return true;
        }
        return false;
      }
      const isOnProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isOnProtectedPath) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;

      return session;
    },
  },
} satisfies NextAuthConfig;
