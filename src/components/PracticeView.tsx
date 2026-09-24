import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  Award,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Languages,
  Target,
  AlertTriangle,
  Play
} from 'lucide-react';
import { GradeLevel, SkillCategory, StandardDifficulty, ReviewSet } from '../types/contentArchitecture';
import { UniversalQuestion, QuizSession, QuizMode } from '../types/quiz';
import { quizService } from '../services/quizService';
import { questionSelector } from '../services/questionSelector';
import { contentService } from '../services/contentService';
import { QuizEngine } from './quiz/QuizEngine';
import { WrongAnswersView } from './quiz/WrongAnswersView';
import { QuizCard, QuizCardData } from './quiz/QuizCard';

interface PracticeViewProps {
  onOpenFlashcards: () => void;
  initialMode?: 'sets' | 'wrong_answers';
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  onOpenFlashcards,
  initialMode = 'sets'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sets' | 'wrong_answers'>(initialMode);
  const [activeQuizSession, setActiveQuizSession] = useState<QuizSession | null>(null);

  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const wrongAnswersCount = quizService.getWrongAnswers().length;

  // Curated Quiz Cards from Question Bank
  const availableQuizzes: QuizCardData[] = [
    {
      id: 'daily-challenge',
      title: 'Daily English Challenge: Phản xạ 10 câu',
      description: 'Thử thách hàng ngày kết hợp đa kỹ năng Từ vựng, Ngữ pháp, Ngữ âm và Giao tiếp xã hội.',
      skill: 'mixed',
      difficulty: 'medium',
      questionCount: 10,
      estimatedTimeMinutes: 10,
      tags: ['Daily', 'Mixed 4 Skills', 'Phản xạ nhanh'],
      points: 10
    },
    {
      id: 'quiz-vocab-heritage',
      title: 'Từ vựng & Cụm từ Di sản Văn hóa THPT',
      description: 'Chinh phục các collocation học thuật: intangible heritage, safeguard, landscape, restoration.',
      skill: 'vocabulary',
      difficulty: 'medium',
      questionCount: 8,
      estimatedTimeMinutes: 12,
      tags: ['Collocations', 'SGK 11', 'UNESCO'],
      points: 8
    },
    {
      id: 'quiz-grammar-advanced',
      title: 'Ngữ pháp Chuyên sâu: Đảo ngữ & Rút gọn 9+',
      description: 'Làm chủ các cấu trúc phân loại thí sinh trong kỳ thi tốt nghiệp: Not until, Hardly... when, To-infinitive.',
      skill: 'grammar',
      difficulty: 'hard',
      questionCount: 8,
      estimatedTimeMinutes: 15,
      tags: ['Đảo ngữ', 'Vận dụng cao 9+', 'Lớp 12'],
      points: 8
    },
    {
      id: 'quiz-reading-academic',
      title: 'Đọc hiểu Học thuật: Skimming & Scanning',
      description: 'Rèn luyện phản xạ bắt bẫy từ quy chiếu, từ đồng nghĩa trong ngữ cảnh và ý chính tác giả.',
      skill: 'reading',
      difficulty: 'hard',
      questionCount: 6,
      estimatedTimeMinutes: 15,
      tags: ['Academic Reading', 'Skimming', 'Context Clues'],
      points: 6
    },
    {
      id: 'quiz-listening-interview',
      title: 'Luyện Nghe Audio & Ngữ điệu Tự nhiên',
      description: 'Nghe hiểu bài phỏng vấn chuyên gia UNESCO về quần thể Tràng An và hiện tượng nối âm connected speech.',
      skill: 'listening',
      difficulty: 'medium',
      questionCount: 6,
      estimatedTimeMinutes: 12,
      tags: ['Audio Track', 'Listening Comprehension', 'Phonetics'],
      points: 6
    }
  ];

