/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Grammar Data Service
 * Provides queries, filtering, search, and curriculum mapping for high school grammar topics
 */

import { GradeLevel } from '../types/contentArchitecture';
import { comprehensiveGrammarList, ExtendedGrammarTopic } from '../data/mockGrammarData';

class GrammarService {
  private topics = comprehensiveGrammarList;

  /**
   * Get all grammar topics
   */
  getAllTopics(): ExtendedGrammarTopic[] {
    return [...this.topics];
  }

  /**
   * Find topic by ID
   */
  getTopicById(id: string): ExtendedGrammarTopic | undefined {
    return this.topics.find((t) => t.id === id);
  }

  /**
   * Filter topics by Grade ('10' | '11' | '12')
   */
  getTopicsByGrade(grade: GradeLevel): ExtendedGrammarTopic[] {
    return this.topics.filter((t) => t.grade === grade);
  }

  /**
   * Filter topics by Unit ID
   */
  getTopicsByUnit(unitId: string): ExtendedGrammarTopic[] {
    return this.topics.filter((t) => t.unitId === unitId);
  }

  /**
   * Filter topic by Lesson ID
   */
  getTopicByLesson(lessonId: string): ExtendedGrammarTopic | undefined {
    return this.topics.find((t) => t.lessonId === lessonId);
  }

  /**
   * Get recommended grammar topics (high-impact topics for exams)
   */
  getRecommendedTopics(limit = 4): ExtendedGrammarTopic[] {
    // Return high-yield topics like Inversion, Reduced Relative Clauses, Conditionals, and Present Perfect
    return this.topics.filter((t) => t.difficulty === 'hard' || t.difficulty === 'medium').slice(0, limit);
  }

  /**
   * Search grammar topics
   */
  searchTopics(
    query = '',
    filters?: {
      grade?: string;
      unitId?: string;
      difficulty?: string;
      cefrLevel?: string;
    }
  ): ExtendedGrammarTopic[] {
    const q = query.trim().toLowerCase();
    return this.topics.filter((t) => {
      if (q) {
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesDesc = t.shortDescription.toLowerCase().includes(q) || t.explanation.toLowerCase().includes(q);
        const matchesStructure = t.structure.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesStructure) return false;
      }

      if (filters?.grade && filters.grade !== 'all' && t.grade !== filters.grade) {
        return false;
      }
      if (filters?.unitId && filters.unitId !== 'all' && t.unitId !== filters.unitId) {
        return false;
      }
      if (filters?.difficulty && filters.difficulty !== 'all' && t.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters?.cefrLevel && filters.cefrLevel !== 'all' && !t.level.toLowerCase().includes(filters.cefrLevel.toLowerCase())) {
        return false;
      }

      return true;
    });
  }
}

export const grammarService = new GrammarService();
