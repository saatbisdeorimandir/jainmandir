# Token Conservation & Context Efficiency Guidelines

## 1. Targeted Reading Protocol

Never read an entire file if you only need a specific section, function, or property.

- **Use `scan-component.mjs` first**: For any component over 100 lines, generate a 10-line outline with line boundaries:
  ```bash
  node .agents/skills/token-efficiency/scripts/scan-component.mjs src/components/HistorySection.tsx
  ```
- **Read with line offsets**: Pass `StartLine` and `EndLine` to `read_file`. Keep reads under 60-80 lines whenever possible.
  ```json
  { "Path": "d:/Project/jainmandir/src/components/HistorySection.tsx", "StartLine": 285, "EndLine": 315 }
  ```

---

## 2. Devanagari Hindi Token Budgeting

Hindi text is encoded in multi-byte UTF-8 sequences. In typical LLM tokenizers:
- Roman script (English): ~4 characters ≈ 1 token.
- Devanagari script (Hindi): 1 word or compound glyph often consumes **2 to 4 tokens**.
- `src/content/hi.json` is 28 KB but consumes **up to 18,000 tokens** when dumped into context.

**Best Practice:**
- Use `json-tool.mjs get` to query individual translation blocks:
  ```bash
  node .agents/skills/token-efficiency/scripts/json-tool.mjs get src/content/hi.json hero
  ```
- Use `json-tool.mjs set` to modify keys without loading the entire JSON file into the LLM context.

---

## 3. Targeted Editing: `edit_file` vs `write_file`

- **Avoid `write_file` on existing files**: Writing an entire 30KB component outputs 30KB in tool parameters and repeats it in verification.
- **Use `edit_file` with precise anchors**:
  - Keep `Target` to 5-10 surrounding lines to guarantee uniqueness.
  - Do not include entire functions in `Target` if only 1 variable changed.

---

## 4. Search and Grep Hygiene

- **Avoid broad file searches**: Never run recursive PowerShell `Get-ChildItem -Recurse` or shell `grep` across the project root without filters.
- **Use `fast-grep.mjs`**:
  ```bash
  node .agents/skills/token-efficiency/scripts/fast-grep.mjs "timelineEvents"
  ```
- **PowerShell Bracket Warning**: In PowerShell, `src/app/[lang]/page.tsx` treats `[lang]` as a character set wildcard. Always use `-LiteralPath` or forward slashes, or pass paths directly to Node scripts to prevent failed command retries.

---

## 5. Verification Hygiene

- **Do NOT run `npm run build` in standard sandbox**: The build attempts to fetch Google Fonts from `fonts.googleapis.com` and throws network errors, generating verbose stack traces.
- **Use `check-types.mjs` for fast verification**:
  ```bash
  node .agents/skills/token-efficiency/scripts/check-types.mjs
  ```
  Returns `✓ TypeScript check PASSED (0 errors)` in 1 line on success.

