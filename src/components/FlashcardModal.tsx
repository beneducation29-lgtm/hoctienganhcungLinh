import React, { useState } from 'react';
import { X, RotateCw, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { quickFlashcards } from '../data/mockData';

interface FlashcardModalProps {
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberedCount, setRememberedCount] = useState(0);

  const card = quickFlashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < quickFlashcards.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  const handleRemembered = () => {
    setRememberedCount((p) => p + 1);
    handleNext();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thẻ ghi nhớ trọng tâm (Spaced Flashcards)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Ôn tập nhanh công thức & từ vựng
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono">
              {currentIndex + 1} / {quickFlashcards.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[220px] bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-2xs text-center"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-600 uppercase">{card.topic}</span>
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Bấm để lật
              </span>
            </div>

            <div className="py-6">
              {!isFlipped ? (
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest block mb-2">
                    Câu hỏi / Thử thách
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">
                    {card.question}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <span className="text-xs text-emerald-600 uppercase tracking-widest block font-bold">
                    Đáp án chuẩn xác
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                    {card.answer}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    Mẹo ghi nhớ: {card.tip}
                  </p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              {!isFlipped ? 'Chạm vào thẻ để xem đáp án' : 'Chạm để xem lại câu hỏi'}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === quickFlashcards.length - 1}
              className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded-lg border border-slate-200"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRemembered}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Đã nhớ kỹ thẻ này</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
