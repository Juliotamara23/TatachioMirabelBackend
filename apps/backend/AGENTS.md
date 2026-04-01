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
| `prisma` | Database schema, migrations, queries | [SKILL.md](skills/prisma-database-setup/SKILL.md) |
| `express` | Express.js middleware, error handling | [SKILL.md](skills/express-rest-api/SKILL.md) |
| `ai-sdk` | Vercel AI SDK (Gemini API, Ollama) | [SKILL.md](skills/ai-sdk/SKILL.md) |
| `xlsx` | Excel report generation (SheetJS) | [SKILL.md](skills/xlsx/SKILL.md) |
| `git-commit` | Conventional Commits | [SKILL.md](skills/git-commit/SKILL.md) |
| `skill-creator` | Skill creation patterns | [SKILL.md](skills/skill-creator/SKILL.md) |
| `zod` | Zod schema validation patterns | [SKILL.md](skills/zod-4/SKILL.md) |

---

## HTTP Client Policy

**IMPORTANTE:** NO utilizar `axios`. Utilizar el `fetch` nativo de Node.js (disponible en v18+) o `undici` para peticiones HTTP.

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

**Importante:** Todas las instalaciones de dependencias deben realizarse con `pnpm`, no con `npm` ni `yarn`.

Before creating a PR:
1. Complete checklist in `.github/pull_request_template.md` (if exists)
2. Run all relevant tests and linters
