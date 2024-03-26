import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { users, type User } from "~/db/schema";
import { comparePasswords } from "~/lib/auth-utils.server";
import { loginSchema } from "~/lib/schemas";
import { sessionStorage } from "~/lib/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { email, password } = loginSchema.parse(Object.fromEntries(form));

    const user = await login(email as string, password as string);

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);

async function login(email: string, password: string): Promise<User> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
}