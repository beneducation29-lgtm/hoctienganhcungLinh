import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';
import { GrammarTopic } from '../../types/contentArchitecture';

interface GrammarCardProps {
  topic: GrammarTopic;
  onPractice?: () => void;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({ topic, onPractice }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'examples' | 'mistakes'>('rules');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Ngữ pháp trọng điểm</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{topic.title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {topic.explanation}
        </p>

        {/* Structure Banner */}
        <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl font-mono text-xs sm:text-sm text-blue-950 font-semibold flex items-center justify-between">
          <span className="truncate">{topic.structure}</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Rule -> Example -> Practice */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            activeTab === 'rules'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Quy tắc cốt lõi ({topic.rules.length})
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            activeTab === 'examples'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Ví dụ song ngữ ({topic.examples.length})
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
            activeTab === 'mistakes'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. Bẫy đề thi hay gặp ({topic.commonMistakes.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-3 min-h-[140px]">
        {/* Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {topic.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    {rule.ruleTitle}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                  {rule.description}
                </p>
                {rule.pattern && (
                  <div className="ml-7 mt-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md font-mono text-[11px] text-blue-700 inline-block font-semibold">
                    {rule.pattern}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Examples */}
        {activeTab === 'examples' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {topic.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
              >
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  "{ex.en}"
                </p>
                <p className="text-xs text-slate-500">
                  &rarr; {ex.vi}
                </p>
                {ex.note && (
                  <p className="text-[11px] text-blue-600 font-medium">
                    * Lưu ý: {ex.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Common Mistakes */}
        {activeTab === 'mistakes' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {topic.commonMistakes.map((mis, idx) => (
              <div
                key={idx}
                className="p-4 bg-red-50/40 border border-red-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-start gap-2 text-red-700">
                  <span className="font-bold shrink-0">Sai:</span>
                  <span className="line-through">{mis.incorrect}</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-800">
                  <span className="font-bold shrink-0">Đúng:</span>
                  <span className="font-semibold">{mis.correct}</span>
                </div>
                <p className="text-[11px] text-slate-600 bg-white/70 p-2 rounded border border-slate-100">
                  <strong>Giải thích bẫy:</strong> {mis.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Practice CTA Footer */}
      {onPractice && (
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Luyện tập ngay để khắc sâu kiến thức ngữ pháp</span>
          </span>

          <button
            onClick={onPractice}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <span>Làm bài luyện tập</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
