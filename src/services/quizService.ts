/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Central Quiz Engine Service
 * Manages active quiz sessions, question answering state, submission, results,
 * and wrong answers repository.
 */

import {
  UniversalQuestion,
  QuizSession,
  QuizResult,
  UserAnswerRecord,
  QuizMode,
  WrongAnswerItem
} from '../types/quiz';
import { SkillCategory } from '../types/contentArchitecture';
import { scoringService } from './scoringService';
import { questionSelector } from './questionSelector';
import { contentService } from './contentService';
import { vocabularyProgressService } from './vocabularyProgressService';
import { vocabularyService } from './vocabularyService';
import { grammarProgressService } from './grammarProgressService';
import { grammarService } from './grammarService';

const WRONG_ANSWERS_STORAGE_KEY = 'thpt_english_wrong_answers';
const ACTIVE_SESSION_STORAGE_KEY = 'thpt_english_active_quiz_session';

export interface CreateQuizOptions {
  studentId?: string;
  quizId?: string;
  quizTitle: string;
  quizSubtitle?: string;
  quizMode?: QuizMode;
  skill?: SkillCategory;
  questions?: UniversalQuestion[];
  timeLimitMinutes?: number;
  randomize?: boolean;
}

export class QuizService {
  private activeSession: QuizSession | null = null;
  private wrongAnswersStore: WrongAnswerItem[] = [];

  constructor() {
    this.loadWrongAnswersFromStorage();
  }

