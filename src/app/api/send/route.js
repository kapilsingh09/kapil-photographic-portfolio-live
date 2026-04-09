import { Resend } from "resend";
import { NextResponse } from "next/server";

// 1. Basic Rate Limiting (In-memory simple store for demonstration/basic protection)
// Note: For multi-server/Vercel edge, consider Upstash Redis Rate Limiting.
const rateLimitCache = new Map();

// 2. HTML Sanitization Helper to prevent XSS in email clients
function sanitizeInput(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req) {
  // 3. Rate Limiting Check
  // We use the IP if available, fallback to a global restrictor if needed
  const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 minute window
  const maxRequests = 3; // 3 emails per minute per IP

  const requestInfo = rateLimitCache.get(ip) || { count: 0, firstRequest: now };
  
  if (now - requestInfo.firstRequest > windowTime) {
    // Reset window
    requestInfo.count = 1;
    requestInfo.firstRequest = now;
  } else {
    requestInfo.count++;
  }
  
  rateLimitCache.set(ip, requestInfo);

  if (requestInfo.count > maxRequests) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 } // 429 Too Many Requests
    );
  }

  try {
    // 4. Secure Environment Variables (Standardization)
    const apiKey = process.env.RESEND_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("SERVER ERROR: Missing Resend API Key.");
      return NextResponse.json(
        { success: false, error: "Internal Server Configuration Error." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    let body;

    try {
      body = await req.json();
    } catch (e) {
       return NextResponse.json({ success: false, error: "Invalid JSON format." }, { status: 400 });
    }

    const { name, email, service, message, _gotcha } = body;

    // 5. Spam Protection (Honeypot)
    // If a bot filled out the hidden _gotcha field, silently drop the request
    if (_gotcha) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${ip}`);
      // Return 200 so bots think they succeeded, preventing them from retrying
      return NextResponse.json({ success: true, data: { status: "silently_dropped" } });
    }

    // 6. Strict Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Valid name is required." }, { status: 400 });
    }
    
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: "Message must be at least 10 characters." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Valid email address is required." }, { status: 400 });
    }

    // 7. Data Sanitization
    const sName = sanitizeInput(name.trim());
    const sEmail = sanitizeInput(email.trim()).toLowerCase();
    const sService = sanitizeInput(service);
    const sMessage = sanitizeInput(message.trim());

    // 8. Secure Email Dispatch
    // Note for production: Replace "onboarding@resend.dev" with a verified domain email (e.g. "hello@kapilphoto.com")
    // Using resend.dev restricts you to ONLY sending to your registered testing email!
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", 
      to: ["temprary526@gmail.com"], // Your receiving email
      reply_to: sEmail,
      subject: `New Contact Message from ${sName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 0;">
          <div style="border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 28px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111;">New Inquiry</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #888;">via kapil Photography contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666; width: 100px;">Name</td>
              <td style="padding: 10px 0;">${sName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${sEmail}" style="color: #111; text-decoration: none;">${sEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #666;">Service</td>
              <td style="padding: 10px 0;">${sService || "Not specified"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #f9fafb; border-radius: 10px;">
            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333; white-space: pre-wrap;">${sMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Delivery Error]:", error);
      // Do not expose internal API provider errors to the client
      return NextResponse.json(
        { success: false, error: "Failed to send email due to an external service issue." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Email queued successfully" });
  } catch (err) {
    console.error("[Internal API Error]:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

