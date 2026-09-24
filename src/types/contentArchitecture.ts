/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Content Architecture Core Data Models for Vietnam High School English Learning Platform
 */

export type GradeLevel = '10' | '11' | '12';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type StandardDifficulty = 'easy' | 'medium' | 'hard';

export type SkillCategory =
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'mixed';

export type LessonType =
  | 'Vocabulary'
  | 'Grammar'
  | 'Reading'
  | 'Listening'
  | 'Speaking'
  | 'Writing'
  | 'Mixed';

export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export type SectionType =
  | 'introduction'
  | 'vocabulary'
  | 'grammar'
  | 'pronunciation'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'review';

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'ordering'
  | 'short_answer';

// 1. CURRICULUM MODEL
export interface Curriculum {
  id: string;
  name: string;
  description: string;
  publisher: string;
  version: string;
  grades: string[]; // grade IDs
}

// 2. TEXTBOOK MODEL
export interface Textbook {
  id: string;
  curriculumId: string;
  name: string;
  grade: GradeLevel;
  description: string;
  publisher: string;
  units: string[]; // unit IDs
}

// 3. GRADE MODEL
export interface GradeModel {
  id: string; // e.g. "grade-10"
  gradeNumber: GradeLevel;
  name: string;
  description: string;
  targetCefr: CEFRLevel;
  textbooks: string[]; // textbook IDs
  units: string[]; // unit IDs
  progress: number; // 0-100%
  completedUnitsCount: number;
  totalUnitsCount: number;
}

// 4. UNIT MODEL
export interface UnitModel {
  id: string; // e.g. "unit-10-1"
  gradeId: string;
  gradeNumber: GradeLevel;
  textbookId: string;
  textbookName: string;
  number: number;
  title: string;
  vietnameseTitle: string;
  description: string;
  topic: string;
  theme: string;
  learningObjectives: string[];
  lessons: string[]; // lesson IDs
  progress: number; // 0-100%
  grammarFocus: string;
  vocabularyTopic: string;
  durationHours: number;
}

// 5. LESSON MODEL
export interface LessonModel {
  id: string;
  unitId: string;
  gradeNumber: GradeLevel;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  type: LessonType;
  sections: LessonSection[];
  difficulty: StandardDifficulty;
  cefrLevel: CEFRLevel;
  status: LessonStatus;
}

// 6. LESSON SECTION MODEL
export interface LessonSection {
  id: string;
  lessonId: string;
  type: SectionType;
  title: string;
  content: string;
  order: number;
  exercises?: string[]; // IDs of exercises or questions
  vocabularyItems?: VocabularyItem[];
  grammarTopic?: GrammarTopic;
  readingExercise?: ReadingExercise;
  listeningExercise?: ListeningExercise;
  speakingExercise?: SpeakingExercise;
  writingExercise?: WritingExercise;
  reviewSet?: ReviewSet;
}

// 7. VOCABULARY ITEM MODEL
export interface VocabularyItem {
  id: string;
  lessonId: string;
  unitId?: string;
  word: string;
  ipa: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'phrase' | 'conjunction';
  meaning: string;
  meaningVi: string;
  example: string;
  translation: string;
  audioUrl?: string;
  difficulty: StandardDifficulty;
  cefrLevel: CEFRLevel;
  tags: string[];
  collocations?: string[];
}

// 8. GRAMMAR TOPIC MODEL
export interface GrammarTopic {
  id: string;
  lessonId: string;
  title: string;
  structure: string;
  explanation: string;
  rules: {
    ruleTitle: string;
    description: string;
    pattern?: string;
  }[];
  examples: {
    en: string;
    vi: string;
    note?: string;
  }[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    reason: string;
  }[];
  relatedExercises: string[]; // question IDs
}

// 9. READING EXERCISE MODEL
export interface ReadingExercise {
  id: string;
  lessonId: string;
  title: string;
  level: CEFRLevel;
  difficulty: StandardDifficulty;
  estimatedTime: number; // in minutes
  wordCount: number;
  passage: string;
  questions: QuestionBankItem[];
  vocabulary: string[]; // vocabulary words featured in text
  skills: ('skimming' | 'scanning' | 'inference' | 'reference' | 'main_idea')[];
}

