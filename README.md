# SecurePWD 🔐

SecurePWD is a command-line tool that generates deterministic, cryptographically secure passwords from any file. It uses WebAssembly for high performance and security, ensuring that the same input (file + PIN) will always generate the same password, while different lengths produce completely different hashes.

## 🌟 Features

- **Deterministic Generation**: Same input (file + PIN) always produces the same password
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
securepwd <path-to-file> [pin] [length]
```

### Arguments

- `<path-to-file>`: Path to any file (required)
- `[pin]`: 4-digit PIN (default: 1024, optional)
- `[length]`: Password length (default: 16, optional, max: 64)

### Examples

```bash
# Generate password with default settings (PIN: 1024, length: 16)
securepwd document.pdf

# Specify PIN only (length: 16)
securepwd image.jpg 1234

# Specify PIN and length
securepwd data.json 1234 24

# Different lengths produce completely different hashes
securepwd notes.txt 1234 8    # 8 characters
securepwd notes.txt 1234 16   # 16 characters (completely different from 8)
securepwd notes.txt 1234 32   # 32 characters (completely different from 8 and 16)
```

## 🔧 Options

### Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `file` | Path to any file | (required) |
| `pin` | 4-digit PIN (0000-9999) | 1024 |
| `length` | Password length | 16 (max: 64) |

## 🔒 Security

- Uses SHA-256 cryptographic hash function
- Performs 1000 iterations of hashing
- Includes file content, PIN, and secret key in hash calculation
- Different password lengths produce completely different hashes
- No data is ever stored or transmitted

## 🤔 Why Use This?

1. **Memorize One PIN**, not multiple passwords
2. **No Password Storage** - Generate passwords on-demand
3. **High Entropy** - Any file can be used as an entropy source
4. **Portable** - Works with any file on your system
5. **Deterministic** - Same input always produces the same output

## 📝 Notes

- The input file acts as a key - keep it secure
- Different files will produce different passwords
- The same file + PIN will always produce the same password
- Different lengths for the same input produce completely different hashes
```

## Examples

```bash
# Using a PDF file with default settings
securepwd document.pdf

# Using an image file with custom PIN
securepwd photo.jpg 1234

# Using a text file with custom PIN and length
securepwd notes.txt 5678 24

# Using minimum password length
securepwd data.csv 9999 1

# Using maximum password length
securepwd archive.zip 0000 64
```

## Requirements

- Node.js 18 or higher

## License

MIT
