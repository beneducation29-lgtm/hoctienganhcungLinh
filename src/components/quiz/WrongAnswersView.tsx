import React, { useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Info,
  Tag
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import { WrongAnswerItem } from '../../types/quiz';
import { SkillCategory } from '../../types/contentArchitecture';

interface WrongAnswersViewProps {
  onStartRetry: (questionIds: string[]) => void;
  onBackToPractice: () => void;
}

export const WrongAnswersView: React.FC<WrongAnswersViewProps> = ({
  onStartRetry,
  onBackToPractice
}) => {
  const [wrongList, setWrongList] = useState<WrongAnswerItem[]>(() =>
    quizService.getWrongAnswers()
  );
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshList = () => {
    setWrongList(quizService.getWrongAnswers());
  };

  const filteredItems = wrongList.filter((item) => {
    if (selectedSkill !== 'all' && item.question.skill !== selectedSkill) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQuestion = item.question.question.toLowerCase().includes(q);
      const matchExplanation = item.question.explanation.toLowerCase().includes(q);
      if (!matchQuestion && !matchExplanation) return false;
    }
    return true;
  });

  const handleStartPracticeAll = () => {
    const ids = filteredItems.map((item) => item.question.id);
    if (ids.length > 0) {
      onStartRetry(ids);
    }
  };

  const handlePracticeSingle = (questionId: string) => {
    onStartRetry([questionId]);
  };

  const handleDismiss = (questionId: string) => {
    quizService.removeWrongAnswer(questionId);
    refreshList();
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            type="button"
            onClick={onBackToPractice}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2 cursor-pointer transition-colors block"
          >
            &larr; Quay lại khu vực ôn tập
          </button>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sổ Tay Câu Hỏi Sai (Wrong Answers Log)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tổng hợp các câu hỏi bạn từng làm sai. Luyện tập lại để củng cố lỗ hổng kiến thức.
          </p>
        </div>

        {/* Global Practice Again Button */}
        {wrongList.length > 0 && (
          <button
            type="button"
            onClick={handleStartPracticeAll}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện lại toàn bộ {wrongList.length} câu sai</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      {wrongList.length > 0 && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          {/* Skill selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'vocabulary', label: 'Từ vựng' },
              { id: 'grammar', label: 'Ngữ pháp' },
              { id: 'reading', label: 'Đọc hiểu' },
              { id: 'listening', label: 'Nghe hiểu' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSkill(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSkill === s.id
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ khóa câu sai..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-rose-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Main List / Empty State */}
      {wrongList.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-2xs">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Tuyệt vời! Bạn không có câu hỏi sai nào cần ôn tập
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Hồ sơ học tập của bạn hoàn toàn sạch lỗi sai. Tiếp tục duy trì phong độ và luyện tập thêm các đề thi mới nhé!
          </p>
          <button
            type="button"
            onClick={onBackToPractice}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Khám phá phòng luyện tập
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
          Không tìm thấy câu hỏi sai nào phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xs transition-all hover:border-rose-300"
            >
              {/* Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                    {item.question.skill}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Lớp {item.question.grade} · {item.question.difficulty} · CEFR {item.question.cefrLevel}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    · Nguồn: {item.quizTitle}
                  </span>
                </div>

                {/* Individual Retry Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePracticeSingle(item.question.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Luyện lại câu này</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDismiss(item.question.id)}
                    className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 cursor-pointer"
                    title="Đánh dấu đã hiểu, bỏ khỏi danh sách"
                  >
                    Đã hiểu ✓
                  </button>
                </div>
              </div>

              {/* Question stem */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {item.question.question}
              </h3>

              {/* Answers comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* User Answer (Wrong) */}
                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Bạn đã chọn:</span>
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-rose-950">
                    {item.userAnswerFormatted}
                  </p>
                </div>

                {/* Correct Answer */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đáp án chính xác:</span>
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                    {item.correctAnswerFormatted}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Giải thích chi tiết & Bẫy cần tránh:</span>
                </div>
                <p className="leading-relaxed font-sans">{item.question.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
