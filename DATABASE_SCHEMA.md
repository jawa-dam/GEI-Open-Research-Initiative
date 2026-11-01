# GEI Open Research Initiative — Database Schema

This document describes the database schema for production deployment.
The current development implementation uses an in-memory store (`src/lib/db.ts`).

## Tables

### users

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| email | VARCHAR(254) | UNIQUE, NOT NULL |
| name | VARCHAR(200) | NOT NULL |
| display_name | VARCHAR(200) | NOT NULL |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'member', CHECK (role IN ('visitor', 'member', 'reviewer', 'admin')) |
| email_verified | BOOLEAN | NOT NULL, DEFAULT FALSE |
| password_hash | VARCHAR(255) | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

### applications

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| name | VARCHAR(200) | NOT NULL |
| email | VARCHAR(254) | NOT NULL |
| discipline | VARCHAR(100) | NOT NULL |
| professional_title | VARCHAR(200) | |
| institution | VARCHAR(200) | |
| expertise | TEXT | NOT NULL |
| research_questions | TEXT | NOT NULL |
| contribution_types | TEXT[] | NOT NULL |
| profile_url | VARCHAR(500) | |
| examine_or_challenge | TEXT | NOT NULL |
| consent_contact | BOOLEAN | NOT NULL |
| consent_attribution | BOOLEAN | NOT NULL, DEFAULT FALSE |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'received', CHECK (status IN ('received', 'under_review', 'accepted', 'waitlisted', 'declined', 'withdrawn')) |
| reviewed_by | UUID | REFERENCES users(id) |
| review_notes | TEXT | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

### submissions

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| author_id | UUID | NOT NULL, REFERENCES users(id) |
| type | VARCHAR(30) | NOT NULL, CHECK (type IN ('question', 'critique', 'technical_analysis', 'source_reference', 'correction', 'collaboration_offer')) |
| title | VARCHAR(300) | NOT NULL |
| discipline | VARCHAR(100) | NOT NULL |
| content | TEXT | NOT NULL |
| abstract | TEXT | |
| biblical_passages | TEXT | |
| source_language_refs | TEXT | |
| bibliography | TEXT | |
| attribution | VARCHAR(20) | NOT NULL, CHECK (attribution IN ('named', 'affiliation_shown', 'anonymous')) |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'draft', CHECK (status IN ('draft', 'submitted', 'triage', 'under_review', 'response_requested', 'published', 'not_published', 'withdrawn')) |
| assigned_reviewer | UUID | REFERENCES users(id) |
| reviewer_notes | TEXT | |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

### submission_status_history

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| submission_id | UUID | NOT NULL, REFERENCES submissions(id) ON DELETE CASCADE |
| from_status | VARCHAR(20) | NOT NULL |
| to_status | VARCHAR(20) | NOT NULL |
| changed_by | UUID | NOT NULL, REFERENCES users(id) |
| note | TEXT | |
| changed_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

### audit_log

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| action | VARCHAR(100) | NOT NULL |
| target_type | VARCHAR(50) | NOT NULL |
| target_id | UUID | NOT NULL |
| performed_by | VARCHAR(100) | NOT NULL |
| details | TEXT | NOT NULL |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

## Indexes

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_submissions_author ON submissions(author_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_reviewer ON submissions(assigned_reviewer);
CREATE INDEX idx_status_history_submission ON submission_status_history(submission_id);
CREATE INDEX idx_audit_log_target ON audit_log(target_type, target_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at DESC);
```

## Row-Level Security Notes

For production PostgreSQL with RLS:
- Users can only read their own profile data
- Members can only see their own submissions
- Reviewers can see submissions in review states
- Admins have full access
- Applications are readable only by admins
- Audit log is readable only by admins
- Email addresses are never exposed in public queries
