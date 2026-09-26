'use client';

import React, { useState, useEffect } from 'react';
import { CURRICULUM_PHASES } from '@/lib/curriculumData';
import { Sidebar } from '@/components/Sidebar';
import { LessonViewer } from '@/components/LessonViewer';
import { AiTutorDrawer } from '@/components/AiTutorDrawer';
import { getStoredProgress, toggleLessonCompletion } from '@/lib/storage';
import { Lesson } from '@/lib/types';

export default function LearnPage() {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(CURRICULUM_PHASES[0].modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    const prog = getStoredProgress();
    setCompletedLessons(prog.completedLessons);
  }, []);

  const handleToggleComplete = (lessonId: string) => {
    const updated = toggleLessonCompletion(lessonId);
    setCompletedLessons(updated.completedLessons);
  };

  const handleOpenAi = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAiOpen(true);
  };

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
      {/* Sidebar Navigation */}
      <Sidebar
        phases={CURRICULUM_PHASES}
        currentLessonId={currentLesson.id}
        onSelectLesson={(lesson) => setCurrentLesson(lesson)}
        completedLessons={completedLessons}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-devops-dark">
        <LessonViewer
          lesson={currentLesson}
          isCompleted={completedLessons.includes(currentLesson.id)}
          onToggleComplete={handleToggleComplete}
          onOpenAiTutor={handleOpenAi}
        />
      </div>

      {/* AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiPrompt}
      />
    </div>
  );
}
