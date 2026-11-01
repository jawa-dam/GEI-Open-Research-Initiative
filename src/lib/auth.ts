import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { UserRole } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      emailVerified: Date | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    emailVerified: Date | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    emailVerified: boolean;
  }
}

const isDev = process.env.NODE_ENV === "development";
const devAuthEnabled = isDev && process.env.ENABLE_DEV_AUTH === "true";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
    newUser: "/dashboard",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    ...(devAuthEnabled
      ? [
          Credentials({
            id: "dev-credentials",
            name: "Development Login",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (!devAuthEnabled) return null;

              const { getUserByEmail, verifyPassword } = await import("./db");
              const email = credentials?.email as string;
              const password = credentials?.password as string;

              if (!email || !password) return null;

              const user = await getUserByEmail(email);
              if (!user) return null;

              const valid = await verifyPassword(password, user.passwordHash);
              if (!valid) return null;

              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                emailVerified: user.emailVerified ? new Date() : null,
              };
            },
          }),
        ]
      : []),
    // Production auth providers (Auth.js OAuth, email, etc.) are configured
    // via environment variables. See .env.example and SETUP.md for details.
    // Example: GitHub, Google, or email-based magic links.
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as unknown as { role: UserRole }).role;
        token.emailVerified = !!user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.emailVerified = token.emailVerified ? new Date() : null;
      return session;
    },
    async authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;

      const protectedPaths = [
        "/dashboard",
        "/profile",
        "/submissions",
        "/review",
        "/admin",
      ];

      const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

      if (isProtected && !session?.user) {
        return false;
      }

      if (pathname.startsWith("/review")) {
        const role = session?.user?.role;
        if (role !== "reviewer" && role !== "admin") {
          return false;
        }
      }

      if (pathname.startsWith("/admin")) {
        if (session?.user?.role !== "admin") {
          return false;
        }
      }

      return true;
    },
  },
});

export async function getServerSession() {
  return auth();
}

export function requireRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = {
    visitor: 0,
    member: 1,
    reviewer: 2,
    admin: 3,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}
