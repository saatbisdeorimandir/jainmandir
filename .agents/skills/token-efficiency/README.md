# Token-Efficient Development Guide

> **A Developer & Agent Runbook for New Features and Maintenance in the Jain Mandir Project**

This guide explains how to leverage the `token-efficiency` skill and its companion tooling during new feature development, content updates, and refactoring on the **Shri Saat Bees Deori Jain Temple** Next.js website.

---

## 📖 Table of Contents
1. [Why Token Efficiency Matters Here](#why-token-efficiency-matters-here)
2. [Quick Reference CLI Commands](#quick-reference-cli-commands)
3. [Workflow 1: Adding or Updating Multilingual Content](#workflow-1-adding-or-updating-multilingual-content)
4. [Workflow 2: Building New Components (Best Practices)](#workflow-2-building-new-components-best-practices)
5. [Workflow 3: Modifying Existing Heavy Components](#workflow-3-modifying-existing-heavy-components)
6. [Workflow 4: Searching and Exploring Code](#workflow-4-searching-and-exploring-code)
7. [Workflow 5: Verification & Fast Typechecking](#workflow-5-verification--fast-typechecking)
8. [Checklist for New Developments](#checklist-for-new-developments)

---

## 1. Why Token Efficiency Matters Here

This codebase has three unique characteristics that can quickly blow up LLM context windows:
1. **Devanagari Hindi Content (`src/content/hi.json`, TSX files)**: Devanagari script uses multi-byte UTF-8 glyphs that cost **2.5x to 3x more tokens** than standard English text. Dumping `hi.json` consumes ~14,000–18,000 tokens in a single read.
2. **Dense Monolithic Components (`HistorySection.tsx`, `ContactSection.tsx`, etc.)**: 300–400 line components containing embedded data structures cost 6,000–10,000 tokens per full read.
3. **Bulky Build & Export Folders (`.next/`, `out/`, `public/`, `tsconfig.tsbuildinfo`)**: Unfiltered recursive searches flood the context with thousands of lines of compiled output.

---

## 2. Quick Reference CLI Commands

All scripts are located in `.agents/skills/token-efficiency/scripts/` and run directly via Node.js (no extra npm dependencies required):

| Task | Command |
| :--- | :--- |
| **Inspect a content key** | `node .agents/skills/token-efficiency/scripts/json-tool.mjs get src/content/en.json <key.path>` |
| **Update a content key** | `node .agents/skills/token-efficiency/scripts/json-tool.mjs set src/content/en.json <key.path> "<value>"` |
| **Audit EN/HI key parity** | `node .agents/skills/token-efficiency/scripts/json-tool.mjs diff src/content/en.json src/content/hi.json` |
| **Outline a TSX component** | `node .agents/skills/token-efficiency/scripts/scan-component.mjs src/components/<Component>.tsx` |
| **Safe code search** | `node .agents/skills/token-efficiency/scripts/fast-grep.mjs "<query>"` |
| **Fast typecheck (0 noise)** | `node .agents/skills/token-efficiency/scripts/check-types.mjs` |

---

## 3. Workflow 1: Adding or Updating Multilingual Content

When adding new text for a new feature or updating existing copy:

### ❌ Don't:
- Do not dump `src/content/en.json` or `src/content/hi.json` into the conversation.
- Do not overwrite the entire 28KB JSON file to change a single string.

### ✅ Do:
1. **Inspect existing keys first**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs keys src/content/en.json
   ```
2. **Get the specific block** you want to inspect:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs get src/content/en.json nav
   ```
3. **Set the value in both English and Hindi**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs set src/content/en.json nav.darshan "Live Darshan"
   node .agents/skills/token-efficiency/scripts/json-tool.mjs set src/content/hi.json nav.darshan "लाइव दर्शन"
   ```
4. **Verify structural parity**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs diff src/content/en.json src/content/hi.json
   ```
   *Ensures no keys are missing in either language.*

---

## 4. Workflow 2: Building New Components (Best Practices)

When creating new features (e.g. a new Donation section, Aarti schedule, or Gallery module):

1. **Keep Data Decoupled from JSX**:
   - Do **not** hardcode large Hindi/English data arrays directly in the component file (unlike older legacy components like `HistorySection.tsx`).
   - Place data in `src/content/<feature>.json` or add keys to `src/content/en.json` & `hi.json`.
   - Pass content to the component via props (`dict` or typed JSON imports).
2. **Component File Size Budget**:
   - Keep individual component files under **150 lines**.
   - Break large sections into smaller subcomponents (e.g. `DonationCard.tsx`, `DonationForm.tsx`, `BankDetails.tsx`) rather than one massive 400-line file.
3. **Register New Components**:
   - Add the new component entry and its approximate line budget to [`.agents/skills/token-efficiency/references/codebase-map.md`](./references/codebase-map.md) so future agents navigate directly to it.

---

## 5. Workflow 3: Modifying Existing Heavy Components

When editing components like `HistorySection.tsx`, `AboutSection.tsx`, `ContactSection.tsx`, or `InstagramPromotersSection.tsx`:

1. **Run the Outliner**:
   ```bash
   node .agents/skills/token-efficiency/scripts/scan-component.mjs src/components/HistorySection.tsx
   ```
   *This outputs exact line ranges for interfaces, datasets, sub-sections, and JSX elements in ~10 lines.*
2. **Targeted Line Read**:
   - Read only the targeted line range (e.g., `StartLine: 40`, `EndLine: 80`) rather than the entire file.
3. **Use Targeted Edits (`edit_file`)**:
   - Replace only the specific block using exact target and replacement strings. Never use `write_file` to rewrite the whole file.

---

## 6. Workflow 4: Searching and Exploring Code

### ❌ Don't:
- Do not run plain `grep -r` or `Get-ChildItem -Recurse` across the root directory. They will crawl `.next/`, `out/`, `node_modules/`, `public/`, and `tsconfig.tsbuildinfo`, dumping thousands of noisy lines.

### ✅ Do:
- Run `fast-grep.mjs`:
  ```bash
  # Search for a term across all src/ and docs/ files:
  node .agents/skills/token-efficiency/scripts/fast-grep.mjs "live darshan"

  # Regex search:
  node .agents/skills/token-efficiency/scripts/fast-grep.mjs "/timeline.*year/i"
  ```
- **PowerShell Path Caution**: If referencing App Router paths like `src/app/[lang]/`, always pass them as string literals or use forward slashes (`src/app/[lang]/page.tsx`) to avoid PowerShell treating `[...]` as wildcards.

---

## 7. Workflow 5: Verification & Fast Typechecking

### Why `npm run build` is heavy:
In standard sandboxed development environments, `npm run build` will attempt to fetch Google Fonts from `fonts.googleapis.com` and fail with network errors.

### The Token-Efficient Alternative:
Run the streamlined TypeScript typecheck wrapper:
```bash
node .agents/skills/token-efficiency/scripts/check-types.mjs
```
- **On Success**: Prints `✓ TypeScript check PASSED (0 errors).` (Uses ~7 tokens total).
- **On Failure**: Automatically filters out compiler noise and prints only the top 10 relevant compiler errors with file paths and line numbers.

---

## 8. Checklist for New Developments

Before concluding a development task or opening a pull request, verify:

- [ ] **Content Parity**: Run `node .agents/skills/token-efficiency/scripts/json-tool.mjs diff src/content/en.json src/content/hi.json` to ensure every new English key has a corresponding Hindi key.
- [ ] **Type Safety**: Run `node .agents/skills/token-efficiency/scripts/check-types.mjs` and ensure 0 errors.
- [ ] **Clean Git Workspace**: Verify that `.next/`, `out/`, or `tsconfig.tsbuildinfo` have not been accidentally staged.
- [ ] **Decoupled Architecture**: Ensure any newly created components keep data arrays in `src/content/` rather than hardcoding them in JSX.
- [ ] **Doc Updated**: If a new route or major component was created, update [`.agents/skills/token-efficiency/references/codebase-map.md`](./references/codebase-map.md).

