/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GrammarQuickCheck Component
 * Fast 2-minute diagnostic check embedded directly inside grammar topic
 * Gives immediate validation and records mastery progress
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import { ExtendedGrammarTopic } from '../../data/mockGrammarData';
import { grammarProgressService } from '../../services/grammarProgressService';
import { questionSelector } from '../../services/questionSelector';
import { UniversalQuestion } from '../../types/quiz';

interface GrammarQuickCheckProps {
  topic: ExtendedGrammarTopic;
  onLaunchFullPractice: () => void;
}

export const GrammarQuickCheck: React.FC<GrammarQuickCheckProps> = ({
  topic,
  onLaunchFullPractice
}) => {
  // Pull diagnostic questions directly from standardized question selector
  let questions: UniversalQuestion[] = questionSelector.getQuestionsForGrammarTopic(topic.id, 3);
  if (questions.length === 0) {
    questions = questionSelector.getQuestionsBySkill('grammar', 3);
  }

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs text-slate-500">Chưa có câu hỏi Quick Check cho chủ điểm này.</p>
        <button
          onClick={onLaunchFullPractice}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Luyện tập với Quiz Engine
        </button>
      </div>
    );
  }

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optionIdx
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q: UniversalQuestion, idx: number) => {
      const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
      if (selectedAnswers[idx] === correctIdx) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = calculateScore();
    grammarProgressService.recordTopicPractice(topic.id, correct, questions.length);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const correctCount = calculateScore();
  const allAnswered = questions.every((_: UniversalQuestion, idx: number) => selectedAnswers[idx] !== undefined);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-900">
            Kiểm tra phản xạ nhanh ({questions.length} câu)
          </span>
        </div>
        <span className="text-[11px] text-blue-700 font-semibold">
          {submitted ? `Đạt: ${correctCount}/${questions.length} câu đúng` : 'Chọn đáp án và bấm Nộp bài'}
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q: UniversalQuestion, qIdx: number) => {
          const userAnswer = selectedAnswers[qIdx];
          const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
          const isCorrect = userAnswer === correctIdx;
          const opts = q.options || [];

          return (
            <div
              key={q.id || qIdx}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h5 className="text-sm font-bold text-slate-900">
                  Câu {qIdx + 1}: {q.question}
                </h5>
                {submitted && (
                  <span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {opts.map((opt: string, optIdx: number) => {
                  const isSelected = userAnswer === optIdx;
                  let optStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                  if (submitted) {
                    if (optIdx === correctIdx) {
                      optStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-100 text-rose-900 font-medium line-through';
                    } else {
                      optStyle = 'border-slate-200 bg-slate-50 text-slate-400';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-blue-600 bg-blue-50 text-blue-800 font-bold ring-2 ring-blue-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submit */}
              {submitted && q.explanation && (
                <div className="mt-3 p-3 bg-white/90 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <strong className="text-slate-900">Giải thích:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Nộp bài kiểm tra nhanh
          </button>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>

            <button
              onClick={onLaunchFullPractice}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Luyện tập sâu với Quiz Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
