#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [,, targetFile] = process.argv;

if (!targetFile) {
  console.log('Usage: node scan-component.mjs <path-to-tsx-file>');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), targetFile);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${targetFile}`);
  process.exit(1);
}

const lines = fs.readFileSync(fullPath, 'utf-8').split(/\r?\n/);
console.log(`=== Structure Outline: ${targetFile} (${lines.length} lines, ${(fs.statSync(fullPath).size / 1024).toFixed(1)} KB) ===`);

let inImports = false;
let importStart = -1;
let importEnd = -1;

const landmarks = [];

for (let i = 0; i < lines.length; i++) {
  const lineNo = i + 1;
  const line = lines[i];
  const trimmed = line.trim();

  // Track imports block
  if (trimmed.startsWith('import ') || trimmed.startsWith('import{')) {
    if (!inImports) {
      inImports = true;
      importStart = lineNo;
    }
    importEnd = lineNo;
    continue;
  } else if (inImports && trimmed !== '') {
    inImports = false;
    landmarks.push({ start: importStart, end: importEnd, desc: `Imports block (${importEnd - importStart + 1} lines)` });
  }

  // Interfaces and Types
  if (/^(export\s+)?(interface|type)\s+([A-Za-z0-9_]+)/.test(trimmed)) {
    const match = trimmed.match(/^(export\s+)?(interface|type)\s+([A-Za-z0-9_]+)/);
    landmarks.push({ start: lineNo, desc: `${match[2]} ${match[3]}` });
  }

  // Component definition / functions
  if (/^(export\s+default\s+|export\s+)?function\s+([A-Za-z0-9_]+)/.test(trimmed)) {
    const match = trimmed.match(/^(export\s+default\s+|export\s+)?function\s+([A-Za-z0-9_]+)/);
    landmarks.push({ start: lineNo, desc: `Function ${match[2]} (exported: ${Boolean(match[1])})` });
  } else if (/^(export\s+)?const\s+([A-Za-z0-9_]+)\s*=\s*(\([^)]*\)|[A-Za-z0-9_]+)?\s*=>/.test(trimmed)) {
    const match = trimmed.match(/^(export\s+)?const\s+([A-Za-z0-9_]+)/);
    landmarks.push({ start: lineNo, desc: `Arrow component/func: ${match[2]}` });
  }

  // Data blocks or arrays (e.g. const timelineEvents = ...)
  if (/^(const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*(\[|\{)/.test(trimmed)) {
    const match = trimmed.match(/^(const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*(\[|\{)/);
    landmarks.push({ start: lineNo, desc: `Data definition: ${match[2]} (${match[3] === '[' ? 'Array' : 'Object'})` });
  }

  // Return JSX
  if (trimmed.startsWith('return (') || trimmed === 'return <' || trimmed.startsWith('return <')) {
    landmarks.push({ start: lineNo, desc: `JSX return block start` });
  }

  // Major section comments or HTML section tags
  if (/<!--.*-->|\/\*.*\*\/|\/\/\s*===+|\/\/\s*---/.test(trimmed)) {
    landmarks.push({ start: lineNo, desc: `Comment section: ${trimmed.slice(0, 50)}` });
  }
}

// Print landmarks sorted
landmarks.sort((a, b) => a.start - b.start);
for (const item of landmarks) {
  if (item.end) {
    console.log(`L${String(item.start).padStart(3, ' ')}-L${String(item.end).padEnd(3, ' ')} : ${item.desc}`);
  } else {
    console.log(`L${String(item.start).padStart(3, ' ')}       : ${item.desc}`);
  }
}
console.log(`Tip: Use read_file with StartLine & EndLine targeting only the section needed.`);

