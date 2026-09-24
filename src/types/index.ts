export * from './contentArchitecture';

export type Grade = '10' | '11' | '12';

export type SkillType = 'listening' | 'speaking' | 'reading' | 'writing';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Upper Intermediate' | 'Advanced';

export type ActiveTab =
  | 'home'
  | 'curriculum'
  | 'vocabulary'
  | 'grammar'
  | 'review'
  | 'skills'
  | 'aitutor'
  | 'speaking'
  | 'reading'
  | 'listening'
  | 'writing'
  | 'progress';

export type UnitModuleType =
  | 'vocab'
  | 'grammar'
  | 'pronunciation'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'review';

export interface VocabularyWord {
  word: string;
  ipa: string;
  partOfSpeech: string;
  definitionVi: string;
  definitionEn: string;
  exampleSentence: string;
  exampleTranslation: string;
  collocations?: string[];
}

export interface GrammarRule {
  title: string;
  structure: string;
  explanation: string;
  examples: { en: string; vi: string }[];
  commonMistakes: string[];
  practiceTip: string;
}

export interface PronunciationItem {
  sound: string;
  description: string;
  rules: string;
  examples: { word: string; ipa: string; meaning: string }[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Cơ bản' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  skill?: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'mixed';
  unitTag?: string;
}

export interface Lesson {
  id: string;
  title: string;
  unitId: string;
  unitTitle: string;
  grade: Grade;
  moduleType: UnitModuleType;
  textbook: string;
  durationMinutes: number;
  summary: string;
  keyPoints: string[];
  vocabulary?: VocabularyWord[];
  grammar?: GrammarRule;
  pronunciation?: PronunciationItem;
  readingPassage?: {
    title: string;
    text: string;
    wordCount: number;
  };
  listeningAudio?: {
    title: string;
    audioTranscript: string;
    duration: string;
  };
  speakingPrompt?: {
    title: string;
    prompt: string;
    usefulPhrases: string[];
  };
  writingPrompt?: {
    title: string;
    prompt: string;
    modelEssay: string;
    guidelines: string[];
  };
  completed: boolean;
  questions: Question[];
}

export interface EnglishUnit {
  id: string;
  unitNumber: number;
  grade: Grade;
  title: string;
  vietnameseTitle: string;
  theme: string;
  textbook: string;
  durationHours: number;
  progressPercent: number;
  completedModulesCount: number;
  totalModulesCount: number;
  description: string;
  grammarFocus: string;
  vocabularyTopic: string;
  modules: {
    type: UnitModuleType;
    title: string;
    duration: string;
    completed: boolean;
    lessonData: Lesson;
  }[];
}

export interface EnglishGradeCurriculum {
  grade: Grade;
  title: string;
  subtitle: string;
  description: string;
  targetLevel: EnglishLevel;
  unitsCount: number;
  lessonsCount: number;
  progressPercent: number;
  completedUnits: number;
  badge: string;
  keyThemes: string[];
  units: EnglishUnit[];
}

export interface SkillModule {
  id: SkillType;
  title: string;
  vietnameseTitle: string;
  description: string;
  level: SkillLevel;
  cefrLevel: EnglishLevel;
  iconName: string;
  exerciseCount: number;
  averageScore: number;
  currentTopic: string;
  recommendedTime: string;
  practiceSample: {
    title: string;
    description: string;
    audioUrl?: string;
    passage?: string;
    speakingPrompt?: string;
    writingPrompt?: string;
    questions?: Question[];
  };
}

export interface DailyPracticeCard {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  tag: string;
  questionsCount: number;
  type: 'review' | 'quiz' | 'vocab' | 'grammar' | 'reading' | 'listening';
}

export interface StudentProfile {
  name: string;
  school: string;
  currentGrade: Grade;
  avatarUrl: string;
  studyTimeHours: number;
  completedLessons: number;
  averageScore: number;
  streakDays: number;
  englishLevel: EnglishLevel;
  levelProgressPercent: number;
  targetLevel: EnglishLevel;
  skillMastery: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
    vocabulary: number;
    grammar: number;
  };
  strongestSkill: {
    name: string;
    score: number;
    description: string;
  };
  improvementSkill: {
    name: string;
    score: number;
    description: string;
  };
  recentLesson: {
    id: string;
    subject: string;
    title: string;
    grade: Grade;
    unit: string;
    remainingMinutes: number;
    totalMinutes: number;
    completedPercent: number;
    lastAccessed: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'achievement' | 'reminder' | 'curriculum';
}
