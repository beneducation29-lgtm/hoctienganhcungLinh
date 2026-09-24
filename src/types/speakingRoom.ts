import type { GradeLevel, CEFRLevel, StandardDifficulty } from './contentArchitecture';

export type SpeakingMode = 'guided' | 'free_talk' | 'exam_practice';

export interface SpeakingLevelProfile {
  grade: GradeLevel;
  cefr: CEFRLevel;
  label: string;
  maxNewPhrasesPerTurn: number;
  targetWordsPerTurn: number;
  suggestedSeconds: number;
  vietnameseSupport: 'high' | 'medium' | 'low';
  correctionStyle: 'gentle' | 'balanced' | 'exam_ready';
}

export interface SpeakingScenario {
  id: string;
  grade: GradeLevel;
  title: string;
  titleVi: string;
  topic: string;
  difficulty: StandardDifficulty;
  mode: SpeakingMode;
  prompt: string;
  promptVi: string;
  starter: string;
  usefulPhrases: string[];
  vocabulary: string[];
  followUpQuestions: string[];
}

export interface SpeakingTurn {
  id: string;
  speaker: 'ai' | 'student';
  text: string;
  translation?: string;
  timestamp: string;
  feedback?: SpeakingFeedback;
}

export interface SpeakingFeedback {
  clarity: number;
  vocabulary: number;
  grammar: number;
  fluency: number;
  overall: number;
  praise: string;
  oneFix: string;
  nextStep: string;
  newPhrases: string[];
}

export interface SpeakingSession {
  grade: GradeLevel;
  mode: SpeakingMode;
  scenarioId: string;
  startedAt: string;
  turns: SpeakingTurn[];
  feedbackHistory: SpeakingFeedback[];
}
