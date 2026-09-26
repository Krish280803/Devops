import React, { useState } from 'react';
import { Lesson } from '@/lib/types';
import { 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  Sparkles, 
  AlertTriangle, 
  Terminal, 
  BookOpen,
  Code2,
  Cpu
} from 'lucide-react';
import { downloadPDFNotes, downloadMarkdownNotes, downloadTextNotes } from '@/lib/pdfGenerator';

interface LessonViewerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onOpenAiTutor: (prompt: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onOpenAiTutor,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleOptionSelect = (qId: string, optIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    lesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
  };

  const generateMarkdownNoteContent = (): string => {
    return `# ${lesson.title}
## Duration: ${lesson.duration}

### 1. Core Concept
${lesson.concept}

### 2. Why It Matters
${lesson.whyItMatters}

### 3. Real-World Analogy
${lesson.analogy}

${lesson.architectureDiagram ? `### 4. Architecture Diagram\n\`\`\`text\n${lesson.architectureDiagram.trim()}\n\`\`\`\n` : ''}

### 5. Key Principles
${lesson.keyPrinciples.map((kp) => `* ${kp}`).join('\n')}

### 6. Command Examples
${lesson.commandExamples.map((c) => `* \`${c.command}\` — ${c.explanation}`).join('\n')}

### 7. Common Mistakes
${lesson.commonMistakes.map((cm) => `* ${cm}`).join('\n')}

### 8. Interview Questions & Key Answers
${lesson.interviewQuestions.map((iq) => `#### [${iq.level}] ${iq.question}\n**Answer**: ${iq.answer}`).join('\n\n')}
`;
  };

  const handleDownloadPDF = () => {
    const md = generateMarkdownNoteContent();
    downloadPDFNotes({
      title: lesson.title,
      subtitle: `AI DevOps Academy — Study Notes (${lesson.duration})`,
      filename: `${lesson.id}_notes.pdf`,
      markdownContent: md,
    });
  };

  const handleDownloadMD = () => {
    const md = generateMarkdownNoteContent();
    downloadMarkdownNotes(`${lesson.id}_notes.md`, md);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-devops-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/20">
              {lesson.duration}
            </span>
            <span className="text-xs text-slate-400">Lesson ID: {lesson.id}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{lesson.title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mark Complete */}
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-devops-card border border-devops-border text-slate-300 hover:text-white hover:border-slate-500'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>

          {/* Ask AI */}
          <button
            onClick={() => onOpenAiTutor(`Explain ${lesson.title} with a simple real-world analogy and key commands.`)}
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
          >
            <Sparkles className="h-4 w-4 text-sky-300" />
            Ask AI Tutor
          </button>

          {/* Download Notes Dropdown */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
            >
              <Download className="h-4 w-4 text-sky-400" />
              Download PDF Notes
            </button>
            <button
              onClick={handleDownloadMD}
              className="rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-700"
              title="Download Markdown (.md)"
            >
              .MD
            </button>
          </div>
        </div>
      </div>

      {/* 1. Core Concept */}
      <section className="rounded-xl border border-devops-border bg-devops-card/60 p-6 space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
          <BookOpen className="h-4 w-4" />
          <span>1. Core Concept</span>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed">{lesson.concept}</p>
      </section>

      {/* 2. Why It Matters & 3. Analogy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-xl border border-devops-border bg-devops-card/40 p-5 space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400">2. Why It Matters in Production</h3>
          <p className="text-slate-300 text-xs leading-relaxed">{lesson.whyItMatters}</p>
        </section>

        <section className="rounded-xl border border-devops-border bg-devops-card/40 p-5 space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-400">3. Real-World Analogy</h3>
          <p className="text-slate-300 text-xs leading-relaxed">{lesson.analogy}</p>
        </section>
      </div>

      {/* 4. Architecture Diagram */}
      {lesson.architectureDiagram && (
        <section className="rounded-xl border border-devops-border bg-slate-950 p-5 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            <span>4. System Architecture & Flow Diagram</span>
          </div>
          <pre className="font-mono text-xs text-sky-300 overflow-x-auto p-4 rounded-lg bg-slate-900 border border-slate-800">
            {lesson.architectureDiagram.trim()}
          </pre>
        </section>
      )}

      {/* 5. Key Principles */}
      <section className="rounded-xl border border-devops-border bg-devops-card/40 p-5 space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-sky-400">5. Key Architectural Principles</h3>
        <ul className="space-y-2">
          {lesson.keyPrinciples.map((kp, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
              <span>{kp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Command Examples */}
      {lesson.commandExamples.length > 0 && (
        <section className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Terminal className="h-4 w-4" />
            <span>6. Essential Terminal Commands</span>
          </div>
          <div className="space-y-2">
            {lesson.commandExamples.map((cmd, idx) => (
              <div key={idx} className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs space-y-1">
                <div className="font-mono text-sky-300 font-semibold">{cmd.command}</div>
                <div className="text-slate-400 text-[11px]">{cmd.explanation}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Code Snippet */}
      {lesson.codeSnippet && (
        <section className="rounded-xl border border-devops-border bg-slate-950 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 font-mono text-sky-400 font-bold">
              <Code2 className="h-4 w-4" />
              <span>{lesson.codeSnippet.filename || 'Manifest / Code'}</span>
            </div>
            <span className="uppercase text-[10px]">{lesson.codeSnippet.language}</span>
          </div>
          <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-4 rounded-lg bg-slate-900 border border-slate-800">
            {lesson.codeSnippet.code}
          </pre>
        </section>
      )}

      {/* 7. Common Mistakes & Troubleshooting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>7. Common Beginner Mistakes</span>
          </div>
          <ul className="space-y-2">
            {lesson.commonMistakes.map((cm, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{cm}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Terminal className="h-4 w-4" />
            <span>8. Diagnostic Troubleshooting</span>
          </div>
          <div className="space-y-2">
            {lesson.troubleshooting.map((item, idx) => (
              <div key={idx} className="text-xs space-y-1">
                <div className="font-semibold text-amber-300">Issue: {item.issue}</div>
                <div className="text-slate-300 text-[11px] bg-slate-900/80 p-2 rounded border border-slate-800">
                  <span className="font-bold text-emerald-400">Fix: </span>
                  {item.fix}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Interview Questions */}
      <section className="rounded-xl border border-devops-border bg-devops-card/60 p-5 space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-purple-400">9. Interview Preparation Questions</h3>
        <div className="space-y-3">
          {lesson.interviewQuestions.map((iq, idx) => (
            <div key={idx} className="rounded-lg bg-slate-900/60 border border-devops-border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">Q: {iq.question}</span>
                <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                  {iq.level}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
                <span className="font-bold text-sky-400">Answer: </span>
                {iq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Quiz Section */}
      <section className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <HelpCircle className="h-5 w-5" />
            <span>10. Lesson Mini Quiz</span>
          </div>
          {submittedQuiz && quizScore !== null && (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              Score: {quizScore} / {lesson.quiz.length} ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
            </span>
          )}
        </div>

        <div className="space-y-6">
          {lesson.quiz.map((q, qIndex) => (
            <div key={q.id} className="space-y-3 rounded-lg bg-devops-card/60 p-4 border border-devops-border">
              <p className="font-semibold text-xs text-white">
                {qIndex + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[q.id] === optIndex;
                  const isCorrect = q.correctAnswer === optIndex;

                  let btnStyle = 'border-devops-border bg-slate-900 text-slate-300 hover:border-sky-500';
                  if (submittedQuiz) {
                    if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                    else if (isSelected) btnStyle = 'border-red-500 bg-red-500/20 text-red-300';
                  } else if (isSelected) {
                    btnStyle = 'border-brand-500 bg-brand-600/30 text-white font-bold';
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleOptionSelect(q.id, optIndex)}
                      className={`text-left rounded-lg p-3 text-xs border transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submittedQuiz && (
                <div className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="font-bold text-sky-400">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!submittedQuiz && (
          <button
            onClick={handleQuizSubmit}
            className="w-full rounded-lg bg-brand-600 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-brand-500 transition-all"
          >
            Submit Quiz Answers
          </button>
        )}
      </section>
    </div>
  );
};
