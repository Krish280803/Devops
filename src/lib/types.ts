export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  concept: string;
  whyItMatters: string;
  analogy: string;
  architectureDiagram?: string;
  keyPrinciples: string[];
  commandExamples: { command: string; explanation: string }[];
  codeSnippet?: { language: string; code: string; filename?: string };
  commonMistakes: string[];
  troubleshooting: { issue: string; fix: string }[];
  interviewQuestions: { question: string; answer: string; level: 'Beginner' | 'Intermediate' | 'Advanced' }[];
  quiz: QuizQuestion[];
  practicalExercise: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Phase {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
  modules: Module[];
}

export interface CheatSheetItem {
  command: string;
  purpose: string;
  example: string;
  category: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  description: string;
  items: CheatSheetItem[];
}

export interface Project {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Capstone';
  description: string;
  architecture: string;
  prerequisites: string[];
  tasks: string[];
  starterCode?: { filename: string; code: string; language: string }[];
  expectedResult: string;
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  quizScores: Record<string, { score: number; total: number; percentage: number }>;
  bookmarkedLessons: string[];
  completedProjects: string[];
  notes: Record<string, string>; // lessonId -> markdown note content
  streakDays: number;
  lastActiveDate: string;
}
