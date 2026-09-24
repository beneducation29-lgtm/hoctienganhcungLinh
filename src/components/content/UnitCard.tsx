import React from 'react';
import { ArrowRight, BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { UnitModel } from '../../types/contentArchitecture';

interface UnitCardProps {
  unit: UnitModel;
  isSelected?: boolean;
  onSelect: (unitId: string) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  isSelected = false,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(unit.id)}
      className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-blue-50/40 border-blue-600 ring-1 ring-blue-600/30 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-mono font-bold text-blue-600 uppercase tracking-wider">
            Unit {unit.number.toString().padStart(2, '0')} · Lớp {unit.gradeNumber}
          </span>
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {unit.durationHours}h
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {unit.title}
        </h3>
        <p className="text-xs text-blue-800/80 font-medium mt-0.5">
          {unit.vietnameseTitle}
        </p>

        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {unit.description}
        </p>

        {/* Focus Tags */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
          <div className="text-slate-600">
            <strong className="text-slate-800">Ngữ pháp:</strong> {unit.grammarFocus}
          </div>
          <div className="text-slate-600">
            <strong className="text-slate-800">Từ vựng:</strong> {unit.vocabularyTopic}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${unit.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-600">
            {unit.progress}%
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(unit.id);
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>Vào bài học</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
