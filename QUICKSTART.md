# Quick Start Guide

Get the JWT Decoder & Encoder running in under 2 minutes!

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 First Steps

### Decode a JWT Token

1. **Try this sample token:**

   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   ```

2. **Paste it** in the JWT Token textarea
3. **View** the decoded header and payload
4. **Verify signature** with secret: `your-256-bit-secret`

### Encode a JWT Token

1. **Select algorithm** (try HS256 first)
2. **Enter a secret** (e.g., "my-secret-key")
3. **Edit payload** or use quick controls
4. **Click "Generate JWT"**
5. **Copy the token** and try decoding it!

## 🔑 Testing with RSA/ECDSA

Generate test keys locally:

```bash
# RSA keys for RS256
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# ECDSA keys for ES256
openssl ecparam -genkey -name prime256v1 -out ec-private.pem
openssl ec -in ec-private.pem -pubout -out ec-public.pem
```

Then:

1. Use private key in the Encoder
2. Use public key in the Decoder to verify

## 🧪 Available Commands

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run lint         # Check code quality
npm run format       # Format code
```

## 📦 Production Build

```bash
# Build the app
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel

# Or deploy to any static host (dist/ folder)
```

## ⚠️ Security Reminders

- ✅ This tool runs entirely in your browser
- ✅ No data is sent to any server
- ❌ Never use production keys in this tool
- ❌ Only use for development/testing

## 🆘 Troubleshooting

### Port already in use?

```bash
# Use a different port
npm run dev -- --port 3000
```

### Dependencies issues?

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?

```bash
# Clean build
npm run type-check  # Check TypeScript errors first
npm run lint        # Check linting issues
npm run build       # Build again
```

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Review [SECURITY.md](SECURITY.md) for security best practices
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## 🎨 Features to Explore

1. **Dark/Light Mode** - Toggle in header
2. **Token History** - Enable to save last 10 tokens
3. **QR Codes** - Generate QR code for tokens
4. **Export** - Download token data as JSON
5. **Quick Expiry** - Set exp with 1h/1d/7d buttons
6. **URL Tokens** - Load via `?token=...` (with warning)

---

**Ready to build something awesome?** 🚀

Open the app and start encoding/decoding JWTs!
