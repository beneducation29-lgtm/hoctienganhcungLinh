/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VocabularyLearningModal Component
 * Interactive flashcard learning mode:
 * Flow: Word -> Try to remember -> Reveal meaning -> Example -> Next
 * Only marks as learned after completing the full session or practice!
 */

import React, { useState } from 'react';
import {
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { VocabularyItem } from '../../types/contentArchitecture';
import { vocabularyProgressService } from '../../services/vocabularyProgressService';

interface VocabularyLearningModalProps {
  words: (VocabularyItem & {
    grade?: string;
    unitTitle?: string;
    collocations?: string[];
  })[];
  title?: string;
  onClose: () => void;
  onLaunchPractice: (words: VocabularyItem[]) => void;
}

export const VocabularyLearningModal: React.FC<VocabularyLearningModalProps> = ({
  words,
  title = 'Phiên Học Flashcard Từ Vựng',
  onClose,
  onLaunchPractice
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!words || words.length === 0) return null;

  const currentWord = words[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / words.length) * 100);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    // Record view of current word
    vocabularyProgressService.recordWordViewed(currentWord.id);

    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      // Completed the session
      const wordIds = words.map((w) => w.id);
      vocabularyProgressService.completeLearningSession(wordIds);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsRevealed(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden min-h-[480px]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
            <p className="text-[11px] text-slate-500">
              Ghi nhớ từ vựng &bull; Từ {currentIndex + 1} / {words.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {progressPercent}%
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Zone */}
        {!isCompleted ? (
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
            {/* Step 1: Word Front */}
            <div className="text-center space-y-3 pt-4">
              <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Thử nhớ lại nghĩa của từ
              </span>

              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {currentWord.word}
              </h2>

              <div className="flex items-center justify-center gap-3">
                <span className="text-sm font-mono text-blue-600 font-semibold bg-blue-50/80 px-2.5 py-0.5 rounded-md">
                  {currentWord.ipa}
                </span>
                <span className="text-xs font-semibold text-slate-500 italic">
                  ({currentWord.partOfSpeech})
                </span>
                <button
                  onClick={() => handleSpeak(currentWord.word)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  title="Phát âm"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step 2: Hidden / Revealed Content */}
            <div className="min-h-[140px] flex items-center justify-center">
              {!isRevealed ? (
                <button
                  onClick={() => setIsRevealed(true)}
                  className="group px-6 py-3.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-dashed border-slate-300 hover:border-blue-300 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span>Bấm để hiện nghĩa & ví dụ minh họa</span>
                </button>
              ) : (
                <div className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3 animate-in fade-in duration-200 text-left">
                  <div>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-0.5">
                      Nghĩa Tiếng Việt:
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      {currentWord.meaningVi}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Định nghĩa En: {currentWord.meaning}
                    </span>
                  </div>

                  <div className="border-t border-blue-100 pt-2 text-xs">
                    <p className="font-semibold text-slate-800 italic">
                      "{currentWord.example}"
                    </p>
                    {currentWord.translation && (
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        &rarr; {currentWord.translation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Từ trước</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIndex === words.length - 1 ? 'Hoàn thành phiên' : 'Từ tiếp theo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Xuất sắc! Đã hoàn thành phiên học
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Bạn đã ghi nhớ {words.length} từ vựng. Trạng thái các từ đã được cập nhật vào tiến độ học tập.
              </p>
            </div>

            <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-around text-center">
              <div>
                <div className="text-xl font-extrabold text-slate-900">{words.length}</div>
                <div className="text-[11px] font-semibold text-slate-500">Từ đã học</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <div className="text-xl font-extrabold text-emerald-600">100%</div>
                <div className="text-[11px] font-semibold text-slate-500">Hoàn thành</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
              <button
                onClick={handleRestart}
                className="w-full sm:w-1/2 px-4 py-3 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Học lại lần nữa</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onLaunchPractice(words);
                }}
                className="w-full sm:w-1/2 px-4 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Luyện trắc nghiệm ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
