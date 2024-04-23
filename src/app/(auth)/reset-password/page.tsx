import React from "react";

import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPassword() {
	return (
		<>
			<h1>Reset Password</h1>
			<p>Please enter a new password below.</p>
			<ResetPasswordForm />
		</>
	);
}