  // Filtering
  const filteredQuizzes = availableQuizzes.filter((card) => {
    if (selectedSkill !== 'all' && card.skill !== selectedSkill) return false;
    if (selectedDifficulty !== 'all' && card.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Launch a quiz with QuizEngine
  const handleStartQuizCard = (card: QuizCardData, mode: QuizMode = 'practice') => {
    let questions: UniversalQuestion[] = [];

    if (card.skill === 'mixed') {
      questions = questionSelector.getMixedQuestions(card.questionCount);
    } else {
      questions = questionSelector.getQuestionsBySkill(card.skill, card.questionCount);
    }

    const session = quizService.createQuiz({
      quizTitle: card.title,
      quizSubtitle: card.description,
      quizMode: mode,
      skill: card.skill,
      questions,
      timeLimitMinutes: mode === 'exam' ? card.estimatedTimeMinutes : undefined,
      randomize: true
    });

    setActiveQuizSession(session);
  };

  // Launch Retry Wrong Questions with QuizEngine
  const handleStartRetryWrongQuestions = (questionIds: string[]) => {
    const session = quizService.retryWrongAnswers('hs-student-01', questionIds);
    setActiveQuizSession(session);
  };

  // If a Quiz is currently active, render the unified QuizEngine
  if (activeQuizSession) {
    return (
      <QuizEngine
        session={activeQuizSession}
        onExit={() => setActiveQuizSession(null)}
        onPracticeWrongAnswers={(ids) => handleStartRetryWrongQuestions(ids)}
      />
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Hệ thống Đề thi & Ngân hàng Câu hỏi Chuẩn hóa
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Phòng Luyện Thi & Kiểm Tra Đánh Giá
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Động cơ Quiz Engine đa năng hỗ trợ 8 dạng câu hỏi và 2 chế độ luyện tập bám sát format đề thi THPT.
          </p>
        </div>

        {/* Action button: Flashcards */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenFlashcards}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Thẻ Flashcards</span>
          </button>
        </div>
      </div>

      {/* 2. Top Navigation Tabs: Quizzes vs Wrong Answers */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('sets')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'sets'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Đề Ôn Tập & Đề Thi Thử</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('wrong_answers')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'wrong_answers'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Sổ Tay Câu Sai</span>
          {wrongAnswersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-100 text-rose-700 font-bold">
              {wrongAnswersCount}
            </span>
          )}
        </button>
      </div>

      {/* 3. Sub-View: Wrong Answers Log */}
      {activeSubTab === 'wrong_answers' ? (
        <WrongAnswersView
          onStartRetry={handleStartRetryWrongQuestions}
          onBackToPractice={() => setActiveSubTab('sets')}
        />
      ) : (
        /* 4. Sub-View: Practice Sets & Filter */
        <div className="space-y-8">
          {/* Quick Banner: Daily English Challenge Hero Card */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Thử thách hàng ngày hôm nay
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Daily English Challenge: 10 Câu Phản Xạ Nhanh
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Tập hợp 10 câu hỏi chọn lọc từ ngân hàng đề THPT bao quát từ vựng, ngữ pháp, ngữ âm và đọc hiểu. Hoàn thành chỉ trong 10 phút để duy trì chuỗi Streak!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  handleStartQuizCard(availableQuizzes[0], 'practice')
                }
                className="px-5 py-3 bg-white hover:bg-slate-50 text-blue-900 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
              >
                <Play className="w-4 h-4 fill-blue-900" />
                <span>Luyện tập ngay</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleStartQuizCard(availableQuizzes[0], 'exam')
                }
                className="px-5 py-3 bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/40 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span>Thi bấm giờ (Exam)</span>
              </button>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" />
              <span>Bộ lọc chuyên đề & Độ khó</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Skill filter */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Kỹ năng:
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'mixed', label: 'Tổng hợp' },
                    { id: 'vocabulary', label: 'Từ vựng' },
                    { id: 'grammar', label: 'Ngữ pháp' },
                    { id: 'reading', label: 'Đọc hiểu' },
                    { id: 'listening', label: 'Nghe hiểu' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSkill(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedSkill === s.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty filter */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Độ khó:
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'easy', label: 'Cơ bản' },
                    { id: 'medium', label: 'Thông hiểu' },
                    { id: 'hard', label: 'Vận dụng cao 9+' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDifficulty(d.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedDifficulty === d.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quizCard) => (
              <QuizCard
                key={quizCard.id}
                card={quizCard}
                onStart={(card) => handleStartQuizCard(card, 'practice')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
