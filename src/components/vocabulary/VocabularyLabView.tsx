/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VocabularyLabView Component (/vocabulary)
 * Interactive Vocabulary Learning Experience:
 * Hero, Progress stats, Recommended & Recent vocab, Vocabulary by Unit, Filterable Word Cards,
 * Flashcard Learning Mode, Detail Modal, and Seamless Quiz Engine Integration.
 */

import React, { useState } from 'react';
import {
  BookA,
  Sparkles,
  Search,
  Filter,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  Flame,
  Zap,
  Bookmark
} from 'lucide-react';
import { vocabularyService } from '../../services/vocabularyService';
import { vocabularyProgressService } from '../../services/vocabularyProgressService';
import { VocabularyItem, GradeLevel } from '../../types/contentArchitecture';
import { VocabularyCard } from './VocabularyCard';
import { VocabularyDetailModal } from './VocabularyDetailModal';
import { VocabularyLearningModal } from './VocabularyLearningModal';
import { VocabularyReviewView } from './VocabularyReviewView';

interface VocabularyLabViewProps {
  onStartQuizPractice: (title: string, subtitle: string, questions: any[]) => void;
  onNavigateToCurriculum?: () => void;
}

export const VocabularyLabView: React.FC<VocabularyLabViewProps> = ({
  onStartQuizPractice,
  onNavigateToCurriculum
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'by-unit' | 'review'>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCEFR, setSelectedCEFR] = useState<string>('all');

  // Modals state
  const [selectedWordForDetail, setSelectedWordForDetail] = useState<any | null>(null);
  const [learningModalWords, setLearningModalWords] = useState<any[] | null>(null);
  const [learningModalTitle, setLearningModalTitle] = useState<string>('');

  // Live stats from service
  const overallStats = vocabularyProgressService.getOverallStats();
  const recommendedWords = vocabularyService.getRecommendedWords(4);
  const recentWords = vocabularyService.getRecentWords(4);
  const unitGroups = vocabularyService.getUnitsWithVocab(selectedGrade !== 'all' ? selectedGrade : undefined);

  // Filtered words for "All" tab
  const filteredWords = vocabularyService.searchWords(searchQuery, {
    grade: selectedGrade !== 'all' ? selectedGrade : undefined,
    difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
    cefrLevel: selectedCEFR !== 'all' ? selectedCEFR : undefined
  });

  // Handler: Start Flashcard Learning for specific words
  const handleStartFlashcards = (words: any[], title: string) => {
    setLearningModalWords(words);
    setLearningModalTitle(title);
  };

  // Handler: Start Quiz Engine practice for specific word or group
  const handlePracticeWord = (word: VocabularyItem) => {
    // Import question selector dynamically to avoid cycle
    import('../../services/questionSelector').then(({ questionSelector }) => {
      let questions = questionSelector.getQuestionsForVocabulary(word.word, 6);
      if (questions.length === 0) {
        questions = questionSelector.getQuestionsBySkill('vocabulary', 6);
      }
      onStartQuizPractice(
        `Luyện tập Từ vựng: ${word.word}`,
        `Củng cố cách phát âm, nghĩa ngữ cảnh và cụm từ cố định của từ "${word.word}"`,
        questions
      );
    });
  };

  const handlePracticeUnitVocab = (unitTitle: string, unitId: string) => {
    import('../../services/questionSelector').then(({ questionSelector }) => {
      let questions = questionSelector.getQuestionsByUnitAndSkill(unitId, 'vocabulary');
      if (questions.length === 0) {
        questions = questionSelector.getQuestionsBySkill('vocabulary', 8);
      }
      onStartQuizPractice(
        `Luyện tập Trắc nghiệm: ${unitTitle}`,
        `Trọn bộ câu hỏi từ vựng trọng tâm theo chương trình Bộ GD&ĐT`,
        questions
      );
    });
  };

  const handlePracticeAllReview = () => {
    const reviewWords = vocabularyProgressService.getWordsToReview();
    import('../../services/questionSelector').then(({ questionSelector }) => {
      const questions = questionSelector.getQuestionsBySkill('vocabulary', Math.max(8, reviewWords.length * 2));
      onStartQuizPractice(
        'Ôn tập Từ vựng Yếu & Điểm Sai',
        'Bộ câu hỏi tổng hợp củng cố các từ vựng có độ chính xác dưới 70%',
        questions
      );
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-200">
      {/* 1. HERO SECTION */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
            <BookA className="w-3.5 h-3.5 text-blue-300" />
            <span>THPT Vocabulary Lab &bull; Phòng Thí Nghiệm Từ Vựng</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build your vocabulary.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Học từ mới, hiểu cách sử dụng và luyện tập ngay. Nắm vững hệ thống collocations, ngữ âm và nghĩa ngữ cảnh bám sát đề thi THPT.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleStartFlashcards(recommendedWords, 'Từ vựng Học thuật Trọng điểm')}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Học Flashcard ngay</span>
            </button>

            <button
              onClick={handlePracticeAllReview}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Ôn tập từ vựng ({overallStats.toReview})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng số từ</div>
          <div className="text-2xl font-extrabold text-slate-900">{overallStats.totalWords}</div>
          <div className="text-[10px] text-slate-400">Kho từ chuẩn hóa</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">Đã thành thạo</div>
          <div className="text-2xl font-extrabold text-emerald-600">{overallStats.mastered}</div>
          <div className="text-[10px] text-emerald-600 font-medium">&ge; 90% chính xác</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Đã học (Learned)</div>
          <div className="text-2xl font-extrabold text-blue-600">{overallStats.learned}</div>
          <div className="text-[10px] text-blue-600 font-medium">Familiar + Mastered</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">Đang học</div>
          <div className="text-2xl font-extrabold text-amber-600">{overallStats.learning}</div>
          <div className="text-[10px] text-amber-600 font-medium">Đã luyện tập</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">Cần ôn tập</div>
          <div className="text-2xl font-extrabold text-rose-600">{overallStats.toReview}</div>
          <div className="text-[10px] text-rose-600 font-medium">&lt; 70% hoặc có sai</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
          <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider flex items-center justify-between">
            <span>Độ chính xác</span>
            <Flame className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600">{overallStats.accuracy}%</div>
          <div className="text-[10px] text-slate-400">Chuỗi: {overallStats.streak} ngày</div>
        </div>
      </div>

      {/* 3. NAVIGATION TABS (All / By Curriculum / To Review) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tất cả từ vựng ({vocabularyService.getAllWords().length})
          </button>

          <button
            onClick={() => setActiveTab('by-unit')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'by-unit'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Theo Chương trình & Unit
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sổ tay cần ôn tập ({overallStats.toReview})</span>
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

      {/* 4. TAB 1: ALL VOCABULARY EXPLORER */}
      {activeTab === 'all' && (
        <div className="space-y-8">
          {/* Search & Filter Bar */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm từ vựng, phiên âm IPA, nghĩa tiếng Việt hoặc chủ điểm..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              {/* Difficulty */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">Độ khó: Tất cả</option>
                <option value="easy">Cơ bản (Easy)</option>
                <option value="medium">Trung bình (Medium)</option>
                <option value="hard">Nâng cao (Hard)</option>
              </select>

              {/* CEFR */}
              <select
                value={selectedCEFR}
                onChange={(e) => setSelectedCEFR(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">CEFR: Tất cả</option>
                <option value="A2">A2 (Căn bản)</option>
                <option value="B1">B1 (THPT Đạt chuẩn)</option>
                <option value="B2">B2 (Vận dụng cao 8+)</option>
                <option value="C1">C1 (Học sinh giỏi 9+)</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWords.map((word) => (
                <VocabularyCard
                  key={word.id}
                  item={word}
                  onOpenDetail={(item) => setSelectedWordForDetail(item)}
                  onPractice={(item) => handlePracticeWord(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-3">
              <BookA className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">
                Không tìm thấy từ vựng nào khớp với bộ lọc hiện tại.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('all');
                  setSelectedCEFR('all');
                  setSelectedGrade('all');
                }}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}

          {/* Recommended Vocabulary Shelf */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Từ vựng đề xuất học hôm nay</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Các thuật ngữ học thuật xuất hiện thường xuyên trong đề thi tốt nghiệp THPT
                </p>
              </div>

              <button
                onClick={() => handleStartFlashcards(recommendedWords, 'Từ vựng đề xuất học hôm nay')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Học toàn bộ bằng Flashcard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedWords.map((word) => (
                <div
                  key={word.id}
                  onClick={() => setSelectedWordForDetail(word)}
                  className="p-4 bg-blue-50/40 border border-blue-100 hover:border-blue-300 rounded-2xl transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800">{word.word}</span>
                    <span className="text-[10px] font-mono text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                      {word.ipa}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium truncate">
                    {word.meaningVi}
                  </p>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>{word.cefrLevel} &bull; {word.partOfSpeech}</span>
                    <span className="text-blue-600 font-bold hover:underline">Xem &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 2: VOCABULARY BY UNIT */}
      {activeTab === 'by-unit' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-center justify-between">
            <span>
              Phân loại từ vựng theo cấu trúc SGK: <strong>Khối lớp &rarr; Unit &rarr; Bài học</strong>
            </span>
            {onNavigateToCurriculum && (
              <button
                onClick={onNavigateToCurriculum}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Xem toàn bộ khung chương trình &rarr;
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {unitGroups.map((group) => (
              <div
                key={group.unitId}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        Lớp {group.grade}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {group.wordCount} từ vựng
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {group.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    {group.unitNumber}
                  </div>
                </div>

                {/* Sample Words Preview */}
                <div className="flex flex-wrap gap-2 py-1">
                  {group.words.map((w) => (
                    <span
                      key={w.id}
                      onClick={() => setSelectedWordForDetail(w)}
                      className="px-2.5 py-1 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-semibold border border-slate-200/80 transition-colors cursor-pointer"
                    >
                      {w.word}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => handleStartFlashcards(group.words, `Học Flashcard: ${group.title}`)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Học Flashcard</span>
                  </button>

                  <button
                    onClick={() => handlePracticeUnitVocab(group.title, group.unitId)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Luyện trắc nghiệm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 3: REVIEW SYSTEM */}
      {activeTab === 'review' && (
        <VocabularyReviewView
          onPracticeAllReviewWords={handlePracticeAllReview}
          onPracticeSingleWord={(word) => handlePracticeWord(word)}
          onOpenWordDetail={(word) => setSelectedWordForDetail(word)}
        />
      )}

      {/* MODAL 1: Word Detail */}
      <VocabularyDetailModal
        item={selectedWordForDetail}
        onClose={() => setSelectedWordForDetail(null)}
        onPracticeWord={(item) => {
          setSelectedWordForDetail(null);
          handlePracticeWord(item);
        }}
      />

      {/* MODAL 2: Flashcard Learning Session */}
      {learningModalWords && (
        <VocabularyLearningModal
          words={learningModalWords}
          title={learningModalTitle}
          onClose={() => setLearningModalWords(null)}
          onLaunchPractice={(words) => {
            setLearningModalWords(null);
            handlePracticeUnitVocab(learningModalTitle, words[0]?.unitId || 'unit-11-6');
          }}
        />
      )}
    </div>
  );
};
