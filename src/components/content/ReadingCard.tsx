import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { ReadingExercise, QuestionBankItem } from '../../types/contentArchitecture';
import { QuestionCard } from './QuestionCard';

interface ReadingCardProps {
  exercise: ReadingExercise;
  onComplete?: (score: number) => void;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({ exercise, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectAnswer = (qId: string, ans: number | string) => {
    setAnswers((p) => ({ ...p, [qId]: ans }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correct = 0;
    exercise.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    if (onComplete) {
      onComplete(correct);
    }
  };

  return (
    <div className="space-y-6">
      {/* Passage Card */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600 uppercase tracking-wider">
              Bài đọc học thuật · CEFR {exercise.level}
            </span>
            <span className="text-slate-400">· {exercise.wordCount} từ</span>
          </div>
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {exercise.estimatedTime} phút
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {exercise.title}
        </h3>

        {/* Featured Vocabulary Highlights */}
        {exercise.vocabulary.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Từ khóa trọng tâm:</span>
            {exercise.vocabulary.map((w, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-blue-100/70 text-blue-800 rounded font-mono font-medium text-[11px]"
              >
                {w}
              </span>
            ))}
          </div>
        )}

        {/* Passage Text */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif whitespace-pre-line bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          {exercise.passage}
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Câu hỏi kiểm tra đọc hiểu ({exercise.questions.length} câu)</span>
        </h4>

        {exercise.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            selectedAnswer={answers[q.id]}
            isSubmitted={isSubmitted}
            onSelectAnswer={(ans) => handleSelectAnswer(q.id, ans)}
          />
        ))}

        <div className="pt-3 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < exercise.questions.length}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all"
            >
              Chấm điểm bài đọc
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã nộp và chấm điểm thành công!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
