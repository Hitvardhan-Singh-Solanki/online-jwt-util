import { useState, useRef } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { usePulseScale } from '../hooks/useAnimations';
import { CopyIcon, CheckIcon } from '../assets/icons';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pulse = usePulseScale();

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      if (buttonRef.current) {
        pulse(buttonRef.current);
      }
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleCopy}
      className={`btn-secondary text-sm ${className}`}
      aria-label={label}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4 inline mr-1" />
          Copied!
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4 inline mr-1" />
          {label}
        </>
      )}
    </button>
  );
}
