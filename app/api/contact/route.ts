import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { profile } from "@/content/profile";

/** Nodemailer needs Node APIs, so this route cannot run on the edge runtime. */
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  /**
   * Honeypot: hidden from people, so anything here means a bot. Deliberately
   * permissive — rejecting it during validation would answer with a 400 and
   * tell the bot exactly which field gave it away.
   */
  company: z.string().max(200).optional(),
});

/**
 * Crude in-memory rate limit. Serverless instances are short-lived and not
 * shared, so this only blunts naive floods — it is not a substitute for a real
 * limiter, but it costs nothing and stops the obvious abuse.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Never leak which variable is missing to the client.
    console.error("Contact route: SMTP environment variables are not configured.");
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — answer exactly as we would on success, so the bot
  // gets no signal that it was caught.
  if (company && company.trim()) return NextResponse.json({ ok: true });

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Without these an unreachable host leaves the request hanging until the
    // platform's own timeout kills it, and the visitor just watches a spinner.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transporter.sendMail({
      // The envelope sender must be the authenticated mailbox, or providers
      // reject the message. The visitor's address goes in Reply-To instead.
      from: `"${name} — portfolio" <${SMTP_USER}>`,
      to: CONTACT_TO || profile.email,
      replyTo: `"${name}" <${email}>`,
      subject: `New message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <p><strong>${escapeHtml(name)}</strong><br>
          <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <hr style="border:none;border-top:1px solid #ddd">
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route: sending failed.", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
