import React from 'react';
import {
  Clock,
  CheckCircle2,
  Lock,
  PlayCircle,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LessonModel } from '../../types/contentArchitecture';

interface LessonCardProps {
  lesson: LessonModel;
  onSelect: (lesson: LessonModel) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onSelect }) => {
  const isCompleted = lesson.status === 'completed';
  const isLocked = lesson.status === 'locked';

  const getTypeColor = (type: LessonModel['type']) => {
    switch (type) {
      case 'Vocabulary':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Grammar':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Reading':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Listening':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Speaking':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Writing':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div
      onClick={() => !isLocked && onSelect(lesson)}
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isLocked
          ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeColor(
                lesson.type
              )}`}
            >
              {lesson.type}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              CEFR {lesson.cefrLevel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.duration} phút</span>
          </div>
        </div>

        <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
          {lesson.title}
        </h4>

        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {lesson.description}
        </p>

        {/* Sections Indicator */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">{lesson.sections?.length ?? 0} phần:</span>
          <span className="truncate">
            {lesson.sections?.map((s) => s.title).join(' · ') || 'Nội dung bài học'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {isCompleted ? (
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
          </span>
        ) : isLocked ? (
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Lock className="w-4 h-4" /> Chưa mở
          </span>
        ) : (
          <span className="text-blue-600 font-semibold flex items-center gap-1">
            <PlayCircle className="w-4 h-4" /> Bắt đầu học
          </span>
        )}

        <button
          disabled={isLocked}
          className="text-slate-400 hover:text-slate-700 disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
