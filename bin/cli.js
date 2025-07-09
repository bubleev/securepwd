#!/usr/bin/env node

import fs from 'fs';
import { createHash } from 'crypto';
import { program } from 'commander';
import { generate_password } from '../pkg/node/securepwd.js';
import { readFile } from 'fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

program
  .name('securepwd')
  .description('Generate a secure password from any file')
  .version(version, '-v, --version', 'output the version number')
  .usage('[file] [pin] [length]')
  .argument('[file]', 'Path to any file')
  .argument('[pin]', '4-digit PIN (default: 1024)', '1024')
  .argument('[length]', 'Password length (default: 16)', '16')
  .action(async (file, pin, length) => {
    if (!file) {
      program.help();
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      console.error('Error: PIN must be exactly 4 digits');
      process.exit(1);
    }

    length = parseInt(length, 10);
    if (isNaN(length) || length < 1 || length > 64) {
      console.error('Error: Length must be a number between 1 and 64');
      process.exit(1);
    }

    try {
      const fileBuffer = fs.readFileSync(file);
      const hashBuffer = createHash('sha256').update(fileBuffer).digest();
      const hashBytes = new Uint8Array(hashBuffer);

      const result = generate_password(hashBuffer, pin, length);
      console.log(`🔐 Password: ${result}`);
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse(process.argv);
