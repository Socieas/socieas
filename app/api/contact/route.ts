import { NextResponse } from "next/server";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend API error: ${error}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ADMIN NOTIFICATION EMAIL
    await sendEmail(
      process.env.CONTACT_RECEIVER!,
      `New Opportunity | ${name}`,
      `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Opportunity | Socieas</title>
</head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F7F5;padding:30px 15px;">
<tr>
<td align="center">
<table width="700" cellpadding="0" cellspacing="0" border="0" style="max-width:700px;background:#ffffff;border-radius:18px;overflow:hidden;">
<tr>
<td style="background:#7C3AED;padding:35px 40px;">
<div style="font-size:48px;font-weight:800;color:#ffffff;">Socieas<span style="color:#C4B5FD;">.</span></div>
<p style="margin:15px 0 0;color:#C4B5FD;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">New Opportunity Received</p>
<h1 style="margin:15px 0 0;color:#ffffff;font-size:32px;">A new lead has arrived</h1>
</td>
</tr>
<tr>
<td style="padding:40px;">
<div style="background:#F3F4F6;border:1px solid #eeeeee;border-radius:14px;padding:25px;">
<h2 style="margin-top:0;color:#111111;">Lead Details</h2>
<p style="margin:12px 0;font-size:16px;"><strong>Name:</strong> ${name}</p>
<p style="margin:12px 0;font-size:16px;"><strong>Email:</strong> ${email}</p>
<p style="margin:12px 0;font-size:16px;"><strong>Company:</strong> ${company || "Not Provided"}</p>
<p style="margin:12px 0;font-size:16px;"><strong>Interested Service:</strong> ${service || "Not Specified"}</p>
</div>
<div style="margin-top:25px;background:#F5F3FF;border:1px solid #DDD6FE;border-radius:14px;padding:25px;">
<h3 style="margin-top:0;color:#7C3AED;">Message</h3>
<p style="margin:0;color:#444444;line-height:1.9;font-size:15px;">${message}</p>
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
<tr>
<td width="50%" style="padding-right:8px;">
<a href="mailto:${email}" style="display:block;text-align:center;background:#7C3AED;color:#ffffff;text-decoration:none;padding:16px;border-radius:10px;font-weight:700;">Reply to Lead</a>
</td>
<td width="50%" style="padding-left:8px;">
<a href="https://mail.google.com" style="display:block;text-align:center;background:#C4B5FD;color:#ffffff;text-decoration:none;padding:16px;border-radius:10px;font-weight:700;">Open Inbox</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:30px 40px;background:#F3F4F6;">
<h3 style="margin-top:0;color:#111111;">Quick Lead Summary</h3>
<p style="margin:8px 0;color:#6B7280;">&#10003; Inquiry submitted from website</p>
<p style="margin:8px 0;color:#6B7280;">&#10003; Contact email captured</p>
<p style="margin:8px 0;color:#6B7280;">&#10003; Service interest recorded</p>
<p style="margin:8px 0;color:#6B7280;">&#10003; Ready for follow-up</p>
</td>
</tr>
<tr>
<td style="background:#111111;padding:30px;text-align:center;">
<div style="font-size:34px;font-weight:800;color:#ffffff;">Socieas<span style="color:#C4B5FD;">.</span></div>
<p style="margin-top:15px;color:#6B7280;font-size:13px;">Website Lead Notification System</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`
    );

    // USER CONFIRMATION EMAIL
    await sendEmail(
      email,
      "Thanks for reaching out to Socieas!",
      `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Socieas</title>
</head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F7F5;padding:30px 15px;">
<tr>
<td align="center">
<table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px;background:#ffffff;border-radius:18px;overflow:hidden;">
<tr>
<td style="background:#ffffff;padding:35px 40px;border-bottom:1px solid #eeeeee;">
<div style="font-size:52px;font-weight:800;color:#111111;line-height:1;">Socieas<span style="color:#7C3AED;">.</span></div>
</td>
</tr>
<tr>
<td style="background:#7C3AED;padding:55px 40px;">
<p style="margin:0;color:#C4B5FD;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Inquiry Received</p>
<h1 style="margin:15px 0 0;color:#ffffff;font-size:34px;line-height:1.3;">Hi ${name},</h1>
<p style="margin:20px 0 0;color:#ffffff;font-size:18px;line-height:1.8;">Thank you for reaching out to us.</p>
<p style="margin:15px 0 0;color:rgba(255,255,255,0.78);font-size:16px;line-height:1.9;">We've received your message and one of our team members will review it shortly. If there's a good fit, we'll get back to you with the next steps and recommendations.</p>
</td>
</tr>
<tr>
<td style="padding:40px;">
<h2 style="margin-top:0;color:#111111;font-size:24px;">Here's what we received</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#F3F4F6;border:1px solid #eeeeee;border-radius:12px;">
<tr>
<td style="padding:25px;">
<p style="margin:10px 0;color:#333333;"><strong>Name:</strong> ${name}</p>
<p style="margin:10px 0;color:#333333;"><strong>Email:</strong> ${email}</p>
<p style="margin:10px 0;color:#333333;"><strong>Company:</strong> ${company || "Not Provided"}</p>
<p style="margin:10px 0;color:#333333;"><strong>Service:</strong> ${service || "Not Specified"}</p>
</td>
</tr>
</table>
<p style="margin-top:35px;color:#6B7280;font-size:16px;line-height:1.8;">While our team reviews your inquiry, feel free to explore some of our resources and services.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
<tr>
<td width="50%" style="padding-right:8px;">
<a href="https://socieas.com/services" style="display:block;text-align:center;padding:16px;background:#7C3AED;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;">Explore Services</a>
</td>
<td width="50%" style="padding-left:8px;">
<a href="https://socieas.com/insights" style="display:block;text-align:center;padding:16px;background:#C4B5FD;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;">Read Insights</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:40px;background:#F3F4F6;">
<h3 style="margin-top:0;color:#111111;">Stay Connected</h3>
<p style="color:#6B7280;line-height:1.8;">Follow Socieas for industry insights, technology updates, marketing strategies, Salesforce expertise, AI automation trends, and business growth content.</p>
<table cellpadding="0" cellspacing="0" style="margin-top:20px;">
<tr>
<td style="padding-right:12px;"><a href="https://www.linkedin.com/company/socieas/" style="color:#7C3AED;text-decoration:none;font-weight:700;">LinkedIn</a></td>
<td style="padding-right:12px;"><a href="https://www.facebook.com/socieas" style="color:#7C3AED;text-decoration:none;font-weight:700;">Facebook</a></td>
<td style="padding-right:12px;"><a href="https://www.instagram.com/socieas" style="color:#7C3AED;text-decoration:none;font-weight:700;">Instagram</a></td>
<td><a href="https://x.com/socieas" style="color:#7C3AED;text-decoration:none;font-weight:700;">X</a></td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:35px 40px;background:#111111;text-align:center;">
<div style="font-size:36px;font-weight:800;color:#ffffff;">Socieas<span style="color:#C4B5FD;">.</span></div>
<p style="margin-top:15px;color:#cccccc;font-size:14px;line-height:1.8;">Building Growth Through Digital Innovation</p>
<p style="margin-top:20px;color:#6B7280;font-size:13px;">&#169; 2026 Socieas. All rights reserved.</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
