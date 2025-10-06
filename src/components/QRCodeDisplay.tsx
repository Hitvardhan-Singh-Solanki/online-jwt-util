import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  label?: string;
  size?: number;
}

export function QRCodeDisplay({
  value,
  label = 'QR Code',
  size = 200,
}: QRCodeDisplayProps) {
  const [showQr, setShowQr] = useState(false);

  if (!value) return null;

  return (
    <div className="space-y-3">
      <button onClick={() => setShowQr(!showQr)} className="btn-secondary text-sm">
        {showQr ? 'Hide' : 'Show'} {label}
      </button>

      {showQr && (
        <div className="flex justify-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <QRCodeSVG value={value} size={size} level="M" />
        </div>
      )}
    </div>
  );
}