// 10. LISTENING EXERCISE MODEL
export interface ListeningExercise {
  id: string;
  lessonId: string;
  title: string;
  level: CEFRLevel;
  difficulty: StandardDifficulty;
  duration: number; // in seconds
  audioUrl: string; // placeholder audio or TTS compatible
  audioTranscript: string;
  questions: QuestionBankItem[];
  speakers: string[];
}

// 11. SPEAKING EXERCISE MODEL
export interface SpeakingExercise {
  id: string;
  lessonId: string;
  title: string;
  level: CEFRLevel;
  difficulty: StandardDifficulty;
  prompt: string;
  instructions: string;
  sampleAnswer: string;
  duration: number; // suggested speaking time in seconds (e.g. 90)
  preparationTime: number; // in seconds (e.g. 60)
  usefulPhrases: string[];
  evaluationCriteria: {
    criterion: string;
    weight: number;
    description: string;
  }[];
}

// 12. WRITING EXERCISE MODEL
export interface WritingExercise {
  id: string;
  lessonId: string;
  title: string;
  level: CEFRLevel;
  difficulty: StandardDifficulty;
  prompt: string;
  instructions: string;
  minimumWords: number;
  maximumWords: number;
  example: string;
  guidelines: string[];
  evaluationCriteria: {
    criterion: string;
    weight: number;
    description: string;
  }[];
}

// 13. QUESTION BANK ITEM MODEL
export interface QuestionBankItem {
  id: string;
  lessonId?: string;
  unitId?: string;
  grade: GradeLevel;
  skill: SkillCategory;
  type: QuestionType;
  difficulty: StandardDifficulty;
  cefrLevel: CEFRLevel;
  question: string;
  options: string[];
  correctAnswer: number | string; // index 0-3 for multiple choice, or boolean/string
  explanation: string;
  hint?: string;
  tags: string[];
}

// 14. REVIEW SYSTEM MODEL
export interface ReviewSet {
  id: string;
  title: string;
  subtitle?: string;
  grade: GradeLevel;
  unitId?: string;
  lessonId?: string;
  skills: SkillCategory[];
  questions: QuestionBankItem[];
  estimatedTime: number; // in minutes
  difficulty: StandardDifficulty;
  questionCount: number;
}

// 15. STUDENT PROGRESS TRACKING MODEL
export interface StudentProgress {
  studentId: string;
  grade: GradeLevel;
  unitId: string;
  lessonId: string;
  skill: SkillCategory;
  status: LessonStatus;
  progress: number; // 0-100%
  score?: number; // 0-10
  accuracy?: number; // 0-100%
  lastStudiedAt: string;
  completedAt?: string;
}

export interface SkillBreakdownProgress {
  vocabulary: number;
  grammar: number;
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
  overall: number;
}

// 16. LEARNING HISTORY / ACTIVITY MODEL
export interface LearningActivity {
  id: string;
  studentId: string;
  type:
    | 'lesson_completed'
    | 'quiz_completed'
    | 'practice_completed'
    | 'vocabulary_reviewed'
    | 'writing_submitted'
    | 'speaking_submitted';
  contentId: string;
  contentTitle: string;
  skill: SkillCategory;
  score?: number;
  durationMinutes: number;
  createdAt: string;
}

// 17. RULE-BASED RECOMMENDATION MODEL
export interface Recommendation {
  id: string;
  studentId: string;
  type: 'practice' | 'review' | 'continue_lesson' | 'skill_upgrade';
  title: string;
  description: string;
  reason: string;
  targetId: string; // target lessonId, unitId, or reviewSetId
  targetType: 'lesson' | 'unit' | 'review_set' | 'skill';
  priority: 'high' | 'medium' | 'low';
  skill: SkillCategory;
  estimatedMinutes: number;
}
