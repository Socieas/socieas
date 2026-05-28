import { NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      name,
      email,
      company,
      goal,
      message,
    } = body;

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !message
    ) {

      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    /* SEND EMAIL */

    const data =
      await resend.emails.send({

        from:
          "Socieas <onboarding@resend.dev>",

        to:
          "hello@socieas.com",

        subject:
          `New Inquiry from ${name}`,

        replyTo: email,

        html: `
          <div style="font-family:Arial,sans-serif;padding:32px;background:#F9FAFB;">

            <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;padding:40px;border:1px solid #E5E7EB;">

              <h1 style="margin:0 0 24px;font-size:28px;color:#111827;">
                New Contact Inquiry
              </h1>

              <table style="width:100%;border-collapse:collapse;">

                <tr>
                  <td style="padding:12px 0;font-weight:700;color:#111827;">
                    Name
                  </td>

                  <td style="padding:12px 0;color:#4B5563;">
                    ${name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;font-weight:700;color:#111827;">
                    Email
                  </td>

                  <td style="padding:12px 0;color:#4B5563;">
                    ${email}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;font-weight:700;color:#111827;">
                    Company
                  </td>

                  <td style="padding:12px 0;color:#4B5563;">
                    ${company || "Not Provided"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;font-weight:700;color:#111827;">
                    Goal
                  </td>

                  <td style="padding:12px 0;color:#4B5563;">
                    ${goal || "Not Selected"}
                  </td>
                </tr>

              </table>

              <div style="margin-top:32px;">

                <h2 style="font-size:18px;color:#111827;margin-bottom:12px;">
                  Message
                </h2>

                <div style="background:#F3F4F6;padding:24px;border-radius:18px;color:#374151;line-height:1.8;">
                  ${message}
                </div>

              </div>

            </div>

          </div>
        `,
      });

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {

    console.error(
      "CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}