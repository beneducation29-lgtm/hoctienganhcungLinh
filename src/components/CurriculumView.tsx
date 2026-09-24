import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { GradeLevel, LessonModel, UnitModel, Textbook } from '../types/contentArchitecture';
import { Grade } from '../types';
import { contentService } from '../services/contentService';
import { GradeCard } from './content/GradeCard';
import { UnitCard } from './content/UnitCard';
import { LessonCard } from './content/LessonCard';
import { SkillProgressBar } from './content/SkillProgressBar';
import { RecommendationCard } from './content/RecommendationCard';

interface CurriculumViewProps {
  initialGrade?: GradeLevel | Grade;
  onOpenLesson: (lesson: LessonModel | any) => void;
  onBackToHome: () => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  initialGrade = 11,
  onOpenLesson,
  onBackToHome
}) => {
  const gradeStr: GradeLevel = String(initialGrade) === '10' ? '10' : String(initialGrade) === '12' ? '12' : '11';
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(gradeStr);
  const grades = contentService.getGrades();
  const textbooks = contentService.getTextbooks(selectedGrade);
  
  const [selectedTextbookId, setSelectedTextbookId] = useState<string>(
    textbooks.length > 0 ? textbooks[0].id : 'tb-gs-11'
  );

  const units = contentService.getUnits(selectedGrade, selectedTextbookId);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    units.length > 0 ? units[0].id : 'unit-11-6'
  );

  const activeUnit = contentService.getUnitById(selectedUnitId) || units[0];
  const unitLessons = activeUnit ? contentService.getLessons(activeUnit.id) : [];
  const unitProgress = activeUnit ? contentService.calculateUnitProgress(activeUnit.id) : null;

  // Recommendations for this grade
  const recommendations = contentService.getRecommendations('hs-student-01', {
    listening: 55,
    speaking: 54,
    reading: 78,
    writing: 65,
    vocabulary: 82,
    grammar: 76
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-200">
      {/* 1. Header & Navigation Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về trang chủ</span>
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Khung Chương trình Tiếng Anh THPT Chuẩn Hóa
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Cấu trúc phân cấp chuẩn: Chương trình &rarr; Sách giáo khoa &rarr; Khối lớp &rarr; Unit &rarr; Bài học &rarr; Hợp phần kỹ năng.
          </p>
        </div>

        {/* Grade Switcher Badges */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl self-start sm:self-auto border border-slate-200/80">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGrade(g.gradeNumber);
                const tbList = contentService.getTextbooks(g.gradeNumber);
                if (tbList.length > 0) {
                  setSelectedTextbookId(tbList[0].id);
                }
                const gradeUnits = contentService.getUnits(g.gradeNumber);
                if (gradeUnits.length > 0) {
                  setSelectedUnitId(gradeUnits[0].id);
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedGrade === g.gradeNumber
                  ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Textbook Selector Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Bộ sách giáo khoa:
          </span>
          <div className="flex flex-wrap gap-2">
            {textbooks.map((tb) => (
              <button
                key={tb.id}
                onClick={() => {
                  setSelectedTextbookId(tb.id);
                  const tbUnits = contentService.getUnits(selectedGrade, tb.id);
                  if (tbUnits.length > 0) setSelectedUnitId(tbUnits[0].id);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  selectedTextbookId === tb.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tb.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Đang xem: <strong className="text-slate-900">Lớp {selectedGrade}</strong> · Nhà xuất bản GDVN
        </div>
      </div>

      {/* 3. Units List for the Grade */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách Units — Tiếng Anh {selectedGrade}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn một Unit để xem chi tiết các bài học và tiến độ 6 kỹ năng
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600">
            {units.length} Units có sẵn
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isSelected={unit.id === selectedUnitId}
              onSelect={(uId) => setSelectedUnitId(uId)}
            />
          ))}
        </div>
      </div>

      {/* 4. Active Unit Details & Lesson Breakdown */}
      {activeUnit && (
        <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8">
          {/* Active Unit Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <span>Unit {activeUnit.number.toString().padStart(2, '0')}</span>
                <span>·</span>
                <span>Lớp {activeUnit.gradeNumber}</span>
                <span>·</span>
                <span>{activeUnit.durationHours} giờ học</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {activeUnit.title}
              </h2>
              <p className="text-sm text-blue-900/80 font-medium">
                {activeUnit.vietnameseTitle}
              </p>
              <p className="text-xs text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {activeUnit.description}
              </p>
            </div>

            <div className="text-right bg-white p-4 rounded-2xl border border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 block">Tiến độ Unit này</span>
              <span className="text-2xl font-black text-blue-600 font-mono">
                {activeUnit.progress}%
              </span>
            </div>
          </div>

          {/* Skill Progress Bar for this Unit */}
          {unitProgress && (
            <SkillProgressBar progress={unitProgress} />
          )}

          {/* Lesson List Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Các bài học trong Unit ({unitLessons.length} bài)</span>
              </h3>
              <span className="text-xs text-slate-500">
                Nhấn vào bài để mở toàn bộ các hợp phần kiến thức
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {unitLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onSelect={(l) => onOpenLesson(l)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Rule-Based Recommendations for the Student */}
      {recommendations.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hệ thống đề xuất thông minh</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Lộ trình ôn luyện gợi ý cho bạn
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Tự động phân tích điểm yếu & bài học dang dở
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onAction={(r) => {
                  if (r.targetType === 'lesson') {
                    const lessonObj = contentService.getLessonById(r.targetId);
                    if (lessonObj) onOpenLesson(lessonObj);
                  } else {
                    // Navigate to practice
                    const firstLesson = unitLessons[0];
                    if (firstLesson) onOpenLesson(firstLesson);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
