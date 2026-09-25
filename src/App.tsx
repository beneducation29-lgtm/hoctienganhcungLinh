import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CurriculumSection } from './components/CurriculumSection';
import { DailyPracticeSection } from './components/DailyPracticeSection';
import { FourSkillsSection } from './components/FourSkillsSection';
import { ProgressSection } from './components/ProgressSection';
import { ContinueLearningSection } from './components/ContinueLearningSection';
import { Footer } from './components/Footer';

// Dedicated Views
import { CurriculumView } from './components/CurriculumView';
import { PracticeView } from './components/PracticeView';
import { SkillsView } from './components/SkillsView';
import { AITutorView } from './components/AITutorView';
import { ProgressView } from './components/ProgressView';
import { VocabularyLabView } from './components/vocabulary/VocabularyLabView';
import { GrammarLabView } from './components/grammar/GrammarLabView';
import { SpeakingRoomView } from './components/SpeakingRoomView';
import { WritingLabView } from './components/writing/WritingLabView';

// Unified Quiz Engine
import { QuizEngine } from './components/quiz/QuizEngine';
import { QuizSession } from './types/quiz';
import { quizService } from './services/quizService';
import { questionSelector } from './services/questionSelector';

// Interactive Modals
import { LessonModal } from './components/LessonModal';
import { SkillModal } from './components/SkillModal';
import { FlashcardModal } from './components/FlashcardModal';
import { SearchModal } from './components/SearchModal';
import { FaqModal } from './components/FaqModal';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import type { GoogleProfile } from './components/GoogleLoginModal';

