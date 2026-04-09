import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!process.env.API_KEY) {
      return NextResponse.json(
        { success: false, error: "Server config error: Missing API key. Add API_KEY to .env" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.API_KEY);
    const { name, email, service, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["temprary526@gmail.com"],
      reply_to: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 0;">
          <div style="border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 28px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111;">New Inquiry</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #888;">via kapil Photography contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666; width: 100px;">Name</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #111; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666;">Service</td>
              <td style="padding: 10px 0;">${service || "Not specified"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #f9fafb; border-radius: 10px;">
            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 32px; font-size: 11px; color: #bbb; text-align: center;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
