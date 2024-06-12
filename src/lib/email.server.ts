"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env";
import FormData from "form-data";
import Mailgun, { type MailgunMessageData } from "mailgun.js";

async function getEmails() {
  return await db.select({ email: users.email }).from(users);
}

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
  console.log(
    `Sending reset-password email to ${email} with link ${verificationLink}`,
  );

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
  name: string,
  verificationLink: string,
  tokenValidityPeriod: string,
) {
  console.log(
    `Sending invite-user email to ${email} with link ${verificationLink}`,
  );

  await sendEmail({
    template: "invite-user",
    to: email,
    "h:X-Mailgun-Variables": JSON.stringify({
      name,
      tokenValidityPeriod,
      link: verificationLink,
    }),
  });
}

export async function sendPostPublishedEmail(link: string) {
  console.log(`Sending post-published email with link ${link}`);

  const recipients = await getEmails();

  await sendEmail({
    template: "post-published",
    to: recipients.map(({ email }) => email),
    "h:X-Mailgun-Variables": JSON.stringify({
      link,
    }),
  });
}

export async function sendDocumentUploadedEmail(downloadLink: string) {
  console.log(
    `Sending document-uploaded email with download-link ${downloadLink}`,
  );

  const recipients = await getEmails();

  await sendEmail({
    template: "document-uploaded",
    to: recipients.map(({ email }) => email),
    "h:X-Mailgun-Variables": JSON.stringify({
      downloadLink,
    }),
  });
}
