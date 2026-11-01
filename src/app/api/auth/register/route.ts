import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation";
import { createUser } from "@/lib/db";

const isDev = process.env.NODE_ENV === "development";
const devAuthEnabled = isDev && process.env.ENABLE_DEV_AUTH === "true";

export async function POST(request: NextRequest) {
  if (!devAuthEnabled) {
    return NextResponse.json(
      { error: "Registration requires a configured authentication provider. See SETUP.md." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const user = await createUser({
      email: parsed.data.email,
      name: parsed.data.name,
      password: parsed.data.password,
    });

    if (!user) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Account created. Please sign in." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
