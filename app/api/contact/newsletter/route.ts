import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://socieas.com";
    const logoUrl = `${siteUrl}/logo.png`;

    const userHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Socieas Insights</title>
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
Welcome to Socieas
</h2>

<p style="color:#6b7280; font-size:16px; line-height:1.8; margin-top:20px;">
Thank you for subscribing to our newsletter! You're now part of a community focused on building growth that scales.
</p>

<p style="color:#6b7280; font-size:16px; line-height:1.8;">
You'll receive weekly insights on founder visibility, positioning, AI systems, and scalable growth strategies.
</p>

<p style="color:#6b7280; font-size:16px; line-height:1.8;">
At Socieas, we help brands scale through strategy, digital marketing, CRM solutions, AI automation, and full stack development.
</p>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-bottom:40px;">
<a href="${siteUrl}/insights" style="background:#7c3aed; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:12px; font-weight:bold;">
Explore Insights
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

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Welcome to Socieas — Growth That Scales",
      html: userHtml,
    });

    console.log("NEW NEWSLETTER SUBSCRIBER:", email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER API ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
