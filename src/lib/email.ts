import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export function createEmailTransport() {
	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: 587,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});
}

export const sendEmail = async ({ to, subject, html }: Mail.Options) => {
	const transport = createEmailTransport();

	await transport.sendMail({
		from: {
			name: "Salens Samfällighetsförening",
			address: "info@salenssamfallighetsforening.se",
		},
		to,
		subject,
		html,
	});
};
