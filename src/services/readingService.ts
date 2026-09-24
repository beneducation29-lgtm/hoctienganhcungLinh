import { GradeLevel, ReadingExercise } from '../types/contentArchitecture';
import { contentService } from './contentService';

export interface ReadingLabItem extends ReadingExercise {
  grade: GradeLevel;
  unitId: string;
  unitTitle: string;
}

class ReadingService {
  getExercises(grade?: GradeLevel): ReadingLabItem[] {
    return contentService.getLessons()
      .filter((lesson) => lesson.type === 'Reading')
      .map((lesson) => {
        const exercise = contentService.getReadingExercise(lesson.id);
        const unit = contentService.getUnitById(lesson.unitId);
        if (!exercise || !unit) return null;
        return { ...exercise, grade: lesson.gradeNumber, unitId: lesson.unitId, unitTitle: unit.title };
      })
      .filter((item): item is ReadingLabItem => Boolean(item))
      .filter((item) => !grade || item.grade === grade);
  }

  getByLessonId(lessonId: string): ReadingLabItem | undefined {
    return this.getExercises().find((item) => item.lessonId === lessonId);
  }

  getRecommended(grade?: GradeLevel): ReadingLabItem[] {
    return this.getExercises(grade).sort((a, b) => a.estimatedTime - b.estimatedTime).slice(0, 3);
  }
}

export const readingService = new ReadingService();
