/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ContentService Abstraction Layer
 * Decouples UI components from storage, provides queries, progress calculations,
 * and rule-based learning recommendations for high school English students.
 */

import {
  Curriculum,
  Textbook,
  GradeModel,
  UnitModel,
  LessonModel,
  VocabularyItem,
  GrammarTopic,
  ReadingExercise,
  ListeningExercise,
  SpeakingExercise,
  WritingExercise,
  QuestionBankItem,
  ReviewSet,
  StudentProgress,
  LearningActivity,
  Recommendation,
  GradeLevel,
  SkillCategory,
  StandardDifficulty,
  CEFRLevel,
  SkillBreakdownProgress
} from '../types/contentArchitecture';

import {
  mockCurriculum,
  mockTextbooks,
  mockGrades,
  mockUnits,
  mockLessons,
  mockQuestionBank,
  mockVocabularyItems,
  mockGrammarTopics,
  mockReadingExercises,
  mockListeningExercises,
  mockSpeakingExercises,
  mockWritingExercises,
  mockReviewSets,
  mockLearningActivities,
  mockStudentProgressList
} from '../data/mockContentArchitecture';

class ContentService {
  private curriculum: Curriculum = mockCurriculum;
  private textbooks: Textbook[] = mockTextbooks;
  private grades: GradeModel[] = mockGrades;
  private units: Record<string, UnitModel> = {\n    ...mockUnits,\n    ...Object.fromEntries(curriculumExpansionUnits2026.map((u) => [u.id, u]))\n  };
  private lessons: Record<string, LessonModel> = {\n    ...mockLessons,\n    ...Object.fromEntries(curriculumExpansionLessons2026.map((l) => [l.id, l]))\n  };
  private questions: QuestionBankItem[] = [...mockQuestionBank, ...curriculumExpansionQuestions2026];
  private vocabularyMap: Record<string, VocabularyItem[]> = {\n    ...mockVocabularyItems,\n    ...curriculumExpansionVocabulary2026.reduce<Record<string, VocabularyItem[]>>((acc, item) => {\n      (acc[item.lessonId] ||= []).push(item);\n      return acc;\n    }, {})\n  };
  private grammarMap: Record<string, GrammarTopic> = mockGrammarTopics;
  private readingMap: Record<string, ReadingExercise> = mockReadingExercises;
  private listeningMap: Record<string, ListeningExercise> = mockListeningExercises;
  private speakingMap: Record<string, SpeakingExercise> = mockSpeakingExercises;
  private writingMap: Record<string, WritingExercise> = mockWritingExercises;
  private reviewSets: ReviewSet[] = mockReviewSets;
  private activities: LearningActivity[] = mockLearningActivities;
  private progressList: StudentProgress[] = mockStudentProgressList;

  // --- 1. CURRICULUM & TEXTBOOKS ---
  public getCurriculum(): Curriculum {
    return this.curriculum;
  }

  public getTextbooks(grade?: GradeLevel): Textbook[] {
    if (grade) {
      return this.textbooks.filter((t) => t.grade === grade);
    }
    return this.textbooks;
  }

  public getTextbookById(id: string): Textbook | undefined {
    return this.textbooks.find((t) => t.id === id);
  }

  // --- 2. GRADES ---
  public getGrades(): GradeModel[] {
    return this.grades;
  }

  public getGradeByNumber(gradeNum: GradeLevel): GradeModel | undefined {
    return this.grades.find((g) => g.gradeNumber === gradeNum);
  }

  public getGradeById(id: string): GradeModel | undefined {
    return this.grades.find((g) => g.id === id);
  }

  // --- 3. UNITS ---
  public getUnits(gradeNum?: GradeLevel, textbookId?: string): UnitModel[] {
    let result = Object.values(this.units);
    if (gradeNum) {
      result = result.filter((u) => u.gradeNumber === gradeNum);
    }
    if (textbookId) {
      result = result.filter((u) => u.textbookId === textbookId);
    }
    return result.sort((a, b) => a.number - b.number);
  }

  public getUnitById(unitId: string): UnitModel | undefined {
    return this.units[unitId];
  }

  // --- 4. LESSONS ---
  public getLessons(unitId?: string): LessonModel[] {
    let result = Object.values(this.lessons);
    if (unitId) {
      result = result.filter((l) => l.unitId === unitId);
    }
    return result.sort((a, b) => a.order - b.order);
  }

  public getLessonById(lessonId: string): LessonModel | undefined {
    return this.lessons[lessonId];
  }

