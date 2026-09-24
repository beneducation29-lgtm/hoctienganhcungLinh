import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, GripVertical, CheckCircle2, XCircle } from 'lucide-react';
import { UniversalQuestion, OrderingItem } from '../../../types/quiz';

interface OrderingRendererProps {
  question: UniversalQuestion;
  selectedAnswer: string[] | undefined; // array of item IDs in student order
  onSelectAnswer: (orderedIds: string[]) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const OrderingRenderer: React.FC<OrderingRendererProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const items = question.orderingItems || [];

  // Default order: if selectedAnswer exists use it, otherwise use initial scrambled or sequential
  const [currentOrder, setCurrentOrder] = useState<string[]>(() => {
    if (selectedAnswer && selectedAnswer.length === items.length) {
      return selectedAnswer;
    }
    return items.map((item) => item.id);
  });

  useEffect(() => {
    if (selectedAnswer && selectedAnswer.length === items.length) {
      setCurrentOrder(selectedAnswer);
    }
  }, [selectedAnswer, items]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (disabled || isReviewMode || showImmediateFeedback) return;
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIdx];
    newOrder[newIdx] = temp;

    setCurrentOrder(newOrder);
    onSelectAnswer(newOrder);
  };

  // Check correctness:
  const expectedOrder = [...items]
    .sort((a, b) => a.correctIndex - b.correctIndex)
    .map((item) => item.id);

  const isAllCorrect = currentOrder.every((id, idx) => id === expectedOrder[idx]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 font-medium">
        Sử dụng mũi tên <strong>Lên / Xuống</strong> để sắp xếp các thành phần theo đúng thứ tự logic:
      </p>

      <div className="space-y-2">
        {currentOrder.map((itemId, idx) => {
          const item = items.find((it) => it.id === itemId);
          if (!item) return null;

          const isItemAtCorrectPosition = item.correctIndex === idx;

          return (
            <div
              key={itemId}
              className={`p-3 sm:p-3.5 bg-white border rounded-xl flex items-center justify-between gap-3 shadow-2xs transition-all ${
                (isReviewMode || showImmediateFeedback)
                  ? isItemAtCorrectPosition
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950'
                    : 'border-rose-400 bg-rose-50/50 text-rose-950'
                  : 'border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-medium">{item.text}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {(isReviewMode || showImmediateFeedback) ? (
                  isItemAtCorrectPosition ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={idx === 0 || disabled}
                      onClick={() => moveItem(idx, 'up')}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
                      title="Chuyển lên trên"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === currentOrder.length - 1 || disabled}
                      onClick={() => moveItem(idx, 'down')}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition-colors"
                      title="Chuyển xuống dưới"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(isReviewMode || showImmediateFeedback) && (
        <div
          className={`p-3 rounded-xl border text-xs ${
            isAllCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <strong>{isAllCorrect ? 'Thứ tự hoàn toàn chính xác!' : 'Thứ tự đúng là:'}</strong>
          {!isAllCorrect && (
            <ol className="list-decimal list-inside mt-1.5 space-y-0.5 font-medium">
              {[...items]
                .sort((a, b) => a.correctIndex - b.correctIndex)
                .map((it) => (
                  <li key={it.id}>{it.text}</li>
                ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
