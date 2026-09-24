import React from 'react';
import {
  Headphones,
  Mic,
  BookOpen,
  PenTool,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { SkillModule, SkillType, SkillLevel } from '../types';

interface FourSkillsSectionProps {
  skills: SkillModule[];
  onOpenSkillRoom: (skillId: SkillType, level?: SkillLevel) => void;
}

export const FourSkillsSection: React.FC<FourSkillsSectionProps> = ({
  skills,
  onOpenSkillRoom
}) => {
  const getSkillIcon = (id: SkillType) => {
    switch (id) {
      case 'listening':
        return <Headphones className="w-6 h-6 text-blue-600" />;
      case 'speaking':
        return <Mic className="w-6 h-6 text-indigo-600" />;
      case 'reading':
        return <BookOpen className="w-6 h-6 text-sky-600" />;
      case 'writing':
        return <PenTool className="w-6 h-6 text-slate-800" />;
    }
  };

  const levels: SkillLevel[] = [
    'Beginner',
    'Intermediate',
    'Upper Intermediate',
    'Advanced'
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phát triển toàn diện ngôn ngữ & tư duy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Phòng luyện 4 kỹ năng
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Không chỉ học ngữ pháp thụ động, học sinh được luyện tập chuyên sâu 4 kỹ năng Nghe, Nói, Đọc, Viết
            với lộ trình phân cấp từ Beginner đến Advanced, tiệm cận chuẩn IELTS / VSTEP và kỳ thi THPT.
          </p>
        </div>

        {/* 4 Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((skill) => {
            return (
              <div
                key={skill.id}
                className="relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
              >
                <div>
                  {/* Top Bar of the Card: Icon + Category + Active Level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                        {getSkillIcon(skill.id)}
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                          {skill.title}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {skill.vietnameseTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                        Cấp độ hiện tại
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mt-2 mb-6">
                    {skill.description}
                  </p>

                  {/* Levels Track (Beginner -> Intermediate -> Upper Intermediate -> Advanced) */}
                  <div className="mb-6 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">Phân loại trình độ:</span>
                      <span className="text-[11px] text-blue-600 font-medium">Bấm để chuyển cấp độ</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {levels.map((lvl) => {
                        const isCurrent = skill.level === lvl;
                        return (
                          <button
                            key={lvl}
                            onClick={() => onOpenSkillRoom(skill.id, lvl)}
                            className={`px-2.5 py-1.5 text-xs rounded-lg font-medium text-center transition-all cursor-pointer truncate ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                                : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/60'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contextual Metrics */}
                  <div className="flex items-center justify-between py-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{skill.recommendedTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Điểm TB: <strong className="text-slate-900 tabular-nums">{skill.averageScore}/10</strong>
                      </span>
                    </div>

                    <div>
                      <span>
                        <strong className="text-slate-900 tabular-nums">{skill.exerciseCount}</strong> bài tập
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => onOpenSkillRoom(skill.id, skill.level)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Vào phòng luyện {skill.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
