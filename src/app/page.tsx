'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Mic, 
  Wrench, 
  FolderGit2, 
  FileText,
  Flame,
  ArrowRight
} from 'lucide-react';
import { CURRICULUM_PHASES } from '@/lib/curriculumData';
import { getStoredProgress } from '@/lib/storage';
import { UserProgress } from '@/lib/types';

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const totalLessons = CURRICULUM_PHASES.flatMap((p) => p.modules.flatMap((m) => m.lessons)).length;
  const completedCount = progress?.completedLessons.length || 0;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 w-full">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-900/60 via-devops-card to-slate-900 p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Learning Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome back to your DevOps Journey! 🚀</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Master DevOps fundamentals, Linux shell, Networking, Git, Bash automation, Docker, Kubernetes, Jenkins, Terraform, Ansible, AWS Cloud, Monitoring, and DevSecOps.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
            >
              <BookOpen className="h-4 w-4" />
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-lg border border-devops-border bg-devops-card px-5 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:border-slate-500 transition-all"
            >
              <FileText className="h-4 w-4 text-sky-400" />
              Download Study Notes
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Overall Progress</span>
            <Trophy className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{overallPercentage}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full transition-all duration-500" style={{ width: `${overallPercentage}%` }} />
          </div>
          <div className="text-[11px] text-slate-400">{completedCount} of {totalLessons} lessons completed</div>
        </div>

        {/* Streak */}
        <div className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Learning Streak</span>
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-white">{progress?.streakDays || 1} Days</div>
          <p className="text-[11px] text-slate-400">Keep practicing daily to build muscle memory!</p>
        </div>

        {/* Quizzes Taken */}
        <div className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Quizzes Attempted</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {Object.keys(progress?.quizScores || {}).length}
          </div>
          <p className="text-[11px] text-slate-400">Validated knowledge checkpoints</p>
        </div>

        {/* Interview Readiness */}
        <div className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Interview Readiness</span>
            <Mic className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">
            {Math.min(100, Math.round(overallPercentage * 1.2))}%
          </div>
          <p className="text-[11px] text-slate-400">Based on topics & interview questions read</p>
        </div>
      </div>

      {/* Phase Roadmap Overview */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-sky-400" />
          DevOps Curriculum Phases Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_PHASES.map((phase) => {
            const phaseLessons = phase.modules.flatMap((m) => m.lessons);
            const phaseCompleted = phaseLessons.filter((l) => progress?.completedLessons.includes(l.id)).length;
            const phasePct = Math.round((phaseCompleted / phaseLessons.length) * 100);

            return (
              <div key={phase.id} className="rounded-xl border border-devops-border bg-devops-card/40 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">{phase.badge}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{phasePct}%</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{phase.description}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full" style={{ width: `${phasePct}%` }} />
                  </div>
                  <Link
                    href={`/learn?phase=${phase.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-sky-300 hover:text-white"
                  >
                    <span>View Phase Lessons</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Action Tools */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/troubleshoot" className="group rounded-xl border border-devops-border bg-devops-card/50 p-5 hover:border-amber-500/50 transition-all space-y-2">
          <Wrench className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-bold text-white">DevOps Troubleshooter</h3>
          <p className="text-xs text-slate-400">Paste error logs or YAMLs to diagnose root causes instantly.</p>
        </Link>

        <Link href="/interview" className="group rounded-xl border border-devops-border bg-devops-card/50 p-5 hover:border-purple-500/50 transition-all space-y-2">
          <Mic className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-bold text-white">Mock Interview Prep</h3>
          <p className="text-xs text-slate-400">Practice technical & scenario questions with AI feedback.</p>
        </Link>

        <Link href="/projects" className="group rounded-xl border border-devops-border bg-devops-card/50 p-5 hover:border-emerald-500/50 transition-all space-y-2">
          <FolderGit2 className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-bold text-white">Projects & Labs</h3>
          <p className="text-xs text-slate-400">Build real-world Docker, Kubernetes & Terraform architectures.</p>
        </Link>

        <Link href="/cheatsheets" className="group rounded-xl border border-devops-border bg-devops-card/50 p-5 hover:border-sky-500/50 transition-all space-y-2">
          <Terminal className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-bold text-white">DevOps Cheat Sheets</h3>
          <p className="text-xs text-slate-400">Quick CLI reference for Linux, Git, Docker & kubectl.</p>
        </Link>
      </section>
    </div>
  );
}
