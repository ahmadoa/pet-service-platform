import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { firstname, lastname, email, message } = await req.json();

  try {
    await resend.emails.send({
      from: `pawpal@ahmadoa.tech`,
      to: ["pawapl.official@gmail.com"],
      subject: `Received message from ${firstname} ${lastname}`,
      react: EmailTemplate({ firstname, message, email }),
    });
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Email not sent" });
  }
}
