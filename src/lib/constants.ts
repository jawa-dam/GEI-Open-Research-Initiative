export const SITE_NAME = "GEI Open Research Initiative";
export const SITE_DESCRIPTION =
  "Six disciplines. One open investigation. GEI invites Hebrew scholars, biblical researchers, engineers, hydrologists, archaeologists, and mechanical engineers to examine an alternative reading of Genesis 1–6.";

export const BRAND_COLORS = {
  cyan: "#2fd2ff",
  blue: "#3d3dea",
  magenta: "#f310ba",
  softPink: "#ff9df2",
  nearBlack: "#06070d",
} as const;

export const EXTERNAL_LINKS = {
  zenodo: "https://zenodo.org/records/17316846",
  doi: "https://doi.org/10.5281/zenodo.17316845",
  orcid: "https://orcid.org/0009-0008-1147-5913",
  yalltoo: "https://yalltoo.com",
} as const;

interface Discipline {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  icon: string;
  description: string;
  note?: string;
}

export const DISCIPLINES: Discipline[] = [
  {
    id: "hebrew-scholars",
    title: "Hebrew Scholars",
    subtitle: "THE LANGUAGE INVESTIGATION",
    cta: "EXAMINE THE HEBREW",
    icon: "scroll",
    description:
      "Help distinguish linguistic evidence from linguistic speculation. Review Hebrew vocabulary, morphology, syntax, semantic range, proposed word associations, and departures from established scholarship.",
    note: 'Explicitly distinguishes Hebrew אָדָם (adam) from an English "A-DAM" sound association. English "dam" is not the Hebrew etymology.',
  },
  {
    id: "biblical-researchers",
    title: "Biblical Researchers",
    subtitle: "THE TEXTUAL INVESTIGATION",
    cta: "EXAMINE THE TEXT",
    icon: "book",
    description:
      "Review Genesis 1–6 literary structure, sequence, genre, translation choices, contextual interpretation, canonical context, alternative readings, and whether GEI mappings follow from the text.",
  },
  {
    id: "civil-engineers",
    title: "Civil Engineers",
    subtitle: "THE STRUCTURAL INVESTIGATION",
    cta: "TEST THE STRUCTURE",
    icon: "building",
    description:
      "Review physical coherence of the proposed containment system: foundations, dam/reservoir arrangement, outlets, channels, loads, materials, elevation, and structural sequencing.",
    note: "Conceptual diagrams are not historical proof.",
  },
  {
    id: "hydrologists",
    title: "Hydrologists",
    subtitle: "THE WATER INVESTIGATION",
    cta: "INVESTIGATE THE FLOW",
    icon: "droplets",
    description:
      "Review watershed logic, collection, drainage, water balance, storage, controlled release, flow direction, elevation/head, and whether proposed sequences resemble recognizable water-management principles.",
  },
  {
    id: "archaeologists",
    title: "Archaeologists",
    subtitle: "THE ANCIENT TECHNOLOGY INVESTIGATION",
    cta: "EXAMINE THE ANCIENT EVIDENCE",
    icon: "pickaxe",
    description:
      "Review securely dated evidence for ancient dams, canals, reservoirs, irrigation, mills, and water-control technologies. Evaluate chronology, geography, cultural context, and what physical evidence would be required.",
    note: "Do not imply an artifact supports GEI unless documented.",
  },
  {
    id: "mechanical-engineers",
    title: "Mechanical Engineers",
    subtitle: "THE MECHANICAL INVESTIGATION",
    cta: "TEST THE MECHANISM",
    icon: "cog",
    description:
      "Review proposed waterwheel/mill connections, operating principles, flow and head requirements, power transfer, shafts/gearing, and mechanical plausibility.",
    note: "Keep proposed associations distinct from direct textual identification.",
  },
];

export type DisciplineId = string;

export const CONTRIBUTION_TYPES = [
  "Linguistic review",
  "Textual review",
  "Engineering analysis",
  "Hydrology review",
  "Archaeology sources",
  "Mechanical review",
  "Literature references",
  "Peer critique",
  "Discussion",
  "Other",
] as const;

export const APPLICATION_STATUSES = [
  "received",
  "under_review",
  "accepted",
  "waitlisted",
  "declined",
  "withdrawn",
] as const;

export const SUBMISSION_TYPES = [
  "question",
  "critique",
  "technical_analysis",
  "source_reference",
  "correction",
  "collaboration_offer",
] as const;

export const SUBMISSION_STATUSES = [
  "draft",
  "submitted",
  "triage",
  "under_review",
  "response_requested",
  "published",
  "not_published",
  "withdrawn",
] as const;

export const ATTRIBUTION_CHOICES = [
  "named",
  "affiliation_shown",
  "anonymous",
] as const;

export const USER_ROLES = ["visitor", "member", "reviewer", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];
