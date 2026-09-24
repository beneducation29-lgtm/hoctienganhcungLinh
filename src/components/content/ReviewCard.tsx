import React from 'react';
import { Clock, HelpCircle, ArrowRight, Award, Layers } from 'lucide-react';
import { ReviewSet } from '../../types/contentArchitecture';

interface ReviewCardProps {
  reviewSet: ReviewSet;
  onStart: (reviewSet: ReviewSet) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ reviewSet, onStart }) => {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all duration-200">
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Lớp {reviewSet.grade} · {reviewSet.difficulty}
          </span>
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {reviewSet.estimatedTime} phút
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> {reviewSet.questionCount} câu
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {reviewSet.title}
        </h3>

        {reviewSet.subtitle && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {reviewSet.subtitle}
          </p>
        )}

        {/* Skills included */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-medium">Kỹ năng:</span>
          {reviewSet.skills.map((s, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium capitalize"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
          <Award className="w-4 h-4" /> Có chấm điểm tức thì
        </span>

        <button
          onClick={() => onStart(reviewSet)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Bắt đầu ôn tập</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
