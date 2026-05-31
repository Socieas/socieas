import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ADMIN NOTIFICATION
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `🔔 New Newsletter Subscriber | ${email}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <div style="background:#44006D; padding:30px; text-align:center;">
            <img src="https://socieas.com/logo.png" alt="Socieas" style="height: 40px; width: auto; margin-bottom: 10px;">
            <p style="color:#F57F20; margin-top:8px; font-weight: 600;">Newsletter Notification</p>
          </div>
          <div style="padding:32px;">
            <h2 style="color:#111;">A new subscriber has joined</h2>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="padding:20px; text-align:center; background:#f9fafb; font-size:14px; border-top: 1px solid #eee;">
             <p style="color: #666; margin: 0;">socieas.com</p>
          </div>
        </div>
      </div>
      `,
    });

    // USER CONFIRMATION
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Socieas Insights",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <div style="background:#44006D; padding:30px; text-align:center;">
            <img src="https://socieas.com/logo.png" alt="Socieas" style="height: 40px; width: auto; margin-bottom: 10px;">
            <p style="color:#F57F20; margin-top:8px; font-weight: 600;">Building Growth Through Digital Innovation</p>
          </div>
          <div style="padding:32px;">
            <h2 style="color:#111;">Welcome to the community!</h2>
            <p>Thank you for subscribing to Socieas Founder Insights.</p>
            <p>You'll receive weekly strategies on founder visibility, positioning, AI systems, and scalable growth.</p>
            <div style="margin-top:30px;">
              <a href="https://socieas.com" style="background:#F57F20; color:white; padding:14px 24px; text-decoration:none; border-radius:10px; font-weight: bold;">Explore Insights</a>
            </div>
          </div>
          <div style="padding:20px; text-align:center; background:#f9fafb; font-size:14px; border-top: 1px solid #eee;">
             <div style="margin-bottom: 15px;">
                <a href="https://www.linkedin.com/company/socieas/" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">LinkedIn</a>
                <a href="https://www.instagram.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">Instagram</a>
                <a href="https://www.instagram.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">X</a>
                <a href="https://www.facebook.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">Facebook</a>
             </div>
             <p style="color: #666; margin: 0;">socieas.com</p>
          </div>
        </div>
      </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER ERROR:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
