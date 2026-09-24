import React from 'react';
import { Clock, HelpCircle, ArrowRight, Layers, Award } from 'lucide-react';
import { SkillCategory, StandardDifficulty } from '../../types/contentArchitecture';

export interface QuizCardData {
  id: string;
  title: string;
  description: string;
  skill: SkillCategory;
  difficulty: StandardDifficulty;
  questionCount: number;
  estimatedTimeMinutes: number;
  progress?: number;
  tags?: string[];
  points?: number;
}

interface QuizCardProps {
  card: QuizCardData;
  onStart: (card: QuizCardData) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ card, onStart }) => {
  const difficultyLabelMap: Record<StandardDifficulty, { text: string; color: string }> = {
    easy: { text: 'Cơ bản', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    medium: { text: 'Thông hiểu', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    hard: { text: 'Vận dụng cao 9+', color: 'bg-purple-50 text-purple-700 border-purple-200' }
  };

  const skillColorMap: Record<string, string> = {
    vocabulary: 'bg-emerald-50 text-emerald-800',
    grammar: 'bg-blue-50 text-blue-800',
    reading: 'bg-purple-50 text-purple-800',
    listening: 'bg-indigo-50 text-indigo-800',
    mixed: 'bg-amber-50 text-amber-800'
  };

  const diffBadge = difficultyLabelMap[card.difficulty] || difficultyLabelMap.medium;

  return (
    <div className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl sm:rounded-3xl p-6 transition-all hover:shadow-md flex flex-col justify-between group">
      <div className="space-y-3">
        {/* Meta badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                skillColorMap[card.skill] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {card.skill}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${diffBadge.color}`}
            >
              {diffBadge.text}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{card.estimatedTimeMinutes}p</span>
          </div>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {card.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {card.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>{card.questionCount} câu hỏi</span>
        </div>

        <button
          type="button"
          onClick={() => onStart(card)}
          className="px-4 py-2 bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <span>Làm bài ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
