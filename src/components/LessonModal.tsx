import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  BookOpen,
  Clock,
  HelpCircle,
  Volume2,
  BookA,
  FileCode,
  Mic,
  PenTool,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Headphones,
  BookOpenText,
  Layers
} from 'lucide-react';
import { Lesson, LessonModel, LessonSection } from '../types';
import { VocabularyCard } from './content/VocabularyCard';
import { GrammarCard } from './content/GrammarCard';
import { ReadingCard } from './content/ReadingCard';
import { ListeningCard } from './content/ListeningCard';
import { SpeakingCard } from './content/SpeakingCard';
import { WritingCard } from './content/WritingCard';
import { QuestionCard } from './content/QuestionCard';

interface LessonModalProps {
  lesson: any; // Supports both Lesson and LessonModel
  onClose: () => void;
  onMarkCompleted: (lessonId: string) => void;
  onStartQuiz?: (title: string, subtitle: string, questions: any[]) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onMarkCompleted,
  onStartQuiz
}) => {
  if (!lesson) return null;

  // Detect if lesson has modular sections (LessonModel)
  const sections: LessonSection[] = lesson.sections || [];
  const hasSections = sections.length > 0;

  // Active section or tab state
  const [activeSectionId, setActiveSectionId] = useState<string>(
    hasSections ? sections[0].id : 'content'
  );

  // Legacy tab state for backwards compatibility
  const [legacyTab, setLegacyTab] = useState<'content' | 'vocab' | 'grammar' | 'quiz'>(
    lesson.moduleType === 'vocab'
      ? 'vocab'
      : lesson.moduleType === 'grammar'
      ? 'grammar'
      : 'content'
  );

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});
  const [showResults, setShowResults] = useState(false);

  // Speech API for vocabulary or text
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentSection = sections.find((s) => s.id === activeSectionId) || sections[0];

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'introduction':
        return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
      case 'vocabulary':
        return <BookA className="w-3.5 h-3.5 text-indigo-600" />;
      case 'grammar':
        return <FileCode className="w-3.5 h-3.5 text-emerald-600" />;
      case 'reading':
        return <BookOpenText className="w-3.5 h-3.5 text-sky-600" />;
      case 'listening':
        return <Headphones className="w-3.5 h-3.5 text-violet-600" />;
      case 'speaking':
        return <Mic className="w-3.5 h-3.5 text-amber-600" />;
      case 'writing':
        return <PenTool className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <span>{lesson.unitTitle || lesson.unitId}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Lớp {lesson.grade || lesson.gradeNumber}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">
                {lesson.textbook || 'Global Success'}
              </span>
              {lesson.cefrLevel && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono text-[10px]">
                    CEFR {lesson.cefrLevel}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {lesson.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Section Navigation (Content Architecture) */}
        {hasSections ? (
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white text-xs overflow-x-auto">
            {sections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`pb-3 font-semibold border-b-2 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {getSectionIcon(sec.type)}
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Legacy sub-tabs */
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white text-xs overflow-x-auto">
            <button
              onClick={() => setLegacyTab('content')}
              className={`pb-3 font-semibold border-b-2 transition-colors shrink-0 cursor-pointer ${
                legacyTab === 'content'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Tổng quan & Bài giảng
            </button>
            {lesson.vocabulary && lesson.vocabulary.length > 0 && (
              <button
                onClick={() => setLegacyTab('vocab')}
                className={`pb-3 font-semibold border-b-2 transition-colors shrink-0 cursor-pointer ${
                  legacyTab === 'vocab'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Từ vựng ({lesson.vocabulary.length})
              </button>
            )}
            {lesson.grammar && (
              <button
                onClick={() => setLegacyTab('grammar')}
                className={`pb-3 font-semibold border-b-2 transition-colors shrink-0 cursor-pointer ${
                  legacyTab === 'grammar'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Ngữ pháp
              </button>
            )}
            {lesson.questions && lesson.questions.length > 0 && (
              <button
                onClick={() => setLegacyTab('quiz')}
                className={`pb-3 font-semibold border-b-2 transition-colors shrink-0 cursor-pointer ${
                  legacyTab === 'quiz'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Câu hỏi ôn tập ({lesson.questions.length})
              </button>
            )}
          </div>
        )}

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ARCHITECTURE-BASED RENDERING */}
          {hasSections && currentSection ? (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Introduction Section */}
              {currentSection.type === 'introduction' && (
                <div className="space-y-4">
                  <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                    <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>{currentSection.title}</span>
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {currentSection.content}
                    </p>
                  </div>

                  <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase">
                      Thông tin bài học
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Vocabulary Section */}
              {currentSection.type === 'vocabulary' && currentSection.vocabularyItems && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-500 uppercase">
                      Danh sách từ vựng trọng tâm ({currentSection.vocabularyItems.length} từ)
                    </span>
                    <span className="text-blue-600 font-medium">
                      Bấm loa để nghe phát âm IPA
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {currentSection.vocabularyItems.map((item) => (
                      <VocabularyCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Section */}
              {currentSection.type === 'grammar' && currentSection.grammarTopic && (
                <GrammarCard
                  topic={currentSection.grammarTopic}
                  onPractice={() => {
                    const reviewSec = sections.find((s) => s.type === 'review');
                    if (reviewSec) setActiveSectionId(reviewSec.id);
                  }}
                />
              )}

              {/* Reading Section */}
              {currentSection.type === 'reading' && currentSection.readingExercise && (
                <ReadingCard
                  exercise={currentSection.readingExercise}
                  onComplete={() => onMarkCompleted(lesson.id)}
                />
              )}

              {/* Listening Section */}
              {currentSection.type === 'listening' && currentSection.listeningExercise && (
                <ListeningCard
                  exercise={currentSection.listeningExercise}
                  onComplete={() => onMarkCompleted(lesson.id)}
                />
              )}

              {/* Speaking Section */}
              {currentSection.type === 'speaking' && currentSection.speakingExercise && (
                <SpeakingCard
                  exercise={currentSection.speakingExercise}
                  onComplete={() => onMarkCompleted(lesson.id)}
                />
              )}

              {/* Writing Section */}
              {currentSection.type === 'writing' && currentSection.writingExercise && (
                <WritingCard
                  exercise={currentSection.writingExercise}
                  onComplete={() => onMarkCompleted(lesson.id)}
                />
              )}

              {/* Review / Quiz Section */}
              {currentSection.type === 'review' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                    <h4 className="text-xs font-bold text-blue-900 uppercase">
                      {currentSection.title}
                    </h4>
                    <p className="text-xs text-slate-600">{currentSection.content}</p>
                  </div>

                  {/* If exercises list provided */}
                  {lesson.questions && lesson.questions.length > 0 && (
                    <div className="space-y-4">
                      {lesson.questions.map((q: any, idx: number) => (
                        <div
                          key={q.id}
                          className="p-4 bg-white border border-slate-200 rounded-xl space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-sm font-semibold text-slate-900">
                              Câu {idx + 1}: {q.question}
                            </span>
                            <span className="text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                              {q.difficulty}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {q.options.map((opt: string, oIdx: number) => {
                              const isSelected = selectedAnswers[q.id] === oIdx;
                              const isCorrect = oIdx === q.correctIndex;
                              let cls = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                              if (showResults) {
                                if (isCorrect) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                                else if (isSelected) cls = 'bg-red-50 border-red-400 text-red-900';
                              } else if (isSelected) {
                                cls = 'bg-blue-50 border-blue-600 text-blue-900 font-medium';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() =>
                                    !showResults &&
                                    setSelectedAnswers((p) => ({ ...p, [q.id]: oIdx }))
                                  }
                                  className={`w-full text-left p-3 text-xs border rounded-lg transition-all cursor-pointer ${cls}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {showResults && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                              <strong>Giải thích:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="pt-2 flex justify-end">
                        {!showResults ? (
                          <button
                            onClick={() => {
                              setShowResults(true);
                              onMarkCompleted(lesson.id);
                            }}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                          >
                            Nộp bài & Kiểm tra đáp án
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành ôn tập!
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* LEGACY FALLBACK FOR SAMPLE LESSONS */
            <div className="space-y-6">
              {legacyTab === 'content' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-blue-800 uppercase">Mục tiêu</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{lesson.summary}</p>
                  </div>
                  {lesson.readingPassage && (
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 font-serif whitespace-pre-line">
                      {lesson.readingPassage.text}
                    </div>
                  )}
                </div>
              )}

              {legacyTab === 'vocab' && lesson.vocabulary && (
                <div className="space-y-3">
                  {lesson.vocabulary.map((vocab: any, vIdx: number) => (
                    <div key={vIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-slate-900">{vocab.word}</strong>
                          <span className="text-xs text-blue-600 font-mono">{vocab.ipa}</span>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(vocab.word)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-700">{vocab.definitionVi}</p>
                      <p className="text-xs text-slate-500 italic">"{vocab.exampleSentence}"</p>
                    </div>
                  ))}
                </div>
              )}

              {legacyTab === 'grammar' && lesson.grammar && (
                <div className="p-5 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3">
                  <h4 className="text-base font-bold text-slate-900">{lesson.grammar.title}</h4>
                  <div className="p-2 bg-white border border-blue-100 font-mono text-xs text-blue-900 rounded">
                    {lesson.grammar.structure}
                  </div>
                  <p className="text-xs text-slate-700">{lesson.grammar.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Thời lượng: {lesson.duration || lesson.durationMinutes || 35} phút</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onStartQuiz && (
              <button
                onClick={() => {
                  onClose();
                  import('../services/questionSelector').then(({ questionSelector }) => {
                    let questions = questionSelector.getQuestionsByLesson(lesson.id);
                    if (questions.length === 0 && lesson.unitId) {
                      questions = questionSelector.getQuestionsByUnit(lesson.unitId);
                    }
                    if (questions.length === 0) {
                      questions = questionSelector.getMixedQuestions(8);
                    }
                    onStartQuiz(
                      `Luyện tập: ${lesson.title}`,
                      `Trọn bộ câu hỏi trắc nghiệm tương tác cho bài học ${lesson.title}`,
                      questions
                    );
                  });
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Luyện tập bài này với Quiz Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Đóng bài học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
