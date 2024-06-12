"use server";

import { env } from "@/env";
import FormData from "form-data";
import Mailgun, { type MailgunMessageData } from "mailgun.js";

function createClient() {
  const mailgun = new Mailgun(FormData);

  return mailgun.client({
    username: "api",
    key: env.MAILGUN_API_KEY,
    url: "https://api.eu.mailgun.net",
  });
}

async function sendEmail(data: MailgunMessageData) {
  const client = createClient();

  const domain = "salenssamfallighetsforening.se";

  const defaultData: Partial<MailgunMessageData> = {
    "o:testmode": env.NODE_ENV !== "production",
    from: "Salens Samfällighetsförening <noreply@salenssamfallighetsforening.se>",
  };

  return client.messages.create(domain, {
    ...defaultData,
    ...data,
  });
}

export async function sendResetPasswordEmail(
  email: string,
  name: string,
  verificationLink: string,
  tokenValidityPeriod: string,
) {
  console.log("Sending email to", email, "with link", verificationLink);

  await sendEmail({
    template: "reset-password",
    to: email,
    "h:X-Mailgun-Variables": JSON.stringify({
      name,
      tokenValidityPeriod,
      link: verificationLink,
    }),
  });
}

export async function sendInviteEmail(
  email: string,
  temporaryPassword: string,
) {
  console.log(
    `Sending invite email to ${email} - temporaryPassword: ${temporaryPassword}`,
  );
}
