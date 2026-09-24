import React from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle2, Languages, Target } from 'lucide-react';
import { EnglishGradeCurriculum, Grade } from '../types';

interface CurriculumSectionProps {
  curriculums: EnglishGradeCurriculum[];
  onSelectGrade: (grade: Grade) => void;
  onExploreUnit?: (grade: Grade, unitId: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  curriculums,
  onSelectGrade
}) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>Chương trình GDPT 2018 Bộ GD&ĐT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
              Học theo chương trình Tiếng Anh
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Lộ trình 10 Units mỗi năm học, chuẩn hóa theo các bộ sách giáo khoa: Global Success, Friends Global, i-Learn Smart World và Bright.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            3 khối lớp · Chuẩn đầu ra CEFR A2 — B1 — B2
          </div>
        </div>

        {/* 3 Grade Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {curriculums.map((item) => {
            const isGrade11 = item.grade === '11';
            return (
              <div
                key={item.grade}
                className={`relative flex flex-col justify-between bg-white border rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:shadow-md ${
                  isGrade11
                    ? 'border-blue-500/80 ring-1 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-black tracking-tight text-slate-900 block">
                        {item.title}
                      </span>
                      <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                        Mục tiêu: CEFR {item.targetLevel}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        isGrade11
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mb-1">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6 min-h-[56px]">
                    {item.description}
                  </p>

                  {/* Quantitative Stats Row */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="text-slate-400 block text-[11px]">Chủ đề</span>
                        <strong className="text-slate-800 text-sm font-semibold tabular-nums">
                          {item.unitsCount} Units
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="text-slate-400 block text-[11px]">Bài học</span>
                        <strong className="text-slate-800 text-sm font-semibold tabular-nums">
                          {item.lessonsCount} bài giảng
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Tiến độ hoàn thành</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {item.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isGrade11 ? 'bg-blue-600' : 'bg-slate-700'
                        }`}
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-0.5">
                      <span>Đã học {item.completedUnits} / {item.unitsCount} Units</span>
                      {item.progressPercent > 70 && (
                        <span className="text-emerald-600 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Đạt chuẩn
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => onSelectGrade(item.grade)}
                  className={`w-full py-3 px-4 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isGrade11
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>Tiếp tục học {item.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
