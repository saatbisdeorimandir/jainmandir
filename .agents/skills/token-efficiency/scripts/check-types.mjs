#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['tsc', '--noEmit'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  encoding: 'utf-8',
  shell: true
});

if (result.status === 0) {
  console.log('✓ TypeScript check PASSED (0 errors).');
  process.exit(0);
} else {
  console.error('✗ TypeScript check FAILED:');
  const output = (result.stdout + '\n' + result.stderr).trim();
  const filtered = output
    .split(/\r?\n/)
    .filter(line => line.includes('error TS') || line.includes(': error'))
    .slice(0, 10);
  console.error(filtered.join('\n'));
  process.exit(1);
}

