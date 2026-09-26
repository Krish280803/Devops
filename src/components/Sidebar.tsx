import React from 'react';
import { Phase, Lesson } from '@/lib/types';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

interface SidebarProps {
  phases: Phase[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessons: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  phases,
  currentLessonId,
  onSelectLesson,
  completedLessons,
}) => {
  return (
    <aside className="w-80 shrink-0 border-r border-devops-border bg-devops-dark/60 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Curriculum Roadmap</h2>
        <p className="text-xs text-slate-400 mt-1">15 Phases • Zero to DevOps Architect</p>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => (
          <div key={phase.id} className="rounded-lg border border-devops-border/70 bg-devops-card/40 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400">{phase.title}</span>
              <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300 border border-sky-500/20">
                {phase.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 line-clamp-1">{phase.subtitle}</p>

            <div className="space-y-1">
              {phase.modules.flatMap((m) => m.lessons).map((lesson) => {
                const isSelected = lesson.id === currentLessonId;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-brand-600 font-semibold text-white shadow'
                        : 'text-slate-300 hover:bg-devops-card hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isCompleted ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <ChevronRight className={`h-3 w-3 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
