import { useState, useRef } from 'react';
import type { Algorithm } from '../types';
import { isHmacAlgorithm, isValidPemFormat } from '../utils/jwt-utils';

interface KeyInputProps {
  algorithm: Algorithm;
  onKeyChange: (key: string) => void;
  label: string;
  placeholder?: string;
}

export function KeyInput({ algorithm, onKeyChange, label, placeholder }: KeyInputProps) {
  const [key, setKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isHmac = isHmacAlgorithm(algorithm);

  const handleKeyChange = (newKey: string) => {
    setKey(newKey);
    setError(null);

    if (!isHmac && newKey && !isValidPemFormat(newKey)) {
      setError(
        'Invalid PEM format. Key should start with -----BEGIN and end with -----END'
      );
    } else {
      onKeyChange(newKey);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      handleKeyChange(text);
    } catch (err) {
      setError('Failed to read file');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
        {!isHmac && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Upload PEM file
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pem,.key"
        className="hidden"
      />

      {isHmac ? (
        <input
          type="password"
          value={key}
          onChange={(e) => handleKeyChange(e.target.value)}
          placeholder={placeholder || 'Enter secret key'}
          className="input-field font-mono"
          aria-label={label}
        />
      ) : (
        <textarea
          value={key}
          onChange={(e) => handleKeyChange(e.target.value)}
          placeholder={placeholder || 'Paste PEM key or upload file'}
          className={`code-block w-full min-h-[120px] resize-y ${
            error ? 'border-red-500 dark:border-red-400' : ''
          }`}
          spellCheck={false}
          aria-label={label}
        />
      )}

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!isHmac && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <details className="cursor-pointer">
            <summary className="hover:text-gray-700 dark:hover:text-gray-300">
              How to generate {algorithm} keys?
            </summary>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-950 rounded-lg code-block">
              <p className="mb-2">Using OpenSSL:</p>
              <code className="block text-xs">
                {algorithm.startsWith('RS') ? (
                  <>
                    # Generate private key
                    <br />
                    openssl genrsa -out private.pem 2048
                    <br />
                    <br />
                    # Extract public key
                    <br />
                    openssl rsa -in private.pem -pubout -out public.pem
                  </>
                ) : (
                  <>
                    # Generate private key
                    <br />
                    openssl ecparam -genkey -name prime256v1 -out private.pem
                    <br />
                    <br />
                    # Extract public key
                    <br />
                    openssl ec -in private.pem -pubout -out public.pem
                  </>
                )}
              </code>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
