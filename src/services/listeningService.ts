import { GradeLevel, ListeningExercise } from '../types/contentArchitecture';
import { contentService } from './contentService';

export interface ListeningLabItem extends ListeningExercise {
  grade: GradeLevel;
  unitId: string;
  unitTitle: string;
}

class ListeningService {
  getExercises(grade?: GradeLevel): ListeningLabItem[] {
    return contentService.getLessons()
      .filter((lesson) => lesson.type === 'Listening')
      .map((lesson) => {
        const exercise = contentService.getListeningExercise(lesson.id);
        const unit = contentService.getUnitById(lesson.unitId);
        if (!exercise || !unit) return null;
        return { ...exercise, grade: lesson.gradeNumber, unitId: lesson.unitId, unitTitle: unit.title };
      })
      .filter((item): item is ListeningLabItem => Boolean(item))
      .filter((item) => !grade || item.grade === grade);
  }

  getByLessonId(lessonId: string): ListeningLabItem | undefined {
    return this.getExercises().find((item) => item.lessonId === lessonId);
  }

  getRecommended(grade?: GradeLevel): ListeningLabItem[] {
    return this.getExercises(grade).sort((a, b) => a.duration - b.duration).slice(0, 3);
  }
}

export const listeningService = new ListeningService();
