/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Vocabulary Progress and Mastery Service
 * Manages mastery levels, practice stats, review queues, and localStorage persistence
 */

import { vocabularyService } from './vocabularyService';

export type VocabularyMasteryStatus = 'new' | 'learning' | 'familiar' | 'mastered';

export interface WordPracticeStats {
  wordId: string;
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number; // 0 - 100
  status: VocabularyMasteryStatus;
  viewCount: number;
  isMarkedForReview: boolean;
  lastStudiedAt?: string;
}

export interface VocabularySessionSummary {
  sessionId: string;
  type: 'learning' | 'practice' | 'review';
  wordsViewed: number;
  wordsPracticed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  completedAt: string;
  wordIds: string[];
}

export interface VocabularyOverallStats {
  totalWords: number;
  learned: number; // familiar + mastered
  learning: number;
  toReview: number;
  mastered: number;
  accuracy: number;
  streak: number;
}

const STORAGE_KEY = 'thpt_vocab_progress_v2';
const SESSIONS_STORAGE_KEY = 'thpt_vocab_sessions_v2';

class VocabularyProgressService {
  private wordStats: Map<string, WordPracticeStats> = new Map();
  private sessionHistory: VocabularySessionSummary[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Record<string, WordPracticeStats> = JSON.parse(saved);
        Object.entries(parsed).forEach(([key, val]) => {
          this.wordStats.set(key, val);
        });
      } else {
        // Initialize default seed stats for demonstration
        this.initializeSeedData();
      }

