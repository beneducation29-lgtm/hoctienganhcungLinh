/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GrammarExplanation Component
 * Structured visual presentation of grammar rules, formulas, forms,
 * bilingual examples, and Common Mistakes DOs & DON'Ts
 */

import React from 'react';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Check
} from 'lucide-react';
import { ExtendedGrammarTopic } from '../../data/mockGrammarData';

interface GrammarExplanationProps {
  topic: ExtendedGrammarTopic;
}

export const GrammarExplanation: React.FC<GrammarExplanationProps> = ({ topic }) => {
  return (
    <div className="space-y-6">
      {/* 1. Structure Formula Banner */}
      <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl text-white shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Công thức / Cấu trúc trọng tâm</span>
        </div>
        <div className="font-mono text-sm sm:text-base font-bold bg-white/10 p-3.5 rounded-xl border border-white/15 text-blue-100">
          {topic.structure}
        </div>

        {/* 3 Forms: Positive, Negative, Question */}
        {topic.forms && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
              <span className="text-[10px] text-blue-300 font-bold block uppercase">(+) Khẳng định:</span>
              <span className="font-mono text-white text-[11px]">{topic.forms.positive}</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
              <span className="text-[10px] text-rose-300 font-bold block uppercase">(-) Phủ định:</span>
              <span className="font-mono text-white text-[11px]">{topic.forms.negative}</span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
              <span className="text-[10px] text-amber-300 font-bold block uppercase">(?) Nghi vấn:</span>
              <span className="font-mono text-white text-[11px]">{topic.forms.question}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Detailed Explanation & Usage */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Bản chất & Cách sử dụng</span>
        </h4>
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 leading-relaxed font-medium space-y-2">
          <p>{topic.explanation}</p>
        </div>
      </div>

      {/* 3. When To Use / Key Contexts */}
      {topic.whenToUse && topic.whenToUse.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Ngữ cảnh & Dấu hiệu nhận biết trọng điểm</span>
          </h4>
          <div className="space-y-2">
            {topic.whenToUse.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2"
              >
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Grammatical Rules & Patterns */}
      {topic.rules && topic.rules.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Quy tắc ngữ pháp chi tiết</span>
          </h4>
          <div className="space-y-3">
            {topic.rules.map((rule, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5">
                <div className="text-xs font-bold text-blue-900">{rule.ruleTitle}</div>
                <div className="text-xs text-slate-600">{rule.description}</div>
                {rule.pattern && (
                  <div className="font-mono text-[11px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    Pattern: {rule.pattern}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Bilingual Examples with Analysis */}
      {topic.examples && topic.examples.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Ví dụ ngữ cảnh song ngữ</span>
          </h4>
          <div className="space-y-3">
            {topic.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 hover:border-blue-300 transition-colors"
              >
                <div className="text-sm font-bold text-slate-900">
                  {idx + 1}. "{ex.en}"
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  &rarr; {ex.vi}
                </div>
                {ex.note && (
                  <div className="text-[11px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 font-semibold mt-1">
                    Ghi chú: {ex.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Common Mistakes: DOs & DON'Ts */}
      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Lỗi thường gặp & Bẫy trong đề thi (DOs vs. DON'Ts)</span>
          </h4>
          <div className="space-y-3">
            {topic.commonMistakes.map((m, idx) => (
              <div
                key={idx}
                className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-2 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Wrong sentence */}
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-rose-200 text-rose-800">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase text-rose-600">DON'T (Sai):</span>
                      <span className="line-through font-medium">{m.incorrect}</span>
                    </div>
                  </div>

                  {/* Correct sentence */}
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200 text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase text-emerald-600">DO (Đúng):</span>
                      <span className="font-bold">{m.correct}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-700 bg-white/80 p-2.5 rounded-xl border border-rose-100">
                  <strong className="text-slate-900">Giải thích:</strong> {m.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
