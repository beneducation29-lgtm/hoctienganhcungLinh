/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Grammar Progress and Mastery Service
 * Tracks topic mastery levels, practice accuracy, review queues, and localStorage persistence
 */

import { grammarService } from './grammarService';
import { ExtendedGrammarTopic } from '../data/mockGrammarData';

export type GrammarMasteryStatus = 'new' | 'learning' | 'familiar' | 'mastered';

export interface TopicProgressStats {
  topicId: string;
  attempts: number; // total practice sessions
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number; // 0 - 100
  status: GrammarMasteryStatus;
  isMarkedForReview: boolean;
  lastStudiedAt?: string;
}

export interface GrammarOverallStats {
  totalTopics: number;
  mastered: number;
  familiar: number;
  learning: number;
  toReview: number;
  accuracy: number;
}

const STORAGE_KEY = 'thpt_grammar_progress_v2';

class GrammarProgressService {
  private topicStats: Map<string, TopicProgressStats> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Record<string, TopicProgressStats> = JSON.parse(saved);
        Object.entries(parsed).forEach(([k, v]) => {
          this.topicStats.set(k, v);
        });
      } else {
        this.initializeSeedData();
      }
    } catch {
      this.initializeSeedData();
    }
  }

  private initializeSeedData() {
    // Seed sample realistic progress
    this.topicStats.set('grm-10-01', {
      topicId: 'grm-10-01',
      attempts: 3,
      totalQuestions: 15,
      correctAnswers: 14,
      accuracy: 93,
      status: 'mastered',
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 86400000).toISOString()
    });

    this.topicStats.set('grm-11-01', {
      topicId: 'grm-11-01',
      attempts: 2,
      totalQuestions: 10,
      correctAnswers: 8,
      accuracy: 80,
      status: 'familiar',
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 172800000).toISOString()
    });

    this.topicStats.set('grm-11-06', {
      topicId: 'grm-11-06',
      attempts: 2,
      totalQuestions: 10,
      correctAnswers: 9,
      accuracy: 90,
      status: 'mastered',
      isMarkedForReview: false,
      lastStudiedAt: new Date(Date.now() - 43200000).toISOString()
    });

    this.topicStats.set('grm-12-01', {
      topicId: 'grm-12-01',
      attempts: 2,
      totalQuestions: 8,
      correctAnswers: 5,
      accuracy: 62,
      status: 'learning',
      isMarkedForReview: true,
      lastStudiedAt: new Date(Date.now() - 86400000).toISOString()
    });

    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const obj: Record<string, TopicProgressStats> = {};
      this.topicStats.forEach((v, k) => {
        obj[k] = v;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {
      // storage full
    }
  }

  private computeStatus(total: number, correct: number): GrammarMasteryStatus {
    if (total === 0) return 'new';
    const accuracy = Math.round((correct / total) * 100);
    if (accuracy >= 90 && total >= 3) return 'mastered';
    if (accuracy >= 70) return 'familiar';
    return 'learning';
  }

  /**
   * Get overall grammar progress
   */
  getOverallStats(): GrammarOverallStats {
    const allTopics = grammarService.getAllTopics();
    const totalTopics = allTopics.length;

    let mastered = 0;
    let familiar = 0;
    let learning = 0;
    let toReview = 0;
    let totalQ = 0;
    let totalC = 0;

    allTopics.forEach((t) => {
      const stat = this.topicStats.get(t.id);
      if (!stat || stat.totalQuestions === 0) {
        // new
      } else {
        totalQ += stat.totalQuestions;
        totalC += stat.correctAnswers;
        if (stat.status === 'mastered') mastered++;
        else if (stat.status === 'familiar') familiar++;
        else if (stat.status === 'learning') learning++;

        if (stat.isMarkedForReview || stat.accuracy < 70) {
          toReview++;
        }
      }
    });

    const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 82;

    return {
      totalTopics,
      mastered,
      familiar,
      learning,
      toReview,
      accuracy
    };
  }

  /**
   * Get stats for a specific topic
   */
  getTopicStats(topicId: string): TopicProgressStats {
    if (!this.topicStats.has(topicId)) {
      return {
        topicId,
        attempts: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        status: 'new',
        isMarkedForReview: false
      };
    }
    return this.topicStats.get(topicId)!;
  }

  /**
   * Get topic mastery status
   */
  getTopicStatus(topicId: string): GrammarMasteryStatus {
    return this.getTopicStats(topicId).status;
  }

  /**
   * Record practice on a grammar topic (from Quick Check or Quiz Engine)
   */
  recordTopicPractice(topicId: string, correct: number, total: number) {
    const current = this.getTopicStats(topicId);
    current.attempts += 1;
    current.totalQuestions += total;
    current.correctAnswers += correct;
    current.accuracy = current.totalQuestions > 0 ? Math.round((current.correctAnswers / current.totalQuestions) * 100) : 0;
    current.status = this.computeStatus(current.totalQuestions, current.correctAnswers);

    if (current.accuracy < 70) {
      current.isMarkedForReview = true;
    } else if (current.status === 'mastered') {
      current.isMarkedForReview = false;
    }

    current.lastStudiedAt = new Date().toISOString();
    this.topicStats.set(topicId, current);
    this.saveToStorage();
  }

  /**
   * Toggle manual review for a topic
   */
  toggleReview(topicId: string): boolean {
    const current = this.getTopicStats(topicId);
    current.isMarkedForReview = !current.isMarkedForReview;
    this.topicStats.set(topicId, current);
    this.saveToStorage();
    return current.isMarkedForReview;
  }

  /**
   * Get topics that need review (accuracy < 70% or marked)
   */
  getTopicsToReview(): ExtendedGrammarTopic[] {
    const allTopics = grammarService.getAllTopics();
    return allTopics.filter((t) => {
      const stat = this.topicStats.get(t.id);
      if (!stat) return false;
      return stat.isMarkedForReview || (stat.totalQuestions > 0 && stat.accuracy < 70);
    });
  }
}

export const grammarProgressService = new GrammarProgressService();
