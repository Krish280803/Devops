'use client';

import React, { useState } from 'react';
import { CHEAT_SHEETS } from '@/lib/cheatSheetData';
import { Terminal, Copy, Check, Search } from 'lucide-react';
import { CheatSheet } from '@/lib/types';

export default function CheatSheetsPage() {
  const [selectedSheet, setSelectedSheet] = useState<CheatSheet>(CHEAT_SHEETS[0]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredItems = selectedSheet.items.filter(
    (item) =>
      item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
          <Terminal className="h-3.5 w-3.5" />
          <span>Interactive Command Line Reference</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">DevOps Cheat Sheets Hub</h1>
        <p className="text-sm text-slate-300">
          Instant search and 1-click command copying for Linux, Git, Docker, Kubernetes, Terraform, and Bash.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cheat Sheet Category</h2>
          <div className="space-y-2">
            {CHEAT_SHEETS.map((cs) => {
              const isSelected = selectedSheet.id === cs.id;
              return (
                <button
                  key={cs.id}
                  onClick={() => setSelectedSheet(cs)}
                  className={`w-full text-left rounded-xl p-3.5 border transition-all text-xs font-semibold ${
                    isSelected
                      ? 'border-sky-500 bg-sky-600/20 text-white font-bold shadow'
                      : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {cs.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Commands Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">{selectedSheet.title}</h2>
              <p className="text-xs text-slate-400">{selectedSheet.description}</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search commands..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-devops-border bg-devops-card/40 p-4 space-y-2 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-sky-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    {item.command}
                  </span>
                  <button
                    onClick={() => handleCopy(item.command)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    {copiedCmd === item.command ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-300">{item.purpose}</p>
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Example: </span> {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
