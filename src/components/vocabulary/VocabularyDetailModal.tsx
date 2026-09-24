/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VocabularyDetailModal Component
 * Full-screen modal presenting rich word metadata, audio, collocations, synonyms, and practice CTA
 */

import React, { useState } from 'react';
import {
  X,
  Volume2,
  Bookmark,
  Check,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { VocabularyItem } from '../../types/contentArchitecture';
import { vocabularyProgressService } from '../../services/vocabularyProgressService';

interface VocabularyDetailModalProps {
  item: (VocabularyItem & {
    grade?: string;
    unitTitle?: string;
    collocations?: string[];
    synonyms?: string[];
    antonyms?: string[];
  }) | null;
  onClose: () => void;
  onPracticeWord: (item: any) => void;
}

export const VocabularyDetailModal: React.FC<VocabularyDetailModalProps> = ({
  item,
  onClose,
  onPracticeWord
}) => {
  if (!item) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const isMarked = vocabularyProgressService.isWordInReview(item.id);
  const [inReview, setInReview] = useState(isMarked);
  const stats = vocabularyProgressService.getWordStats(item.id);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleBookmark = () => {
    const updated = vocabularyProgressService.toggleReview(item.id);
    setInReview(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {item.unitTitle || 'Từ vựng trọng tâm'}
            </span>
            {item.cefrLevel && (
              <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                CEFR {item.cefrLevel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                inReview
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
              }`}
              title={inReview ? 'Đã thêm vào danh sách ôn tập' : 'Lưu vào danh sách cần ôn tập'}
            >
              <Bookmark className={`w-4 h-4 ${inReview ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Word Title, IPA, and Pronunciation CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-baseline flex-wrap gap-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {item.word}
                </h2>
                <span className="text-sm font-semibold text-slate-500 italic">
                  ({item.partOfSpeech})
                </span>
              </div>
              <div className="text-base font-mono text-blue-600 mt-1">
                {item.ipa}
              </div>
              <div className="text-lg font-bold text-slate-800 mt-2">
                {item.meaningVi}
              </div>
            </div>

            <button
              onClick={handleSpeak}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-xs transition-all cursor-pointer self-start sm:self-auto ${
                isPlayingAudio
                  ? 'bg-blue-600 text-white animate-pulse'
                  : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isPlayingAudio ? 'Đang phát âm...' : 'Phát âm (Audio)'}</span>
            </button>
          </div>

          {/* Definition (English) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Định nghĩa Tiếng Anh</span>
            </h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm text-slate-800 leading-relaxed font-medium">
              {item.meaning}
            </div>
          </div>

          {/* Example in Context */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ví dụ ngữ cảnh</span>
            </h4>
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-1.5">
              <p className="text-sm font-semibold text-slate-900 italic">
                "{item.example}"
              </p>
              {item.translation && (
                <p className="text-xs text-slate-600">
                  &rarr; {item.translation}
                </p>
              )}
            </div>
          </div>

          {/* Common Collocations */}
          {item.collocations && item.collocations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Cụm từ cố định (Collocations)</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Synonyms & Antonyms */}
          {((item.synonyms && item.synonyms.length > 0) || (item.antonyms && item.antonyms.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.synonyms && item.synonyms.length > 0 && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase block mb-1">
                    Từ đồng nghĩa (Synonyms)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.synonyms.map((syn, idx) => (
                      <span key={idx} className="text-xs font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.antonyms && item.antonyms.length > 0 && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-rose-700 uppercase block mb-1">
                    Từ trái nghĩa (Antonyms)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.antonyms.map((ant, idx) => (
                      <span key={idx} className="text-xs font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Student Progress on this word */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Tiến độ học từ này: {stats.status === 'mastered' ? 'Đã thành thạo' : stats.status === 'familiar' ? 'Khá quen thuộc' : stats.status === 'learning' ? 'Đang học' : 'Chưa luyện tập'}
                </div>
                <div className="text-[11px] text-slate-500">
                  Đã luyện tập {stats.attempts} lần &bull; Độ chính xác {stats.accuracy}%
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                stats.accuracy >= 90
                  ? 'bg-emerald-100 text-emerald-800'
                  : stats.accuracy >= 70
                  ? 'bg-blue-100 text-blue-800'
                  : stats.attempts > 0
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {stats.accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleToggleBookmark}
            className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              inReview
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${inReview ? 'fill-amber-600' : ''}`} />
            <span>{inReview ? 'Đã lưu trong Sổ tay ôn tập' : 'Lưu vào Sổ tay ôn tập'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onPracticeWord(item);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Luyện tập ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