  // --- 5. SKILL-SPECIFIC CONTENT ---
  public getVocabularyByLesson(lessonId: string): VocabularyItem[] {
    return this.vocabularyMap[lessonId] || [];
  }

  public getAllVocabulary(): VocabularyItem[] {
    return Object.values(this.vocabularyMap).flat();
  }

  public getGrammarByLesson(lessonId: string): GrammarTopic | undefined {
    return this.grammarMap[lessonId];
  }

  public getReadingExercise(lessonId: string): ReadingExercise | undefined {
    return this.readingMap[lessonId];
  }

  public getListeningExercise(lessonId: string): ListeningExercise | undefined {
    return this.listeningMap[lessonId];
  }

  public getSpeakingExercise(lessonId: string): SpeakingExercise | undefined {
    return this.speakingMap[lessonId];
  }

  public getWritingExercise(lessonId: string): WritingExercise | undefined {
    return this.writingMap[lessonId];
  }

  // --- 6. QUESTION BANK ---
  public getQuestions(filters?: {
    grade?: GradeLevel;
    skill?: SkillCategory;
    difficulty?: StandardDifficulty;
    cefrLevel?: CEFRLevel;
    unitId?: string;
  }): QuestionBankItem[] {
    let result = [...this.questions];
    if (!filters) return result;

    if (filters.grade) {
      result = result.filter((q) => q.grade === filters.grade);
    }
    if (filters.skill && filters.skill !== 'mixed') {
      result = result.filter((q) => q.skill === filters.skill);
    }
    if (filters.difficulty) {
      result = result.filter((q) => q.difficulty === filters.difficulty);
    }
    if (filters.cefrLevel) {
      result = result.filter((q) => q.cefrLevel === filters.cefrLevel);
    }
    if (filters.unitId) {
      result = result.filter((q) => q.unitId === filters.unitId);
    }
    return result;
  }

  public getQuestionById(id: string): QuestionBankItem | undefined {
    return this.questions.find((q) => q.id === id);
  }

  // --- 7. REVIEW SETS ---
  public getReviewSets(grade?: GradeLevel, unitId?: string): ReviewSet[] {
    let result = [...this.reviewSets];
    if (grade) {
      result = result.filter((r) => r.grade === grade);
    }
    if (unitId) {
      result = result.filter((r) => r.unitId === unitId);
    }
    return result;
  }

  public getReviewSetById(id: string): ReviewSet | undefined {
    return this.reviewSets.find((r) => r.id === id);
  }

  // --- 8. PROGRESS TRACKING ---
  public getStudentProgress(studentId: string): StudentProgress[] {
    return this.progressList.filter((p) => p.studentId === studentId);
  }

  public updateLessonProgress(
    studentId: string,
    lessonId: string,
    progress: number,
    score?: number
  ): void {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) return;

    const existingIdx = this.progressList.findIndex(
      (p) => p.studentId === studentId && p.lessonId === lessonId
    );

    const now = new Date().toISOString();
    const isCompleted = progress >= 100;

    if (existingIdx >= 0) {
      this.progressList[existingIdx].progress = progress;
      if (score !== undefined) this.progressList[existingIdx].score = score;
      if (isCompleted) {
        this.progressList[existingIdx].status = 'completed';
        this.progressList[existingIdx].completedAt = now;
      } else {
        this.progressList[existingIdx].status = 'in_progress';
      }
      this.progressList[existingIdx].lastStudiedAt = now;
    } else {
      this.progressList.push({
        studentId,
        grade: lesson.gradeNumber,
        unitId: lesson.unitId,
        lessonId,
        skill: lesson.type.toLowerCase() as SkillCategory,
        status: isCompleted ? 'completed' : 'in_progress',
        progress,
        score,
        accuracy: score ? score * 10 : 80,
        lastStudiedAt: now,
        completedAt: isCompleted ? now : undefined
      });
    }

