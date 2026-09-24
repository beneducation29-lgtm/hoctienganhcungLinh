import React, { useState, useEffect } from 'react';
import { X, Timer, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Question } from '../types';

interface QuizModalProps {
  title: string;
  subtitle: string;
  durationMinutes: number;
  questions: Question[];
  onClose: () => void;
  onCompleted?: (score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  title,
  subtitle,
  durationMinutes,
  questions,
  onClose,
  onCompleted
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = questions[currentIdx];
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    if (onCompleted) {
      onCompleted(correct);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percent: Math.round((correct / questions.length) * 100)
    };
  };

  const scoreResult = calculateScore();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header with Timer */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                secondsLeft < 60
                  ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isSubmitted ? (
          <div className="p-6 space-y-6">
            {/* Progress tracker */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Câu hỏi <strong className="text-slate-900">{currentIdx + 1}</strong> / {questions.length}
              </span>
              <span className="font-medium text-blue-600">{currentQ.difficulty}</span>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3.5 text-sm rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-medium ring-1 ring-blue-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer"
              >
                ← Câu trước
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((p) => Math.min(questions.length - 1, p + 1))}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Câu tiếp theo →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
                  >
                    Nộp bài thi
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-6 space-y-6">
            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl">
                {scoreResult.percent}%
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Bạn đã hoàn thành bài thử thách!
              </h4>
              <p className="text-sm text-slate-600">
                Đúng <strong className="text-blue-600 font-bold">{scoreResult.correct}</strong> trên{' '}
                <strong>{scoreResult.total}</strong> câu hỏi.
              </p>
            </div>

            {/* Detailed Answer Review */}
            <div className="space-y-4 max-h-72 overflow-y-auto border-t border-b border-slate-100 py-4">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        Câu {idx + 1}: {q.question.slice(0, 60)}...
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Sai
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500">
                      <strong>Đáp án đúng:</strong> {q.options[q.correctIndex]}
                    </p>
                    <p className="text-slate-600">{q.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
              >
                Đóng kết quả
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
