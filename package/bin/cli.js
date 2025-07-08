#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import init, { generate_password } from '../pkg/securepwd.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name('securepwd')
  .description('Generate pass from .mp4 file')
  .argument('<file>', 'Path to mp4 file')
  .option('-p, --pin <number>', 'Unique pin (4 numbers)', '1024')
  .option('-l, --length <number>', 'Password length (32 default)', '32')
  .action(async (file, options) => {
    const pin = parseInt(options.pin);
    const length = parseInt(options.length);
    const offset = 4096;

    try {
      const fd = fs.openSync(file, 'r');
      const buffer = Buffer.alloc(pin);
      fs.readSync(fd, buffer, 0, pin, offset);
      fs.closeSync(fd);

      const salt = path.basename(file);
      const result = generate_password(buffer, salt, length);
      console.log(`🔐 Password: ${result}`);
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse(process.argv);
