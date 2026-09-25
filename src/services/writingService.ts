import { WritingExercise, GradeLevel } from '../types/contentArchitecture';
import { contentService } from './contentService';

export interface WritingExerciseSummary extends WritingExercise {
  unitId: string;
  grade: GradeLevel;
  unitTitle: string;
}

class WritingService {
  getExercises(grade?: GradeLevel): WritingExerciseSummary[] {
    return contentService
      .getLessons()
      .flatMap((lesson) => {
        const exercise = contentService.getWritingExercise(lesson.id);
        if (!exercise) return [];
        if (grade && lesson.gradeNumber !== grade) return [];
        const unit = contentService.getUnitById(lesson.unitId);
        return [{
          ...exercise,
          unitId: lesson.unitId,
          grade: lesson.gradeNumber,
          unitTitle: unit?.title || 'Unit'
        }];
      });
  }

  getByLessonId(lessonId: string): WritingExerciseSummary | undefined {
    const lesson = contentService.getLessonById(lessonId);
    const exercise = contentService.getWritingExercise(lessonId);
    if (!lesson || !exercise) return undefined;
    return {
      ...exercise,
      unitId: lesson.unitId,
      grade: lesson.gradeNumber,
      unitTitle: contentService.getUnitById(lesson.unitId)?.title || 'Unit'
    };
  }

  getRecommended(grade: GradeLevel, limit = 4): WritingExerciseSummary[] {
    return this.getExercises(grade)
      .sort((a, b) => (a.difficulty === 'hard' ? -1 : 0) - (b.difficulty === 'hard' ? -1 : 0))
      .slice(0, limit);
  }
}

export const writingService = new WritingService();
