import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Link2 } from 'lucide-react';
import { UniversalQuestion, MatchingPair } from '../../../types/quiz';

interface MatchingRendererProps {
  question: UniversalQuestion;
  selectedAnswer: Record<string, string> | undefined; // map of pair.id -> rightText
  onSelectAnswer: (answer: Record<string, string>) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const MatchingRenderer: React.FC<MatchingRendererProps> = ({
  question,
  selectedAnswer = {},
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const pairs = question.matchingPairs || [];
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);

  // Collect available right options
  const rightOptions = pairs.map((p) => p.right);

  const handleSelectLeft = (leftId: string) => {
    if (disabled || isReviewMode || showImmediateFeedback) return;
    setActiveLeftId(activeLeftId === leftId ? null : leftId);
  };

  const handleSelectRight = (rightText: string) => {
    if (disabled || isReviewMode || showImmediateFeedback || !activeLeftId) return;

    const newAnswer = { ...selectedAnswer, [activeLeftId]: rightText };
    onSelectAnswer(newAnswer);
    setActiveLeftId(null);
  };

  const handleResetPair = (leftId: string) => {
    if (disabled || isReviewMode || showImmediateFeedback) return;
    const newAnswer = { ...selectedAnswer };
    delete newAnswer[leftId];
    onSelectAnswer(newAnswer);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          Hướng dẫn: Chạm vào một mục ở <strong>Cột A</strong>, sau đó chạm vào mục tương ứng ở <strong>Cột B</strong> để ghép đôi.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column (Items) */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Cột A (Thuật ngữ / Vấn đề)
          </span>
          {pairs.map((pair) => {
            const isSelectedLeft = activeLeftId === pair.id;
            const matchedRight = selectedAnswer[pair.id];
            const isCorrect = isReviewMode || showImmediateFeedback ? matchedRight === pair.right : false;

            return (
              <div
                key={pair.id}
                onClick={() => handleSelectLeft(pair.id)}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelectedLeft
                    ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20'
                    : matchedRight
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
                } ${
                  (isReviewMode || showImmediateFeedback)
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-400 text-rose-950'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{pair.left}</span>
                  {(isReviewMode || showImmediateFeedback) && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </span>
                  )}
                </div>

                {/* Display matched result underneath */}
                {matchedRight && (
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-blue-700 font-semibold">
                    <span className="truncate mr-1">&rarr; {matchedRight}</span>
                    {!isReviewMode && !showImmediateFeedback && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetPair(pair.id);
                        }}
                        className="text-slate-400 hover:text-rose-500 text-[10px] ml-1 shrink-0 cursor-pointer"
                        title="Hủy ghép đôi"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column (Definitions / Matches) */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Cột B (Ý nghĩa / Định nghĩa)
          </span>
          {rightOptions.map((rightText, rIdx) => {
            const isAssigned = Object.values(selectedAnswer).includes(rightText);

            return (
              <button
                key={rIdx}
                type="button"
                disabled={disabled || isReviewMode || showImmediateFeedback || isAssigned}
                onClick={() => handleSelectRight(rightText)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                  activeLeftId && !isAssigned
                    ? 'bg-amber-50/80 border-amber-400 hover:bg-amber-100 text-amber-950 ring-1 ring-amber-400'
                    : isAssigned
                    ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                    : 'bg-white border-slate-200 hover:border-slate-400 text-slate-700'
                }`}
              >
                {rightText}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
