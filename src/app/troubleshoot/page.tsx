'use client';

import React, { useState } from 'react';
import { Wrench, Sparkles, Terminal, AlertTriangle, CheckCircle2, Trash2, Copy, Check } from 'lucide-react';

export default function TroubleshootPage() {
  const [errorInput, setErrorInput] = useState('');
  const [category, setCategory] = useState('Linux / Systemd');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleErrors = [
    {
      label: 'K8s CrashLoopBackOff (OOMKilled)',
      category: 'Kubernetes / Helm',
      text: 'Error: Container node-api exited with code 137 (OOMKilled). Liveness probe failed 3 times in namespace production.'
    },
    {
      label: 'Docker Permission Denied',
      category: 'Docker / Containers',
      text: 'Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock'
    },
    {
      label: 'Terraform State Lock Error',
      category: 'Terraform / IaC',
      text: 'Error: Error acquiring the state lock: ConditionalCheckFailedException: Lock ID 1234-5678-90ab in DynamoDB table terraform-locks is active.'
    },
    {
      label: 'SSH Key Permissions Too Open',
      category: 'Linux / Systemd',
      text: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@ WARNING: UNPROTECTED PRIVATE KEY FILE! @\nPermissions 0777 for /root/.ssh/id_rsa are too open.'
    },
    {
      label: 'Nginx 502 Bad Gateway',
      category: 'Linux / Systemd',
      text: '2026/09/27 00:01:00 [error] 1234#0: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.1.1, server: app.company.com, request: "GET /api/v1/users HTTP/1.1", upstream: "http://127.0.0.1:8080/api/v1/users"'
    },
    {
      label: 'Git push blocked: Secret Leaked',
      category: 'DevSecOps',
      text: 'Gitleaks secret scanning alert: Found AWS Access Key ID AKIAIOSFODNN7EXAMPLE in commit 4a12b3c. Push blocked by pre-commit hook.'
    }
  ];

  const handleDiagnose = async () => {
    if (!errorInput.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'troubleshoot',
          errorLog: errorInput,
          category,
        }),
      });
      const data = await res.json();
      setResult(data.reply);
    } catch (err) {
      setResult('Failed to diagnose error log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-8 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
          <Wrench className="h-3.5 w-3.5" />
          <span>AI Production Debugger & Incident Resolver</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">DevOps Troubleshooter</h1>
        <p className="text-sm text-slate-300">
          Paste error messages, stack traces, terminal logs, Dockerfiles, or Kubernetes YAMLs for instant root cause diagnosis and fix commands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Diagnostic Input Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Paste Error Log / Output</label>
            <div className="flex items-center gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg bg-devops-card border border-devops-border px-3 py-1.5 text-xs text-slate-300"
              >
                <option>Linux / Systemd</option>
                <option>Docker / Containers</option>
                <option>Kubernetes / Helm</option>
                <option>Terraform / IaC</option>
                <option>CI/CD / Jenkins</option>
                <option>AWS Cloud</option>
                <option>DevSecOps</option>
              </select>

              {errorInput && (
                <button
                  onClick={() => setErrorInput('')}
                  className="rounded-lg bg-slate-800 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  title="Clear input"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <textarea
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            placeholder="Paste error traceback or terminal output here..."
            className="w-full h-[320px] rounded-2xl border border-devops-border bg-slate-950 p-4 font-mono text-xs text-sky-300 placeholder-slate-600 focus:outline-none focus:border-amber-500 shadow-inner"
          />

          {/* Quick Preset Samples */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400">Quick Error Outage Samples:</span>
            <div className="flex flex-wrap gap-2">
              {sampleErrors.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setErrorInput(sample.text);
                    setCategory(sample.category);
                  }}
                  className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDiagnose}
            disabled={loading || !errorInput.trim()}
            className="w-full rounded-xl bg-amber-600 py-3 text-xs font-bold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-200" />
            {loading ? 'Diagnosing Root Cause...' : 'Diagnose Error & Get Fix Commands'}
          </button>
        </div>

        {/* Results Window */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Diagnostic Analysis</h2>
            {result && (
              <button
                onClick={handleCopyResult}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
              </button>
            )}
          </div>

          {result ? (
            <div className="rounded-2xl border border-devops-border bg-slate-950 p-6 font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[520px] shadow-xl">
              {result}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-devops-border bg-devops-card/20 p-12 text-center space-y-3 h-[450px] flex flex-col items-center justify-center">
              <Terminal className="h-10 w-10 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-300">No active diagnosis</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Paste your error logs on the left or select a quick outage sample above, then click Diagnose to receive root cause analysis and resolution commands.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
