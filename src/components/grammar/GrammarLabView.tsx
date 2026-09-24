/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GrammarLabView Component (/grammar)
 * Comprehensive Grammar Learning Experience:
 * Hero, Topic Mastery Stats, Filterable Topic Cards with Formula Displays,
 * Quick Check diagnostics, Detailed Theory Modals, and direct Quiz Engine trigger.
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Layers,
  BookOpen,
  Zap,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Award,
  Filter,
  Check
} from 'lucide-react';
import { grammarService } from '../../services/grammarService';
import { grammarProgressService, GrammarMasteryStatus } from '../../services/grammarProgressService';
import { ExtendedGrammarTopic } from '../../data/mockGrammarData';
import { GradeLevel } from '../../types/contentArchitecture';
import { GrammarTopicDetailModal } from './GrammarTopicDetailModal';

interface GrammarLabViewProps {
  onStartQuizPractice: (title: string, subtitle: string, questions: any[]) => void;
  onNavigateToCurriculum?: () => void;
}

export const GrammarLabView: React.FC<GrammarLabViewProps> = ({
  onStartQuizPractice,
  onNavigateToCurriculum
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'review'>('all');

  // Modal state
  const [selectedTopic, setSelectedTopic] = useState<ExtendedGrammarTopic | null>(null);
  const [modalTab, setModalTab] = useState<'explanation' | 'quick-check'>('explanation');

  // Stats
  const overallStats = grammarProgressService.getOverallStats();
  const recommendedTopics = grammarService.getRecommendedTopics(3);
  const topicsToReview = grammarProgressService.getTopicsToReview();

  // Filtered topics
  const filteredTopics = grammarService.searchTopics(searchQuery, {
    grade: selectedGrade !== 'all' ? selectedGrade : undefined,
    difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined
  });

  const handleOpenTheory = (topic: ExtendedGrammarTopic) => {
    setSelectedTopic(topic);
    setModalTab('explanation');
  };

  const handleOpenQuickCheck = (topic: ExtendedGrammarTopic) => {
    setSelectedTopic(topic);
    setModalTab('quick-check');
  };

  const handlePracticeTopicWithQuiz = (topic: ExtendedGrammarTopic) => {
    import('../../services/questionSelector').then(({ questionSelector }) => {
      let questions = questionSelector.getQuestionsForGrammarTopic(topic.id, 8);
      if (questions.length === 0) {
        questions = questionSelector.getQuestionsByUnitAndSkill(topic.unitId, 'grammar');
      }
      if (questions.length === 0) {
        questions = questionSelector.getQuestionsBySkill('grammar', 8);
      }
      onStartQuizPractice(
        `Luyện tập Trắc nghiệm: ${topic.title}`,
        `Chinh phục các dạng bài thi THPT về ${topic.title}`,
        questions
      );
    });
  };

  const handlePracticeAllReview = () => {
    import('../../services/questionSelector').then(({ questionSelector }) => {
      const questions = questionSelector.getQuestionsBySkill('grammar', 10);
      onStartQuizPractice(
        'Luyện tập Củng cố Toàn bộ Ngữ pháp Yếu',
        'Bộ đề chọn lọc khắc phục bẫy đề thi và củng cố kiến thức ngữ pháp',
        questions
      );
    });
  };

  const getStatusBadge = (topicId: string) => {
    const status: GrammarMasteryStatus = grammarProgressService.getTopicStatus(topicId);
    const stats = grammarProgressService.getTopicStats(topicId);

    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>Thành thạo ({stats.accuracy}%)</span>
          </span>
        );
      case 'familiar':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            <span>Khá vững ({stats.accuracy}%)</span>
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <span>Cần luyện ({stats.accuracy}%)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <span>Chưa học</span>
          </span>
        );
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-200">
      {/* 1. HERO SECTION */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-300" />
            <span>THPT Grammar Lab &bull; Phòng Thí Nghiệm Ngữ Pháp</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master English Grammar.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hiểu bản chất cấu trúc, nhận diện bẫy đề thi và luyện tập phản xạ. Từng chủ điểm được trang bị công thức trực quan, ví dụ song ngữ và Quick Check tương tác.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleOpenTheory(recommendedTopics[0])}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Chủ điểm trọng tâm: {recommendedTopics[0]?.title}</span>
            </button>

            {overallStats.toReview > 0 && (
              <button
                onClick={handlePracticeAllReview}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span>Củng cố chủ điểm yếu ({overallStats.toReview})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chủ điểm</div>
          <div className="text-2xl font-extrabold text-slate-900">{overallStats.totalTopics}</div>
          <div className="text-[10px] text-slate-400">Trọng tâm 10 - 12</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">Thành thạo</div>
          <div className="text-2xl font-extrabold text-emerald-600">{overallStats.mastered}</div>
          <div className="text-[10px] text-emerald-600 font-medium">&ge; 90% chính xác</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Khá vững</div>
          <div className="text-2xl font-extrabold text-blue-600">{overallStats.familiar}</div>
          <div className="text-[10px] text-blue-600 font-medium">&ge; 70% chính xác</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">Đang luyện</div>
          <div className="text-2xl font-extrabold text-amber-600">{overallStats.learning}</div>
          <div className="text-[10px] text-amber-600 font-medium">&lt; 70%</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">Cần ôn tập</div>
          <div className="text-2xl font-extrabold text-rose-600">{overallStats.toReview}</div>
          <div className="text-[10px] text-rose-600 font-medium">Bẫy sai</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">Độ chính xác</div>
          <div className="text-2xl font-extrabold text-indigo-600">{overallStats.accuracy}%</div>
          <div className="text-[10px] text-slate-400">Toàn bộ trắc nghiệm</div>
        </div>
      </div>

      {/* 3. TABS & GRADE FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tất cả chủ điểm ({grammarService.getAllTopics().length})
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chủ điểm cần ôn tập ({overallStats.toReview})</span>
          </button>
        </div>

        {/* Grade Quick Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          {(['all', '10', '11', '12'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === g
                  ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {g === 'all' ? 'Tất cả khối' : `Lớp ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT */}
      {activeTab === 'all' ? (
        <div className="space-y-8">
          {/* Search Bar */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chủ điểm ngữ pháp, cấu trúc, trạng từ hoặc từ khóa..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">Độ khó: Tất cả</option>
                <option value="easy">Cơ bản (Easy)</option>
                <option value="medium">Trung bình (Medium)</option>
                <option value="hard">Nâng cao 9+ (Hard)</option>
              </select>
            </div>
          </div>

          {/* Grammar Topic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        Lớp {topic.grade} &bull; {topic.unitTitle}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {topic.level}
                      </span>
                    </div>

                    {getStatusBadge(topic.id)}
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => handleOpenTheory(topic)}>
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {topic.shortDescription}
                    </p>
                  </div>

                  {/* Structure Formula Preview Box */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-mono text-xs text-blue-900 font-semibold truncate">
                    {topic.structure}
                  </div>

                  {/* Example Snippet */}
                  <div className="text-xs text-slate-700 border-l-2 border-blue-500 pl-2.5 py-0.5 italic">
                    "{topic.examples[0]?.en}"
                  </div>
                </div>

                {/* Card Actions: Theory, Quick Check, Full Practice */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTheory(topic)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lý thuyết</span>
                    </button>

                    <button
                      onClick={() => handleOpenQuickCheck(topic)}
                      className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>Quick Check</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handlePracticeTopicWithQuiz(topic)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Luyện Quiz</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Exam Grammar Section */}
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Chủ điểm ngữ pháp điểm 9+ cần thành thạo</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleOpenTheory(topic)}
                  className="p-4 bg-indigo-50/40 border border-indigo-100 hover:border-indigo-300 rounded-2xl transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900">{topic.title}</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                      {topic.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono truncate">
                    {topic.structure}
                  </p>
                  <div className="text-[11px] text-blue-600 font-bold pt-1 flex items-center gap-1">
                    <span>Xem lý thuyết & bẫy đề thi</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Review Tab */
        <div className="space-y-6">
          <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <RotateCcw className="w-4 h-4" />
                <span>Sổ tay ngữ pháp cần củng cố</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {topicsToReview.length > 0
                  ? `Có ${topicsToReview.length} chủ điểm ngữ pháp có độ chính xác dưới 70%`
                  : 'Tất cả chủ điểm ngữ pháp đều đạt kết quả tốt!'}
              </h2>
              <p className="text-xs text-slate-600">
                Hệ thống nhận diện dựa trên kết quả các bài trắc nghiệm và câu hỏi Quick Check bạn đã thực hiện.
              </p>
            </div>

            {topicsToReview.length > 0 && (
              <button
                onClick={handlePracticeAllReview}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện tập tất cả chủ điểm yếu</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topicsToReview.map((topic) => (
              <div
                key={topic.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {topic.shortDescription}
                      </p>
                    </div>
                    {getStatusBadge(topic.id)}
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-xs text-blue-900">
                    {topic.structure}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenTheory(topic)}
                    className="text-xs font-bold text-slate-700 hover:text-blue-600"
                  >
                    Xem lại lý thuyết &rarr;
                  </button>

                  <button
                    onClick={() => handlePracticeTopicWithQuiz(topic)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                  >
                    Luyện tập ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <GrammarTopicDetailModal
        topic={selectedTopic}
        initialTab={modalTab}
        onClose={() => setSelectedTopic(null)}
        onLaunchPractice={(topic) => {
          setSelectedTopic(null);
          handlePracticeTopicWithQuiz(topic);
        }}
      />
    </div>
  );
};
