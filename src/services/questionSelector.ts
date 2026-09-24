/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Question Selector Service
 * Queries and prepares question sets from the Question Bank.
 */

import { UniversalQuestion } from '../types/quiz';
import { GradeLevel, SkillCategory, StandardDifficulty, CEFRLevel } from '../types/contentArchitecture';
import { comprehensiveQuestionBank } from '../data/mockQuestionBank';\nimport { curriculumExpansionQuestions2026 } from '../data/curriculumExpansion2026';

export class QuestionSelector {
  private bank: UniversalQuestion[] = [...comprehensiveQuestionBank, ...curriculumExpansionQuestions2026.map((q) => ({\n    ...q,\n    type: q.type as UniversalQuestion['type'],\n    correctAnswer: q.correctAnswer\n  }))];

  /**
   * Get all questions in the bank
   */
  public getAllQuestions(): UniversalQuestion[] {
    return [...this.bank];
  }

  /**
   * Get questions for a specific lesson
   */
  public getQuestionsByLesson(lessonId: string): UniversalQuestion[] {
    return this.bank.filter((q) => q.lessonId === lessonId);
  }

  /**
   * Get questions for a specific unit
   */
  public getQuestionsByUnit(unitId: string): UniversalQuestion[] {
    return this.bank.filter((q) => q.unitId === unitId);
  }

  /**
   * Get questions for a specific unit and skill
   */
  public getQuestionsByUnitAndSkill(unitId: string, skill: SkillCategory, count?: number): UniversalQuestion[] {
    const matched = this.bank.filter((q) => q.unitId === unitId && q.skill === skill);
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions for a specific lesson and skill
   */
  public getQuestionsByLessonAndSkill(lessonId: string, skill: SkillCategory, count?: number): UniversalQuestion[] {
    const matched = this.bank.filter((q) => q.lessonId === lessonId && q.skill === skill);
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions targeting a specific vocabulary word or tag
   */
  public getQuestionsForVocabulary(keyword: string, count?: number): UniversalQuestion[] {
    const lower = keyword.toLowerCase();
    const matched = this.bank.filter((q) => {
      if (q.skill !== 'vocabulary') return false;
      const tagMatch = q.tags?.some((t) => t.toLowerCase().includes(lower));
      const textMatch = q.question.toLowerCase().includes(lower) || q.explanation?.toLowerCase().includes(lower);
      return tagMatch || textMatch;
    });
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions targeting a grammar topic or related exercise ID
   */
  public getQuestionsForGrammarTopic(topicKeywordOrExerciseId: string, count?: number): UniversalQuestion[] {
    const lower = topicKeywordOrExerciseId.toLowerCase();
    const matched = this.bank.filter((q) => {
      if (q.skill !== 'grammar') return false;
      if (q.id.toLowerCase() === lower) return true;
      const tagMatch = q.tags?.some((t) => t.toLowerCase().includes(lower));
      const textMatch = q.question.toLowerCase().includes(lower) || q.explanation?.toLowerCase().includes(lower);
      return tagMatch || textMatch;
    });
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions by grade
   */
  public getQuestionsByGrade(grade: GradeLevel): UniversalQuestion[] {
    return this.bank.filter((q) => q.grade === grade);
  }

  /**
   * Get questions filtered by Skill Category
   */
  public getQuestionsBySkill(skill: SkillCategory, count?: number): UniversalQuestion[] {
    const matched = this.bank.filter((q) => q.skill === skill);
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions filtered by Difficulty
   */
  public getQuestionsByDifficulty(difficulty: StandardDifficulty, count?: number): UniversalQuestion[] {
    const matched = this.bank.filter((q) => q.difficulty === difficulty);
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions filtered by CEFR level
   */
  public getQuestionsByCEFR(cefr: CEFRLevel, count?: number): UniversalQuestion[] {
    const matched = this.bank.filter((q) => q.cefrLevel === cefr);
    return count ? matched.slice(0, count) : matched;
  }

  /**
   * Get questions by IDs (used for retrying wrong questions)
   */
  public getQuestionsByIds(questionIds: string[]): UniversalQuestion[] {
    const set = new Set(questionIds);
    return this.bank.filter((q) => set.has(q.id));
  }

  /**
   * Get a mixed representative set of questions across skills for Daily Challenge or Exam Practice
   */
  public getMixedQuestions(count: number = 10, grade?: GradeLevel): UniversalQuestion[] {
    let pool = grade ? this.bank.filter((q) => q.grade === grade) : this.bank;
    if (pool.length === 0) pool = this.bank;

    // Pick a balanced distribution: vocab, grammar, reading, listening, mixed
    const skills: SkillCategory[] = ['vocabulary', 'grammar', 'reading', 'listening', 'mixed'];
    const perSkill = Math.max(1, Math.floor(count / skills.length));
    const selected: UniversalQuestion[] = [];

    skills.forEach((s) => {
      const filtered = pool.filter((q) => q.skill === s);
      const slice = filtered.slice(0, perSkill);
      selected.push(...slice);
    });

    // If still need more to reach count, fill from remaining
    if (selected.length < count) {
      const remaining = pool.filter((q) => !selected.some((sel) => sel.id === q.id));
      selected.push(...remaining.slice(0, count - selected.length));
    }

    return selected.slice(0, count);
  }

  /**
   * Safe Randomization:
   * Shuffles question order.
   * If shuffleOptions is true for multiple choice, tracks and re-maps correctAnswer index safely!
   */
  public getRandomizedQuestions(
    questions: UniversalQuestion[],
    shuffleOptions: boolean = false
  ): UniversalQuestion[] {
    // 1. Shuffle question array
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    if (!shuffleOptions) {
      return shuffledQuestions;
    }

    // 2. Safely shuffle multiple choice options
    return shuffledQuestions.map((q) => {
      if (q.type !== 'multiple_choice' || !q.options || typeof q.correctAnswer !== 'number') {
        return q;
      }

      const originalCorrectOptionText = q.options[q.correctAnswer];
      // Shuffle options
      const randomizedOptions = [...q.options].sort(() => Math.random() - 0.5);
      // Find new index of original correct option
      const newCorrectIndex = randomizedOptions.findIndex((opt) => opt === originalCorrectOptionText);

      return {
        ...q,
        options: randomizedOptions,
        correctAnswer: newCorrectIndex >= 0 ? newCorrectIndex : q.correctAnswer
      };
    });
  }
}

export const questionSelector = new QuestionSelector();
