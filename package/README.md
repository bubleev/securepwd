# SecurePWD

A secure password generator that creates deterministic passwords from MP4 files using WebAssembly for enhanced security.

## Installation

```bash
npm install -g securepwd
```

## Usage

```bash
securepwd <path-to-mp4> [options]

Options:
  -p, --pin <number>    Unique pin (4 numbers, default: 1024)
  -l, --length <number> Password length (default: 32)
  -h                    Display help for command
```

## Examples

```bash
securepwd video.mp4 -p 1234
```

or

```bash
securepwd video.mp4 -p 1234 -l 16
```

## Requirements

- Node.js 18 or higher

## License

MIT
