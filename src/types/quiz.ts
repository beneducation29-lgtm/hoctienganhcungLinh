/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Universal Quiz Engine & Question Bank Types
 */

import { GradeLevel, CEFRLevel, StandardDifficulty, SkillCategory } from './contentArchitecture';

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'ordering'
  | 'short_answer'
  | 'reading_comprehension'
  | 'listening_comprehension';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface OrderingItem {
  id: string;
  text: string;
  correctIndex: number;
}

export interface UniversalQuestion {
  id: string;
  grade: GradeLevel;
  unitId?: string;
  lessonId?: string;
  skill: SkillCategory;
  type: QuestionType;
  difficulty: StandardDifficulty;
  cefrLevel: CEFRLevel;
  question: string;
  instruction?: string;
  options?: string[]; // for multiple choice & true/false
  correctAnswer: number | string | boolean; // index, string value, or boolean
  acceptableAnswers?: string[]; // for fill_blank & short_answer
  matchingPairs?: MatchingPair[]; // for matching questions
  orderingItems?: OrderingItem[]; // for sentence/word ordering
  passage?: string; // for reading comprehension
  audioUrl?: string; // for listening comprehension
  audioTranscript?: string;
  explanation: string;
  hint?: string;
  tags: string[];
  points?: number; // defaults to 1 point
}

export type QuizMode =
  | 'practice' // Shows immediate feedback & check answer button
  | 'exam' // Strict exam mode; no answers shown until submission
  | 'unit_review' // Review for a specific unit
  | 'daily_challenge' // Daily mixed 5-10 question challenge
  | 'skill_practice' // Focus on a specific skill (e.g. Listening only)
  | 'wrong_answers_retry'; // Retrying previously missed questions

export interface UserAnswerRecord {
  questionId: string;
  selectedAnswer: any; // index, string, array of ids, etc.
  isCorrect: boolean;
  answeredAt: string;
  timeSpentSeconds?: number;
}

export interface QuizSession {
  id: string;
  studentId: string;
  quizId: string;
  quizTitle: string;
  quizSubtitle?: string;
  quizMode: QuizMode;
  skill?: SkillCategory;
  questions: UniversalQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, UserAnswerRecord>;
  startedAt: string;
  submittedAt?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number; // 0 - 100 percentage
  pointsEarned?: number;
  totalPoints?: number;
  accuracy?: number; // 0 - 100 percentage
  timeSpentSeconds: number;
  timeLimitMinutes?: number; // optional timer in minutes
}

export interface SkillScoreBreakdown {
  skill: SkillCategory;
  skillName: string;
  totalQuestions: number;
  correctQuestions: number;
  percentage: number;
}

export interface DifficultyScoreBreakdown {
  difficulty: StandardDifficulty;
  totalQuestions: number;
  correctQuestions: number;
  percentage: number;
}

export interface QuizResult {
  sessionId: string;
  quizTitle: string;
  quizMode: QuizMode;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  scorePercentage: number;
  accuracyPercentage: number;
  pointsEarned: number;
  totalPoints: number;
  timeSpentSeconds: number;
  timeSpentFormatted: string;
  skillBreakdown: SkillScoreBreakdown[];
  difficultyBreakdown: DifficultyScoreBreakdown[];
  answers: Record<string, UserAnswerRecord>;
  questions: UniversalQuestion[];
  wrongQuestions: UniversalQuestion[];
  passed: boolean;
}

export interface WrongAnswerItem {
  id: string;
  question: UniversalQuestion;
  userAnswer: any;
  userAnswerFormatted: string;
  correctAnswerFormatted: string;
  isCorrect: boolean;
  answeredAt: string;
  quizTitle: string;
}
