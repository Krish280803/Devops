'use client';

import React, { useState } from 'react';
import { CURRICULUM_PHASES } from '@/lib/curriculumData';
import { generateLessonNotes, generatePhaseNotes, generateFullCourseNotes } from '@/lib/notesGenerator';
import { downloadPDFNotes, downloadMarkdownNotes, downloadTextNotes } from '@/lib/pdfGenerator';
import { FileText, Download, Edit3, Layers, BookOpen, CheckCircle2 } from 'lucide-react';
import { Lesson, Phase } from '@/lib/types';

export default function NotesPage() {
  const allLessons = CURRICULUM_PHASES.flatMap((p) => p.modules.flatMap((m) => m.lessons));

  const [scopeMode, setScopeMode] = useState<'full' | 'phase' | 'lesson'>('full');
  const [selectedPhase, setSelectedPhase] = useState<Phase>(CURRICULUM_PHASES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(allLessons[0]);
  const [noteText, setNoteText] = useState<string>(generateFullCourseNotes());

  const handleSelectScope = (mode: 'full' | 'phase' | 'lesson') => {
    setScopeMode(mode);
    if (mode === 'full') {
      setNoteText(generateFullCourseNotes());
    } else if (mode === 'phase') {
      setNoteText(generatePhaseNotes(selectedPhase));
    } else {
      setNoteText(generateLessonNotes(selectedLesson));
    }
  };

  const handleSelectPhase = (phase: Phase) => {
    setSelectedPhase(phase);
    setScopeMode('phase');
    setNoteText(generatePhaseNotes(phase));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setScopeMode('lesson');
    setNoteText(generateLessonNotes(lesson));
  };

  const handlePDF = () => {
    const filename =
      scopeMode === 'full'
        ? 'DevOps_Master_Course_Complete_Notes.pdf'
        : scopeMode === 'phase'
        ? `${selectedPhase.slug}_notes.pdf`
        : `${selectedLesson.id}_notes.pdf`;

    downloadPDFNotes({
      title: scopeMode === 'full' ? 'DevOps Master Course Complete Notes' : selectedPhase.title,
      subtitle: 'AI DevOps Academy — Point-Wise Handbook',
      filename,
      markdownContent: noteText,
    });
  };

  const handleMD = () => {
    const filename =
      scopeMode === 'full'
        ? 'DevOps_Master_Course_Complete_Notes.md'
        : scopeMode === 'phase'
        ? `${selectedPhase.slug}_notes.md`
        : `${selectedLesson.id}_notes.md`;

    downloadMarkdownNotes(filename, noteText);
  };

  const handleTXT = () => {
    const filename =
      scopeMode === 'full'
        ? 'DevOps_Master_Course_Complete_Notes.txt'
        : scopeMode === 'phase'
        ? `${selectedPhase.slug}_notes.txt`
        : `${selectedLesson.id}_notes.txt`;

    downloadTextNotes(filename, noteText);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-8 space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
            <FileText className="h-3.5 w-3.5" />
            <span>Structured Point-Wise Notes Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">DevOps Study Notes & Exporter</h1>
          <p className="text-sm text-slate-300">
            Generate and download point-wise study notes for single lessons, complete phases, or the entire DevOps Master Course.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePDF}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
          >
            <Download className="h-4 w-4" />
            Download PDF Notes
          </button>
          <button
            onClick={handleMD}
            className="rounded-xl border border-devops-border bg-devops-card px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:border-slate-500 transition-all"
          >
            Download Markdown (.md)
          </button>
          <button
            onClick={handleTXT}
            className="rounded-xl border border-devops-border bg-devops-card px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:border-slate-500 transition-all"
          >
            Download Text (.txt)
          </button>
        </div>
      </div>

      {/* Scope Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-devops-border pb-4">
        <button
          onClick={() => handleSelectScope('full')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
            scopeMode === 'full'
              ? 'border-brand-500 bg-brand-600/30 text-white shadow-lg shadow-brand-600/20'
              : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          <BookOpen className="h-4 w-4 text-sky-400" />
          <span>Complete Course Master Notes (All 15 Phases)</span>
        </button>

        <button
          onClick={() => handleSelectScope('phase')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
            scopeMode === 'phase'
              ? 'border-brand-500 bg-brand-600/30 text-white shadow-lg shadow-brand-600/20'
              : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          <Layers className="h-4 w-4 text-purple-400" />
          <span>Phase Notes</span>
        </button>

        <button
          onClick={() => handleSelectScope('lesson')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
            scopeMode === 'lesson'
              ? 'border-brand-500 bg-brand-600/30 text-white shadow-lg shadow-brand-600/20'
              : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
          }`}
        >
          <FileText className="h-4 w-4 text-emerald-400" />
          <span>Single Lesson Notes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Selection Menu */}
        <div className="space-y-4">
          {scopeMode === 'phase' && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Phase</h2>
              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {CURRICULUM_PHASES.map((phase) => {
                  const isSelected = selectedPhase.id === phase.id;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => handleSelectPhase(phase)}
                      className={`w-full text-left rounded-xl p-3 border transition-all text-xs font-semibold ${
                        isSelected
                          ? 'border-purple-500 bg-purple-600/20 text-white shadow'
                          : 'border-devops-border bg-devops-card/40 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-purple-400 font-bold">{phase.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{phase.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {scopeMode === 'lesson' && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Lesson</h2>
              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {allLessons.map((lesson) => {
                  const isSelected = selectedLesson.id === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`w-full text-left rounded-xl p-3 border transition-all text-xs font-semibold ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-600/20 text-white shadow'
                          : 'border-devops-border bg-devops-card/40 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-emerald-400 font-bold">{lesson.title}</div>
                      <div className="text-[11px] text-slate-400">{lesson.duration}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {scopeMode === 'full' && (
            <div className="rounded-2xl border border-devops-border bg-devops-card/50 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <CheckCircle2 className="h-4 w-4" />
                <span>Complete Master Course Notes</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compiles all 15 DevOps phases into one point-wise handbook covering beginner through advanced production & SRE topics.
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Total Phases: 15</div>
                <div>• Total Topics: 30+</div>
                <div>• Includes: Commands, Diagrams & Interview Q&A</div>
              </div>
            </div>
          )}
        </div>

        {/* Markdown Notes Editor Window */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-sky-400" />
              Point-Wise Markdown Study Notes
            </h2>
            <span className="text-xs text-slate-400">Live Editable</span>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full h-[600px] rounded-2xl border border-devops-border bg-slate-950 p-6 font-mono text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-sky-500 shadow-inner overflow-y-auto"
          />
        </div>
      </div>
    </div>
  );
}
