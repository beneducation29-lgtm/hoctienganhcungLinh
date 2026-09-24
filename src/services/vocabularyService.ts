/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Vocabulary Data Service
 * Provides queries, filtering, search, and curriculum mapping for high school vocabulary
 */

import { VocabularyItem, GradeLevel } from '../types/contentArchitecture';
import { comprehensiveVocabularyList } from '../data/mockVocabularyData';

export interface VocabularyUnitGroup {
  unitId: string;
  grade: GradeLevel;
  unitNumber: number;
  title: string;
  wordCount: number;
  words: VocabularyItem[];
}

class VocabularyService {
  private words = comprehensiveVocabularyList;

  /**
   * Get all vocabulary items
   */
  getAllWords(): typeof comprehensiveVocabularyList {
    return [...this.words];
  }

  /**
   * Find word by ID
   */
  getWordById(id: string) {
    return this.words.find((w) => w.id === id);
  }

  /**
   * Filter words by Grade ('10' | '11' | '12')
   */
  getWordsByGrade(grade: GradeLevel) {
    return this.words.filter((w) => w.grade === grade);
  }

  /**
   * Filter words by Unit ID
   */
  getWordsByUnit(unitId: string) {
    return this.words.filter((w) => w.unitId === unitId);
  }

  /**
   * Filter words by Lesson ID
   */
  getWordsByLesson(lessonId: string) {
    return this.words.filter((w) => w.lessonId === lessonId);
  }

  /**
   * Get structured units with vocabulary
   */
  getUnitsWithVocab(grade?: GradeLevel): VocabularyUnitGroup[] {
    const filtered = grade ? this.words.filter((w) => w.grade === grade) : this.words;
    const unitMap = new Map<string, VocabularyUnitGroup>();

    filtered.forEach((word) => {
      if (!unitMap.has(word.unitId)) {
        const match = word.unitId.match(/unit-(\d+)-(\d+)/);
        const unitNumber = match ? parseInt(match[2], 10) : 1;
        unitMap.set(word.unitId, {
          unitId: word.unitId,
          grade: word.grade,
          unitNumber,
          title: word.unitTitle,
          wordCount: 0,
          words: []
        });
      }
      const group = unitMap.get(word.unitId)!;
      group.wordCount += 1;
      group.words.push(word);
    });

    return Array.from(unitMap.values()).sort((a, b) => {
      if (a.grade !== b.grade) return parseInt(a.grade) - parseInt(b.grade);
      return a.unitNumber - b.unitNumber;
    });
  }

  /**
   * Get recommended vocabulary (curated high-yield core words for high school)
   */
  getRecommendedWords(limit = 6) {
    // Recommend a balanced mix of B1/B2 academic vocabulary
    return this.words.filter((w) => w.cefrLevel === 'B1' || w.cefrLevel === 'B2').slice(0, limit);
  }

  /**
   * Get recent vocabulary (last studied or top of current curriculum)
   */
  getRecentWords(limit = 5) {
    return this.words.slice(0, limit);
  }

  /**
   * Search words with flexible filters
   */
  searchWords(
    query = '',
    filters?: {
      grade?: string;
      unitId?: string;
      difficulty?: string;
      cefrLevel?: string;
      partOfSpeech?: string;
    }
  ) {
    const q = query.trim().toLowerCase();
    return this.words.filter((w) => {
      if (q) {
        const matchesWord = w.word.toLowerCase().includes(q);
        const matchesMeaning = w.meaning.toLowerCase().includes(q) || (w.meaningVi && w.meaningVi.toLowerCase().includes(q));
        const matchesTags = w.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesWord && !matchesMeaning && !matchesTags) return false;
      }

      if (filters?.grade && filters.grade !== 'all' && w.grade !== filters.grade) {
        return false;
      }
      if (filters?.unitId && filters.unitId !== 'all' && w.unitId !== filters.unitId) {
        return false;
      }
      if (filters?.difficulty && filters.difficulty !== 'all' && w.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters?.cefrLevel && filters.cefrLevel !== 'all' && w.cefrLevel !== filters.cefrLevel) {
        return false;
      }
      if (filters?.partOfSpeech && filters.partOfSpeech !== 'all' && w.partOfSpeech !== filters.partOfSpeech) {
        return false;
      }

      return true;
    });
  }
}

export const vocabularyService = new VocabularyService();
