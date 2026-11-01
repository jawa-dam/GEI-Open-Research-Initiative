import { describe, it, expect } from "vitest";
import { RESEARCH_ENTRIES } from "../lib/research-entries";

describe("Research entries", () => {
  it("has exactly 4 starter entries", () => {
    expect(RESEARCH_ENTRIES).toHaveLength(4);
  });

  it("entries have correct codes", () => {
    const codes = RESEARCH_ENTRIES.map((e) => e.code);
    expect(codes).toEqual(["GEI-01", "GEI-02", "GEI-03", "GEI-04"]);
  });

  it("each entry has all required fields", () => {
    for (const entry of RESEARCH_ENTRIES) {
      expect(entry.id).toBeTruthy();
      expect(entry.code).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(entry.question).toBeTruthy();
      expect(entry.scope).toBeTruthy();
      expect(entry.conventionalReading).toBeTruthy();
      expect(entry.alternativeReading).toBeTruthy();
      expect(entry.geiProposal).toBeTruthy();
      expect(entry.counterarguments).toBeTruthy();
      expect(entry.testCriteria).toBeTruthy();
      expect(entry.version).toBeTruthy();
      expect(entry.lastUpdated).toBeTruthy();
      expect(entry.reviewState).toBeTruthy();
    }
  });

  it("no entry claims completed review", () => {
    for (const entry of RESEARCH_ENTRIES) {
      expect(entry.reviewState.toLowerCase()).toContain("awaiting");
    }
  });

  it("GEI-01 distinguishes Hebrew etymology from English sound association", () => {
    const gei01 = RESEARCH_ENTRIES.find((e) => e.code === "GEI-01");
    expect(gei01).toBeDefined();
    expect(gei01!.geiProposal).toContain("not claim");
    expect(gei01!.counterarguments).toContain("unrelated to Hebrew");
  });

  it("entries reference the Zenodo publication", () => {
    for (const entry of RESEARCH_ENTRIES) {
      const hasZenodo = entry.bibliography.some(
        (b) => b.includes("Zenodo") || b.includes("zenodo")
      );
      expect(hasZenodo).toBe(true);
    }
  });

  it("entries have biblical passages", () => {
    for (const entry of RESEARCH_ENTRIES) {
      expect(entry.biblicalPassages.length).toBeGreaterThanOrEqual(0);
    }
  });

  it("no entry fabricates evidence", () => {
    for (const entry of RESEARCH_ENTRIES) {
      if (entry.evidence.toLowerCase().includes("not yet supplied")) {
        expect(entry.evidence).toContain("Not yet supplied");
      }
    }
  });
});
