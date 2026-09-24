import { GradeLevel, WritingExercise } from '../types/contentArchitecture';
import { contentService } from './contentService';

export interface WritingLabItem extends WritingExercise {
  grade: GradeLevel;
  unitId: string;
  unitTitle: string;
}

class WritingService {
  getExercises(grade?: GradeLevel): WritingLabItem[] {
    return contentService.getLessons()
      .filter((lesson) => lesson.type === 'Writing')
      .map((lesson) => {
        const exercise = contentService.getWritingExercise(lesson.id);
        const unit = contentService.getUnitById(lesson.unitId);
        if (!exercise || !unit) return null;
        return { ...exercise, grade: lesson.gradeNumber, unitId: lesson.unitId, unitTitle: unit.title };
      })
      .filter((item): item is WritingLabItem => Boolean(item))
      .filter((item) => !grade || item.grade === grade);
  }

  getByLessonId(lessonId: string): WritingLabItem | undefined {
    return this.getExercises().find((item) => item.lessonId === lessonId);
  }

  getRecommended(grade?: GradeLevel): WritingLabItem[] {
    return this.getExercises(grade).slice(0, 3);
  }
}

export const writingService = new WritingService();
