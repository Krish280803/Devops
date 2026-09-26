'use client';

import React, { useState, useEffect } from 'react';
import { CURRICULUM_PHASES } from '@/lib/curriculumData';
import { getStoredProgress, saveQuizScore } from '@/lib/storage';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { Lesson, QuizQuestion } from '@/lib/types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizzesPage() {
  const allLessons = CURRICULUM_PHASES.flatMap((p) => p.modules.flatMap((m) => m.lessons));

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(allLessons[0]);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [quizScores, setQuizScores] = useState<Record<string, any>>({});

  useEffect(() => {
    const prog = getStoredProgress();
    setQuizScores(prog.quizScores);
    if (allLessons.length > 0) {
      loadQuizForLesson(allLessons[0]);
    }
  }, []);

  const loadQuizForLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    // Shuffle questions every time quiz is opened or refreshed
    const shuffledQs = shuffle(lesson.quiz);
    setActiveQuestions(shuffledQs);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleRefreshQuiz = () => {
    if (selectedLesson) {
      loadQuizForLesson(selectedLesson);
    }
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
    const updated = saveQuizScore(selectedLesson.id, correct, activeQuestions.length);
    setQuizScores(updated.quizScores);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-8 space-y-8 w-full">
      {/* Header */}
      <div className="space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Dynamic Quiz & Knowledge Evaluator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">DevOps Quiz Engine</h1>
        <p className="text-sm text-slate-300">
          Test your DevOps knowledge. Questions shuffle dynamically on every refresh with instant error feedback & explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lesson Quiz Selector List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Lesson Quiz</h2>
            <span className="text-[11px] text-slate-500">{allLessons.length} Quizzes</span>
          </div>

          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {allLessons.map((lesson) => {
              const previous = quizScores[lesson.id];
              const isSelected = selectedLesson?.id === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => loadQuizForLesson(lesson)}
                  className={`w-full text-left rounded-xl p-4 border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-600/20 text-white font-bold shadow-lg shadow-brand-600/10'
                      : 'border-devops-border bg-devops-card/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-sky-400 line-clamp-1">{lesson.title}</div>
                    <div className="text-[11px] text-slate-400">{lesson.quiz.length} Questions</div>
                  </div>
                  {previous && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 shrink-0">
                      {previous.percentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiz Runner Panel */}
        <div className="lg:col-span-2">
          {selectedLesson && (
            <div className="rounded-2xl border border-devops-border bg-devops-card/60 p-6 space-y-6 shadow-xl">
              {/* Quiz Header & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-devops-border pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedLesson.title}</h2>
                  <p className="text-xs text-slate-400">{activeQuestions.length} Practice Questions</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshQuiz}
                    className="flex items-center gap-1.5 rounded-lg border border-devops-border bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                    title="Shuffle and load fresh question order"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-sky-400" />
                    Shuffle Questions
                  </button>

                  {submitted && score !== null && (
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                      <Award className="h-4 w-4" />
                      <span>{score} / {activeQuestions.length} ({Math.round((score / activeQuestions.length) * 100)}%)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {activeQuestions.map((q, idx) => {
                  const userSelected = answers[q.id];
                  const isUserCorrect = userSelected === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-5 space-y-4 transition-all ${
                        submitted
                          ? isUserCorrect
                            ? 'border-emerald-500/40 bg-emerald-500/5'
                            : 'border-red-500/40 bg-red-500/5'
                          : 'border-slate-800 bg-slate-950'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-xs text-white leading-relaxed">
                          {idx + 1}. {q.question}
                        </p>
                        {submitted && (
                          isUserCorrect ? (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20 shrink-0">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-bold text-red-400 border border-red-500/20 shrink-0">
                              <XCircle className="h-3.5 w-3.5" /> Incorrect
                            </span>
                          )
                        )}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userSelected === optIdx;
                          const isCorrectOpt = q.correctAnswer === optIdx;

                          let style = 'border-slate-800 bg-slate-900 text-slate-300 hover:border-sky-500';

                          if (submitted) {
                            if (isCorrectOpt) {
                              style = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold';
                            } else if (isSelected && !isUserCorrect) {
                              style = 'border-red-500 bg-red-500/20 text-red-200 font-bold';
                            } else {
                              style = 'border-slate-800 bg-slate-950 text-slate-500 opacity-60';
                            }
                          } else if (isSelected) {
                            style = 'border-brand-500 bg-brand-600/30 text-white font-bold shadow';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`text-left rounded-lg p-3 text-xs border transition-all flex items-center justify-between gap-2 ${style}`}
                            >
                              <span>{opt}</span>
                              {submitted && isCorrectOpt && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                              {submitted && isSelected && !isUserCorrect && <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Diagnostic Explanation Banner when submitted */}
                      {submitted && (
                        <div className={`text-xs p-3.5 rounded-lg border space-y-2 ${
                          isUserCorrect
                            ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                            : 'bg-slate-900 border-red-500/30 text-slate-200'
                        }`}>
                          {!isUserCorrect && (
                            <div className="text-[11px] font-bold text-red-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Your choice: "{q.options[userSelected] || 'No Answer Selected'}"</span>
                              <span className="text-emerald-400 ml-auto">Correct: "{q.options[q.correctAnswer]}"</span>
                            </div>
                          )}
                          <div className="leading-relaxed">
                            <span className="font-bold text-sky-400">💡 Detailed Explanation: </span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {!submitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
                  >
                    Submit Answers & View Diagnostic Feedback
                  </button>
                ) : (
                  <button
                    onClick={handleRefreshQuiz}
                    className="w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Shuffle Questions & Retake Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
