import { describe, it, expect } from 'vitest';
import {
  decodeJwt,
  verifyHmacJwt,
  signHmacJwt,
  isHmacAlgorithm,
  isRsaAlgorithm,
  isEcdsaAlgorithm,
  formatTimestamp,
  getTimeToExpiry,
} from '../utils/jwt-utils';

describe('JWT Utils', () => {
  describe('decodeJwt', () => {
    it('should decode a valid HS256 JWT', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      const decoded = decodeJwt(token);

      expect(decoded.header.alg).toBe('HS256');
      expect(decoded.header.typ).toBe('JWT');
      expect(decoded.payload.sub).toBe('1234567890');
      expect(decoded.payload.name).toBe('John Doe');
      expect(decoded.payload.iat).toBe(1516239022);
    });

    it('should throw error for invalid JWT format', () => {
      expect(() => decodeJwt('invalid.token')).toThrow('Invalid JWT format');
    });

    it('should throw error for malformed base64', () => {
      expect(() => decodeJwt('invalid.token.parts')).toThrow('Failed to decode JWT');
    });
  });

  describe('HMAC signing and verification', () => {
    it('should sign and verify HS256 token correctly', async () => {
      const payload = { sub: '12345', name: 'Test User' };
      const secret = 'test-secret';

      const token = await signHmacJwt(payload, secret, 'HS256');
      const result = await verifyHmacJwt(token, secret, 'HS256');

      expect(result.valid).toBe(true);
      expect(result.algorithm).toBe('HS256');
    });

    it('should fail verification with wrong secret', async () => {
      const payload = { sub: '12345' };
      const secret = 'correct-secret';
      const wrongSecret = 'wrong-secret';

      const token = await signHmacJwt(payload, secret, 'HS256');
      const result = await verifyHmacJwt(token, wrongSecret, 'HS256');

      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle HS384 algorithm', async () => {
      const payload = { test: 'data' };
      const secret = 'secret384';

      const token = await signHmacJwt(payload, secret, 'HS384');
      const result = await verifyHmacJwt(token, secret, 'HS384');

      expect(result.valid).toBe(true);
      expect(result.algorithm).toBe('HS384');
    });

    it('should handle HS512 algorithm', async () => {
      const payload = { test: 'data' };
      const secret = 'secret512';

      const token = await signHmacJwt(payload, secret, 'HS512');
      const result = await verifyHmacJwt(token, secret, 'HS512');

      expect(result.valid).toBe(true);
      expect(result.algorithm).toBe('HS512');
    });
  });

  describe('Algorithm type checks', () => {
    it('should correctly identify HMAC algorithms', () => {
      expect(isHmacAlgorithm('HS256')).toBe(true);
      expect(isHmacAlgorithm('HS384')).toBe(true);
      expect(isHmacAlgorithm('HS512')).toBe(true);
      expect(isHmacAlgorithm('RS256')).toBe(false);
      expect(isHmacAlgorithm('ES256')).toBe(false);
    });

    it('should correctly identify RSA algorithms', () => {
      expect(isRsaAlgorithm('RS256')).toBe(true);
      expect(isRsaAlgorithm('RS384')).toBe(true);
      expect(isRsaAlgorithm('RS512')).toBe(true);
      expect(isRsaAlgorithm('HS256')).toBe(false);
      expect(isRsaAlgorithm('ES256')).toBe(false);
    });

    it('should correctly identify ECDSA algorithms', () => {
      expect(isEcdsaAlgorithm('ES256')).toBe(true);
      expect(isEcdsaAlgorithm('ES384')).toBe(true);
      expect(isEcdsaAlgorithm('HS256')).toBe(false);
      expect(isEcdsaAlgorithm('RS256')).toBe(false);
    });
  });

  describe('Time utilities', () => {
    it('should format timestamp correctly', () => {
      const timestamp = 1516239022;
      const formatted = formatTimestamp(timestamp);
      expect(formatted).toContain('2018');
    });

    it('should calculate time to expiry', () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const expiry = getTimeToExpiry(futureTime);
      expect(expiry).toContain('h');
    });

    it('should show expired for past timestamps', () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const expiry = getTimeToExpiry(pastTime);
      expect(expiry).toBe('Expired');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty payload', async () => {
      const payload = {};
      const secret = 'secret';

      const token = await signHmacJwt(payload, secret, 'HS256');
      const decoded = decodeJwt(token);

      expect(decoded.payload).toEqual({});
    });

    it('should handle complex payload with nested objects', async () => {
      const payload = {
        user: {
          id: 123,
          roles: ['admin', 'user'],
        },
        metadata: {
          ip: '192.168.1.1',
        },
      };
      const secret = 'secret';

      const token = await signHmacJwt(payload, secret, 'HS256');
      const decoded = decodeJwt(token);

      expect(decoded.payload).toEqual(payload);
    });
  });
});
