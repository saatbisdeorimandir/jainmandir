---
name: token-efficiency
description: >-
  Workflows, helper scripts, and protocols to drastically reduce token consumption when reading, modifying, searching, or verifying code and multilingual content in the Jain Mandir Next.js project. Use whenever exploring components, editing translations (en.json/hi.json), searching the codebase, or validating changes with minimum context usage.
---

# Token Efficiency & Context Minimization Skill

This skill provides token-saving workflows and automation scripts tailored for the **Shri Saat Bees Deori Jain Temple (Next.js 14/16 App Router)** project. Following these procedures avoids blowing the LLM context window on large multilingual JSON dictionaries, dense TSX components, and heavy build artifacts.

---

## ⚡ Quick Decision Guide: What Are You Doing?

| Task | Default (Token Heavy) | Token-Efficient Procedure |
| :--- | :--- | :--- |
| **Inspect/Modify Translations** | Reading `en.json` (16KB) or `hi.json` (28KB, ~18k tokens) | Run `json-tool.mjs get/set` on exact key |
| **Inspect a Large Component** | Reading `HistorySection.tsx` (34KB) | Run `scan-component.mjs`, then `read_file` with line range |
| **Search Code/Strings** | Recursive search scanning `.next`, `out`, `public` | Run `fast-grep.mjs` (skips build artifacts) |
| **Verify Code Changes** | Running full build (fails in sandbox due to Google Fonts) | Run `check-types.mjs` (1-line output, 0 errors) |
| **Navigate Routes & Components** | Asking/guessing component names | Consult [codebase-map.md](./references/codebase-map.md) |

---

## 1. Multilingual Content Optimization (`src/content/`)

Hindi text (`hi.json`) uses multi-byte UTF-8 encoding. In BPE tokenizers, Hindi words use **2x to 4x more tokens** than English words. Reading or rewriting `hi.json` burns up to 18,000 tokens per operation.

### Procedures

1. **List all keys or subkeys in a file**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs list src/content/en.json 2
   ```
2. **Read a specific translation key**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs get src/content/en.json hero
   node .agents/skills/token-efficiency/scripts/json-tool.mjs get src/content/hi.json hero.title
   ```
3. **Update a key in-place** (Never rewrite the full file):
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs set src/content/en.json hero.title "New Title"
   ```
4. **Audit parity between English and Hindi keys**:
   ```bash
   node .agents/skills/token-efficiency/scripts/json-tool.mjs diff src/content/en.json src/content/hi.json
   ```

---

## 2. Navigating and Reading Large TSX Components

Several components (`HistorySection.tsx`, `ContactSection.tsx`, `AboutSection.tsx`, `InstagramPromotersSection.tsx`) exceed 20–35 KB because they contain embedded datasets.

### Procedures

1. **Generate a line index outline before reading**:
   ```bash
   node .agents/skills/token-efficiency/scripts/scan-component.mjs src/components/HistorySection.tsx
   ```
   *Output will show exact line numbers for interfaces, data objects, JSX sub-sections, and exports.*

2. **Targeted Read**:
   Use `read_file` with `StartLine` and `EndLine` strictly targeting the slice needed (typically 30–60 lines).

3. **Targeted Edit**:
   Always use `edit_file` with a 4–8 line `Target` block. Never use `write_file` to overwrite an entire 30KB component.

---

## 3. Safe, Token-Conscious Code Search

The root directory contains heavy build folders (`.next`, `out`, `node_modules`, `public`, `tsconfig.tsbuildinfo`). Generic recursive grep searches dump thousands of lines into the context window.

### Procedures

1. **Search strictly source and docs files**:
   ```bash
   node .agents/skills/token-efficiency/scripts/fast-grep.mjs "<search-term>"
   ```
   *Automatically ignores build artifacts, formats output as `file:line: snippet`, and caps output at 15 matches.*

2. **Regex search**:
   ```bash
   node .agents/skills/token-efficiency/scripts/fast-grep.mjs "/timeline.*Event/i"
   ```

---

## 4. Verification and Typecheck Protocol

1. **Fast Typecheck**:
   ```bash
   node .agents/skills/token-efficiency/scripts/check-types.mjs
   ```
   - On success: Returns `✓ TypeScript check PASSED (0 errors)` (< 10 tokens).
   - On error: Filters out noise and shows only the exact file, line, and compiler diagnostic.

2. **Note on `npm run build`**:
   `npm run build` downloads Google Fonts (`next/font/google`) which fails in standard sandbox mode without network bypass. Use `check-types.mjs` for rapid local feedback.

---

## 5. References

- [Developer Runbook for New Developments](./README.md)
- [Codebase Architecture & Component Map](./references/codebase-map.md)
- [Detailed Token Conservation Guidelines](./references/token-saving-rules.md)

