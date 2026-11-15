#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [,, query, targetDir = '.', maxResultsStr = '15'] = process.argv;

if (!query) {
  console.log('Usage: node fast-grep.mjs <query-or-regex> [target-dir="."] [max-results=15]');
  process.exit(1);
}

const maxResults = parseInt(maxResultsStr, 10);
const ignoreDirs = new Set(['.git', '.next', 'out', 'node_modules', 'public', '.agents']);
const validExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.css', '.md']);

const isRegex = query.startsWith('/') && query.lastIndexOf('/') > 0;
let pattern;
if (isRegex) {
  const lastSlash = query.lastIndexOf('/');
  pattern = new RegExp(query.slice(1, lastSlash), query.slice(lastSlash + 1));
} else {
  pattern = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

let matchCount = 0;
const results = [];

function searchDir(currentDir) {
  if (matchCount >= maxResults) return;

  let entries;
  try {
    entries = fs.readdirSync(currentDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (matchCount >= maxResults) break;
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        searchDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (entry.name.endsWith('.tsbuildinfo')) continue;
      if (!validExtensions.has(ext)) continue;

      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          if (matchCount >= maxResults) break;
          const line = lines[i];
          if (pattern.test(line)) {
            matchCount++;
            const rel = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
            const snippet = line.trim().slice(0, 100);
            results.push(`${rel}:${i + 1}: ${snippet}`);
          }
        }
      } catch {
        // Skip unreadable files
      }
    }
  }
}

searchDir(path.resolve(process.cwd(), targetDir));

console.log(`=== Matches for "${query}" (Found: ${results.length}${matchCount >= maxResults ? ' [truncated]' : ''}) ===`);
for (const res of results) {
  console.log(res);
}
if (matchCount === 0) {
  console.log('No matches found in codebase (excluding build/asset directories).');
}

