import React, { useState } from 'react';
import { Volume2, Bookmark, Check, Sparkles } from 'lucide-react';
import { VocabularyItem } from '../../types/contentArchitecture';

interface VocabularyCardProps {
  item: VocabularyItem;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ item }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-blue-400 hover:shadow-md transition-all">
      {/* Header: Word, IPA, Audio, Bookmark */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2.5">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">
              {item.word}
            </h4>
            <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {item.ipa}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 italic">
              ({item.partOfSpeech})
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-800 mt-1">
            {item.meaningVi}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleSpeak(item.word)}
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
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
            }`}
            title="Lưu vào sổ tay từ vựng"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* English Definition */}
      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <strong className="text-slate-700">En:</strong> {item.meaning}
      </p>

      {/* Example sentence with translation */}
      <div className="space-y-1 text-xs border-l-2 border-blue-500 pl-3 py-0.5">
        <p className="text-slate-800 font-medium italic">
          "{item.example}"
        </p>
        <p className="text-slate-500">
          &rarr; {item.translation}
        </p>
      </div>

      {/* Collocations */}
      {item.collocations && item.collocations.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="font-semibold text-slate-500">Collocations:</span>
          {item.collocations.map((c, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
