import type { JwtPayload } from '../../types';

interface QuickPayloadSettingsProps {
  payload: JwtPayload;
  onUpdate: (field: keyof JwtPayload, value: string | number) => void;
  onSetExpiry: (hours: number) => void;
}

export function QuickPayloadSettings({
  payload,
  onUpdate,
  onSetExpiry,
}: QuickPayloadSettingsProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 space-y-3">
      <h3 className="text-sm font-semibold">Quick Payload Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Issuer (iss)
          </label>
          <input
            type="text"
            value={payload.iss || ''}
            onChange={(e) => onUpdate('iss', e.target.value)}
            placeholder="e.g., https://example.com"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Subject (sub)
          </label>
          <input
            type="text"
            value={payload.sub || ''}
            onChange={(e) => onUpdate('sub', e.target.value)}
            placeholder="e.g., user-id-123"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Audience (aud)
          </label>
          <input
            type="text"
            value={
              Array.isArray(payload.aud) ? payload.aud.join(', ') : payload.aud || ''
            }
            onChange={(e) => onUpdate('aud', e.target.value)}
            placeholder="e.g., api.example.com"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Expiry
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onSetExpiry(1)}
              className="btn-secondary text-xs flex-1"
            >
              1h
            </button>
            <button
              onClick={() => onSetExpiry(24)}
              className="btn-secondary text-xs flex-1"
            >
              1d
            </button>
            <button
              onClick={() => onSetExpiry(168)}
              className="btn-secondary text-xs flex-1"
            >
              7d
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
