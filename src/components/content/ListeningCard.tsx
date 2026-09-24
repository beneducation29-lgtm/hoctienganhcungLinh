import React, { useState } from 'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { ListeningExercise } from '../../types/contentArchitecture';
import { QuestionCard } from './QuestionCard';

interface ListeningCardProps {
  exercise: ListeningExercise;
  onComplete?: (score: number) => void;
}

export const ListeningCard: React.FC<ListeningCardProps> = ({
  exercise,
  onComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qId: string, ans: number | string) => {
    setAnswers((p) => ({ ...p, [qId]: ans }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correct = 0;
    exercise.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    if (onComplete) onComplete(correct);
  };

  return (
    <div className="space-y-6">
      {/* Audio Player Card */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-400" />
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Audio Track · {exercise.title}
            </span>
          </div>
          <span className="font-mono text-blue-300">
            {formatSeconds(Math.round((progress / 100) * exercise.duration))} /{' '}
            {formatSeconds(exercise.duration)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.round((clickX / rect.width) * 100);
              setProgress(Math.max(0, Math.min(100, newProgress)));
            }}
            className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer"
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>00:00</span>
            <span>Tốc độ phát: 1.0x</span>
            <span>{formatSeconds(exercise.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
          >
            -10s
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
          >
            +10s
          </button>
        </div>
      </div>

      {/* Transcript toggle */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>{showTranscript ? 'Ẩn bản gỡ băng (Transcript)' : 'Xem bản gỡ băng (Transcript)'}</span>
        </button>
        <span>Khuyên dùng: Nghe 2 lần trước khi đọc transcript</span>
      </div>

      {showTranscript && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-line animate-in fade-in">
          {exercise.audioTranscript}
        </div>
      )}

      {/* Listening Questions */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-900">
          Câu hỏi kiểm tra nghe hiểu ({exercise.questions.length} câu)
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

        <div className="pt-2 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < exercise.questions.length}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Nộp bài nghe
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã hoàn thành phần nghe hiểu!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