import {
  initialStudentProfile,
  gradeCurriculums,
  dailyPracticeCards,
  fourSkillModules,
  sampleLessons,
  mockNotifications
} from './data/mockData';
import {
  ActiveTab,
  Lesson,
  SkillModule,
  SkillType,
  SkillLevel,
  DailyPracticeCard,
  StudentProfile
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('english-platform-google-profile');
      return saved ? { ...initialStudentProfile, ...JSON.parse(saved) } : initialStudentProfile;
    } catch {
      return initialStudentProfile;
    }
  });
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showLogin, setShowLogin] = useState(false);

  // Active Quiz Engine session
  const [activeQuizSession, setActiveQuizSession] = useState<QuizSession | null>(null);

  // Modals state
  const [activeLesson, setActiveLesson] = useState<Lesson | any | null>(null);

  const [activeSkillModal, setActiveSkillModal] = useState<{
    skill: SkillModule;
    level?: SkillLevel;
  } | null>(null);

  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [faqModalType, setFaqModalType] = useState<
    'faq' | 'about' | 'guidelines' | 'policy' | 'contact' | null
  >(null);

  // Handlers
  const handleOpenLesson = (lesson: any) => {
    setActiveLesson(lesson);
  };

  const handleMarkLessonCompleted = (lessonId: string) => {
    setStudent((prev: StudentProfile) => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      studyTimeHours: Number((prev.studyTimeHours + 0.5).toFixed(1))
    }));
  };

  const handleGoogleLogin = (profile: GoogleProfile) => {
    const updated: StudentProfile = {
      ...student,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.avatarUrl || student.avatarUrl,
      school: 'Tài khoản Google'
    };
    setStudent(updated);
    try {
      localStorage.setItem(
        'english-platform-google-profile',
        JSON.stringify({
          name: profile.name,
          email: profile.email,
          avatarUrl: profile.avatarUrl,
          school: 'Tài khoản Google'
        })
      );
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('english-platform-google-profile');
    } catch {
      // ignore
    }
    setStudent(initialStudentProfile);
  };

  // Launch unified Quiz Engine from Daily Practice cards
  const handleStartDailyPractice = (type: DailyPracticeCard['type']) => {
    switch (type) {
      case 'review':
        setShowFlashcards(true);
        break;

      case 'quiz': {
        const session = quizService.createQuiz({
          quizTitle: 'Daily Challenge: 10 Câu Phản Xạ Nhanh',
          quizSubtitle: 'Kiểm tra độ nhạy bén với các câu hỏi ngữ âm, từ vựng và ngữ pháp trọng tâm',
          quizMode: 'practice',
          questions: questionSelector.getMixedQuestions(10),
          randomize: true
        });
        setActiveQuizSession(session);
        break;
      }

      case 'vocab':
        setActiveTab('vocabulary');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'grammar':
        setActiveTab('grammar');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;

      case 'reading': {
        const session = quizService.createQuiz({
          quizTitle: 'Luyện tập Đọc hiểu Học thuật THPT',
          quizSubtitle: 'Kỹ thuật Skimming, Scanning và đoán nghĩa từ vựng trong văn cảnh',
          skill: 'reading',
          quizMode: 'practice',
          questions: questionSelector.getQuestionsBySkill('reading', 6)
        });
        setActiveQuizSession(session);
        break;
      }

      case 'listening': {
        const session = quizService.createQuiz({
          quizTitle: 'Luyện tập Nghe hiểu & Ngữ âm THPT',
          quizSubtitle: 'Rèn luyện phản xạ bắt từ khóa, phát âm đuôi -ed và trọng âm từ',
          skill: 'listening',
          quizMode: 'practice',
          questions: questionSelector.getQuestionsBySkill('listening', 6)
        });
        setActiveQuizSession(session);
        break;
      }
    }
  };

  const handleStartQuizPractice = (title: string, subtitle: string, questions: any[]) => {
    const session = quizService.createQuiz({
      quizTitle: title,
      quizSubtitle: subtitle,
      quizMode: 'practice',
      questions: questions && questions.length > 0 ? questions : questionSelector.getMixedQuestions(8),
      randomize: true
    });
    setActiveQuizSession(session);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSkillRoom = (skillId: SkillType, level?: SkillLevel) => {
    const matchedSkill = fourSkillModules.find((s) => s.id === skillId);
    if (skillId === 'speaking') {
      setActiveTab('speaking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (matchedSkill) {
      setActiveSkillModal({ skill: matchedSkill, level });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* 1. Header (Sticky, 3-zone contract, responsive) */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveQuizSession(null); // Clear quiz when switching tabs
          setActiveTab(tab);
        }}
        student={student}
        notifications={notifications}
        onOpenSearch={() => setShowSearch(true)}
        onOpenLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If QuizEngine is active, mount it full screen inside main */}
        {activeQuizSession ? (
          <QuizEngine
            session={activeQuizSession}
            onExit={() => setActiveQuizSession(null)}
            onPracticeWrongAnswers={(ids) => {
              const retrySession = quizService.retryWrongAnswers('hs-student-01', ids);
              setActiveQuizSession(retrySession);
            }}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <div>
                {/* TRANG CHỦ: Hero */}
                <Hero
                  student={student}
                  onStartLearning={() => {
                    const session = quizService.createQuiz({
                      quizTitle: 'Daily English Challenge: 10 Câu Phản Xạ Nhanh',
                      quizSubtitle: 'Luyện tập củng cố kiến thức Tiếng Anh THPT hôm nay',
                      quizMode: 'practice',
                      questions: questionSelector.getMixedQuestions(10),
                      randomize: true
                    });
                    setActiveQuizSession(session);
                  }}
                  onExploreCurriculum={() => {
                    setActiveTab('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onResumeLesson={() => {
                    const lesson = sampleLessons[0];
                    handleOpenLesson(lesson);
                  }}
                />

                {/* SECTION: HỌC THEO CHƯƠNG TRÌNH TIẾNG ANH 10, 11, 12 */}
                <CurriculumSection
                  curriculums={gradeCurriculums}
                  onSelectGrade={(grade) => {
                    setActiveTab('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* SECTION: LUYỆN TẬP MỖI NGÀY */}
                <DailyPracticeSection
                  cards={dailyPracticeCards}
                  onStartPractice={handleStartDailyPractice}
                />

                {/* SECTION: 4 KỸ NĂNG */}
                <FourSkillsSection
                  skills={fourSkillModules}
                  onOpenSkillRoom={handleOpenSkillRoom}
                />

                {/* SECTION: TIẾN ĐỘ CỦA BẠN */}
                <ProgressSection
                  student={student}
                  onViewDetailedProgress={() => {
                    setActiveTab('progress');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* SECTION: TIẾP TỤC HỌC */}
                <ContinueLearningSection
                  student={student}
                  onResumeLesson={() => {
                    const lesson = sampleLessons[0];
                    handleOpenLesson(lesson);
                  }}
                  onExploreAllLessons={() => {
                    setActiveTab('curriculum');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'curriculum' && (
              <CurriculumView
                initialGrade={student.currentGrade}
                onOpenLesson={handleOpenLesson}
                onBackToHome={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'vocabulary' && (
              <VocabularyLabView
                onStartQuizPractice={handleStartQuizPractice}
                onNavigateToCurriculum={() => {
                  setActiveTab('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarLabView
                onStartQuizPractice={handleStartQuizPractice}
                onNavigateToCurriculum={() => {
                  setActiveTab('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'review' && (
              <PracticeView onOpenFlashcards={() => setShowFlashcards(true)} />
            )}

            {activeTab === 'speaking' && (
              <SpeakingRoomView initialGrade={student.currentGrade} />
            )}

            {activeTab === 'writing' && (
              <WritingLabView initialGrade={student.currentGrade} />
            )}

            {activeTab === 'skills' && (
              <SkillsView
                onOpenSkillModal={(skill, level) => {
                  setActiveSkillModal({ skill, level });
                }}
              />
            )}

            {activeTab === 'aitutor' && (
              <AITutorView onOpenLesson={handleOpenLesson} />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                student={student}
                onOpenRecentLesson={() => {
                  const lesson = sampleLessons[0];
                  handleOpenLesson(lesson);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onOpenFaq={() => setFaqModalType('faq')}
        onOpenAbout={() => setFaqModalType('about')}
        onOpenGuidelines={() => setFaqModalType('guidelines')}
        onOpenPolicy={() => setFaqModalType('policy')}
        onOpenContact={() => setFaqModalType('contact')}
      />

      {/* Interactive Modals */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onMarkCompleted={handleMarkLessonCompleted}
          onStartQuiz={handleStartQuizPractice}
        />
      )}

      {activeSkillModal && (
        <SkillModal
          skill={activeSkillModal.skill}
          initialLevel={activeSkillModal.level}
          onClose={() => setActiveSkillModal(null)}
        />
      )}

      {showFlashcards && (
        <FlashcardModal onClose={() => setShowFlashcards(false)} />
      )}

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onSelectLesson={handleOpenLesson}
        />
      )}

      <GoogleLoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleGoogleLogin}
      />

      {faqModalType && (
        <FaqModal
          type={faqModalType}
          onClose={() => setFaqModalType(null)}
        />
      )}
    </div>
  );
}
