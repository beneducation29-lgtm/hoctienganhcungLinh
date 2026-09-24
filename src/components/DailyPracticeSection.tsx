import React from 'react';
import {
  Sparkles,
  Zap,
  Timer,
  BookA,
  FileCode,
  BookOpenText,
  Volume2,
  ArrowUpRight
} from 'lucide-react';
import { DailyPracticeCard } from '../types';

interface DailyPracticeSectionProps {
  cards: DailyPracticeCard[];
  onStartPractice: (type: DailyPracticeCard['type']) => void;
}

export const DailyPracticeSection: React.FC<DailyPracticeSectionProps> = ({
  cards,
  onStartPractice
}) => {
  const getIcon = (type: DailyPracticeCard['type']) => {
    switch (type) {
      case 'review':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'quiz':
        return <Timer className="w-5 h-5 text-blue-500" />;
      case 'vocab':
        return <BookA className="w-5 h-5 text-indigo-500" />;
      case 'grammar':
        return <FileCode className="w-5 h-5 text-emerald-500" />;
      case 'reading':
        return <BookOpenText className="w-5 h-5 text-sky-500" />;
      case 'listening':
        return <Volume2 className="w-5 h-5 text-violet-500" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Phương pháp Spaced Repetition</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
              Luyện tập mỗi ngày
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Chỉ 5 – 10 phút tập trung mỗi ngày giúp củng cố kiến thức dài hạn, duy trì phản xạ và tự tin trước mọi bài kiểm tra.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Cập nhật đề luyện mỗi 00:00 hàng ngày
          </div>
        </div>

        {/* 6 Daily Practice Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => onStartPractice(card.type)}
                className="group relative bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-6 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(card.type)}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md">
                      {card.tag}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed min-h-[40px]">
                    {card.subtitle}
                  </p>
                </div>

                {/* Metadata Row: Duration & Questions count (Zero-pill text separators) */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{card.questionsCount} câu hỏi</span>
                  </div>

                  <span className="text-blue-600 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Bắt đầu ngay →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
