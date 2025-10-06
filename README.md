# JWT Decoder & Encoder

A professional, production-ready JWT (JSON Web Token) tool built with React 19, TypeScript, Vite, and Tailwind CSS v4. Decode, encode, and verify JSON Web Tokens with support for multiple algorithms including HS256/384/512, RS256/384/512, and ES256/384.

![JWT Tool Screenshot](https://via.placeholder.com/800x400?text=JWT+Decoder+%26+Encoder)

## ✨ Features

### 🔍 JWT Decoder

- **Instant Token Parsing**: Automatically decode JWT tokens into header, payload, and signature components
- **Syntax Validation**: Validates JWT structure (3 parts, base64url encoding)
- **Cryptographic Verification**: Verify signatures with HMAC secrets or RSA/ECDSA public keys
- **Token Metadata Display**: Shows algorithm, expiry (exp), issued at (iat), not before (nbf) with human-friendly dates
- **Live Expiry Countdown**: Real-time TTL countdown for tokens with expiration
- **Pretty-Printed JSON**: Formatted header and payload with copy buttons

### 🔐 JWT Encoder

- **Multi-Algorithm Support**: Generate tokens with HS256/384/512 (HMAC), RS256/384/512 (RSA), ES256/384 (ECDSA)
- **Key Management**: Upload or paste PEM keys for RSA/ECDSA, secret input for HMAC
- **Quick Payload Controls**: Fast setup for common claims (exp, iat, iss, aud, sub)
- **JSON Editor**: Fully editable payload and header override options
- **Export & Share**: Export token metadata to JSON, generate QR codes
- **OpenSSL Key Guide**: Built-in instructions for generating key pairs locally

### 🎨 User Experience

- **Dark Mode First**: Professional dark theme with light mode toggle
- **Responsive Design**: Two-column layout on desktop, stacked on mobile
- **GSAP Animations**: Subtle, polished micro-interactions
- **Keyboard Accessible**: Full keyboard navigation and ARIA labels
- **Token History**: Optional localStorage-based history of last 10 tokens
- **URL Token Support**: Load tokens via query parameter with security warnings

### 🔒 Security & Privacy

- **100% Client-Side**: All operations run in your browser - no server transmission
- **Industry-Standard Crypto**: Uses the battle-tested [jose](https://github.com/panva/jose) library
- **Security Warnings**: Clear notices about private key handling and URL token risks
- **No Tracking**: No analytics, no cookies, no data collection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/online-jwt-util.git
cd online-jwt-util

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app running.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run lint         # Lint code
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## 📚 Usage Guide

### Decoding a JWT

1. Paste your JWT token into the "JWT Token" textarea
2. The tool automatically decodes and displays:
   - Header and payload as formatted JSON
   - Token metadata (algorithm, expiry, issued time, etc.)
   - Signature string
3. To verify the signature:
   - For HMAC (HS256/384/512): Enter the secret key
   - For RSA/ECDSA: Paste or upload the public key (PEM format)
   - Click "Verify Signature"

### Encoding a JWT

1. Select your desired algorithm from the dropdown
2. Use quick controls to set common claims (exp, iss, sub, aud)
3. Edit the payload JSON directly for custom claims
4. For signing:
   - HMAC: Enter a secret string
   - RSA/ECDSA: Paste or upload private key (PEM format)
5. Click "Generate JWT"
6. Copy the token or export as JSON

### Generating Keys for RSA/ECDSA

The tool includes built-in OpenSSL commands. For RSA:

```bash
# Generate RSA private key (2048-bit)
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem
```

For ECDSA:

```bash
# Generate EC private key (prime256v1 for ES256)
openssl ecparam -genkey -name prime256v1 -out private.pem

# Extract public key
openssl ec -in private.pem -pubout -out public.pem
```

## 🏗️ Architecture

### Tech Stack

- **React 19**: Latest React with improved TypeScript support
- **TypeScript**: Strict mode enabled for type safety
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS with dark mode support
- **GSAP**: Professional animations library
- **jose**: Comprehensive JWT library with WebCrypto support
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities

### Project Structure

```
online-jwt-util/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── JwtDecoder.tsx
│   │   ├── JwtEncoder.tsx
│   │   ├── JsonEditor.tsx
│   │   ├── KeyInput.tsx
│   │   ├── TokenHistory.tsx
│   │   └── CopyButton.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useTokenHistory.ts
│   │   └── useAnimations.ts
│   ├── utils/              # Utility functions
│   │   ├── jwt-utils.ts
│   │   └── clipboard.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── tests/              # Unit tests
│   │   ├── setup.ts
│   │   ├── jwt-utils.test.ts
│   │   └── components.test.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .github/workflows/      # CI/CD pipelines
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Key Components

- **JwtDecoder**: Handles token decoding, validation, and signature verification
- **JwtEncoder**: Token generation with algorithm selection and key management
- **JsonEditor**: Editable JSON viewer with syntax validation
- **KeyInput**: Smart input for secrets (HMAC) or PEM keys (RSA/ECDSA)
- **TokenHistory**: Optional localStorage-based recent tokens list

## 🧪 Testing

The project includes comprehensive unit tests with test vectors:

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

Test coverage includes:

- JWT encoding/decoding with known test vectors
- HMAC (HS256/384/512) signature generation and verification
- Algorithm detection and validation
- Component rendering and user interactions
- Edge cases and error handling

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

For automatic deployments, set up GitHub integration:

1. Connect your repository to Vercel
2. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

The CI/CD pipeline will automatically deploy on pushes to `main`.

### Deploy to GitHub Pages

1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Push to `main` branch
3. The workflow will automatically build and deploy

The site will be available at `https://yourusername.github.io/online-jwt-util/`

### Manual Build

```bash
# Build for production
npm run build

# Preview the build
npm run preview

# The dist/ folder contains the deployable files
```

## 🔐 Security Considerations

### ⚠️ Important Security Notes

1. **Never Share Private Keys**: This tool is for development and testing. Never paste production private keys into any web application.

2. **Client-Side Only**: All cryptographic operations occur in your browser using WebCrypto APIs. No data is transmitted to external servers.

3. **Token History**: When enabled, tokens are stored in localStorage. Disable history if working with sensitive tokens.

4. **URL Tokens**: Loading tokens via URL query parameters exposes them in browser history and server logs. Use with caution.

5. **Production Tokens**: Do not use this tool to validate production tokens containing sensitive data. Use server-side validation in production environments.

6. **Key Generation**: Generate production keys on secure systems, not in browsers. The OpenSSL commands are for local testing only.

### Supported Algorithms

| Algorithm | Type  | Key Type        | Status       |
| --------- | ----- | --------------- | ------------ |
| HS256     | HMAC  | Secret String   | ✅ Supported |
| HS384     | HMAC  | Secret String   | ✅ Supported |
| HS512     | HMAC  | Secret String   | ✅ Supported |
| RS256     | RSA   | PEM (2048-bit+) | ✅ Supported |
| RS384     | RSA   | PEM (2048-bit+) | ✅ Supported |
| RS512     | RSA   | PEM (2048-bit+) | ✅ Supported |
| ES256     | ECDSA | PEM (P-256)     | ✅ Supported |
| ES384     | ECDSA | PEM (P-384)     | ✅ Supported |

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run linting and tests: `npm run lint && npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow the existing code style (enforced by ESLint/Prettier)
- Update documentation for significant changes
- Ensure TypeScript strict mode compliance

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [jose](https://github.com/panva/jose) - Comprehensive JWT library
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library

## 📞 Support

- 📧 Report issues: [GitHub Issues](https://github.com/yourusername/online-jwt-util/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/online-jwt-util/discussions)
- 📚 Documentation: This README and inline code comments

---

Built with ❤️ using React 19, TypeScript, Vite, and Tailwind CSS v4
