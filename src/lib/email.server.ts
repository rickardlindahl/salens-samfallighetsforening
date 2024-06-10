"use server";

export async function sendPasswordResetTokenEmail(
  email: string,
  verificationLink: string,
) {
  console.log("Sending email to", email, "with link", verificationLink);
}

export async function sendInviteEmail(
  email: string,
  temporaryPassword: string,
) {
  console.log(
    `Sending invite email to ${email} - temporaryPassword: ${temporaryPassword}`,
  );
}
