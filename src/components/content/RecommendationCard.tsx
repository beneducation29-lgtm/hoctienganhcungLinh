import React from 'react';
import { Sparkles, ArrowRight, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Recommendation } from '../../types/contentArchitecture';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction: (rec: Recommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onAction
}) => {
  const getPriorityBadge = (p: Recommendation['priority']) => {
    switch (p) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadge(
                recommendation.priority
              )}`}
            >
              Ưu tiên {recommendation.priority === 'high' ? 'Cao' : recommendation.priority === 'medium' ? 'Vừa' : 'Bổ trợ'}
            </span>
            <span className="text-[11px] font-medium text-slate-500 capitalize">
              · Kỹ năng {recommendation.skill}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {recommendation.estimatedMinutes} phút
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 leading-snug">
          {recommendation.title}
        </h4>

        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          {recommendation.description}
        </p>

        {/* Reason banner */}
        <div className="mt-3 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span><strong>Lý do đề xuất:</strong> {recommendation.reason}</span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={() => onAction(recommendation)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Thực hiện ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
