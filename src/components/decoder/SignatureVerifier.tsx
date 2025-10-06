import { KeyInput } from '../KeyInput';
import { SuccessIcon, ErrorIcon } from '../../assets/icons';
import { isHmacAlgorithm } from '../../utils/jwt-utils';
import type { Algorithm, ValidationResult } from '../../types';

interface SignatureVerifierProps {
  algorithm: Algorithm;
  onKeyChange: (key: string) => void;
  onVerify: () => void;
  validationKey: string;
  validation: ValidationResult | null;
}

export function SignatureVerifier({
  algorithm,
  onKeyChange,
  onVerify,
  validationKey,
  validation,
}: SignatureVerifierProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-semibold">Verify Signature</h3>

      <KeyInput
        algorithm={algorithm}
        onKeyChange={onKeyChange}
        label={isHmacAlgorithm(algorithm) ? 'Secret Key' : 'Public Key (PEM)'}
        placeholder={
          isHmacAlgorithm(algorithm)
            ? 'Enter secret used to sign the token'
            : 'Paste public key or upload PEM file'
        }
      />

      <button onClick={onVerify} disabled={!validationKey} className="btn-primary w-full">
        Verify Signature
      </button>

      {validation && (
        <div
          className={`p-3 rounded-lg border ${
            validation.valid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {validation.valid ? (
              <SuccessIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <ErrorIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <p
              className={`text-sm font-semibold ${
                validation.valid
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-red-800 dark:text-red-300'
              }`}
            >
              {validation.valid ? 'Valid Signature' : 'Invalid Signature'}
            </p>
          </div>
          {validation.message && (
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {validation.message}
            </p>
          )}
          {validation.error && (
            <p className="text-xs mt-1 text-red-600 dark:text-red-400">
              {validation.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
