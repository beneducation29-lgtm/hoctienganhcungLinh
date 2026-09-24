/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VocabularyReviewView Component
 * Dedicated review hub for words needing practice, low-accuracy items, and error items
 * Launches Quiz Engine via quizService and questionSelector!
 */

import React from 'react';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { vocabularyProgressService } from '../../services/vocabularyProgressService';
import { vocabularyService } from '../../services/vocabularyService';
import { VocabularyItem } from '../../types/contentArchitecture';

interface VocabularyReviewViewProps {
  onPracticeAllReviewWords: () => void;
  onPracticeSingleWord: (word: VocabularyItem) => void;
  onOpenWordDetail: (word: VocabularyItem) => void;
}

export const VocabularyReviewView: React.FC<VocabularyReviewViewProps> = ({
  onPracticeAllReviewWords,
  onPracticeSingleWord,
  onOpenWordDetail
}) => {
  const wordsToReview = vocabularyProgressService.getWordsToReview();

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Header Banner */}
      <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <RotateCcw className="w-4 h-4" />
            <span>Sổ tay ôn tập từ vựng cá nhân</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {wordsToReview.length > 0
              ? `Có ${wordsToReview.length} từ vựng cần được củng cố ngay`
              : 'Tất cả từ vựng đều đạt độ chính xác cao!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Hệ thống tự động tổng hợp các từ làm sai trong bài quiz, từ có độ chính xác dưới 70%, hoặc được bạn đánh dấu lưu lại.
          </p>
        </div>

        {wordsToReview.length > 0 && (
          <button
            onClick={onPracticeAllReviewWords}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện tập tất cả ({wordsToReview.length} từ)</span>
          </button>
        )}
      </div>

      {/* Review Items Grid */}
      {wordsToReview.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wordsToReview.map((word) => {
            const stat = vocabularyProgressService.getWordStats(word.id);
            return (
              <div
                key={word.id}
                onClick={() => onOpenWordDetail(word)}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {word.word}
                        </h4>
                        <span className="text-xs font-mono text-blue-600 font-medium">
                          {word.ipa}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {word.meaningVi}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleSpeak(word.word, e)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 italic">
                    "{word.example}"
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stat.accuracy < 70
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Độ chính xác: {stat.accuracy}%
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPracticeSingleWord(word);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Luyện ngay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">
              Không có từ vựng nào cần ôn tập khẩn cấp
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Bạn đang nắm rất vững các từ vựng đã học. Hãy tiếp tục khám phá các Unit mới hoặc luyện tập đề thi tổng hợp!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
