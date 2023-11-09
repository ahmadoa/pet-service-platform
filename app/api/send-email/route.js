import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { firstname, lastname, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.SEND_TO_EMAIL,
    subject: `New Message from ${firstname} ${lastname}`,
    text: message,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Email not sent" });
  }
}
