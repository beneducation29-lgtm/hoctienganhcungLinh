import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { UniversalQuestion } from '../../../types/quiz';

interface TrueFalseRendererProps {
  question: UniversalQuestion;
  selectedAnswer: number | boolean | undefined;
  onSelectAnswer: (answer: number) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const TrueFalseRenderer: React.FC<TrueFalseRendererProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const options = [
    { label: 'True (Đúng)', value: 0 },
    { label: 'False (Sai)', value: 1 }
  ];

  // question.correctAnswer might be 0/1 or boolean true/false
  const correctIdx =
    typeof question.correctAnswer === 'boolean'
      ? question.correctAnswer
        ? 0
        : 1
      : Number(question.correctAnswer);

  const parsedSelected =
    typeof selectedAnswer === 'boolean'
      ? selectedAnswer
        ? 0
        : 1
      : selectedAnswer !== undefined
      ? Number(selectedAnswer)
      : undefined;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" role="radiogroup" aria-label={question.question}>
      {options.map((opt) => {
        const isSelected = parsedSelected === opt.value;
        const isCorrect = opt.value === correctIdx;

        let containerClass =
          'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-800';

        if (isReviewMode || showImmediateFeedback) {
          if (isCorrect) {
            containerClass = 'bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-400';
          } else if (isSelected && !isCorrect) {
            containerClass = 'bg-rose-50/80 border-rose-400 text-rose-950 ring-1 ring-rose-300';
          } else {
            containerClass = 'bg-white border-slate-200 text-slate-400 opacity-60';
          }
        } else if (isSelected) {
          containerClass =
            'bg-blue-50/80 border-blue-600 text-blue-950 font-medium ring-2 ring-blue-500/20';
        }

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled || isReviewMode || showImmediateFeedback}
            onClick={() => onSelectAnswer(opt.value)}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${containerClass}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                } ${
                  (isReviewMode || showImmediateFeedback) && isCorrect
                    ? 'bg-emerald-600 text-white'
                    : ''
                } ${
                  (isReviewMode || showImmediateFeedback) && isSelected && !isCorrect
                    ? 'bg-rose-600 text-white'
                    : ''
                }`}
              >
                {opt.value === 0 ? 'T' : 'F'}
              </span>
              <span className="text-sm font-semibold">{opt.label}</span>
            </div>

            {(isReviewMode || showImmediateFeedback) && (
              <div className="shrink-0">
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
