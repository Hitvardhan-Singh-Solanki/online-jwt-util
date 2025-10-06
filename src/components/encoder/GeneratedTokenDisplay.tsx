import { CopyButton } from '../CopyButton';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { SuccessIcon } from '../../assets/icons';

interface GeneratedTokenDisplayProps {
  token: string;
  onExport: () => void;
}

export function GeneratedTokenDisplay({ token, onExport }: GeneratedTokenDisplayProps) {
  if (!token) return null;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <SuccessIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm font-semibold text-green-800 dark:text-green-300">
            Token Generated Successfully
          </p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <CopyButton text={token} label="Copy Token" />
          <button onClick={onExport} className="btn-secondary text-sm">
            Export JSON
          </button>
        </div>

        <div className="code-block break-all text-xs max-h-40 overflow-y-auto">
          {token}
        </div>
      </div>

      <QRCodeDisplay value={token} />
    </div>
  );
}
