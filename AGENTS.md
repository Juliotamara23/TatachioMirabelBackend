# Repository Guidelines

## How to Use This Guide

- Start here for cross-project norms. TatachioMirabel-V1 is a Node.js/TypeScript Express backend.
- Component docs override this file when guidance conflicts.

## Available Skills

Use these skills for detailed patterns on-demand:

### Core Skills
| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | Const types, flat interfaces, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `prisma` | Database schema, migrations, queries | [.agents/skills/prisma-database-setup/SKILL.md](.agents/skills/prisma-database-setup/SKILL.md) |
| `express` | Express.js middleware, error handling | [.agents/skills/express-rest-api/SKILL.md](.agents/skills/express-rest-api/SKILL.md) |
| `xlsx` | Excel report generation (SheetJS) | [.agents/skills/xlsx/SKILL.md](.agents/skills/xlsx/SKILL.md) |
| `git-commit` | Conventional Commits | [SKILL.md](skills/git-commit/SKILL.md) |
| `skill-creator` | Skill creation patterns | [SKILL.md](skills/skill-creator/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Defining database models | `prisma` |
| Creating API endpoints | `express` |
| Validating incoming data/Excel rows | `zod` |
| Integrating AI analysis/LLM calls | `ai-sdk` |
| Generating reports (Excel) | `xlsx` |
| Creating git commit | `git-commit` |
| Refactoring TypeScript code | `typescript` |

---

## Project Overview

Tatachio Mirabel Backend is an application to manage cabildo members and generate government-standard reports.

| Component | Location | Tech Stack |
|-----------|----------|------------|
| Backend | `src/` | Node.js, Express, TypeScript, Prisma |
| Documentation | `docs/` | Planning and specs |

---

## Commit & Pull Request Guidelines

Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `style`, `test`

Before creating a PR:
1. Complete checklist in `.github/pull_request_template.md` (if exists)
2. Run all relevant tests and linters
