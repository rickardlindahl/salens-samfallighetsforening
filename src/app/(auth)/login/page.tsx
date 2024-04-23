import React from "react";

import { getMeUser } from "@/lib/utilities/getMeUser";
import { LoginForm } from "./login-form";

export default async function Login() {
	await getMeUser({
		validUserRedirect: `/account?message=${encodeURIComponent(
			"You are already logged in.",
		)}`,
	});

	return (
		<>
			<h1>Log in</h1>
			<LoginForm />
		</>
	);
}
