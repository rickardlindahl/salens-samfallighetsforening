import { dev } from "$app/environment";
import { MAILGUN_API_KEY } from "$env/static/private";
import Mailgun, { type MailgunMessageData } from "mailgun.js";
import FormData from "form-data";

function sendMail(options: MailgunMessageData) {
  if (dev) {
    return Promise.resolve();
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    url: "https://api.eu.mailgun.net",
    username: "api",
    key: MAILGUN_API_KEY,
  });

  return mg.messages.create("salenssamfallighetsforening.se", options);
}

export function sendPostCreatedEmail({
  emails,
  post,
}: {
  emails: string[];
  post: { title: string; id: string };
}) {
  const mailgunData: MailgunMessageData = {
    from: "Salens Samfällighetsförening <noreply@salenssamfallighetsforening.se>",
    to: emails.join(","),
    subject: `Nytt inlägg publicerat`,
    template: "post-published",
    "h:X-Mailgun-Variables": JSON.stringify({
      link: `<a href="https://www.salenssamfallighetsforening.se/posts/${post.id}">${post.title}</a>`,
    }),
  };

  return sendMail(mailgunData);
}
