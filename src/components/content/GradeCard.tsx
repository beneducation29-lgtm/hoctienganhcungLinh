import React from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { GradeModel } from '../../types/contentArchitecture';

interface GradeCardProps {
  grade: GradeModel;
  isSelected?: boolean;
  onSelect: (gradeNumber: GradeModel['gradeNumber']) => void;
}

export const GradeCard: React.FC<GradeCardProps> = ({
  grade,
  isSelected = false,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(grade.gradeNumber)}
      className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20 shadow-lg shadow-blue-500/5'
          : 'bg-white border-slate-200/90 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
            Khối {grade.gradeNumber} · Chuẩn CEFR {grade.targetCefr}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {grade.completedUnitsCount}/{grade.totalUnitsCount} Unit
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {grade.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
          {grade.description}
        </p>

        {/* Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Tiến độ hoàn thành</span>
            <span className="font-bold text-slate-900">{grade.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${grade.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>SGK Global Success & Friends Global</span>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(grade.gradeNumber);
          }}
          className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <span>Khám phá</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
