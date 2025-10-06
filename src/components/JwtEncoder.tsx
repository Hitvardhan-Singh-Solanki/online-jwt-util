import { useState } from 'react';
import { JsonEditor } from './JsonEditor';
import { KeyInput } from './KeyInput';
import { AlgorithmSelector } from './encoder/AlgorithmSelector';
import { QuickPayloadSettings } from './encoder/QuickPayloadSettings';
import { GeneratedTokenDisplay } from './encoder/GeneratedTokenDisplay';
import { useFadeIn } from '../hooks/useAnimations';
import { WarningIcon } from '../assets/icons';
import {
  signHmacJwt,
  signRsaJwt,
  signEcdsaJwt,
  isHmacAlgorithm,
  isRsaAlgorithm,
  isEcdsaAlgorithm,
} from '../utils/jwt-utils';
import type { Algorithm, JwtPayload, JwtHeader } from '../types';

interface JwtEncoderProps {
  onTokenGenerated?: (token: string, algorithm: Algorithm) => void;
}

export function JwtEncoder({ onTokenGenerated }: JwtEncoderProps) {
  const [algorithm, setAlgorithm] = useState<Algorithm>('HS256');
  const [payload, setPayload] = useState<JwtPayload>({
    sub: '1234567890',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000),
  });
  const [headerOverrides, setHeaderOverrides] = useState<Partial<JwtHeader>>({});
  const [signingKey, setSigningKey] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const tokenRef = useFadeIn(generatedToken);

  const handleQuickPayloadUpdate = (field: keyof JwtPayload, value: string | number) => {
    setPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSetExpiry = (hours: number) => {
    const exp = Math.floor(Date.now() / 1000) + hours * 3600;
    handleQuickPayloadUpdate('exp', exp);
  };

  const handleGenerate = async () => {
    if (!signingKey) {
      setError('Please provide a signing key');
      return;
    }

    setError(null);

    try {
      let token: string;

      if (isHmacAlgorithm(algorithm)) {
        token = await signHmacJwt(payload, signingKey, algorithm, headerOverrides);
      } else if (isRsaAlgorithm(algorithm)) {
        token = await signRsaJwt(payload, signingKey, algorithm, headerOverrides);
      } else if (isEcdsaAlgorithm(algorithm)) {
        token = await signEcdsaJwt(payload, signingKey, algorithm, headerOverrides);
      } else {
        throw new Error(`Unsupported algorithm: ${algorithm}`);
      }

      setGeneratedToken(token);

      if (onTokenGenerated) {
        onTokenGenerated(token, algorithm);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate token');
      setGeneratedToken('');
    }
  };

  const handleExport = () => {
    const exportData = {
      algorithm,
      payload,
      header: { alg: algorithm, typ: 'JWT', ...headerOverrides },
      token: generatedToken,
      generated: new Date().toISOString(),
      // Note: Keys are not included for security
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jwt-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">JWT Encoder</h2>

        <div className="space-y-4">
          <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />

          <QuickPayloadSettings
            payload={payload}
            onUpdate={handleQuickPayloadUpdate}
            onSetExpiry={handleSetExpiry}
          />

          <JsonEditor
            value={payload}
            onChange={(value) => setPayload(value as JwtPayload)}
            label="Payload (JSON)"
          />

          {/* Advanced Options */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </button>

            {showAdvanced && (
              <div className="mt-3">
                <JsonEditor
                  value={headerOverrides}
                  onChange={(value) => setHeaderOverrides(value as Partial<JwtHeader>)}
                  label="Header Overrides (optional)"
                />
              </div>
            )}
          </div>

          <KeyInput
            algorithm={algorithm}
            onKeyChange={setSigningKey}
            label={isHmacAlgorithm(algorithm) ? 'Secret Key' : 'Private Key (PEM)'}
            placeholder={
              isHmacAlgorithm(algorithm)
                ? 'Enter secret to sign the token'
                : 'Paste private key or upload PEM file'
            }
          />

          {/* Security Warning */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <WarningIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                <strong>Security Warning:</strong> Never share private keys or secrets.
                This tool runs entirely in your browser - no data is transmitted to any
                server.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!signingKey}
            className="btn-primary w-full"
          >
            Generate JWT
          </button>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          <div ref={tokenRef}>
            <GeneratedTokenDisplay token={generatedToken} onExport={handleExport} />
          </div>
        </div>
      </div>
    </div>
  );
}