      const sessionsSaved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (sessionsSaved) {
        this.sessionHistory = JSON.parse(sessionsSaved);
      }
    } catch {
      this.initializeSeedData();
    }
  }

  private initializeSeedData() {
    // Seed some progress for realistic student experience:
    // voc-10-01 (breadwinner): mastered
    this.wordStats.set('voc-10-01', {
      wordId: 'voc-10-01',
      attempts: 4,
      correct: 4,
      incorrect: 0,
      accuracy: 100,
      status: 'mastered',
      viewCount: 3,
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 86400000).toISOString()
    });
    // voc-10-02 (homemaker): familiar
    this.wordStats.set('voc-10-02', {
      wordId: 'voc-10-02',
      attempts: 3,
      correct: 2,
      incorrect: 1,
      accuracy: 67,
      status: 'learning',
      viewCount: 2,
      isMarkedForReview: true,
      lastStudiedAt: new Date(Date.now() - 172800000).toISOString()
    });
    // voc-11-04 (intangible): mastered
    this.wordStats.set('voc-11-04', {
      wordId: 'voc-11-04',
      attempts: 3,
      correct: 3,
      incorrect: 0,
      accuracy: 100,
      status: 'mastered',
      viewCount: 4,
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 43200000).toISOString()
    });
    // voc-11-05 (safeguard): familiar
    this.wordStats.set('voc-11-05', {
      wordId: 'voc-11-05',
      attempts: 2,
      correct: 2,
      incorrect: 0,
      accuracy: 100,
      status: 'familiar',
      viewCount: 2,
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 86400000).toISOString()
    });
    // voc-12-01 (visionary): familiar
    this.wordStats.set('voc-12-01', {
      wordId: 'voc-12-01',
      attempts: 2,
      correct: 2,
      incorrect: 0,
      accuracy: 100,
      status: 'familiar',
      viewCount: 2,
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 86400000).toISOString()
    });
    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const obj: Record<string, WordPracticeStats> = {};
      this.wordStats.forEach((v, k) => {
        obj[k] = v;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(this.sessionHistory.slice(-50)));
    } catch {
      // storage full or disabled
    }
  }

  private computeStatus(attempts: number, correct: number): VocabularyMasteryStatus {
    if (attempts === 0) return 'new';
    const accuracy = Math.round((correct / attempts) * 100);
    if (accuracy >= 90 && attempts >= 2) return 'mastered';
    if (accuracy >= 70) return 'familiar';
    return 'learning';
  }

  /**
   * Get overall vocabulary stats
   */
  getOverallStats(): VocabularyOverallStats {
    const allWords = vocabularyService.getAllWords();
    const totalWords = allWords.length;

    let mastered = 0;
    let familiar = 0;
    let learning = 0;
    let toReview = 0;
    let totalAttempts = 0;
    let totalCorrect = 0;

    allWords.forEach((w) => {
      const stat = this.wordStats.get(w.id);
      if (!stat || stat.attempts === 0) {
        // new
      } else {
        totalAttempts += stat.attempts;
        totalCorrect += stat.correct;
        if (stat.status === 'mastered') mastered++;
        else if (stat.status === 'familiar') familiar++;
        else if (stat.status === 'learning') learning++;

        if (stat.isMarkedForReview || stat.accuracy < 70) {
          toReview++;
        }
      }
    });

    const learned = mastered + familiar;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 85;

    return {
      totalWords,
      learned,
      learning,
      toReview,
      mastered,
      accuracy,
      streak: 7 // default dynamic streak
    };
  }

  /**
   * Get single word stats
   */
  getWordStats(wordId: string): WordPracticeStats {
    if (!this.wordStats.has(wordId)) {
      return {
        wordId,
        attempts: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        status: 'new',
        viewCount: 0,
        isMarkedForReview: false
      };
    }
    return this.wordStats.get(wordId)!;
  }

  /**
   * Get mastery status of a word
   */
  getWordStatus(wordId: string): VocabularyMasteryStatus {
    return this.getWordStats(wordId).status;
  }

  /**
   * Increment view count when user studies flashcard or detail
   * (Does NOT mark as mastered or learned by opening card alone)
   */
  recordWordViewed(wordId: string) {
    const current = this.getWordStats(wordId);
    current.viewCount += 1;
    current.lastStudiedAt = new Date().toISOString();
    this.wordStats.set(wordId, current);
    this.saveToStorage();
  }

  /**
   * Record practice attempt on a word
   */
  recordWordPractice(wordId: string, isCorrect: boolean) {
    const current = this.getWordStats(wordId);
    current.attempts += 1;
    if (isCorrect) {
      current.correct += 1;
    } else {
      current.incorrect += 1;
      current.isMarkedForReview = true; // Auto mark for review if failed
    }
    current.accuracy = Math.round((current.correct / current.attempts) * 100);
    current.status = this.computeStatus(current.attempts, current.correct);
    if (current.status === 'mastered') {
      current.isMarkedForReview = false; // Resolved review
    }
    current.lastStudiedAt = new Date().toISOString();
    this.wordStats.set(wordId, current);
    this.saveToStorage();
  }

  /**
   * Mark learning session as complete (promotes newly completed flashcard session words from 'new' to 'learning')
   */
  completeLearningSession(wordIds: string[]) {
    wordIds.forEach((id) => {
      const current = this.getWordStats(id);
      current.viewCount += 1;
      if (current.status === 'new') {
        current.status = 'learning';
      }
      current.lastStudiedAt = new Date().toISOString();
      this.wordStats.set(id, current);
    });

    const session: VocabularySessionSummary = {
      sessionId: `sess-learn-${Date.now()}`,
      type: 'learning',
      wordsViewed: wordIds.length,
      wordsPracticed: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 100,
      completedAt: new Date().toISOString(),
      wordIds
    };
    this.sessionHistory.push(session);
    this.saveToStorage();
  }

  /**
   * Record practice session completion from unified Quiz Engine
   */
  recordPracticeSession(summary: {
    wordsPracticed: number;
    correctAnswers: number;
    incorrectAnswers: number;
    accuracy: number;
    wordIds: string[];
  }) {
    const session: VocabularySessionSummary = {
      sessionId: `sess-prac-${Date.now()}`,
      type: 'practice',
      wordsViewed: summary.wordsPracticed,
      wordsPracticed: summary.wordsPracticed,
      correctAnswers: summary.correctAnswers,
      incorrectAnswers: summary.incorrectAnswers,
      accuracy: summary.accuracy,
      completedAt: new Date().toISOString(),
      wordIds: summary.wordIds
    };
    this.sessionHistory.push(session);
    this.saveToStorage();
  }

  /**
   * Toggle manual review bookmark
   */
  toggleReview(wordId: string): boolean {
    const current = this.getWordStats(wordId);
    current.isMarkedForReview = !current.isMarkedForReview;
    this.wordStats.set(wordId, current);
    this.saveToStorage();
    return current.isMarkedForReview;
  }

  /**
   * Check if word is in review
   */
  isWordInReview(wordId: string): boolean {
    return this.getWordStats(wordId).isMarkedForReview;
  }

  /**
   * Get all words needing review
   * (accuracy < 70%, marked for review, or answered incorrectly in recent session)
   */
  getWordsToReview() {
    const allWords = vocabularyService.getAllWords();
    return allWords.filter((w) => {
      const stat = this.wordStats.get(w.id);
      if (!stat) return false;
      return stat.isMarkedForReview || (stat.attempts > 0 && stat.accuracy < 70);
    });
  }

  /**
   * Get recent session history
   */
  getSessionHistory() {
    return [...this.sessionHistory];
  }
}

export const vocabularyProgressService = new VocabularyProgressService();
