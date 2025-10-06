import type { Algorithm } from '../../types';

interface AlgorithmSelectorProps {
  value: Algorithm;
  onChange: (algorithm: Algorithm) => void;
}

const ALGORITHMS: Algorithm[] = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
];

export function AlgorithmSelector({ value, onChange }: AlgorithmSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
        Algorithm
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Algorithm)}
        className="input-field"
        aria-label="Select algorithm"
      >
        {ALGORITHMS.map((alg) => (
          <option key={alg} value={alg}>
            {alg}
          </option>
        ))}
      </select>
    </div>
  );
}
