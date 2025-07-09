# SecurePWD v2.0.0

## 🔒 Secure Deterministic Password Generator

Generate strong, unique passwords from any file using WebAssembly. The same input (file + PIN) will always produce the same password, making it perfect for secure password recovery.

---

## 🚀 Features

- **Military-Grade Security**: SHA-256 hashing with custom character sets  
- **Deterministic**: Same input = same output, always  
- **Cross-Platform**: Works everywhere Node.js runs  
- **Blazing Fast**: WebAssembly-powered  
- **Zero Dependencies**: For maximum security  

---

## 🛠 Installation

### Option 1: Use as CLI Tool

```bash
npm install -g securepwd
```

### Option 2: Use as Module

```bash
npm install securepwd
```

### Option 3: Build Your Own Version with Custom Secret

```bash
# Clone the repository
git clone https://github.com/your-username/securepwd.git
cd securepwd

# Create .env file with your secret:
echo "SECRET=your-super-secret-key" > .env

# Install dependencies and build:
npm install
npm run build
```

Use the built files from the `pkg/` directory.

---

## 💻 Usage

### CLI Usage

```bash
# Basic usage
securepwd path/to/your/file [PIN] [length]

# Examples
securepwd ~/Documents/passport.pdf
securepwd ~/Pictures/avatar.jpg 4242 24
```

### Module Usage

```js
import { generatePassFromBlob } from 'securepwd';

// From file in Node.js
const fs = require('fs').promises;
const file = await fs.readFile('path/to/file');
const password = await generatePassFromBlob(file, '4242', 16);

// In browser
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const password = await generatePassFromBlob(file, '4242', 16);
```

---

## ⚙️ Parameters

| Parameter | Required | Default | Description                         |
|-----------|----------|---------|-------------------------------------|
| `file`    | Yes      | –       | Path to any file or Blob object     |
| `PIN`     | No       | `1024`  | 4+ digit number for extra security  |
| `length`  | No       | `16`    | Password length (1–64 characters)   |

---

## 🔄 Backward Compatibility

For compatibility with v1.x passwords:

```bash
npm install securepwd@1.2.0
```

---

## 📦 Build from Source

```bash
# Clone the repository
git clone https://github.com/your-username/securepwd.git
cd securepwd

# Install dependencies
npm install

# Set your secret
echo "SECRET=your-custom-secret-here" > .env

# Build the project
npm run build
```

The built files will be in the `pkg/` directory.

---

## 🔒 Security Notes

- The `SECRET` in `.env` is used to salt the password generation  
- **Never commit your `.env` file to version control**  
- For production use, consider using environment variables directly  

---

## 📄 License

MIT © 2025 Bubleev
