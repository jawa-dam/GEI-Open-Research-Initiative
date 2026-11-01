# GEI Open Research Initiative — Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Git

## Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/jawa-dam/GEI-Open-Research-Initiative.git
cd GEI-Open-Research-Initiative

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Enable development authentication (optional)
# Edit .env.local and set:
#   ENABLE_DEV_AUTH=true
#   NEXT_PUBLIC_DEV_AUTH=true
#   AUTH_SECRET=any-random-string-for-dev

# Start development server
npm run dev
```

Visit http://localhost:3000

### Development Authentication

When `ENABLE_DEV_AUTH=true` and `NEXT_PUBLIC_DEV_AUTH=true` are set in development mode:

- A credentials-based login form appears at `/sign-in`
- A seeded admin account is available: `admin@dev.local` / `DevAdmin12345!`
- New accounts can be registered at `/sign-up`
- **This is an in-memory store — data resets on server restart**

**These flags have no effect in production** (`NODE_ENV=production`). The application checks both the environment variable AND `NODE_ENV` before enabling development auth.

## Production Deployment

### 1. Authentication Provider

Configure at least one OAuth provider in `.env.local`:

**GitHub OAuth:**
```
AUTH_GITHUB_ID=your-github-oauth-app-id
AUTH_GITHUB_SECRET=your-github-oauth-app-secret
```

**Google OAuth:**
```
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

See [Auth.js documentation](https://authjs.dev/getting-started/providers) for full provider configuration.

### 2. Database

The current implementation uses an in-memory store for development. For production:

1. Set up PostgreSQL (recommended) or another supported database
2. Add `DATABASE_URL` to `.env.local`
3. Replace `src/lib/db.ts` with a real database client (Prisma, Drizzle, etc.)
4. Run migrations from the schema in `DATABASE_SCHEMA.md`

### 3. Environment Variables

Ensure all required variables are set:

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | Yes | Random secret for session encryption |
| `AUTH_TRUST_HOST` | Yes (production) | Set to `true` behind reverse proxy |
| `NEXTAUTH_URL` | Yes | Full URL of the application |
| `DATABASE_URL` | Yes (production) | Database connection string |
| Auth provider vars | Yes (production) | OAuth client ID and secret |

### 4. Build and Deploy

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### 5. Deployment Platforms

The application is a standard Next.js app and can be deployed to:

- **Vercel** — Zero-config deployment, recommended
- **Railway** — Container-based, good for full-stack
- **Render** — Container or static + serverless
- **Self-hosted** — Any Node.js server with `npm start`

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Auth.js handlers + registration
│   │   ├── apply/         # Application submission
│   │   └── submissions/   # Submission CRUD
│   ├── admin/             # Admin panel (admin only)
│   ├── apply/             # Public application form
│   ├── dashboard/         # Contributor home (authenticated)
│   ├── disciplines/       # Public discipline invitations
│   ├── privacy/           # Privacy notice
│   ├── profile/           # Contributor profile (authenticated)
│   ├── research/          # Public Evidence Room
│   ├── review/            # Reviewer queue (reviewer/admin)
│   ├── sign-in/           # Authentication
│   ├── sign-up/           # Registration
│   └── submissions/       # Submission management (authenticated)
├── components/            # Shared React components
├── lib/                   # Server-side libraries
│   ├── auth.ts           # Auth.js configuration
│   ├── constants.ts      # Shared constants and types
│   ├── db.ts             # Database abstraction layer
│   ├── research-entries.ts # Evidence Room seed data
│   ├── types.ts          # TypeScript type definitions
│   └── validation.ts     # Zod validation schemas
└── middleware.ts          # Route protection middleware
```

## Security Model

- **Server-side authorization** on every protected page, action, and API route
- **Role hierarchy:** visitor → member → reviewer → admin
- **New accounts default to member**; reviewer/admin granted by admin only
- **Rate limiting** on sign-in, registration, application, and submission endpoints
- **Input validation** via Zod schemas on all form submissions
- **HTML sanitization** on all user-provided text content
- **CSRF protection** via Auth.js built-in mechanisms
- **Secure cookies**: HttpOnly, SameSite, Secure in production
- **No sensitive data collection**: No DOB, address, phone, government ID
- **Audit logging** for role changes, moderation, and status transitions
- **Middleware-based route protection** for all `/dashboard`, `/profile`, `/submissions`, `/review`, `/admin` paths

## What Needs External Configuration

| Feature | Status | What's Needed |
|---|---|---|
| Public pages | Working | None — fully functional |
| Application form | Working | None — data stored in-memory (dev) |
| Authentication | Needs config | Auth provider credentials (`.env.local`) |
| Database persistence | Needs setup | PostgreSQL + ORM integration |
| Email verification | Needs setup | SMTP configuration |
| File uploads | Not implemented | Object storage (S3, etc.) |
| Email notifications | Not implemented | Email service integration |
