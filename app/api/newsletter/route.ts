import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      email,
    } = body;

    if (!email) {

      return NextResponse.json(
        {
          error:
            "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "NEW NEWSLETTER SUBSCRIBER:",
      email
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}