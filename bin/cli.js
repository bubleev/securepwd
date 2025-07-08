#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import init, { generate_password } from '../pkg/securepwd.js';
// Environment variables are loaded via --require flag in package.json

program
  .name('securepwd')
  .description('Generate password from a file')
  .argument('<file>', 'Path to any file')
  .argument('[pin]', '4-digit PIN (default: 1024)', '1024')
  .argument('[length]', 'Password length (default: 16)', '16')
  .action(async (file, pin, length) => {
    
    // Validate PIN format: exactly 4 digits
    if (!/^\d{4}$/.test(pin)) {
      console.error('Error: PIN must be exactly 4 digits');
      console.error('Examples:');
      console.error('  securepwd file.mp4 1234 32');
      console.error('  securepwd file.mp4 -p 1234 -l 64');
      console.error('  securepwd file.mp4 --pin 1234 --length 8');
      process.exit(1);
    }
    
    // Parse length to integer
    length = parseInt(length);
    
    // Validate length
    if (isNaN(length) || length < 1 || length > 64) {
      console.error('Error: Length must be a number between 1 and 64');
      process.exit(1);
    }
    const offset = 4096;

    try {
      const fd = fs.openSync(file, 'r');
      // Convert pin to number for Buffer.alloc
      const bufferSize = 4096; // Fixed buffer size instead of using pin as size
      const buffer = Buffer.alloc(bufferSize);
      fs.readSync(fd, buffer, 0, bufferSize, offset);
      fs.closeSync(fd);

      const salt = path.basename(file);
      const combinedData = Buffer.concat([buffer, Buffer.from(pin)]);
      const secret = process.env.SECRET || '';
      const result = generate_password(combinedData, salt, length, secret);
      console.log(`🔐 Password: ${result}`);
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse(process.argv);
