# SecurePWD 🔐

SecurePWD is a command-line tool that generates deterministic, cryptographically secure passwords from MP4 files. It uses WebAssembly for high performance and security, ensuring that the same input (MP4 + PIN) will always generate the same password, while different lengths produce completely different hashes.

## 🌟 Features

- **Deterministic Generation**: Same input (MP4 + PIN) always produces the same password
- **High Security**: Uses SHA-256 hashing with 1000 iterations
- **Flexible Output**: Generate passwords from 1 to 64 characters (default: 16)
- **No Storage Needed**: Passwords are generated on-demand, never stored
- **Cross-Platform**: Works anywhere Node.js runs

## 🚀 Installation

```bash
npm install -g securepwd
```

Or use without installation:

```bash
npx securepwd@latest <path-to-mp4> [pin] [length]
```

## 💻 Usage

### Basic Usage

```bash
securepwd <path-to-mp4> [pin] [length]
```

### With Options

```bash
securepwd <path-to-mp4> --pin=<pin> --length=<length>
# or
securepwd <path-to-mp4> -p <pin> -l <length>
```

### Examples

```bash
# Generate password with default settings (PIN: 1024, length: 16)
securepwd video.mp4

# Specify PIN only (length: 16)
securepwd video.mp4 1309

# Specify PIN and length
securepwd video.mp4 1309 16

# Use options
securepwd video.mp4 -p 1309 -l 16

# Different lengths produce completely different hashes
securepwd video.mp4 1309 8    # 8 characters
securepwd video.mp4 1309 16   # 16 characters (completely different from 8)
securepwd video.mp4 1309 32   # 32 characters (completely different from 8 and 16)
```

## 🔧 Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--pin` | `-p` | 4-digit PIN (0000-9999) | 1024 |
| `--length` | `-l` | Password length (1-64) | 16 |
| `--help` | `-h` | Show help | - |

## 🔒 Security

- Uses SHA-256 cryptographic hash function
- Performs 1000 iterations of hashing
- Includes file content, PIN, and secret key in hash calculation
- Different password lengths produce completely different hashes
- No data is ever stored or transmitted

## 🤔 Why Use This?

1. **Memorize One PIN**, not multiple passwords
2. **No Password Storage** - Generate passwords on-demand
3. **High Entropy** - MP4 files provide excellent entropy sources
4. **Portable** - Works anywhere you have your MP4 file
5. **Deterministic** - Same input always produces the same output

## 📝 Notes

- The MP4 file acts as a key - keep it secure
- Different MP4 files will produce different passwords
- The same MP4 + PIN will always produce the same password
- Different lengths for the same input produce completely different hashes
```

## Examples

```bash
securepwd video.mp4 1234
```

or

```bash
securepwd video.mp4 -p 1234 -l 16
```

## Requirements

- Node.js 18 or higher

## License

MIT
