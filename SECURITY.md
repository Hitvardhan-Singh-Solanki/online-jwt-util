# Security Policy

## 🔒 Security Considerations

### Client-Side Security

This JWT tool is designed to run **entirely in the browser**. All cryptographic operations are performed client-side using the Web Crypto API via the [jose](https://github.com/panva/jose) library.

**Key Security Features:**

- ✅ No server-side transmission of tokens or keys
- ✅ No external API calls for JWT operations
- ✅ No analytics or tracking
- ✅ LocalStorage usage is opt-in only
- ✅ Clear security warnings throughout the UI

### ⚠️ Security Warnings

#### 1. Private Key Handling

**NEVER** paste production private keys into any web application, including this tool. Private keys should be:

- Generated on secure, isolated systems
- Stored in hardware security modules (HSM) or secure key management systems in production
- Never exposed to client-side applications

This tool is intended for:

- Development and testing purposes
- Educational use
- Debugging JWT issues with test tokens only

#### 2. Token Storage

When the token history feature is enabled:

- Tokens are stored in browser localStorage
- This data persists until manually cleared
- **Recommendation**: Disable history when working with sensitive tokens
- Clear history after use: Use the "Clear all" button

#### 3. URL Token Parameters

Loading tokens via URL query parameters (`?token=...`):

- Exposes tokens in browser history
- May be logged in server access logs
- Could be leaked via HTTP Referer headers
- **Use only for non-sensitive test tokens**

#### 4. Production Usage

This tool is **NOT recommended** for validating production tokens because:

- Production secrets/keys should never be exposed to client-side code
- Token validation should occur on secure servers
- Client-side validation can be bypassed

**For production:** Use server-side JWT validation with properly secured keys.

## 🛡️ Best Practices

### For Developers Using This Tool

1. **Test Tokens Only**
   - Use this tool exclusively with test/development tokens
   - Generate test keys locally using OpenSSL
   - Never use production credentials

2. **Key Generation**

   ```bash
   # Generate test RSA keys locally
   openssl genrsa -out test-private.pem 2048
   openssl rsa -in test-private.pem -pubout -out test-public.pem

   # Generate test EC keys locally
   openssl ecparam -genkey -name prime256v1 -out test-ec-private.pem
   openssl ec -in test-ec-private.pem -pubout -out test-ec-public.pem
   ```

3. **Browser Security**
   - Use this tool in a private/incognito window when testing sensitive patterns
   - Clear browser data after use
   - Ensure you're on HTTPS (production deployments)

4. **Code Review**
   - The entire source code is open source
   - Review the code to verify no data is transmitted externally
   - Check the Network tab in browser DevTools to confirm no external requests

## 🐛 Reporting Security Vulnerabilities

If you discover a security vulnerability in this tool:

1. **DO NOT** open a public GitHub issue
2. Email security concerns to: [Your Security Email]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond within 48 hours and work on a fix promptly.

## 📋 Security Checklist for Deployments

If you're deploying this tool:

- [ ] Serve over HTTPS only
- [ ] Set appropriate Content Security Policy headers
- [ ] Enable security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- [ ] Regular dependency updates for security patches
- [ ] Review and audit any modifications to crypto operations
- [ ] Consider adding rate limiting if exposing publicly
- [ ] Add prominent security warnings in the UI

## 🔄 Dependency Security

This project uses automated dependency scanning:

- **Dependabot**: Automated dependency updates
- **npm audit**: Regular security audits
- **GitHub Security Alerts**: Enabled

To check for vulnerabilities:

```bash
# Audit dependencies
npm audit

# Fix automatically fixable issues
npm audit fix

# Review the security report
npm audit --json
```

## 📚 Additional Resources

- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [jose Library Security](https://github.com/panva/jose#security)

## 📅 Last Updated

This security policy was last updated on: **January 2025**

---

**Remember**: This tool is designed for development and educational purposes. Never use it with production credentials or sensitive tokens.
