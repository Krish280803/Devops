import { UserProgress } from './types';

const STORAGE_KEY = 'ai_devops_academy_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: ['p0-l1'], // Start with Lesson 1 unlocked/completed
  quizScores: {},
  bookmarkedLessons: [],
  completedProjects: [],
  notes: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

export const getStoredProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
};

export const toggleLessonCompletion = (lessonId: string): UserProgress => {
  const current = getStoredProgress();
  const exists = current.completedLessons.includes(lessonId);
  const updatedLessons = exists
    ? current.completedLessons.filter(id => id !== lessonId)
    : [...current.completedLessons, lessonId];
  
  const updated: UserProgress = {
    ...current,
    completedLessons: updatedLessons
  };
  saveProgress(updated);
  return updated;
};

export const saveQuizScore = (lessonId: string, score: number, total: number): UserProgress => {
  const current = getStoredProgress();
  const percentage = Math.round((score / total) * 100);
  const updated: UserProgress = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [lessonId]: { score, total, percentage }
    }
  };
  saveProgress(updated);
  return updated;
};

export const saveLessonNote = (lessonId: string, noteContent: string): UserProgress => {
  const current = getStoredProgress();
  const updated: UserProgress = {
    ...current,
    notes: {
      ...current.notes,
      [lessonId]: noteContent
    }
  };
  saveProgress(updated);
  return updated;
};