  private loadWrongAnswersFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
        if (raw) {
          this.wrongAnswersStore = JSON.parse(raw);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read wrong answers from localStorage', e);
    }
    // Initial seeded sample wrong answers so students immediately have something to review
    this.seedInitialWrongAnswers();
  }

  private saveWrongAnswersToStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          WRONG_ANSWERS_STORAGE_KEY,
          JSON.stringify(this.wrongAnswersStore)
        );
      }
    } catch (e) {
      console.warn('Could not write wrong answers to localStorage', e);
    }
  }

  private seedInitialWrongAnswers(): void {
    const q1 = questionSelector.getAllQuestions().find((q) => q.id === 'q-grm-01');
    const q2 = questionSelector.getAllQuestions().find((q) => q.id === 'q-voc-02');
    const q3 = questionSelector.getAllQuestions().find((q) => q.id === 'q-grm-05');

    if (q1 && q2 && q3) {
      this.wrongAnswersStore = [
        {
          id: 'w-seed-1',
          question: q1,
          userAnswer: 1, // answered 'stepping' instead of 'to step'
          userAnswerFormatted: 'B. stepping',
          correctAnswerFormatted: 'A. to step',
          isCorrect: false,
          answeredAt: 'Hôm qua 20:30',
          quizTitle: 'Trọng điểm Ngữ pháp Unit 6'
        },
        {
          id: 'w-seed-2',
          question: q2,
          userAnswer: 1, // answered 'temporary' instead of 'intangible'
          userAnswerFormatted: 'B. temporary',
          correctAnswerFormatted: 'A. intangible',
          isCorrect: false,
          answeredAt: 'Hôm qua 20:35',
          quizTitle: 'Từ vựng Di sản Văn hóa'
        },
        {
          id: 'w-seed-3',
          question: q3,
          userAnswer: 1, // 'they announced' instead of 'did they announce'
          userAnswerFormatted: 'B. they announced',
          correctAnswerFormatted: 'A. did they announce',
          isCorrect: false,
          answeredAt: '2 ngày trước',
          quizTitle: 'Chinh phục Đảo ngữ 9+'
        }
      ];
    }
  }

  /**
   * 1. Create a new Quiz Session
   */
  public createQuiz(options: CreateQuizOptions): QuizSession {
    let questions = options.questions || [];

    // Fallback: If no questions provided, pick mixed set
    if (questions.length === 0) {
      questions = questionSelector.getMixedQuestions(10);
    }

    if (options.randomize) {
      questions = questionSelector.getRandomizedQuestions(questions, false);
    }

    const session: QuizSession = {
      id: `quiz-sess-${Date.now()}`,
      studentId: options.studentId || 'hs-student-01',
      quizId: options.quizId || `quiz-${Date.now()}`,
      quizTitle: options.quizTitle,
      quizSubtitle: options.quizSubtitle,
      quizMode: options.quizMode || 'practice',
      skill: options.skill,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      startedAt: new Date().toISOString(),
      status: 'not_started',
      timeSpentSeconds: 0,
      timeLimitMinutes: options.timeLimitMinutes
    };

    this.activeSession = session;
    return session;
  }

  /**
   * 2. Start Quiz
   */
  public startQuiz(sessionId?: string): QuizSession | null {
    if (!this.activeSession) return null;
    this.activeSession.status = 'in_progress';
    this.activeSession.startedAt = new Date().toISOString();
    return this.activeSession;
  }

  /**
   * 3. Get Active Session
   */
  public getActiveSession(): QuizSession | null {
    return this.activeSession;
  }

  /**
   * 4. Save Student Answer for current question
   */
  public saveAnswer(
    questionId: string,
    selectedAnswer: any,
    timeSpentOnQuestion: number = 0
  ): UserAnswerRecord | null {
    if (!this.activeSession) return null;

    const question = this.activeSession.questions.find((q) => q.id === questionId);
    if (!question) return null;

    const isCorrect = scoringService.evaluateAnswer(question, selectedAnswer);

    const record: UserAnswerRecord = {
      questionId,
      selectedAnswer,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: timeSpentOnQuestion
    };

    this.activeSession.answers[questionId] = record;
    return record;
  }

  /**
   * 5. Navigation: Next question
   */
  public nextQuestion(): number {
    if (!this.activeSession) return 0;
    if (this.activeSession.currentQuestionIndex < this.activeSession.questions.length - 1) {
      this.activeSession.currentQuestionIndex += 1;
    }
    return this.activeSession.currentQuestionIndex;
  }

  /**
   * 6. Navigation: Previous question
   */
  public previousQuestion(): number {
    if (!this.activeSession) return 0;
    if (this.activeSession.currentQuestionIndex > 0) {
      this.activeSession.currentQuestionIndex -= 1;
    }
    return this.activeSession.currentQuestionIndex;
  }

  /**
   * 7. Navigation: Jump to specific question index
   */
  public goToQuestion(index: number): number {
    if (!this.activeSession) return 0;
    if (index >= 0 && index < this.activeSession.questions.length) {
      this.activeSession.currentQuestionIndex = index;
    }
    return this.activeSession.currentQuestionIndex;
  }

  /**
   * 8. Update time elapsed
   */
  public updateTimeSpent(seconds: number): void {
    if (this.activeSession) {
      this.activeSession.timeSpentSeconds = seconds;
    }
  }

  /**
   * 9. Submit Quiz & Calculate Final Result
   */
  public submitQuiz(): QuizResult | null {
    if (!this.activeSession) return null;

    this.activeSession.status = 'completed';
    this.activeSession.submittedAt = new Date().toISOString();

    const result = scoringService.calculateResult(
      this.activeSession.id,
      this.activeSession.quizTitle,
      this.activeSession.quizMode,
      this.activeSession.questions,
      this.activeSession.answers,
      this.activeSession.timeSpentSeconds
    );

    this.activeSession.score = result.scorePercentage;
    this.activeSession.accuracy = result.accuracyPercentage;
    this.activeSession.pointsEarned = result.pointsEarned;
    this.activeSession.totalPoints = result.totalPoints;

    // Record wrong answers into Wrong Answers repository
    this.recordWrongAnswers(this.activeSession, result);

    // Record to ContentService progress and activity log
    contentService.updateLessonProgress(
      this.activeSession.studentId,
      this.activeSession.quizId,
      100,
      result.scorePercentage / 10
    );

    // Hook into Vocabulary & Grammar Progress Services
    try {
      result.questions.forEach((q) => {
        const ans = result.answers[q.id];
        const isCorrect = ans ? ans.isCorrect : false;

        if (q.skill === 'vocabulary') {
          const words = vocabularyService.getAllWords();
          const matchedWord = words.find(
            (w) =>
              q.tags?.some((t: string) => t.toLowerCase() === w.word.toLowerCase() || t === w.id) ||
              q.question.toLowerCase().includes(w.word.toLowerCase())
          );
          if (matchedWord) {
            vocabularyProgressService.recordWordPractice(matchedWord.id, isCorrect);
          }
        } else if (q.skill === 'grammar') {
          const topics = grammarService.getAllTopics();
          const matchedTopic = topics.find(
            (t) =>
              q.tags?.some((tag: string) => t.id.toLowerCase() === tag.toLowerCase() || t.title.toLowerCase().includes(tag.toLowerCase())) ||
              t.relatedExercises?.includes(q.id) ||
              t.quickCheckQuestionIds?.includes(q.id) ||
              q.unitId === t.unitId
          );
          if (matchedTopic) {
            grammarProgressService.recordTopicPractice(matchedTopic.id, isCorrect ? 1 : 0, 1);
          }
        }
      });

      if (this.activeSession.skill === 'vocabulary') {
        vocabularyProgressService.recordPracticeSession({
          wordsPracticed: result.totalQuestions,
          correctAnswers: result.correctQuestions,
          incorrectAnswers: result.incorrectQuestions,
          accuracy: result.accuracyPercentage,
          wordIds: result.questions.map((q) => q.id)
        });
      }
    } catch (err) {
      console.warn('Could not sync progress to vocabulary/grammar services', err);
    }

    return result;
  }

  /**
   * Helper: Format answer string for display
   */
  private formatAnswerDisplay(question: UniversalQuestion, rawAnswer: any): string {
    if (rawAnswer === undefined || rawAnswer === null || rawAnswer === '') {
      return '(Chưa trả lời)';
    }

    if (question.type === 'multiple_choice' && question.options) {
      if (typeof rawAnswer === 'number' && question.options[rawAnswer]) {
        return question.options[rawAnswer];
      }
    }

    if (question.type === 'true_false') {
      return rawAnswer === 0 || rawAnswer === true ? 'True (Đúng)' : 'False (Sai)';
    }

    if (question.type === 'matching' && typeof rawAnswer === 'object') {
      return 'Đã ghép các cặp từ vựng';
    }

    if (question.type === 'ordering' && Array.isArray(rawAnswer)) {
      return 'Đã sắp xếp thứ tự';
    }

    return String(rawAnswer);
  }

  /**
   * Helper: Add incorrect answers to wrong answers store
   */
  private recordWrongAnswers(session: QuizSession, result: QuizResult): void {
    result.wrongQuestions.forEach((q) => {
      const userAnswerRecord = session.answers[q.id];
      const userAnswer = userAnswerRecord ? userAnswerRecord.selectedAnswer : undefined;

      const userFormatted = this.formatAnswerDisplay(q, userAnswer);
      const correctFormatted = this.formatAnswerDisplay(q, q.correctAnswer);

      // Avoid duplicates: remove older wrong entry for the same question if exists
      this.wrongAnswersStore = this.wrongAnswersStore.filter((w) => w.question.id !== q.id);

      this.wrongAnswersStore.unshift({
        id: `wrong-${q.id}-${Date.now()}`,
        question: q,
        userAnswer,
        userAnswerFormatted: userFormatted,
        correctAnswerFormatted: correctFormatted,
        isCorrect: false,
        answeredAt: 'Vừa xong',
        quizTitle: session.quizTitle
      });
    });

    // If user previously got a question wrong, but in this session got it right, remove it from wrong answers!
    Object.keys(session.answers).forEach((qId) => {
      const ans = session.answers[qId];
      if (ans.isCorrect) {
        this.wrongAnswersStore = this.wrongAnswersStore.filter((w) => w.question.id !== qId);
      }
    });

    this.saveWrongAnswersToStorage();
  }

  /**
   * 10. Get all stored wrong answers
   */
  public getWrongAnswers(studentId?: string): WrongAnswerItem[] {
    return [...this.wrongAnswersStore];
  }

  /**
   * 11. Remove a resolved wrong answer manually
   */
  public removeWrongAnswer(questionId: string): void {
    this.wrongAnswersStore = this.wrongAnswersStore.filter((w) => w.question.id !== questionId);
    this.saveWrongAnswersToStorage();
  }

  /**
   * 12. Retry Quiz from list of wrong question IDs
   * Does NOT modify Question Bank. Creates a fresh session with only the wrong questions!
   */
  public retryWrongAnswers(studentId: string = 'hs-student-01', questionIds?: string[]): QuizSession {
    let ids = questionIds;
    if (!ids || ids.length === 0) {
      ids = this.wrongAnswersStore.map((w) => w.question.id);
    }

    const wrongQuestions = questionSelector.getQuestionsByIds(ids);

    return this.createQuiz({
      studentId,
      quizId: `retry-wrong-${Date.now()}`,
      quizTitle: 'Luyện tập khắc phục lỗi sai',
      quizSubtitle: `Ôn tập tập trung ${wrongQuestions.length} câu hỏi bạn đã từng trả lời chưa chính xác`,
      quizMode: 'wrong_answers_retry',
      questions: wrongQuestions,
      randomize: true
    });
  }
}

export const quizService = new QuizService();
