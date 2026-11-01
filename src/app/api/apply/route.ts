import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";
import { createApplication } from "@/lib/db";
import { sanitizeHtml } from "@/lib/validation";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many applications. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const application = await createApplication({
      name: sanitizeHtml(data.name),
      email: data.email.toLowerCase().trim(),
      discipline: sanitizeHtml(data.discipline),
      professionalTitle: data.professionalTitle ? sanitizeHtml(data.professionalTitle) : undefined,
      institution: data.institution ? sanitizeHtml(data.institution) : undefined,
      expertise: sanitizeHtml(data.expertise),
      researchQuestions: sanitizeHtml(data.researchQuestions),
      contributionTypes: data.contributionTypes as string[],
      profileUrl: data.profileUrl || undefined,
      examineOrChallenge: sanitizeHtml(data.examineOrChallenge),
      consentContact: data.consentContact as boolean,
      consentAttribution: data.consentAttribution as boolean,
    });

    return NextResponse.json(
      {
        message: "Application received. You will be contacted regarding next steps.",
        applicationId: application.id,
        status: application.status,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}
