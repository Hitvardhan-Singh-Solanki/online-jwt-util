import { useState, useEffect } from 'react';
import { CopyButton } from './CopyButton';

interface JsonEditorProps {
  value: object;
  onChange?: (value: object) => void;
  readOnly?: boolean;
  label?: string;
}

export function JsonEditor({
  value,
  onChange,
  readOnly = false,
  label,
}: JsonEditorProps) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    setError(null);

    if (onChange && !readOnly) {
      try {
        const parsed = JSON.parse(newText);
        onChange(parsed);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-400">
            {label}
          </label>
          <CopyButton text={text} label="Copy JSON" className="text-xs" />
        </div>
      )}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          readOnly={readOnly}
          className={`code-block w-full min-h-[200px] resize-y ${
            readOnly ? 'cursor-default' : ''
          } ${error ? 'border-red-500 dark:border-red-400' : ''}`}
          spellCheck={false}
          aria-label={label || 'JSON editor'}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Invalid JSON: {error}
          </p>
        )}
      </div>
    </div>
  );
}
