'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/lib/projectData';
import { FolderGit2, Code2, CheckCircle2, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  const filteredProjects = PROJECTS.filter(
    (p) => selectedLevel === 'All' || p.level === selectedLevel
  );

  return (
    <div className="max-w-7xl mx-auto p-6 pt-8 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <FolderGit2 className="h-3.5 w-3.5" />
          <span>Hands-on Architecture & Implementation Labs</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">DevOps Production Projects</h1>
        <p className="text-sm text-slate-300">
          Build real-world automation scripts, multi-container Docker applications, Terraform AWS infrastructure, and end-to-end GitOps Kubernetes Capstone pipelines.
        </p>
      </div>

      {/* Level Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-devops-border pb-4">
        {['All', 'Beginner', 'Intermediate', 'Advanced', 'Capstone'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl);
              const matches = PROJECTS.filter((p) => lvl === 'All' || p.level === lvl);
              if (matches.length > 0) setSelectedProject(matches[0]);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
              selectedLevel === lvl
                ? 'border-emerald-500 bg-emerald-600/20 text-white shadow-lg shadow-emerald-600/10'
                : 'border-devops-border bg-devops-card/40 text-slate-300 hover:border-slate-500'
            }`}
          >
            {lvl === 'All' ? 'All Projects' : `${lvl} Projects`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Selector List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Project</h2>
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredProjects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left rounded-xl p-4 border transition-all space-y-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-600/20 text-white font-bold shadow-lg shadow-emerald-600/10'
                      : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {proj.level}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">{proj.title}</h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedProject && (
            <div className="rounded-2xl border border-devops-border bg-devops-card/60 p-6 space-y-6 shadow-xl">
              <div className="space-y-2 border-b border-devops-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/20">
                    {selectedProject.level} Project
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.prerequisites.map((pre, idx) => (
                    <span key={idx} className="rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
                      • {pre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Cpu className="h-4 w-4" /> System Architecture & Data Flow
                </h3>
                <pre className="font-mono text-xs text-sky-300 overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800">
                  {selectedProject.architecture.trim()}
                </pre>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">Implementation Checklist</h3>
                <ul className="space-y-2">
                  {selectedProject.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Starter Code */}
              {selectedProject.starterCode && selectedProject.starterCode.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Code2 className="h-4 w-4" /> Starter Code ({selectedProject.starterCode[0].filename})
                  </h3>
                  <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-4 rounded-xl bg-slate-950 border border-slate-800">
                    {selectedProject.starterCode[0].code}
                  </pre>
                </div>
              )}

              {/* Expected Result */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Target Expected Result</span>
                <p className="text-xs text-slate-300">{selectedProject.expectedResult}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
