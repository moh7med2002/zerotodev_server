// src/utils/mailer.ts
import * as nodemailer from 'nodemailer';

const emailUser = 'zerotodev2026@gmail.com';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use your mail provider
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: emailUser, // Your email address
    pass: 'nmtq tmqn knxt wowy', // App password or real password (not recommended)
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendMailOptions) => {
  await transporter.sendMail({
    from: `ZeroToDev`,
    to,
    subject,
    html,
  });
};
