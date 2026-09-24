/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Scoring Service for Quiz Engine
 * Pure evaluation and analytics logic separated from UI.
 */

import {
  UniversalQuestion,
  UserAnswerRecord,
  QuizResult,
  SkillScoreBreakdown,
  DifficultyScoreBreakdown,
  QuizMode
} from '../types/quiz';
import { SkillCategory, StandardDifficulty } from '../types/contentArchitecture';

export class ScoringService {
  /**
   * Check if a single answer is correct based on question type and answer value
   */
  public evaluateAnswer(question: UniversalQuestion, userAnswer: any): boolean {
    if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
      return false;
    }

    switch (question.type) {
      case 'multiple_choice':
      case 'true_false':
      case 'reading_comprehension':
      case 'listening_comprehension': {
        // Numeric index or direct string equality
        if (typeof question.correctAnswer === 'number') {
          return Number(userAnswer) === question.correctAnswer;
        }
        if (typeof question.correctAnswer === 'boolean') {
          return Boolean(userAnswer) === question.correctAnswer;
        }
        return String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      }

      case 'fill_blank':
      case 'short_answer': {
        const cleanedUser = String(userAnswer).trim().toLowerCase();
        const cleanedCorrect = String(question.correctAnswer).trim().toLowerCase();

        if (cleanedUser === cleanedCorrect) return true;

        if (question.acceptableAnswers && question.acceptableAnswers.length > 0) {
          return question.acceptableAnswers.some(
            (acc) => acc.trim().toLowerCase() === cleanedUser
          );
        }
        return false;
      }

      case 'matching': {
        // userAnswer is expected to be a map of { [pairId]: rightId } or array of correctly matched pair IDs
        if (Array.isArray(userAnswer)) {
          // If array of matched pair IDs
          return (
            question.matchingPairs !== undefined &&
            userAnswer.length === question.matchingPairs.length &&
            userAnswer.every((id) => question.matchingPairs?.some((p) => p.id === id))
          );
        }
        if (typeof userAnswer === 'object' && userAnswer !== null) {
          if (!question.matchingPairs) return false;
          return question.matchingPairs.every((pair) => userAnswer[pair.id] === pair.right);
        }
        return false;
      }

      case 'ordering': {
        // userAnswer is expected to be an array of ordered item IDs
        if (Array.isArray(userAnswer) && question.orderingItems) {
          if (userAnswer.length !== question.orderingItems.length) return false;
          // Sort items by correct index and compare IDs
          const sortedExpected = [...question.orderingItems]
            .sort((a, b) => a.correctIndex - b.correctIndex)
            .map((item) => item.id);
          return userAnswer.every((id, idx) => id === sortedExpected[idx]);
        }
        return false;
      }

      default:
        return String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
    }
  }

  /**
   * Calculate complete QuizResult summary from questions and answer map
   */
  public calculateResult(
    sessionId: string,
    quizTitle: string,
    quizMode: QuizMode,
    questions: UniversalQuestion[],
    answers: Record<string, UserAnswerRecord>,
    timeSpentSeconds: number
  ): QuizResult {
    const totalQuestions = questions.length;
    let correctQuestions = 0;
    let pointsEarned = 0;
    let totalPoints = 0;

    const wrongQuestions: UniversalQuestion[] = [];

    // Map by Skill
    const skillStats: Record<
      SkillCategory,
      { total: number; correct: number }
    > = {
      vocabulary: { total: 0, correct: 0 },
      grammar: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
      listening: { total: 0, correct: 0 },
      speaking: { total: 0, correct: 0 },
      writing: { total: 0, correct: 0 },
      mixed: { total: 0, correct: 0 }
    };

    // Map by Difficulty
    const diffStats: Record<
      StandardDifficulty,
      { total: number; correct: number }
    > = {
      easy: { total: 0, correct: 0 },
      medium: { total: 0, correct: 0 },
      hard: { total: 0, correct: 0 }
    };

    questions.forEach((q) => {
      const qPoints = q.points || 1;
      totalPoints += qPoints;

      const record = answers[q.id];
      const isCorrect = record ? record.isCorrect : false;

      // Update skill counts
      if (skillStats[q.skill]) {
        skillStats[q.skill].total += 1;
        if (isCorrect) skillStats[q.skill].correct += 1;
      }

      // Update diff counts
      if (diffStats[q.difficulty]) {
        diffStats[q.difficulty].total += 1;
        if (isCorrect) diffStats[q.difficulty].correct += 1;
      }

      if (isCorrect) {
        correctQuestions += 1;
        pointsEarned += qPoints;
      } else {
        wrongQuestions.push(q);
      }
    });

    const answeredQuestions = Object.keys(answers).length;
    const incorrectQuestions = totalQuestions - correctQuestions;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    const accuracyPercentage = answeredQuestions > 0 ? Math.round((correctQuestions / answeredQuestions) * 100) : 0;

    // Build skill breakdown array
    const skillNameMap: Record<SkillCategory, string> = {
      vocabulary: 'Từ vựng (Vocabulary)',
      grammar: 'Ngữ pháp (Grammar)',
      reading: 'Đọc hiểu (Reading)',
      listening: 'Nghe hiểu (Listening)',
      speaking: 'Nói (Speaking)',
      writing: 'Viết (Writing)',
      mixed: 'Tổng hợp (Mixed)'
    };

    const skillBreakdown: SkillScoreBreakdown[] = Object.keys(skillStats)
      .filter((skillKey) => skillStats[skillKey as SkillCategory].total > 0)
      .map((skillKey) => {
        const s = skillStats[skillKey as SkillCategory];
        return {
          skill: skillKey as SkillCategory,
          skillName: skillNameMap[skillKey as SkillCategory] || skillKey,
          totalQuestions: s.total,
          correctQuestions: s.correct,
          percentage: Math.round((s.correct / s.total) * 100)
        };
      });

    // Build difficulty breakdown array
    const difficultyBreakdown: DifficultyScoreBreakdown[] = (['easy', 'medium', 'hard'] as StandardDifficulty[])
      .filter((diff) => diffStats[diff].total > 0)
      .map((diff) => {
        const d = diffStats[diff];
        return {
          difficulty: diff,
          totalQuestions: d.total,
          correctQuestions: d.correct,
          percentage: Math.round((d.correct / d.total) * 100)
        };
      });

    // Format time spent: "03m 45s"
    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const timeSpentFormatted = `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;

    return {
      sessionId,
      quizTitle,
      quizMode,
      totalQuestions,
      answeredQuestions,
      correctQuestions,
      incorrectQuestions,
      scorePercentage,
      accuracyPercentage,
      pointsEarned,
      totalPoints,
      timeSpentSeconds,
      timeSpentFormatted,
      skillBreakdown,
      difficultyBreakdown,
      answers,
      questions,
      wrongQuestions,
      passed: scorePercentage >= 60
    };
  }
}

export const scoringService = new ScoringService();
