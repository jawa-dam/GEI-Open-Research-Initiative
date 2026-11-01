import { describe, it, expect } from "vitest";
import {
  DISCIPLINES,
  CONTRIBUTION_TYPES,
  APPLICATION_STATUSES,
  SUBMISSION_TYPES,
  SUBMISSION_STATUSES,
  ATTRIBUTION_CHOICES,
  USER_ROLES,
  EXTERNAL_LINKS,
} from "../lib/constants";

describe("DISCIPLINES", () => {
  it("has exactly 6 disciplines", () => {
    expect(DISCIPLINES).toHaveLength(6);
  });

  it("each discipline has required fields", () => {
    for (const d of DISCIPLINES) {
      expect(d.id).toBeTruthy();
      expect(d.title).toBeTruthy();
      expect(d.subtitle).toBeTruthy();
      expect(d.cta).toBeTruthy();
      expect(d.icon).toBeTruthy();
      expect(d.description).toBeTruthy();
    }
  });

  it("has unique discipline IDs", () => {
    const ids = DISCIPLINES.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes all six required disciplines", () => {
    const titles = DISCIPLINES.map((d) => d.title);
    expect(titles).toContain("Hebrew Scholars");
    expect(titles).toContain("Biblical Researchers");
    expect(titles).toContain("Civil Engineers");
    expect(titles).toContain("Hydrologists");
    expect(titles).toContain("Archaeologists");
    expect(titles).toContain("Mechanical Engineers");
  });
});

describe("Application statuses", () => {
  it("includes all required statuses", () => {
    expect(APPLICATION_STATUSES).toContain("received");
    expect(APPLICATION_STATUSES).toContain("under_review");
    expect(APPLICATION_STATUSES).toContain("accepted");
    expect(APPLICATION_STATUSES).toContain("waitlisted");
    expect(APPLICATION_STATUSES).toContain("declined");
    expect(APPLICATION_STATUSES).toContain("withdrawn");
  });
});

describe("Submission types", () => {
  it("includes all required types", () => {
    expect(SUBMISSION_TYPES).toContain("question");
    expect(SUBMISSION_TYPES).toContain("critique");
    expect(SUBMISSION_TYPES).toContain("technical_analysis");
    expect(SUBMISSION_TYPES).toContain("source_reference");
    expect(SUBMISSION_TYPES).toContain("correction");
    expect(SUBMISSION_TYPES).toContain("collaboration_offer");
  });
});

describe("Submission statuses", () => {
  it("includes all required statuses", () => {
    expect(SUBMISSION_STATUSES).toContain("draft");
    expect(SUBMISSION_STATUSES).toContain("submitted");
    expect(SUBMISSION_STATUSES).toContain("triage");
    expect(SUBMISSION_STATUSES).toContain("under_review");
    expect(SUBMISSION_STATUSES).toContain("published");
    expect(SUBMISSION_STATUSES).toContain("withdrawn");
  });
});

describe("User roles", () => {
  it("includes all required roles", () => {
    expect(USER_ROLES).toContain("visitor");
    expect(USER_ROLES).toContain("member");
    expect(USER_ROLES).toContain("reviewer");
    expect(USER_ROLES).toContain("admin");
  });
});

describe("Attribution choices", () => {
  it("has named, affiliation_shown, and anonymous", () => {
    expect(ATTRIBUTION_CHOICES).toEqual(["named", "affiliation_shown", "anonymous"]);
  });
});

describe("Contribution types", () => {
  it("includes all required types", () => {
    expect(CONTRIBUTION_TYPES).toContain("Linguistic review");
    expect(CONTRIBUTION_TYPES).toContain("Textual review");
    expect(CONTRIBUTION_TYPES).toContain("Engineering analysis");
    expect(CONTRIBUTION_TYPES).toContain("Hydrology review");
    expect(CONTRIBUTION_TYPES).toContain("Archaeology sources");
    expect(CONTRIBUTION_TYPES).toContain("Mechanical review");
    expect(CONTRIBUTION_TYPES).toContain("Peer critique");
    expect(CONTRIBUTION_TYPES).toContain("Other");
  });
});

describe("External links", () => {
  it("has valid Zenodo URL", () => {
    expect(EXTERNAL_LINKS.zenodo).toMatch(/^https:\/\/zenodo\.org/);
  });

  it("has valid DOI URL", () => {
    expect(EXTERNAL_LINKS.doi).toMatch(/^https:\/\/doi\.org/);
  });

  it("has valid ORCID URL", () => {
    expect(EXTERNAL_LINKS.orcid).toMatch(/^https:\/\/orcid\.org/);
  });

  it("has valid Y'allToo URL", () => {
    expect(EXTERNAL_LINKS.yalltoo).toBe("https://yalltoo.com");
  });
});
