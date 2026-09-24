import React, { useState } from 'react';
import { Lightbulb, Tag, Info, Award, HelpCircle } from 'lucide-react';
import { UniversalQuestion } from '../../types/quiz';
import { MultipleChoiceRenderer } from './renderers/MultipleChoiceRenderer';
import { TrueFalseRenderer } from './renderers/TrueFalseRenderer';
import { FillInTheBlankRenderer } from './renderers/FillInTheBlankRenderer';
import { MatchingRenderer } from './renderers/MatchingRenderer';
import { OrderingRenderer } from './renderers/OrderingRenderer';
import { ShortAnswerRenderer } from './renderers/ShortAnswerRenderer';
import { PassageRenderer } from './renderers/PassageRenderer';

interface QuestionRendererProps {
  question: UniversalQuestion;
  questionNumber?: number;
  totalQuestions?: number;
  selectedAnswer: any;
  onSelectAnswer: (answer: any) => void;
  isReviewMode?: boolean;
  showImmediateFeedback?: boolean;
  disabled?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  showImmediateFeedback = false,
  disabled = false
}) => {
  const [showHint, setShowHint] = useState(false);

  // Skill color mapping
  const skillBadgeColors: Record<string, string> = {
    vocabulary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    grammar: 'bg-blue-50 text-blue-700 border-blue-200',
    reading: 'bg-purple-50 text-purple-700 border-purple-200',
    listening: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    speaking: 'bg-amber-50 text-amber-700 border-amber-200',
    writing: 'bg-rose-50 text-rose-700 border-rose-200',
    mixed: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const difficultyNames: Record<string, string> = {
    easy: 'Cơ bản',
    medium: 'Thông hiểu',
    hard: 'Vận dụng cao 9+'
  };

  // Render question body by type
  const renderQuestionBody = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'true_false':
        return (
          <TrueFalseRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'fill_blank':
        return (
          <FillInTheBlankRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'matching':
        return (
          <MatchingRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'ordering':
        return (
          <OrderingRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'short_answer':
        return (
          <ShortAnswerRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      case 'reading_comprehension':
      case 'listening_comprehension':
        return (
          <PassageRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );

      default:
        return (
          <MultipleChoiceRenderer
            question={question}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            isReviewMode={isReviewMode}
            showImmediateFeedback={showImmediateFeedback}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xs">
      {/* Question Header & Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          {questionNumber !== undefined && (
            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold font-mono">
              Câu {questionNumber}
              {totalQuestions ? ` / ${totalQuestions}` : ''}
            </span>
          )}

          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
              skillBadgeColors[question.skill] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {question.skill}
          </span>

          <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
            Lớp {question.grade} · {difficultyNames[question.difficulty] || question.difficulty}
          </span>

          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            {question.cefrLevel}
          </span>
        </div>

        {/* Hint toggle button */}
        {question.hint && !isReviewMode && !showImmediateFeedback && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý làm bài'}</span>
          </button>
        )}
      </div>

      {/* Hint Alert if open */}
      {showHint && question.hint && (
        <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">Gợi ý tư duy:</strong>
            <span>{question.hint}</span>
          </div>
        </div>
      )}

      {/* Question Instruction & Main Stem */}
      <div className="space-y-2">
        {question.instruction && (
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {question.instruction}
          </p>
        )}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Dynamic Type Renderer Body */}
      <div className="pt-2">{renderQuestionBody()}</div>

      {/* Explanation section: Shown in Review Mode or Practice Mode immediate feedback */}
      {(isReviewMode || showImmediateFeedback) && (
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5 animate-in fade-in">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Giải thích kiến thức & Chiến thuật làm bài</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {question.explanation}
          </p>

          {/* Question tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2 flex-wrap border-t border-slate-200/70">
              <Tag className="w-3 h-3 text-slate-400" />
              {question.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
