import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  Eye,
  ShieldAlert
} from 'lucide-react';
import { QuizSession, QuizResult, UniversalQuestion, QuizMode } from '../../types/quiz';
import { quizService } from '../../services/quizService';
import { scoringService } from '../../services/scoringService';
import { QuestionRenderer } from './QuestionRenderer';
import { QuizResultView } from './QuizResultView';

interface QuizEngineProps {
  session: QuizSession;
  onExit: () => void;
  onPracticeWrongAnswers?: (wrongQuestionIds: string[]) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  session,
  onExit,
  onPracticeWrongAnswers
}) => {
  // Current question index
  const [currentIndex, setCurrentIndex] = useState(session.currentQuestionIndex || 0);
  // Answers map
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    Object.keys(session.answers || {}).forEach((qId) => {
      initial[qId] = session.answers[qId].selectedAnswer;
    });
    return initial;
  });

  // Immediate check feedback for Practice mode
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  // Result state
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Full review answers mode (walkthrough after submission)
  const [isFullReviewMode, setIsFullReviewMode] = useState<boolean>(false);

  // Question Navigator Drawer toggle
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Submit confirmation modal toggle
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(session.timeSpentSeconds || 0);
  const timeLimitSeconds = session.timeLimitMinutes ? session.timeLimitMinutes * 60 : null;

  // Active question
  const questions = session.questions;
  const currentQuestion: UniversalQuestion | undefined = questions[currentIndex];

  // Timer effect
  useEffect(() => {
    if (quizResult || isFullReviewMode) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        quizService.updateTimeSpent(next);

        // Auto-submit if timer reached
        if (timeLimitSeconds && next >= timeLimitSeconds) {
          handlePerformSubmit();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizResult, isFullReviewMode, timeLimitSeconds]);

  // Answer selection handler
  const handleSelectAnswer = (answerVal: any) => {
    if (quizResult && !isFullReviewMode) return;
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerVal
    }));

    // Record to service
    quizService.saveAnswer(currentQuestion.id, answerVal, elapsedSeconds);
  };

  // Immediate Check Answer (Practice Mode only)
  const handleCheckAnswer = () => {
    if (!currentQuestion) return;
    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      quizService.goToQuestion(currentIndex + 1);
    } else {
      // Last question: open submit confirmation
      setShowSubmitConfirm(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      quizService.goToQuestion(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
      quizService.goToQuestion(idx);
      setShowQuestionGrid(false);
    }
  };

  // Submission handler
  const handlePerformSubmit = () => {
    setShowSubmitConfirm(false);
    const result = quizService.submitQuiz();
    if (result) {
      setQuizResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format timer
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If result calculated and NOT in full review mode, render Result View
  if (quizResult && !isFullReviewMode) {
    return (
      <QuizResultView
        result={quizResult}
        onReviewAnswers={() => {
          setIsFullReviewMode(true);
          setCurrentIndex(0);
        }}
        onPracticeWrongAnswers={() => {
          if (onPracticeWrongAnswers && quizResult.wrongQuestions.length > 0) {
            onPracticeWrongAnswers(quizResult.wrongQuestions.map((q) => q.id));
          }
        }}
        onRetryQuiz={() => {
          const fresh = quizService.createQuiz({
            quizTitle: session.quizTitle,
            quizSubtitle: session.quizSubtitle,
            quizMode: session.quizMode,
            questions: session.questions,
            timeLimitMinutes: session.timeLimitMinutes
          });
          setAnswers({});
          setCheckedQuestions({});
          setQuizResult(null);
          setIsFullReviewMode(false);
          setCurrentIndex(0);
          setElapsedSeconds(0);
        }}
        onExit={onExit}
      />
    );
  }

  // Calculate answered count
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100);

  const isCurrentChecked = currentQuestion ? Boolean(checkedQuestions[currentQuestion.id]) : false;
  const isPracticeMode = session.quizMode === 'practice' || session.quizMode === 'wrong_answers_retry';

  return (
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExit}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Thoát phòng thi"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {session.quizTitle}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="capitalize font-semibold text-blue-600">
                  {session.quizMode === 'exam'
                    ? 'Chế độ Thi Thử (Exam Mode)'
                    : 'Chế độ Luyện Tập (Practice Mode)'}
                </span>
                <span>·</span>
                <span>{questions.length} câu hỏi</span>
              </div>
            </div>
          </div>

          {/* Right Header: Timer & Question Matrix Drawer Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {timeLimitSeconds
                  ? formatTime(Math.max(0, timeLimitSeconds - elapsedSeconds))
                  : formatTime(elapsedSeconds)}
              </span>
            </div>

            {/* Questions Grid Drawer Button */}
            <button
              type="button"
              onClick={() => setShowQuestionGrid(!showQuestionGrid)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Danh sách câu</span>
              <span className="font-mono font-bold">
                {answeredCount}/{questions.length}
              </span>
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>
              Câu hỏi {currentIndex + 1} trên {questions.length}
            </span>
            <span className="font-mono">{progressPercentage}% hoàn thành</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Question Navigator Drawer (Drop-down matrix) */}
      {showQuestionGrid && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Bảng ma trận câu hỏi
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                Đang làm
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Đã trả lời
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" />
                Chưa làm
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAnswered =
                answers[q.id] !== undefined &&
                answers[q.id] !== null &&
                answers[q.id] !== '';
              const isCurrent = idx === currentIndex;

              let btnColor = 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
              if (isCurrent) {
                btnColor = 'bg-blue-600 text-white border-blue-600 font-bold ring-2 ring-blue-400/30';
              } else if (isAnswered) {
                btnColor = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`h-9 rounded-xl border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${btnColor}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Question Renderer */}
      {currentQuestion ? (
        <QuestionRenderer
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestion.id]}
          onSelectAnswer={handleSelectAnswer}
          isReviewMode={isFullReviewMode}
          showImmediateFeedback={isPracticeMode && isCurrentChecked}
          disabled={isFullReviewMode}
        />
      ) : (
        <div className="p-8 bg-white rounded-2xl border text-center text-slate-500">
          Không tìm thấy câu hỏi tương ứng.
        </div>
      )}

      {/* 4. Navigation & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Previous button */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {/* Center: Immediate check answer (in Practice Mode only, when answered but not checked) */}
        {isPracticeMode && !isFullReviewMode && currentQuestion && (
          <div>
            {!isCurrentChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={answers[currentQuestion.id] === undefined}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 disabled:opacity-40 text-amber-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Kiểm tra đáp án câu này</span>
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Đã kiểm tra</span>
              </span>
            )}
          </div>
        )}

        {/* Next or Finish Button */}
        <div className="flex items-center gap-2">
          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Câu tiếp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : !isFullReviewMode ? (
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Nộp bài & Chấm điểm</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsFullReviewMode(false)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Trở lại Bảng Kết Quả
            </button>
          )}
        </div>
      </div>

      {/* 5. Submit Summary Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Xác nhận nộp bài thi
                </h3>
                <p className="text-xs text-slate-500">
                  Kiểm tra lại trạng thái câu trả lời trước khi gửi
                </p>
              </div>
            </div>

            {/* Answered summary stats */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Tổng số câu hỏi:</span>
                <strong className="text-slate-900">{questions.length} câu</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Đã trả lời:</span>
                <strong className="text-emerald-600 font-bold">
                  {answeredCount} câu
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Chưa trả lời:</span>
                <strong
                  className={
                    questions.length - answeredCount > 0
                      ? 'text-rose-600 font-bold'
                      : 'text-slate-500'
                  }
                >
                  {questions.length - answeredCount} câu
                </strong>
              </div>
            </div>

            {questions.length - answeredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                Lưu ý: Bạn còn <strong>{questions.length - answeredCount} câu</strong> chưa chọn đáp án. Bạn có muốn quay lại kiểm tra không?
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Quay lại làm tiếp
              </button>

              <button
                type="button"
                onClick={handlePerformSubmit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
