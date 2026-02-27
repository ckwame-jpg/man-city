'use client';
import { useState } from 'react';
import { endpoints } from '@/lib/playground-config';

export default function APIPlayground() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const selected = endpoints[selectedIndex];

  const handleRun = () => {
    setLoading(true);
    setResponse(null);

    // Simulate network delay
    const delay = 80 + Math.random() * 120;
    setTimeout(() => {
      setResponse(JSON.stringify(selected.response.body, null, 2));
      setStatusCode(selected.response.status);
      setResponseTime(Math.round(delay));
      setLoading(false);
    }, delay);
  };

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)]">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">habit-tracker-api</span>
        <span className="ml-auto text-xs text-[var(--text-faint)] font-mono">mock mode</span>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="text-xs font-mono font-bold text-green-400">{selected.method}</span>
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

      {/* Response */}
      <div className="px-4 py-3 font-mono text-sm min-h-[120px] max-h-[300px] overflow-auto">
        {!response && !loading && (
          <p className="text-[var(--text-muted)]">Select an endpoint and click Run to see the response.</p>
        )}
        {loading && (
          <p className="text-[var(--text-muted)] animate-pulse">Sending request...</p>
        )}
        {response && (
          <>
            <div className="flex items-center gap-3 mb-2 text-xs">
              <span className={`font-bold ${statusCode === 200 ? 'text-green-400' : 'text-red-400'}`}>
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
