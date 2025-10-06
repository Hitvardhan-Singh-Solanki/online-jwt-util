import { useFadeIn } from '../hooks/useAnimations';
import { CloseIcon, WarningIcon } from '../assets/icons';
import type { TokenHistoryItem } from '../types';

interface TokenHistoryProps {
  items: TokenHistoryItem[];
  enabled: boolean;
  onToggle: () => void;
  onSelect: (token: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function TokenHistory({
  items,
  enabled,
  onToggle,
  onSelect,
  onRemove,
  onClear,
}: TokenHistoryProps) {
  const containerRef = useFadeIn(items.length);

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Token History</h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">Enable</span>
          <input
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      {enabled ? (
        <>
          {items.length > 0 ? (
            <div ref={containerRef} className="space-y-2">
              <div className="flex justify-end">
                <button
                  onClick={onClear}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 group hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onSelect(item.token)}
                        className="flex-1 text-left"
                      >
                        <p className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">
                          {item.preview}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.algorithm && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                              {item.algorithm}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove from history"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No tokens in history
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          Enable history to save recent tokens locally
        </p>
      )}

      <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-start gap-2">
          <WarningIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            History is stored locally in your browser. Tokens with sensitive data should
            not be saved.
          </p>
        </div>
      </div>
    </div>
  );
}
