import { useState, useEffect } from 'react';
import type { TokenHistoryItem } from '../types';

const HISTORY_KEY = 'jwt-token-history';
const MAX_HISTORY_ITEMS = 10;

export function useTokenHistory() {
  const [history, setHistory] = useState<TokenHistoryItem[]>(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [historyEnabled, setHistoryEnabled] = useState(() => {
    const enabled = localStorage.getItem('jwt-history-enabled');
    return enabled === 'true';
  });

  useEffect(() => {
    if (historyEnabled) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, historyEnabled]);

  useEffect(() => {
    localStorage.setItem('jwt-history-enabled', historyEnabled.toString());
    if (!historyEnabled) {
      localStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    }
  }, [historyEnabled]);

  const addToHistory = (token: string, algorithm?: string) => {
    if (!historyEnabled) return;

    const preview = token.length > 50 ? token.substring(0, 50) + '...' : token;
    const newItem: TokenHistoryItem = {
      id: Date.now().toString(),
      token,
      timestamp: Date.now(),
      algorithm,
      preview,
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.token !== token);
      const updated = [newItem, ...filtered];
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleHistory = () => {
    setHistoryEnabled((prev) => !prev);
  };

  return {
    history,
    historyEnabled,
    addToHistory,
    removeFromHistory,
    clearHistory,
    toggleHistory,
  };
}
