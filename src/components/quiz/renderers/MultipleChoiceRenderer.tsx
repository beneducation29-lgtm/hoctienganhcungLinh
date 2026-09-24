import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { UniversalQuestion } from '../../../types/quiz';

interface MultipleChoiceRendererProps {
  question: UniversalQuestion;
  selectedAnswer: number | undefined;
  onSelectAnswer: (answer: number) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const MultipleChoiceRenderer: React.FC<MultipleChoiceRendererProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const options = question.options || [];
  const correctIdx = Number(question.correctAnswer);

  return (
    <div className="space-y-3" role="radiogroup" aria-label={question.question}>
      {options.map((optionText, idx) => {
        const isSelected = selectedAnswer === idx;
        const isCorrect = idx === correctIdx;
        const letter = String.fromCharCode(65 + idx); // A, B, C, D

        let containerClass =
          'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 text-slate-800';

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
            key={idx}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled || isReviewMode || showImmediateFeedback}
            onClick={() => onSelectAnswer(idx)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${containerClass}`}
          >
            <div className="flex items-start gap-3.5 pr-2">
              <span
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
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
                {letter}
              </span>
              <span className="text-sm leading-relaxed pt-0.5">{optionText}</span>
            </div>

            {/* Status icon for review mode */}
            {(isReviewMode || showImmediateFeedback) && (
              <div className="shrink-0">
                {isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                {isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
