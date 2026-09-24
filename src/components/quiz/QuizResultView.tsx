import React from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';

interface QuizResultViewProps {
  result: QuizResult;
  onReviewAnswers: () => void;
  onPracticeWrongAnswers: () => void;
  onRetryQuiz: () => void;
  onExit: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  result,
  onReviewAnswers,
  onPracticeWrongAnswers,
  onRetryQuiz,
  onExit
}) => {
  const isGreat = result.scorePercentage >= 80;
  const isPass = result.scorePercentage >= 60;

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 space-y-8 animate-in fade-in duration-300">
      {/* 1. Celebration Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-2 ring-8 ring-blue-50/50">
            {isGreat ? (
              <Sparkles className="w-8 h-8 text-amber-500" />
            ) : isPass ? (
              <Award className="w-8 h-8 text-blue-600" />
            ) : (
              <TrendingUp className="w-8 h-8 text-slate-600" />
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isGreat
                ? 'Xuất sắc! Bạn đã làm chủ bài học'
                : isPass
                ? 'Làm tốt lắm! Bạn đã vượt qua bài thi'
                : 'Cần ôn luyện thêm một chút!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
              {result.quizTitle}
            </p>
          </div>

          {/* Big Score Visualizer */}
          <div className="py-4">
            <div className="inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-5xl sm:text-6xl font-black text-blue-600 font-mono tracking-tight">
                {result.scorePercentage}%
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
                Điểm tổng kết
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Số câu đúng</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 font-mono mt-0.5">
                {result.correctQuestions} / {result.totalQuestions}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Độ chính xác</span>
              <div className="text-lg sm:text-xl font-bold text-blue-600 font-mono mt-0.5">
                {result.accuracyPercentage}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Thời gian làm</span>
              <div className="text-lg sm:text-xl font-bold text-slate-800 font-mono mt-0.5">
                {result.timeSpentFormatted}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Điểm tích lũy</span>
              <div className="text-lg sm:text-xl font-bold text-amber-600 font-mono mt-0.5">
                +{result.pointsEarned} pts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Skill Breakdown */}
      {result.skillBreakdown.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Phân tích chi tiết theo kỹ năng
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tỷ lệ trả lời chính xác trên từng hợp phần bài thi
            </p>
          </div>

          <div className="space-y-3">
            {result.skillBreakdown.map((sb) => (
              <div key={sb.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{sb.skillName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">
                      {sb.correctQuestions} / {sb.totalQuestions} câu
                    </span>
                    <span className="font-bold text-blue-600 font-mono">
                      {sb.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sb.percentage >= 80
                        ? 'bg-emerald-500'
                        : sb.percentage >= 50
                        ? 'bg-blue-600'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${sb.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Action Buttons */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
          {/* Review all answers */}
          <button
            type="button"
            onClick={onReviewAnswers}
            className="flex-1 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem lại toàn bộ đáp án & giải thích</span>
          </button>

          {/* Practice wrong questions if any */}
          {result.wrongQuestions.length > 0 && (
            <button
              type="button"
              onClick={onPracticeWrongAnswers}
              className="flex-1 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Luyện lại {result.wrongQuestions.length} câu đã làm sai</span>
            </button>
          )}

          {/* Retry Quiz */}
          <button
            type="button"
            onClick={onRetryQuiz}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại đề này</span>
          </button>

          {/* Return Home */}
          <button
            type="button"
            onClick={onExit}
            className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};
