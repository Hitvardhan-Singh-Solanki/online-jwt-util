import { useState, useEffect } from 'react';
import { CopyButton } from './CopyButton';
import { JsonEditor } from './JsonEditor';
import { TokenInput } from './decoder/TokenInput';
import { TokenMetadata } from './decoder/TokenMetadata';
import { SignatureVerifier } from './decoder/SignatureVerifier';
import { QRCodeDisplay } from './QRCodeDisplay';
import { useFadeIn } from '../hooks/useAnimations';
import {
  decodeJwt,
  verifyHmacJwt,
  verifyRsaJwt,
  verifyEcdsaJwt,
  isHmacAlgorithm,
  isRsaAlgorithm,
  isEcdsaAlgorithm,
  getTimeToExpiry,
} from '../utils/jwt-utils';
import type { DecodedJwt, ValidationResult, Algorithm } from '../types';

interface JwtDecoderProps {
  initialToken?: string;
  onTokenDecode?: (algorithm?: string) => void;
}

export function JwtDecoder({ initialToken = '', onTokenDecode }: JwtDecoderProps) {
  const [token, setToken] = useState(initialToken);
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationKey, setValidationKey] = useState('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [timeToExpiry, setTimeToExpiry] = useState<string | null>(null);

  const decodedRef = useFadeIn(decoded);

  useEffect(() => {
    if (initialToken) {
      setToken(initialToken);
    }
  }, [initialToken]);

  useEffect(() => {
    if (!token.trim()) {
      setDecoded(null);
      setError(null);
      setValidation(null);
      return;
    }

    try {
      const result = decodeJwt(token);
      setDecoded(result);
      setError(null);
      setValidation(null);

      if (onTokenDecode) {
        onTokenDecode(result.header.alg);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode token');
      setDecoded(null);
      setValidation(null);
    }
  }, [token, onTokenDecode]);

  // Update expiry countdown
  useEffect(() => {
    if (!decoded?.payload.exp) {
      setTimeToExpiry(null);
      return;
    }

    const updateExpiry = () => {
      setTimeToExpiry(getTimeToExpiry(decoded.payload.exp!));
    };

    updateExpiry();
    const interval = setInterval(updateExpiry, 1000);
    return () => clearInterval(interval);
  }, [decoded]);

  const handleVerify = async () => {
    if (!decoded || !validationKey) {
      setValidation({
        valid: false,
        error: 'Please provide a key to verify the signature',
      });
      return;
    }

    const algorithm = decoded.header.alg as Algorithm;
    let result: ValidationResult;

    try {
      if (isHmacAlgorithm(algorithm)) {
        result = await verifyHmacJwt(token, validationKey, algorithm);
      } else if (isRsaAlgorithm(algorithm)) {
        result = await verifyRsaJwt(token, validationKey, algorithm);
      } else if (isEcdsaAlgorithm(algorithm)) {
        result = await verifyEcdsaJwt(token, validationKey, algorithm);
      } else {
        result = {
          valid: false,
          error: `Unsupported algorithm: ${algorithm}`,
        };
      }

      setValidation(result);
    } catch (err) {
      setValidation({
        valid: false,
        error: err instanceof Error ? err.message : 'Verification failed',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">JWT Decoder</h2>

        <div className="space-y-4">
          <TokenInput value={token} onChange={setToken} error={error} />

          {decoded && (
            <div ref={decodedRef} className="space-y-6">
              <TokenMetadata
                decoded={decoded}
                timeToExpiry={timeToExpiry}
                isExpired={
                  !!(decoded.payload.exp && decoded.payload.exp < Date.now() / 1000)
                }
                isNotYetValid={
                  !!(decoded.payload.nbf && decoded.payload.nbf > Date.now() / 1000)
                }
              />

              <JsonEditor value={decoded.header} readOnly label="Header" />
              <JsonEditor value={decoded.payload} readOnly label="Payload" />

              {/* Signature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Signature
                  </label>
                  <CopyButton text={decoded.signature} label="Copy" className="text-xs" />
                </div>
                <div className="code-block break-all">{decoded.signature}</div>
              </div>

              <SignatureVerifier
                algorithm={decoded.header.alg as Algorithm}
                onKeyChange={setValidationKey}
                onVerify={handleVerify}
                validationKey={validationKey}
                validation={validation}
              />

              <QRCodeDisplay value={token} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
