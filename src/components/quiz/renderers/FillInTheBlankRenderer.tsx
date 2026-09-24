import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { UniversalQuestion } from '../../../types/quiz';
import { scoringService } from '../../../services/scoringService';

interface FillInTheBlankRendererProps {
  question: UniversalQuestion;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const FillInTheBlankRenderer: React.FC<FillInTheBlankRendererProps> = ({
  question,
  selectedAnswer = '',
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const isCorrect = scoringService.evaluateAnswer(question, selectedAnswer);

  return (
    <div className="space-y-4">
      {/* Context Sentence with Blank */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 leading-relaxed">
        {question.question}
      </div>

      {/* Input Box */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 block">
          Nhập từ hoặc cụm từ cần điền:
        </label>
        <div className="relative">
          <input
            type="text"
            value={selectedAnswer}
            disabled={disabled || isReviewMode || showImmediateFeedback}
            onChange={(e) => onSelectAnswer(e.target.value)}
            placeholder="Gõ câu trả lời của bạn vào đây..."
            className={`w-full px-4 py-3 text-sm font-medium rounded-xl border transition-all focus:outline-hidden focus:ring-2 ${
              (isReviewMode || showImmediateFeedback)
                ? isCorrect
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                  : 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-300'
                : 'bg-white border-slate-300 focus:border-blue-600 focus:ring-blue-500/20 text-slate-900'
            }`}
          />

          {(isReviewMode || showImmediateFeedback) && (
            <div className="absolute right-3.5 top-3.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Information */}
      {(isReviewMode || showImmediateFeedback) && (
        <div
          className={`p-3.5 rounded-xl border text-xs space-y-1 animate-in fade-in ${
            isCorrect
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            {isCorrect ? (
              <span>Chính xác!</span>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Đáp án đúng là:</span>
                <strong className="underline decoration-rose-400">
                  {String(question.correctAnswer)}
                </strong>
              </>
            )}
          </div>
          {question.acceptableAnswers && question.acceptableAnswers.length > 1 && (
            <p className="text-[11px] opacity-80">
              Các câu trả lời được chấp nhận khác: {question.acceptableAnswers.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