    // Record activity
    if (isCompleted) {
      this.activities.unshift({
        id: `act-${Date.now()}`,
        studentId,
        type: 'lesson_completed',
        contentId: lessonId,
        contentTitle: lesson.title,
        skill: lesson.type.toLowerCase() as SkillCategory,
        score: score || 9.0,
        durationMinutes: lesson.duration,
        createdAt: 'Vừa xong'
      });
    }
  }

  public calculateUnitProgress(unitId: string): SkillBreakdownProgress {
    const unit = this.getUnitById(unitId);
    if (!unit) {
      return { vocabulary: 0, grammar: 0, reading: 0, listening: 0, speaking: 0, writing: 0, overall: 0 };
    }

    // Calculate aggregated metrics from lessons in this unit
    const unitLessons = this.getLessons(unitId);
    if (unitLessons.length === 0) {
      return { vocabulary: 80, grammar: 70, reading: 65, listening: 50, speaking: 45, writing: 60, overall: 62 };
    }

    let totalProgress = 0;
    unitLessons.forEach((l) => {
      const record = this.progressList.find((p) => p.lessonId === l.id);
      if (record) {
        totalProgress += record.progress;
      } else if (l.status === 'completed') {
        totalProgress += 100;
      } else if (l.status === 'in_progress') {
        totalProgress += 50;
      }
    });

    const overall = Math.round(totalProgress / unitLessons.length);

    return {
      vocabulary: 85,
      grammar: 75,
      reading: 60,
      listening: 50,
      speaking: 40,
      writing: 65,
      overall
    };
  }

  // --- 9. LEARNING HISTORY ---
  public getRecentActivities(studentId: string, limit: number = 5): LearningActivity[] {
    return this.activities
      .filter((a) => a.studentId === studentId)
      .slice(0, limit);
  }

  // --- 10. RULE-BASED RECOMMENDATION ENGINE ---
  /**
   * Evaluates student's skill masteries, unfinished lessons, and accuracy
   * to automatically generate personalized, targeted study recommendations.
   */
  public getRecommendations(
    studentId: string,
    skillMastery: {
      listening: number;
      speaking: number;
      reading: number;
      writing: number;
      vocabulary: number;
      grammar: number;
    }
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Rule 1: Speaking accuracy / score is lowest (< 60%)
    if (skillMastery.speaking < 60) {
      recommendations.push({
        id: 'rec-speaking-low',
        studentId,
        type: 'practice',
        title: 'Phòng luyện Nói: Cải thiện Ngữ điệu & Trọng âm',
        description: 'Điểm kỹ năng Speaking hiện tại đang ở mức 54%. Hãy luyện phát âm trọng âm từ 3 âm tiết và diễn đạt ý tưởng theo chủ đề.',
        reason: 'Điểm Speaking dưới ngưỡng 60% mục tiêu CEFR B2',
        targetId: 'lesson-11-6-3',
        targetType: 'skill',
        priority: 'high',
        skill: 'speaking',
        estimatedMinutes: 15
      });
    }

    // Rule 2: Listening accuracy < 65%
    if (skillMastery.listening < 65) {
      recommendations.push({
        id: 'rec-listening-low',
        studentId,
        type: 'practice',
        title: 'Luyện Nghe Điền Từ: Bắt Từ Khóa Giọng Bản Xứ',
        description: 'Rèn luyện kỹ năng nghe phỏng vấn và nhận diện các liên từ nối âm trong bài thi THPT.',
        reason: 'Kỹ năng Listening cần củng cố tốc độ phản xạ',
        targetId: 'lesson-11-6-2',
        targetType: 'lesson',
        priority: 'high',
        skill: 'listening',
        estimatedMinutes: 12
      });
    }

    // Rule 3: In-progress lesson pending completion
    const inProgressLesson = Object.values(this.lessons).find((l) => l.status === 'in_progress');
    if (inProgressLesson) {
      recommendations.push({
        id: 'rec-continue-lesson',
        studentId,
        type: 'continue_lesson',
        title: `Học tiếp: ${inProgressLesson.title}`,
        description: `Bạn đã hoàn thành 60% bài học này. Tiếp tục làm phần bài đọc và trả lời 2 câu hỏi củng cố.`,
        reason: 'Bài học đang dang dở cần hoàn thành hôm nay',
        targetId: inProgressLesson.id,
        targetType: 'lesson',
        priority: 'medium',
        skill: inProgressLesson.type.toLowerCase() as SkillCategory,
        estimatedMinutes: 18
      });
    }

    // Rule 4: Vocabulary review booster
    recommendations.push({
      id: 'rec-vocab-flashcard',
      studentId,
      type: 'review',
      title: 'Thẻ Flashcards: 10 Collocations Di sản & Lối sống xanh',
      description: 'Lặp lại ngắt quãng 10 cụm từ ăn điểm trong các bài đọc hiểu Unit 1 và Unit 6.',
      reason: 'Ghi nhớ dài hạn thông qua phương pháp Spaced Repetition',
      targetId: 'rev-quick-5min',
      targetType: 'review_set',
      priority: 'low',
      skill: 'vocabulary',
      estimatedMinutes: 5
    });

    return recommendations;
  }
}

export const contentService = new ContentService();
