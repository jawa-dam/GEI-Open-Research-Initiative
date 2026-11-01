import { describe, it, expect } from "vitest";
import { applicationSchema, submissionSchema, signUpSchema, sanitizeHtml } from "../lib/validation";

describe("applicationSchema", () => {
  const validApplication = {
    name: "Dr. Jane Smith",
    email: "jane@university.edu",
    discipline: "hebrew-scholars",
    expertise: "20 years of Hebrew lexicography and comparative Semitic linguistics",
    researchQuestions: "Does the semantic range of adam support GEI associations?",
    contributionTypes: ["Linguistic review"],
    examineOrChallenge: "I would examine the BDB and HALOT entries for adam against GEI claims",
    consentContact: true as const,
    consentAttribution: false,
  };

  it("accepts a valid application", () => {
    const result = applicationSchema.safeParse(validApplication);
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = applicationSchema.safeParse({ ...validApplication, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = applicationSchema.safeParse({ ...validApplication, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing discipline", () => {
    const result = applicationSchema.safeParse({ ...validApplication, discipline: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty contribution types", () => {
    const result = applicationSchema.safeParse({ ...validApplication, contributionTypes: [] });
    expect(result.success).toBe(false);
  });

  it("rejects without consent to contact", () => {
    const result = applicationSchema.safeParse({ ...validApplication, consentContact: false });
    expect(result.success).toBe(false);
  });

  it("accepts optional fields as empty", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      professionalTitle: "",
      institution: "",
      profileUrl: "",
    });
    expect(result.success).toBe(true);
  });

  it("validates profile URL format", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      profileUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid profile URL", () => {
    const result = applicationSchema.safeParse({
      ...validApplication,
      profileUrl: "https://orcid.org/0000-0000-0000-0000",
    });
    expect(result.success).toBe(true);
  });

  it("rejects expertise under minimum length", () => {
    const result = applicationSchema.safeParse({ ...validApplication, expertise: "short" });
    expect(result.success).toBe(false);
  });
});

describe("submissionSchema", () => {
  const validSubmission = {
    type: "question" as const,
    title: "Does adam have water-related semantic connections?",
    discipline: "hebrew-scholars",
    content: "A".repeat(100),
    attribution: "named" as const,
  };

  it("accepts a valid submission", () => {
    const result = submissionSchema.safeParse(validSubmission);
    expect(result.success).toBe(true);
  });

  it("rejects invalid submission type", () => {
    const result = submissionSchema.safeParse({ ...validSubmission, type: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects short title", () => {
    const result = submissionSchema.safeParse({ ...validSubmission, title: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects short content", () => {
    const result = submissionSchema.safeParse({ ...validSubmission, content: "Too short" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid attribution", () => {
    const result = submissionSchema.safeParse({ ...validSubmission, attribution: "public" });
    expect(result.success).toBe(false);
  });

  it("accepts optional fields", () => {
    const result = submissionSchema.safeParse({
      ...validSubmission,
      abstract: "Brief overview of the question",
      biblicalPassages: "Genesis 2:7",
      sourceLanguageRefs: "אָדָם",
      bibliography: "BDB Lexicon",
    });
    expect(result.success).toBe(true);
  });
});

describe("signUpSchema", () => {
  it("accepts valid registration", () => {
    const result = signUpSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      password: "SecurePass123!",
      confirmPassword: "SecurePass123!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password", () => {
    const result = signUpSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      password: "Short1",
      confirmPassword: "Short1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without uppercase", () => {
    const result = signUpSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      password: "nouppercase123",
      confirmPassword: "nouppercase123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = signUpSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      password: "SecurePass123!",
      confirmPassword: "DifferentPass123!",
    });
    expect(result.success).toBe(false);
  });
});

describe("sanitizeHtml", () => {
  it("escapes HTML entities", () => {
    expect(sanitizeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;"
    );
  });

  it("escapes ampersands", () => {
    expect(sanitizeHtml("A & B")).toBe("A &amp; B");
  });

  it("escapes quotes", () => {
    expect(sanitizeHtml('"test"')).toBe("&quot;test&quot;");
  });

  it("preserves normal text", () => {
    expect(sanitizeHtml("Hello world")).toBe("Hello world");
  });
});
