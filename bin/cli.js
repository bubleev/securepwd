#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import init, { generate_password } from '../pkg/securepwd.js';
// Environment variables are loaded via --require flag in package.json

program
  .name('securepwd')
  .description('Generate pass from .mp4 file')
  .argument('<file>', 'Path to mp4 file')
  .argument('[pin]', '4-digit PIN (default: 1024)')
  .argument('[length]', 'Password length (default: 16)')
  .option('-p, --pin <pin>', '4-digit PIN (alternative to positional argument)')
  .option('-l, --length <length>', 'Password length (alternative to positional argument)')
  .action(async (file, pinArg, lengthArg, options) => {
    // Use PIN from -p/--pin option or from positional argument
    const pin = options.pin || pinArg || '1024';
    
    // Validate PIN format: exactly 4 digits
    if (!/^\d{4}$/.test(pin)) {
      console.error('Error: PIN must be exactly 4 digits');
      console.error('Examples:');
      console.error('  securepwd file.mp4 1234 32');
      console.error('  securepwd file.mp4 -p 1234 -l 64');
      console.error('  securepwd file.mp4 --pin 1234 --length 8');
      process.exit(1);
    }
    
    // Get length from command line arguments (priority: --length/-l > positional length > default 16)
    let length = 16;
    if (options.length) {
      length = parseInt(options.length);
    } else if (lengthArg) {
      length = parseInt(lengthArg);
    }
    
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
      // Combine file data with PIN for more secure hashing
      const combinedData = Buffer.concat([buffer, Buffer.from(pin)]);
      const result = generate_password(combinedData, salt, length);
      console.log(`🔐 Password: ${result}`);
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse(process.argv);
