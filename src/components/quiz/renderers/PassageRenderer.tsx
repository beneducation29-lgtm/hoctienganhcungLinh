import React, { useState } from 'react';
import { BookOpen, Headphones, FileText, Volume2 } from 'lucide-react';
import { UniversalQuestion } from '../../../types/quiz';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';

interface PassageRendererProps {
  question: UniversalQuestion;
  selectedAnswer: any;
  onSelectAnswer: (answer: any) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const PassageRenderer: React.FC<PassageRendererProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const isListening = question.type === 'listening_comprehension' || question.skill === 'listening';

  const handlePlayTts = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = question.audioTranscript || question.passage || question.question;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-5">
      {/* Passage or Audio Player Card */}
      {isListening ? (
        <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-4 h-4" />
              <span>Bài nghe audio (Listening Track)</span>
            </span>
            <button
              type="button"
              onClick={handlePlayTts}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Phát Audio chuẩn bản ngữ</span>
            </button>
          </div>

          {/* Transcript toggle */}
          {question.audioTranscript && (
            <div className="pt-2 border-t border-blue-200/60">
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showTranscript ? 'Ẩn bản gỡ băng (Transcript)' : 'Xem bản gỡ băng (Transcript)'}</span>
              </button>

              {showTranscript && (
                <div className="mt-2.5 p-3.5 bg-white rounded-xl border border-blue-200 text-xs text-slate-700 leading-relaxed font-sans animate-in fade-in">
                  {question.audioTranscript}
                </div>
              )}
            </div>
          )}
        </div>
      ) : question.passage ? (
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Đoạn văn đọc hiểu (Reading Passage)</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-serif max-h-60 overflow-y-auto pr-2">
            {question.passage}
          </div>
        </div>
      ) : null}

      {/* Embedded Multiple Choice Question */}
      <MultipleChoiceRenderer
        question={question}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
        isReviewMode={isReviewMode}
        showImmediateFeedback={showImmediateFeedback}
        disabled={disabled}
      />
    </div>
  );
};
