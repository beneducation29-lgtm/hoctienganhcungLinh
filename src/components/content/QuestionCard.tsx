import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { QuestionBankItem } from '../../types/contentArchitecture';

interface QuestionCardProps {
  question: QuestionBankItem;
  questionNumber?: number;
  selectedAnswer?: number | string;
  isSubmitted?: boolean;
  onSelectAnswer: (answer: number | string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber = 1,
  selectedAnswer,
  isSubmitted = false,
  onSelectAnswer
}) => {
  const [showHint, setShowHint] = useState(false);

  const getDifficultyBadge = (diff: QuestionBankItem['difficulty']) => {
    switch (diff) {
      case 'easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'hard':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">
            Câu {questionNumber}
          </span>
          <span
            className={`px-2 py-0.5 rounded font-medium border text-[10px] uppercase ${getDifficultyBadge(
              question.difficulty
            )}`}
          >
            {question.difficulty} · CEFR {question.cefrLevel}
          </span>
          <span className="text-slate-400 capitalize hidden sm:inline">
            · {question.skill}
          </span>
        </div>

        {question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium text-[11px] cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
          </button>
        )}
      </div>

      {/* Hint Alert */}
      {showHint && question.hint && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span><strong>Gợi ý:</strong> {question.hint}</span>
        </div>
      )}

      {/* Question stem */}
      <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
        {question.question}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctAnswer;

          let btnClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';
          if (isSubmitted) {
            if (isCorrect) {
              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
            } else if (isSelected) {
              btnClass = 'bg-red-50 border-red-400 text-red-900';
            }
          } else if (isSelected) {
            btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-medium ring-1 ring-blue-600/30';
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && onSelectAnswer(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 text-xs sm:text-sm border rounded-xl transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 font-bold text-slate-600 text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation when submitted */}
      {isSubmitted && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1 animate-in fade-in">
          <p className="font-bold text-slate-900">Lời giải chi tiết:</p>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
