import * as jose from 'jose';
import type { DecodedJwt, JwtHeader, JwtPayload, ValidationResult } from '../types';

/**
 * Decodes a JWT token into its components without verification
 */
export function decodeJwt(token: string): DecodedJwt {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  try {
    const headerJson = base64UrlDecode(headerB64);
    const payloadJson = base64UrlDecode(payloadB64);

    const header: JwtHeader = JSON.parse(headerJson);
    const payload: JwtPayload = JSON.parse(payloadJson);

    return {
      header,
      payload,
      signature: signatureB64,
      raw: {
        header: headerB64,
        payload: payloadB64,
        signature: signatureB64,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to decode JWT: ${error.message}`);
    }
    throw new Error('Failed to decode JWT');
  }
}

/**
 * Base64URL decode helper
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }
  return atob(base64);
}

/**
 * Validates JWT signature with HMAC algorithms (HS256, HS384, HS512)
 */
export async function verifyHmacJwt(
  token: string,
  secret: string,
  algorithm: 'HS256' | 'HS384' | 'HS512'
): Promise<ValidationResult> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    await jose.jwtVerify(token, secretKey, {
      algorithms: [algorithm],
    });

    return {
      valid: true,
      algorithm,
      message: 'Signature verified successfully',
    };
  } catch (error) {
    return {
      valid: false,
      algorithm,
      error: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Validates JWT signature with RSA algorithms (RS256, RS384, RS512)
 */
export async function verifyRsaJwt(
  token: string,
  publicKeyPem: string,
  algorithm: 'RS256' | 'RS384' | 'RS512'
): Promise<ValidationResult> {
  try {
    const publicKey = await jose.importSPKI(publicKeyPem, algorithm);
    await jose.jwtVerify(token, publicKey, {
      algorithms: [algorithm],
    });

    return {
      valid: true,
      algorithm,
      message: 'Signature verified successfully',
    };
  } catch (error) {
    return {
      valid: false,
      algorithm,
      error: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Validates JWT signature with ECDSA algorithms (ES256, ES384)
 */
export async function verifyEcdsaJwt(
  token: string,
  publicKeyPem: string,
  algorithm: 'ES256' | 'ES384'
): Promise<ValidationResult> {
  try {
    const publicKey = await jose.importSPKI(publicKeyPem, algorithm);
    await jose.jwtVerify(token, publicKey, {
      algorithms: [algorithm],
    });

    return {
      valid: true,
      algorithm,
      message: 'Signature verified successfully',
    };
  } catch (error) {
    return {
      valid: false,
      algorithm,
      error: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}

/**
 * Signs a JWT with HMAC algorithm
 */
export async function signHmacJwt(
  payload: JwtPayload,
  secret: string,
  algorithm: 'HS256' | 'HS384' | 'HS512',
  headerOverrides?: Partial<JwtHeader>
): Promise<string> {
  const secretKey = new TextEncoder().encode(secret);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, ...headerOverrides })
    .sign(secretKey);

  return jwt;
}

/**
 * Signs a JWT with RSA algorithm
 */
export async function signRsaJwt(
  payload: JwtPayload,
  privateKeyPem: string,
  algorithm: 'RS256' | 'RS384' | 'RS512',
  headerOverrides?: Partial<JwtHeader>
): Promise<string> {
  const privateKey = await jose.importPKCS8(privateKeyPem, algorithm);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, ...headerOverrides })
    .sign(privateKey);

  return jwt;
}

/**
 * Signs a JWT with ECDSA algorithm
 */
export async function signEcdsaJwt(
  payload: JwtPayload,
  privateKeyPem: string,
  algorithm: 'ES256' | 'ES384',
  headerOverrides?: Partial<JwtHeader>
): Promise<string> {
  const privateKey = await jose.importPKCS8(privateKeyPem, algorithm);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, ...headerOverrides })
    .sign(privateKey);

  return jwt;
}

/**
 * Checks if algorithm is HMAC-based
 */
export function isHmacAlgorithm(alg: string): alg is 'HS256' | 'HS384' | 'HS512' {
  return ['HS256', 'HS384', 'HS512'].includes(alg);
}

/**
 * Checks if algorithm is RSA-based
 */
export function isRsaAlgorithm(alg: string): alg is 'RS256' | 'RS384' | 'RS512' {
  return ['RS256', 'RS384', 'RS512'].includes(alg);
}

/**
 * Checks if algorithm is ECDSA-based
 */
export function isEcdsaAlgorithm(alg: string): alg is 'ES256' | 'ES384' {
  return ['ES256', 'ES384'].includes(alg);
}

/**
 * Formats Unix timestamp to human-readable date
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Calculates time until token expiry
 */
export function getTimeToExpiry(exp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/**
 * Validates that a string is a valid PEM format
 */
export function isValidPemFormat(pem: string): boolean {
  const pemRegex = /^-----BEGIN .+-----[\s\S]+-----END .+-----$/;
  return pemRegex.test(pem.trim());
}
