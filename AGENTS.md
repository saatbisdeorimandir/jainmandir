# Agent Instructions & Guidelines for Jain Mandir Project

This repository contains the Next.js 14/16 website for Shri Saat Bees Deori Jain Temple. Follow these mandatory rules to conserve context window and prevent token bloat:

## 1. Token Conservation Rules

- **Never dump full translation files**: `src/content/hi.json` (28KB) and `en.json` (16KB) consume thousands of tokens (Devanagari Hindi has a 2.5x–3x token inflation multiplier).
  - Use `node .agents/skills/token-efficiency/scripts/json-tool.mjs get <file> <key>` to inspect keys.
  - Use `node .agents/skills/token-efficiency/scripts/json-tool.mjs set <file> <key> <val>` to modify keys.
- **Never read entire large components**: Components like `HistorySection.tsx`, `ContactSection.tsx`, `AboutSection.tsx`, and `InstagramPromotersSection.tsx` are 20KB–34KB with embedded datasets.
  - Run `node .agents/skills/token-efficiency/scripts/scan-component.mjs <file>` to generate a 10-line outline with line numbers.
  - Use `read_file` with `StartLine` and `EndLine` for slices under 60 lines.
- **Never scan build directories**: Automatically exclude `.next/`, `out/`, `node_modules/`, `public/`, and `*.tsbuildinfo`.
  - Use `node .agents/skills/token-efficiency/scripts/fast-grep.mjs "<query>"` for searches.
- **Use `edit_file` over `write_file`**: Always make precise, targeted replacements on existing files rather than overwriting entire components.
- **Verification**: Run `node .agents/skills/token-efficiency/scripts/check-types.mjs` for rapid 0-error typechecking. Avoid running `npm run build` in standard sandboxes as Google Fonts fetch requires network access.

## 2. Dedicated Skill & Runbook

- Activate the `token-efficiency` skill: [SKILL.md](file:///d:/Project/jainmandir/.agents/skills/token-efficiency/SKILL.md)
- Development Runbook for New Features: [README.md](file:///d:/Project/jainmandir/.agents/skills/token-efficiency/README.md)

