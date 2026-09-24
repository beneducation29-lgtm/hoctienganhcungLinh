import React, { useState } from 'react';
import { Headphones, Mic, BookOpen, PenTool, ArrowRight, Award, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import { fourSkillModules } from '../data/mockData';
import { SkillModule, SkillType, SkillLevel } from '../types';

interface SkillsViewProps {
  onOpenSkillModal: (skill: SkillModule, level?: SkillLevel) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onOpenSkillModal }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const getIcon = (id: SkillType) => {
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

  const levelLabels = [
    { id: 'all', label: 'Tất cả cấp độ' },
    { id: 'Beginner', label: 'Beginner (A1 - A2)' },
    { id: 'Intermediate', label: 'Intermediate (B1)' },
    { id: 'Upper Intermediate', label: 'Upper Intermediate (B2)' },
    { id: 'Advanced', label: 'Advanced (C1)' }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Học viện kỹ năng THPT
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Phòng luyện 4 Kỹ năng (Nghe - Nói - Đọc - Viết)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Phát triển năng lực giao tiếp và tư duy học thuật toàn diện, chuẩn hóa theo thang tham chiếu CEFR & kỳ thi tốt nghiệp.
          </p>
        </div>
      </div>

      {/* Level Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {levelLabels.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedLevel(l.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedLevel === l.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* 4 Skills Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {fourSkillModules.map((skill) => {
          return (
            <div
              key={skill.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {getIcon(skill.id)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {skill.title}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {skill.vietnameseTitle}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                    {skill.level}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {skill.description}
                </p>

                {/* Focus Topic and Metrics */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 mb-6 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chủ đề tuần này:</span>
                    <strong className="text-slate-900">{skill.currentTopic}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian khuyến nghị:</span>
                    <strong className="text-slate-900">{skill.recommendedTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Điểm trung bình của bạn:</span>
                    <strong className="text-blue-600 font-bold">{skill.averageScore}/10</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenSkillModal(skill, skill.level)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Mở phòng thực hành {skill.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
