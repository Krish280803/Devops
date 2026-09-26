'use client';

import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS, InterviewQuestion } from '@/lib/interviewData';
import { Mic, Sparkles, Award, ArrowRight, RefreshCw, Eye, EyeOff, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export default function InterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);

  // Filtered Questions
  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    const matchCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || q.level === selectedLevel;
    return matchCategory && matchLevel;
  });

  const activeQuestion: InterviewQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || loading || !activeQuestion) return;
    setLoading(true);
    setEvaluation(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'interview_eval',
          userPrompt: userAnswer,
          interviewQuestion: activeQuestion,
        }),
      });
      const data = await res.json();
      setEvaluation(data.reply);
    } catch (err) {
      setEvaluation('Failed to evaluate answer. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setUserAnswer('');
    setEvaluation(null);
    setShowModelAnswer(false);
    if (filteredQuestions.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-8 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
          <Mic className="h-3.5 w-3.5" />
          <span>DevOps Technical Interview Coach & Simulator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Mock Technical Interview</h1>
        <p className="text-sm text-slate-300">
          Test your real-world technical and scenario-based responses. Get immediate AI evaluation, score, missing concept feedback, and model answers.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-devops-border pb-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
                setUserAnswer('');
                setEvaluation(null);
                setShowModelAnswer(false);
              }}
              className="rounded-lg bg-devops-card border border-devops-border px-3 py-1.5 text-xs text-white"
            >
              <option value="All">All Categories</option>
              <option value="Linux">Linux</option>
              <option value="Git">Git & GitHub</option>
              <option value="Docker">Docker</option>
              <option value="Kubernetes">Kubernetes</option>
              <option value="Terraform">Terraform</option>
              <option value="AWS">AWS Cloud</option>
              <option value="CI/CD">CI/CD</option>
              <option value="SRE">SRE</option>
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400">Difficulty:</label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentIndex(0);
                setUserAnswer('');
                setEvaluation(null);
                setShowModelAnswer(false);
              }}
              className="rounded-lg bg-devops-card border border-devops-border px-3 py-1.5 text-xs text-white"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Scenario">Scenario</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-semibold">
          {filteredQuestions.length} Questions Found
        </span>
      </div>

      {/* Question Card */}
      {activeQuestion ? (
        <div className="rounded-2xl border border-devops-border bg-devops-card/60 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/20">
                {activeQuestion.category} • {activeQuestion.level}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          <h2 className="text-xl font-bold text-white leading-relaxed">{activeQuestion.question}</h2>

          {/* Key Concepts Checklist Banner */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4" /> Key Concepts Interviewers Expect You to Mention
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeQuestion.keyConceptsToMention.map((concept, idx) => (
                <span key={idx} className="rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  • {concept}
                </span>
              ))}
            </div>
          </div>

          {/* User Answer Text Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Technical Answer</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your explanation or diagnostic steps as if speaking directly to an interviewer..."
              className="w-full h-40 rounded-xl border border-devops-border bg-slate-950 p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 shadow-inner"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleEvaluate}
                disabled={loading || !userAnswer.trim()}
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-purple-200" />
                {loading ? 'Evaluating Answer...' : 'Submit for AI Evaluation'}
              </button>

              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="rounded-xl border border-devops-border bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all flex items-center gap-2"
              >
                {showModelAnswer ? <EyeOff className="h-4 w-4 text-amber-400" /> : <Eye className="h-4 w-4 text-sky-400" />}
                {showModelAnswer ? 'Hide Model Answer' : 'Reveal Model Answer'}
              </button>
            </div>

            <button
              onClick={handleNext}
              className="rounded-xl border border-devops-border bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Revealed Model Answer Box */}
          {showModelAnswer && (
            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-400 uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>Model Answer</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">{activeQuestion.modelAnswer}</p>

              <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-purple-400">💡 Pro Tip: </span>
                {activeQuestion.interviewTip}
              </div>
            </div>
          )}

          {/* AI Evaluation Output Box */}
          {evaluation && (
            <div className="rounded-xl border border-purple-500/40 bg-slate-950 p-6 space-y-4 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap shadow-2xl">
              {evaluation}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-devops-border bg-devops-card/20 p-12 text-center space-y-3">
          <Mic className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No questions match the selected filters</h3>
          <p className="text-xs text-slate-400">Try choosing "All Categories" or "All Levels" above.</p>
        </div>
      )}
    </div>
  );
}
