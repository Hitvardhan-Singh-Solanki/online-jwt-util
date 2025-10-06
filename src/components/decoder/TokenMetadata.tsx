import { WarningIcon } from '../../assets/icons';
import { formatTimestamp } from '../../utils/jwt-utils';
import type { DecodedJwt } from '../../types';

interface TokenMetadataProps {
  decoded: DecodedJwt;
  timeToExpiry: string | null;
  isExpired: boolean;
  isNotYetValid: boolean;
}

export function TokenMetadata({
  decoded,
  timeToExpiry,
  isExpired,
  isNotYetValid,
}: TokenMetadataProps) {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="text-sm font-semibold mb-3 text-blue-900 dark:text-blue-300">
        Token Information
      </h3>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400">Algorithm:</dt>
          <dd className="font-mono font-semibold">{decoded.header.alg}</dd>
        </div>
        {decoded.payload.iat && (
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Issued At:</dt>
            <dd className="font-mono text-xs">{formatTimestamp(decoded.payload.iat)}</dd>
          </div>
        )}
        {decoded.payload.exp && (
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Expires:</dt>
            <dd className="font-mono text-xs">
              {formatTimestamp(decoded.payload.exp)}
              {timeToExpiry && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    isExpired
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}
                >
                  {timeToExpiry}
                </span>
              )}
            </dd>
          </div>
        )}
        {decoded.payload.nbf && (
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Not Before:</dt>
            <dd className="font-mono text-xs">{formatTimestamp(decoded.payload.nbf)}</dd>
          </div>
        )}
        {decoded.payload.iss && (
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Issuer:</dt>
            <dd className="font-mono text-xs truncate max-w-xs">{decoded.payload.iss}</dd>
          </div>
        )}
        {decoded.payload.sub && (
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Subject:</dt>
            <dd className="font-mono text-xs truncate max-w-xs">{decoded.payload.sub}</dd>
          </div>
        )}
      </dl>

      {(isExpired || isNotYetValid) && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <div className="flex items-center gap-2">
            <WarningIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              {isExpired ? 'Token has expired' : 'Token is not yet valid'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
