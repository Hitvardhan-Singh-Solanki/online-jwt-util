interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function TokenInput({ value, onChange, error }: TokenInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
        JWT Token
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JWT token here..."
        className="input-field font-mono text-sm min-h-[120px] resize-y"
        aria-label="JWT token input"
      />
      {error && (
        <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-300">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
    </div>
  );
}
