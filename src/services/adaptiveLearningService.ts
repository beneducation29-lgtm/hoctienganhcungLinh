import { GradeLevel, Recommendation, SkillBreakdownProgress, SkillCategory } from '../types/contentArchitecture';
import { StudentProfile } from '../types';
import { contentService } from './contentService';

export interface AdaptivePlanItem {
  id: string;
  title: string;
  description: string;
  reason: string;
  skill: Exclude<SkillCategory, 'mixed'>;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  targetId: string;
  targetType: 'lesson' | 'review_set' | 'skill';
  action: 'curriculum' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'quiz';
}

export interface AdaptiveLearningPlan {
  studentId: string;
  grade: GradeLevel;
  totalMinutes: number;
  focusSkill: Exclude<SkillCategory, 'mixed'>;
  focusScore: number;
  skillBreakdown: SkillBreakdownProgress;
  items: AdaptivePlanItem[];
  generatedAt: string;
}

const skillLabels: Record<AdaptivePlanItem['skill'], string> = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  reading: 'Đọc hiểu',
  listening: 'Nghe hiểu',
  speaking: 'Nói',
  writing: 'Viết'
};

const actionBySkill: Record<AdaptivePlanItem['skill'], AdaptivePlanItem['action']> = {
  vocabulary: 'vocabulary',
  grammar: 'grammar',
  reading: 'reading',
  listening: 'listening',
  speaking: 'speaking',
  writing: 'writing'
};

class AdaptiveLearningService {
  private readonly skills: AdaptivePlanItem['skill'][] = [
    'vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing'
  ];

  getSkillBreakdown(student: StudentProfile, studentId: string): SkillBreakdownProgress {
    const records = contentService.getStudentProgress(studentId);
    const fallback = student.skillMastery;
    const values = this.skills.reduce((acc, skill) => {
      const skillRecords = records.filter((r) => r.skill === skill);
      const measured = skillRecords.filter((r) => typeof r.score === 'number' || typeof r.accuracy === 'number');
      if (measured.length === 0) {
        acc[skill] = fallback[skill];
        return acc;
      }
      const total = measured.reduce((sum, r) => {
        if (typeof r.accuracy === 'number') return sum + r.accuracy;
        return sum + ((r.score || 0) * 10);
      }, 0);
      acc[skill] = Math.round(total / measured.length);
      return acc;
    }, {} as Record<AdaptivePlanItem['skill'], number>);

    const overall = Math.round(this.skills.reduce((sum, skill) => sum + values[skill], 0) / this.skills.length);
    return { ...values, overall };
  }

  getPlan(student: StudentProfile, studentId: string = 'hs-student-01'): AdaptiveLearningPlan {
    const skillBreakdown = this.getSkillBreakdown(student, studentId);
    const focusSkill = [...this.skills].sort((a, b) => skillBreakdown[a] - skillBreakdown[b])[0];
    const focusScore = skillBreakdown[focusSkill];

    const unfinished = contentService
      .getLessons()
      .filter((lesson) => lesson.gradeNumber === student.currentGrade && lesson.status === 'in_progress');

    const focusLesson = contentService
      .getLessons()
      .filter((lesson) => lesson.gradeNumber === student.currentGrade && lesson.type.toLowerCase() === focusSkill)
      .find((lesson) => lesson.status !== 'locked')
      ?? contentService.getLessons().find((lesson) => lesson.gradeNumber === student.currentGrade && lesson.status !== 'locked');

    const items: AdaptivePlanItem[] = [];

    if (unfinished[0]) {
      items.push({
        id: 'adaptive-continue',
        title: 'Học tiếp bài đang dang dở',
        description: unfinished[0].title,
        reason: 'Hoàn thành phần đang học trước khi mở thêm nội dung mới.',
        skill: unfinished[0].type.toLowerCase() as AdaptivePlanItem['skill'],
        estimatedMinutes: Math.min(15, unfinished[0].duration),
        priority: 'high',
        targetId: unfinished[0].id,
        targetType: 'lesson',
        action: actionBySkill[unfinished[0].type.toLowerCase() as AdaptivePlanItem['skill']] || 'curriculum'
      });
    }

    if (focusSkill === 'vocabulary' || focusSkill === 'grammar') {
      items.push({
        id: 'adaptive-foundation',
        title: `Củng cố ${skillLabels[focusSkill]}`,
        description: `Luyện tập ngắn để nâng độ chính xác trước khi học tiếp.`,
        reason: `${skillLabels[focusSkill]} đang là kỹ năng cần được củng cố nhất (${focusScore}%).`,
        skill: focusSkill,
        estimatedMinutes: 10,
        priority: 'high',
        targetId: focusLesson?.id || 'curriculum',
        targetType: focusLesson ? 'lesson' : 'skill',
        action: actionBySkill[focusSkill]
      });
    } else {
      items.push({
        id: 'adaptive-focus',
        title: `Luyện ${skillLabels[focusSkill]} trọng tâm`,
        description: focusLesson ? focusLesson.title : `Một phiên luyện ${skillLabels[focusSkill]} ngắn theo khối ${student.currentGrade}.`,
        reason: `${skillLabels[focusSkill]} đang có mức đo hiện tại ${focusScore}%, nên hôm nay ưu tiên một phiên luyện tập tập trung.`,
        skill: focusSkill,
        estimatedMinutes: focusSkill === 'speaking' ? 15 : 12,
        priority: 'high',
        targetId: focusLesson?.id || focusSkill,
        targetType: focusLesson ? 'lesson' : 'skill',
        action: actionBySkill[focusSkill]
      });
    }

    const secondSkill = [...this.skills]
      .filter((s) => s !== focusSkill)
      .sort((a, b) => skillBreakdown[a] - skillBreakdown[b])[0];

    items.push({
      id: 'adaptive-review',
      title: `Ôn nhẹ ${skillLabels[secondSkill]}`,
      description: 'Một phiên ngắn để duy trì kỹ năng thay vì học dồn quá nhiều nội dung.',
      reason: `${skillLabels[secondSkill]} đang ở ${skillBreakdown[secondSkill]}%; duy trì đều đặn sẽ giúp tiến bộ ổn định hơn.`,
      skill: secondSkill,
      estimatedMinutes: 8,
      priority: 'medium',
      targetId: secondSkill,
      targetType: 'skill',
      action: actionBySkill[secondSkill]
    });

    return {
      studentId,
      grade: student.currentGrade,
      totalMinutes: items.reduce((sum, item) => sum + item.estimatedMinutes, 0),
      focusSkill,
      focusScore,
      skillBreakdown,
      items: items.slice(0, 3),
      generatedAt: new Date().toISOString()
    };
  }

  getLegacyRecommendations(student: StudentProfile, studentId: string = 'hs-student-01'): Recommendation[] {
    const plan = this.getPlan(student, studentId);
    return plan.items.map((item) => ({
      id: item.id,
      studentId,
      type: item.id === 'adaptive-continue' ? 'continue_lesson' : 'practice',
      title: item.title,
      description: item.description,
      reason: item.reason,
      targetId: item.targetId,
      targetType: item.targetType,
      priority: item.priority,
      skill: item.skill,
      estimatedMinutes: item.estimatedMinutes
    }));
  }
}

export const adaptiveLearningService = new AdaptiveLearningService();
