#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function printHelp() {
  console.log(`Usage:
  node json-tool.mjs keys <file>
  node json-tool.mjs list <file> [depth=2]
  node json-tool.mjs get <file> <path.to.key>
  node json-tool.mjs set <file> <path.to.key> <value>
  node json-tool.mjs diff <file1> <file2>`);
}

const [,, command, file1, arg1, arg2] = process.argv;

if (!command || !file1) {
  printHelp();
  process.exit(1);
}

function resolvePath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

function readJson(filePath) {
  const content = fs.readFileSync(resolvePath(filePath), 'utf-8');
  return JSON.parse(content);
}

function writeJson(filePath, data) {
  fs.writeFileSync(resolvePath(filePath), JSON.stringify(data, null, 4) + '\n', 'utf-8');
}

function getNested(obj, keyPath) {
  const parts = keyPath.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

function setNested(obj, keyPath, val) {
  const parts = keyPath.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!(p in curr) || typeof curr[p] !== 'object' || curr[p] === null) {
      curr[p] = {};
    }
    curr = curr[p];
  }
  curr[parts[parts.length - 1]] = val;
}

function summarizeObject(obj, depth = 2, currentDepth = 1) {
  if (obj === null) return 'null';
  if (typeof obj !== 'object') return typeof obj;
  if (Array.isArray(obj)) return `Array(${obj.length})`;

  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      if (currentDepth < depth) {
        res[k] = summarizeObject(v, depth, currentDepth + 1);
      } else {
        res[k] = `{${Object.keys(v).length} keys}`;
      }
    } else if (Array.isArray(v)) {
      res[k] = `[${v.length} items]`;
    } else {
      res[k] = typeof v;
    }
  }
  return res;
}

function collectKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(collectKeys(v, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

switch (command) {
  case 'keys': {
    const data = readJson(file1);
    console.log(Object.keys(data).join(', '));
    break;
  }
  case 'list': {
    const depth = arg1 ? parseInt(arg1, 10) : 2;
    const data = readJson(file1);
    const summary = summarizeObject(data, depth);
    console.log(JSON.stringify(summary, null, 2));
    break;
  }
  case 'get': {
    if (!arg1) {
      console.error('Error: specify a path.to.key');
      process.exit(1);
    }
    const data = readJson(file1);
    const val = getNested(data, arg1);
    if (val === undefined) {
      console.error(`Key "${arg1}" not found in ${file1}`);
      process.exit(1);
    }
    if (typeof val === 'object' && val !== null) {
      console.log(JSON.stringify(val, null, 2));
    } else {
      console.log(val);
    }
    break;
  }
  case 'set': {
    if (!arg1 || arg2 === undefined) {
      console.error('Error: specify key and value');
      process.exit(1);
    }
    const data = readJson(file1);
    let parsedVal = arg2;
    try {
      parsedVal = JSON.parse(arg2);
    } catch {
      // Keep as string
    }
    setNested(data, arg1, parsedVal);
    writeJson(file1, data);
    console.log(`Updated "${arg1}" in ${file1}`);
    break;
  }
  case 'diff': {
    if (!arg1) {
      console.error('Error: specify second file for diff');
      process.exit(1);
    }
    const data1 = readJson(file1);
    const data2 = readJson(arg1);
    const keys1 = new Set(collectKeys(data1));
    const keys2 = new Set(collectKeys(data2));

    const missingIn2 = [...keys1].filter(k => !keys2.has(k));
    const missingIn1 = [...keys2].filter(k => !keys1.has(k));

    console.log(`Total keys in ${file1}: ${keys1.size}`);
    console.log(`Total keys in ${arg1}: ${keys2.size}`);
    if (missingIn2.length > 0) {
      console.log(`Missing in ${arg1} (${missingIn2.length}):\n  - ${missingIn2.slice(0, 10).join('\n  - ')}${missingIn2.length > 10 ? '\n  ...' : ''}`);
    }
    if (missingIn1.length > 0) {
      console.log(`Missing in ${file1} (${missingIn1.length}):\n  - ${missingIn1.slice(0, 10).join('\n  - ')}${missingIn1.length > 10 ? '\n  ...' : ''}`);
    }
    if (missingIn1.length === 0 && missingIn2.length === 0) {
      console.log('Key structures match perfectly!');
    }
    break;
  }
  default:
    printHelp();
    process.exit(1);
}

