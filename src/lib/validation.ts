import { z } from "zod";
import { CONTRIBUTION_TYPES, SUBMISSION_TYPES, ATTRIBUTION_CHOICES } from "./constants";

export const applicationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200, "Name must be under 200 characters"),
  email: z
    .string()
    .email("Valid email is required")
    .max(254, "Email must be under 254 characters"),
  discipline: z.string().min(1, "Please select a discipline"),
  professionalTitle: z.string().max(200).optional().default(""),
  institution: z.string().max(200).optional().default(""),
  expertise: z
    .string()
    .min(10, "Please describe your relevant expertise")
    .max(2000, "Expertise description must be under 2000 characters"),
  researchQuestions: z
    .string()
    .min(10, "Please describe your research questions of interest")
    .max(2000, "Research questions must be under 2000 characters"),
  contributionTypes: z
    .array(z.enum(CONTRIBUTION_TYPES))
    .min(1, "Select at least one contribution type"),
  profileUrl: z
    .string()
    .url("Please enter a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),
  examineOrChallenge: z
    .string()
    .min(10, "Please describe what you would examine, test, or challenge")
    .max(2000, "Response must be under 2000 characters"),
  consentContact: z.literal(true, {
    error: "Consent to be contacted is required",
  }),
  consentAttribution: z.boolean().default(false),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const submissionSchema = z.object({
  type: z.enum(SUBMISSION_TYPES),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(300, "Title must be under 300 characters"),
  discipline: z.string().min(1, "Please select a discipline"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(50000, "Content must be under 50,000 characters"),
  abstract: z.string().max(1000).optional().default(""),
  biblicalPassages: z.string().max(500).optional().default(""),
  sourceLanguageRefs: z.string().max(1000).optional().default(""),
  bibliography: z.string().max(5000).optional().default(""),
  attribution: z.enum(ATTRIBUTION_CHOICES),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const signInSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200, "Name must be under 200 characters"),
  email: z
    .string()
    .email("Valid email is required")
    .max(254, "Email must be under 254 characters"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password must be under 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and a number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
