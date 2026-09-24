/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Standardized VocabularyCard Component
 * Displays Word, IPA, Part of Speech, Meaning, Example, Translation, Difficulty, Tags & Mastery Status
 */

import React, { useState } from 'react';
import { Volume2, Bookmark, Check, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { VocabularyItem } from '../../types/contentArchitecture';
import { vocabularyProgressService, VocabularyMasteryStatus } from '../../services/vocabularyProgressService';

interface VocabularyCardProps {
  item: VocabularyItem & {
    grade?: string;
    unitTitle?: string;
    collocations?: string[];
  };
  onOpenDetail?: (item: any) => void;
  onPractice?: (item: any) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  onOpenDetail,
  onPractice
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const isMarked = vocabularyProgressService.isWordInReview(item.id);
  const [inReview, setInReview] = useState(isMarked);
  const status: VocabularyMasteryStatus = vocabularyProgressService.getWordStatus(item.id);
  const stats = vocabularyProgressService.getWordStats(item.id);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = vocabularyProgressService.toggleReview(item.id);
    setInReview(updated);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>Đã thành thạo</span>
          </span>
        );
      case 'familiar':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            <span>Khá quen thuộc</span>
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <span>Đang học ({stats.accuracy}%)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <span>Từ mới</span>
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(item)}
      className="group bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div className="space-y-3">
        {/* Top Header: Word, IPA, Part of Speech, Audio & Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-baseline flex-wrap gap-2">
              <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                {item.word}
              </h4>
              <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                {item.ipa}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 italic">
                ({item.partOfSpeech})
              </span>
            </div>
            {/* Vietnamese Meaning */}
            <p className="text-sm font-semibold text-slate-800">
              {item.meaningVi}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
              }`}
              title="Phát âm chuẩn bản ngữ"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                inReview
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
              }`}
              title={inReview ? 'Bỏ khỏi danh sách ôn tập' : 'Thêm vào danh sách ôn tập'}
            >
              <Bookmark className={`w-4 h-4 ${inReview ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* English Definition */}
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <strong className="text-slate-700 font-semibold">En:</strong> {item.meaning}
        </p>

        {/* Example Sentence */}
        <div className="border-l-2 border-blue-500 pl-3 py-0.5 text-xs space-y-0.5">
          <p className="font-medium text-slate-800 italic">
            "{item.example}"
          </p>
          {item.translation && (
            <p className="text-slate-500 text-[11px]">
              &rarr; {item.translation}
            </p>
          )}
        </div>

        {/* Collocations pill if available */}
        {item.collocations && item.collocations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.collocations.slice(0, 2).map((col, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                + {col}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Status Badge, Difficulty, and Actions */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {item.cefrLevel && (
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {item.cefrLevel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenDetail) onOpenDetail(item);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title="Xem chi tiết từ vựng"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {onPractice && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPractice(item);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              <span>Luyện tập</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
