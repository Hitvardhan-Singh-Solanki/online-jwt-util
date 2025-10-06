export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384';

export interface JwtHeader {
  alg: string;
  typ?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  exp?: number;
  iat?: number;
  nbf?: number;
  iss?: string;
  aud?: string | string[];
  sub?: string;
  [key: string]: unknown;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  algorithm?: string;
  message?: string;
}

export interface TokenHistoryItem {
  id: string;
  token: string;
  timestamp: number;
  algorithm?: string;
  preview: string;
}

export interface KeyPair {
  privateKey: string;
  publicKey: string;
  algorithm: Algorithm;
}

export type ThemeMode = 'light' | 'dark';
