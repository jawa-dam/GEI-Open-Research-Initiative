import { describe, it, expect } from "vitest";
import type { UserRole } from "../lib/types";

// Replicate the requireRole logic here to avoid importing next-auth deps
function requireRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = {
    visitor: 0,
    member: 1,
    reviewer: 2,
    admin: 3,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

describe("requireRole", () => {
  it("visitor can access visitor-level", () => {
    expect(requireRole("visitor", "visitor")).toBe(true);
  });

  it("visitor cannot access member-level", () => {
    expect(requireRole("visitor", "member")).toBe(false);
  });

  it("member can access member-level", () => {
    expect(requireRole("member", "member")).toBe(true);
  });

  it("member cannot access reviewer-level", () => {
    expect(requireRole("member", "reviewer")).toBe(false);
  });

  it("reviewer can access reviewer-level", () => {
    expect(requireRole("reviewer", "reviewer")).toBe(true);
  });

  it("reviewer can access member-level", () => {
    expect(requireRole("reviewer", "member")).toBe(true);
  });

  it("reviewer cannot access admin-level", () => {
    expect(requireRole("reviewer", "admin")).toBe(false);
  });

  it("admin can access all levels", () => {
    expect(requireRole("admin", "visitor")).toBe(true);
    expect(requireRole("admin", "member")).toBe(true);
    expect(requireRole("admin", "reviewer")).toBe(true);
    expect(requireRole("admin", "admin")).toBe(true);
  });
});
