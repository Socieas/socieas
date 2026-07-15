// app/api/resources/lead/route.ts
import { NextResponse } from "next/server";
import { getResource } from "@/data/resources";

const SITE_URL = "https://socieas.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

async function supabaseInsert(
  table: string,
  row: Record<string, unknown>,
  upsertOn?: string
) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Supabase env vars missing, skipping save");
    return;
  }
  const endpoint = `${url}/rest/v1/${table}${
    upsertOn ? `?on_conflict=${upsertOn}` : ""
  }`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: upsertOn
        ? "resolution=merge-duplicates,return=minimal"
        : "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    console.error(`Supabase ${table} error:`, await res.text());
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, challenge, resourceSlug, website } = body;

    // Honeypot: real people never fill this hidden field
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!email || !isValidEmail(email) || !resourceSlug) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const resource = getResource(resourceSlug);
    if (!resource) {
      return NextResponse.json(
        { error: "Unknown resource" },
        { status: 400 }
      );
    }

    const name = firstName && String(firstName).trim() ? String(firstName).trim() : "there";
    const downloadUrl = `${SITE_URL}/${resource.filePath}`;

    // Save the lead and the download (never blocks email delivery)
    await supabaseInsert(
      "leads",
      {
        email,
        first_name: firstName || null,
        challenge: challenge || null,
        status: "new",
      },
      "email"
    );
    await supabaseInsert("downloads", {
      email,
      resource_slug: resource.slug,
    });

    // Deliver the resource to the visitor
    await sendEmail(
      email,
      `Your free ${resource.type} is here: ${resource.title}`,
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
<p style="margin:0;color:#C4B5FD;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Your Resource Is Ready</p>
<h1 style="margin:15px 0 0;color:#ffffff;font-size:32px;line-height:1.3;">Hi ${name}, here it is.</h1>
<p style="margin:20px 0 0;color:rgba(255,255,255,0.85);font-size:17px;line-height:1.8;">${resource.title} is attached to the button below. It takes about ${resource.time} to put into action.</p>
</td>
</tr>
<tr>
<td style="padding:40px;">
<a href="${downloadUrl}" style="display:block;text-align:center;background:#7C3AED;color:#ffffff;text-decoration:none;padding:18px;border-radius:12px;font-weight:700;font-size:17px;">Download Your ${resource.type}</a>
<p style="margin-top:30px;color:#6B7280;font-size:15px;line-height:1.8;">Quick tip: block ${resource.time} in your calendar today. Resources you save for later become resources you never use.</p>
<div style="margin-top:30px;background:#F5F3FF;border:1px solid #DDD6FE;border-radius:14px;padding:25px;">
<h3 style="margin-top:0;color:#7C3AED;">Want this installed for you?</h3>
<p style="margin:0 0 20px;color:#444444;line-height:1.8;font-size:15px;">This resource is the blueprint we use with clients. If you would rather have our team build the full system for you, book a free strategy call.</p>
<a href="${SITE_URL}/contact" style="display:inline-block;background:#ffffff;border:2px solid #7C3AED;color:#7C3AED;text-decoration:none;padding:13px 24px;border-radius:10px;font-weight:700;">Book a Free Strategy Call</a>
</div>
</td>
</tr>
<tr>
<td style="padding:35px 40px;background:#F3F4F6;text-align:center;">
<div style="font-size:32px;font-weight:800;color:#111111;">Socieas<span style="color:#7C3AED;">.</span></div>
<p style="margin-top:12px;color:#6B7280;font-size:13px;line-height:1.8;">You received this because you requested a free resource at socieas.com.</p>
<p style="margin-top:8px;color:#6B7280;font-size:13px;">&#169; 2026 Socieas. All rights reserved.</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`
    );

    // Notify you about the new lead (never blocks the visitor)
    try {
      await sendEmail(
        process.env.CONTACT_RECEIVER!,
        `New resource lead: ${email}`,
        `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F5;padding:30px 15px;">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;">
<tr>
<td style="background:#7C3AED;padding:30px 40px;">
<div style="font-size:36px;font-weight:800;color:#ffffff;">Socieas<span style="color:#C4B5FD;">.</span></div>
<p style="margin:12px 0 0;color:#C4B5FD;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">New Resource Lead</p>
</td>
</tr>
<tr>
<td style="padding:35px 40px;">
<p style="margin:10px 0;font-size:16px;color:#333333;"><strong>Email:</strong> ${email}</p>
<p style="margin:10px 0;font-size:16px;color:#333333;"><strong>Name:</strong> ${firstName || "Not provided"}</p>
<p style="margin:10px 0;font-size:16px;color:#333333;"><strong>Challenge:</strong> ${challenge || "Not provided"}</p>
<p style="margin:10px 0;font-size:16px;color:#333333;"><strong>Resource:</strong> ${resource.title}</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`
      );
    } catch (notifyError) {
      console.error("Admin notification failed:", notifyError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resource lead error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
