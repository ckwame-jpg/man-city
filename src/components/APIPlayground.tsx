'use client';
import { useState, useRef } from 'react';
import { endpoints, API_BASE_URL, DEMO_CREDENTIALS } from '@/lib/playground-config';

const methodColors: Record<string, string> = {
  GET: 'text-green-400',
  POST: 'text-blue-400',
  PUT: 'text-yellow-400',
  DELETE: 'text-red-400',
};

export default function APIPlayground() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'live' | 'mock'>(API_BASE_URL ? 'live' : 'mock');
  const tokenRef = useRef<string | null>(null);

  const selected = endpoints[selectedIndex];

  const authenticate = async (): Promise<string | null> => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', DEMO_CREDENTIALS.email);
      formData.append('password', DEMO_CREDENTIALS.password);

      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
      if (!res.ok) return null;
      const data = await res.json();
      tokenRef.current = data.access_token;
      return data.access_token;
    } catch {
      return null;
    }
  };

  const handleMockRun = () => {
    const delay = 80 + Math.random() * 120;
    setTimeout(() => {
      setResponse(JSON.stringify(selected.mockResponse.body, null, 2));
      setStatusCode(selected.mockResponse.status);
      setResponseTime(Math.round(delay));
      setLoading(false);
    }, delay);
  };

  const handleLiveRun = async () => {
    // Auto-authenticate if needed
    let token = tokenRef.current;
    if (!token && selected.requiresAuth) {
      token = await authenticate();
      if (!token) {
        setMode('mock');
        handleMockRun();
        return;
      }
    }

    const start = performance.now();

    try {
      const headers: Record<string, string> = {};
      if (token && selected.requiresAuth) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      let body: string | undefined;
      if (selected.path === '/login' && selected.requestBody) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const formData = new URLSearchParams();
        const reqBody = selected.requestBody as Record<string, string>;
        Object.entries(reqBody).forEach(([k, v]) => formData.append(k, v));
        body = formData.toString();
      } else if (selected.requestBody) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(selected.requestBody);
      }

      const res = await fetch(`${API_BASE_URL}${selected.path}`, {
        method: selected.method,
        headers,
        body,
      });

      const data = await res.json();

      // If login, store the token
      if (selected.path === '/login' && res.ok && data.access_token) {
        tokenRef.current = data.access_token;
      }

      setResponse(JSON.stringify(data, null, 2));
      setStatusCode(res.status);
      setResponseTime(Math.round(performance.now() - start));
      setLoading(false);
    } catch {
      // Network error — fall back to mock
      setMode('mock');
      handleMockRun();
    }
  };

  const handleRun = () => {
    setLoading(true);
    setResponse(null);

    if (mode === 'mock' || !API_BASE_URL) {
      handleMockRun();
    } else {
      handleLiveRun();
    }
  };

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">habitual-habits-api</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-mono">
          <span className={`w-1.5 h-1.5 rounded-full ${mode === 'live' ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span className="text-[var(--text-faint)]">{mode === 'live' ? 'live' : 'mock'}</span>
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className={`text-xs font-mono font-bold ${methodColors[selected.method] ?? 'text-green-400'}`}>{selected.method}</span>
        <select
          value={selectedIndex}
          onChange={(e) => {
            setSelectedIndex(Number(e.target.value));
            setResponse(null);
            setStatusCode(null);
            setResponseTime(null);
          }}
          className="flex-1 min-w-0 bg-transparent text-[var(--text-primary)] text-sm font-mono border border-[var(--border-subtle)] rounded px-2 py-1 outline-none focus:border-[var(--border-hover)] transition"
        >
          {endpoints.map((ep, i) => (
            <option key={i} value={i} className="bg-[var(--bg-primary)]">
              {ep.path} — {ep.description}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleRun}
          disabled={loading}
          className="px-4 py-1.5 text-sm font-mono rounded border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--card-bg)] transition disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run'}
        </button>
      </div>

      {/* Request Body */}
      {selected.requestBody != null && (
        <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-muted)] font-mono mb-1">Request Body</p>
          <pre className="text-sm font-mono text-[var(--text-secondary)] whitespace-pre-wrap break-words">
            {JSON.stringify(selected.requestBody, null, 2)}
          </pre>
        </div>
      )}

      {/* Response */}
      <div className="px-4 py-3 font-mono text-sm min-h-[120px] max-h-[300px] overflow-auto">
        {!response && !loading && (
          <p className="text-[var(--text-muted)]">Select an endpoint and click Run to see the response.</p>
        )}
        {loading && (
          <p className="text-[var(--text-muted)] animate-pulse">
            {mode === 'live' ? 'Hitting live server...' : 'Sending request...'}
          </p>
        )}
        {response && (
          <>
            <div className="flex items-center gap-3 mb-2 text-xs">
              <span className={`font-bold ${statusCode && statusCode < 300 ? 'text-green-400' : 'text-red-400'}`}>
                {statusCode}
              </span>
              <span className="text-[var(--text-muted)]">{responseTime}ms</span>
            </div>
            <pre className="text-[var(--text-secondary)] whitespace-pre-wrap break-words">{response}</pre>
          </>
        )}
      </div>
    </div>
  );
}
