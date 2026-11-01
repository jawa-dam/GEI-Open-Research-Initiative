import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { submissionSchema } from "@/lib/validation";
import { sanitizeHtml } from "@/lib/validation";
import {
  createSubmission,
  listSubmissionsByAuthor,
  getSubmission,
  updateSubmissionStatus,
} from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await listSubmissionsByAuthor(session.user.id);
  return NextResponse.json({ submissions });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const submission = await createSubmission({
      authorId: session.user.id,
      type: data.type,
      title: sanitizeHtml(data.title),
      discipline: sanitizeHtml(data.discipline),
      content: sanitizeHtml(data.content),
      abstract: data.abstract ? sanitizeHtml(data.abstract) : undefined,
      biblicalPassages: data.biblicalPassages
        ? sanitizeHtml(data.biblicalPassages)
        : undefined,
      sourceLanguageRefs: data.sourceLanguageRefs
        ? sanitizeHtml(data.sourceLanguageRefs)
        : undefined,
      bibliography: data.bibliography
        ? sanitizeHtml(data.bibliography)
        : undefined,
      attribution: data.attribution,
    });

    return NextResponse.json(
      { message: "Submission created", submission },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { submissionId, status, note } = await request.json();

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: "submissionId and status are required" },
        { status: 400 }
      );
    }

    const submission = await getSubmission(submissionId);
    if (!submission) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isOwner = submission.authorId === session.user.id;
    const isReviewer = session.user.role === "reviewer" || session.user.role === "admin";

    if (status === "submitted" && isOwner && submission.status === "draft") {
      await updateSubmissionStatus(submissionId, "submitted", session.user.id, note);
    } else if (status === "withdrawn" && isOwner) {
      await updateSubmissionStatus(submissionId, "withdrawn", session.user.id, note);
    } else if (isReviewer) {
      await updateSubmissionStatus(submissionId, status, session.user.id, note);
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ message: "Status updated" });
  } catch {
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
