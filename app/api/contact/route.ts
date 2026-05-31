import { NextResponse } from "next/server";

// -- Cloudflare Turnstile verification
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Missing TURNSTILE_SECRET_KEY environment variable.");
    return false;
  }

  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }
  );
  const data = await res.json();
  return data.success === true;
}

// -- POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, goal, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Security check failed" },
        { status: 400 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const notifyEmail = process.env.NOTIFY_EMAIL || "hello@socieas.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://socieas.com";

    const logoUrl = `${siteUrl}/logo.png`;

    // Internal notification template
    const internalHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Lead Received - Socieas</title>
</head>

<body style="margin:0; padding:0; background:#f7f7f5; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f5; padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border: 1px solid #e5e7eb;">

<!-- Header -->
<tr>
<td align="center" style="padding:30px; background:#ffffff;">
<img src="${logoUrl}" alt="Socieas" width="180" style="display:block;">
</td>
</tr>

<!-- Title -->
<tr>
<td style="padding:40px 40px 20px;">
<h2 style="margin:0; color:#7c3aed; font-size:28px;">New Lead Received</h2>
<p style="color:#6b7280; font-size:16px; line-height:1.6;">
A new inquiry has been submitted through the Socieas website.
</p>
</td>
</tr>

<!-- Lead Details -->
<tr>
<td style="padding:0 40px 40px;">
<table width="100%" cellpadding="12" cellspacing="0" style="background:#f3f4f6; border-radius:10px;">

<tr>
<td><strong>Name:</strong></td>
<td>${name}</td>
</tr>

<tr>
<td><strong>Email:</strong></td>
<td>${email}</td>
</tr>

<tr>
<td><strong>Company:</strong></td>
<td>${company || "N/A"}</td>
</tr>

<tr>
<td><strong>Service Interested In:</strong></td>
<td>${goal || "N/A"}</td>
</tr>

<tr>
<td><strong>Message:</strong></td>
<td>${message}</td>
</tr>

</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-bottom:40px;">
<a href="${siteUrl}" style="background:#7c3aed; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:12px; font-weight:bold;">
View Website
</a>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#111111; padding:30px; text-align:center; color:#ffffff;">

<p style="margin:0 0 15px;">www.socieas.com</p>

<div>
<a href="https://linkedin.com/company/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24">
</a>

<a href="https://instagram.com/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24">
</a>

<a href="https://facebook.com/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24">
</a>
</div>

<p style="margin-top:20px; font-size:12px; opacity:0.8;">
Socieas • Building Growth That Scales
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `;

    // User confirmation template
    const userHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You for Reaching Out - Socieas</title>
</head>

<body style="margin:0; padding:0; background:#f7f7f5; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f5; padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border: 1px solid #e5e7eb;">

<!-- Header -->
<tr>
<td align="center" style="padding:30px;">
<img src="${logoUrl}" alt="Socieas" width="180">
</td>
</tr>

<!-- Message -->
<tr>
<td style="padding:40px;">

<h2 style="margin:0; color:#7c3aed; font-size:28px;">
Thank You, ${name}
</h2>

<p style="color:#6b7280; font-size:16px; line-height:1.8; margin-top:20px;">
We’ve successfully received your inquiry.
</p>

<p style="color:#6b7280; font-size:16px; line-height:1.8;">
Our team is reviewing your requirements and will connect with you shortly.
</p>

<p style="color:#6b7280; font-size:16px; line-height:1.8;">
At Socieas, we help brands scale through strategy, digital marketing, CRM solutions, AI automation, and full stack development.
</p>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-bottom:40px;">
<a href="${siteUrl}" style="background:#7c3aed; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:12px; font-weight:bold;">
Explore Socieas
</a>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#111111; padding:30px; text-align:center; color:#ffffff;">

<p style="margin:0 0 15px;">Stay Connected</p>

<div>
<a href="https://linkedin.com/company/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24">
</a>

<a href="https://instagram.com/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24">
</a>

<a href="https://facebook.com/socieas" style="margin:0 8px;">
<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24">
</a>
</div>

<p style="margin-top:20px; font-size:12px; opacity:0.8;">
www.socieas.com
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `;

    // Internal notification
    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      replyTo: email,
      subject: `New Inquiry: ${name} - ${goal || "Contact Form"}`,
      html: internalHtml,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your message — Socieas",
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("CONTACT API ERROR:", err);
    console.error(err?.message);
    console.error(err?.stack);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}