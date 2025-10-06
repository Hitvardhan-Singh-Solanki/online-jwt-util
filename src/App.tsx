import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { JwtDecoder } from './components/JwtDecoder';
import { JwtEncoder } from './components/JwtEncoder';
import { TokenHistory } from './components/TokenHistory';
import { useTokenHistory } from './hooks/useTokenHistory';
import { InfoIcon } from './assets/icons';
import type { Algorithm } from './types';

function App() {
  const [activeToken, setActiveToken] = useState('');
  const {
    history,
    historyEnabled,
    addToHistory,
    removeFromHistory,
    clearHistory,
    toggleHistory,
  } = useTokenHistory();

  // Check for token in URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setActiveToken(urlToken);
      // Show warning about URL tokens
      const warned = sessionStorage.getItem('url-token-warned');
      if (!warned) {
        alert(
          'Warning: You have a JWT token in your URL. Be careful not to share URLs containing sensitive tokens. They may be logged in browser history and server logs.'
        );
        sessionStorage.setItem('url-token-warned', 'true');
      }
    }
  }, []);

  const handleTokenDecode = (algorithm?: string) => {
    if (activeToken) {
      addToHistory(activeToken, algorithm);
    }
  };

  const handleTokenGenerated = (token: string, algorithm: Algorithm) => {
    setActiveToken(token);
    addToHistory(token, algorithm);
  };

  const handleHistorySelect = (token: string) => {
    setActiveToken(token);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Notice */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <InfoIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                Privacy & Security Notice
              </h3>
              <p className="text-xs text-blue-800 dark:text-blue-400 mt-1">
                This tool runs entirely in your browser. No tokens, keys, or data are
                transmitted to any server. All cryptographic operations are performed
                locally using industry-standard libraries.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Decoder */}
          <div className="lg:col-span-2 space-y-6">
            <JwtDecoder initialToken={activeToken} onTokenDecode={handleTokenDecode} />
          </div>

          {/* Right Column - Encoder & History */}
          <div className="space-y-6">
            <JwtEncoder onTokenGenerated={handleTokenGenerated} />

            <TokenHistory
              items={history}
              enabled={historyEnabled}
              onToggle={toggleHistory}
              onSelect={handleHistorySelect}
              onRemove={removeFromHistory}
              onClear={clearHistory}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Built with React 19, TypeScript, Vite, and Tailwind CSS v4</p>
            <p className="text-xs">
              Using{' '}
              <a
                href="https://github.com/panva/jose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                jose
              </a>{' '}
              library for JWT operations
            </p>
            <p className="text-xs">
              Supported algorithms: HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
