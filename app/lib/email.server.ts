export async function sendPasswordResetTokenEmail(email: string, verificationLink: string) {
  console.log("Sending email to", email, "with link", verificationLink);
}

export async function sendInviteEmail(email: string) {
  console.log("Sending invite email to", email);
}
