/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GrammarTopicDetailModal Component
 * Interactive modal presenting rich grammar theory, structure breakdowns,
 * Quick Check interactive diagnostic, and direct Quiz Engine trigger.
 */

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Zap,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ExtendedGrammarTopic } from '../../data/mockGrammarData';
import { grammarProgressService } from '../../services/grammarProgressService';
import { GrammarExplanation } from './GrammarExplanation';
import { GrammarQuickCheck } from './GrammarQuickCheck';

interface GrammarTopicDetailModalProps {
  topic: ExtendedGrammarTopic | null;
  initialTab?: 'explanation' | 'quick-check';
  onClose: () => void;
  onLaunchPractice: (topic: ExtendedGrammarTopic) => void;
}

export const GrammarTopicDetailModal: React.FC<GrammarTopicDetailModalProps> = ({
  topic,
  initialTab = 'explanation',
  onClose,
  onLaunchPractice
}) => {
  if (!topic) return null;

  const [activeTab, setActiveTab] = useState<'explanation' | 'quick-check' | 'mistakes'>(initialTab);
  const isMarked = grammarProgressService.getTopicStats(topic.id).isMarkedForReview;
  const [inReview, setInReview] = useState(isMarked);
  const stats = grammarProgressService.getTopicStats(topic.id);

  const handleToggleBookmark = () => {
    const updated = grammarProgressService.toggleReview(topic.id);
    setInReview(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                Lớp {topic.grade} &bull; {topic.unitTitle}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                {topic.level}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                inReview
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
              }`}
              title={inReview ? 'Bỏ lưu khỏi sổ tay ôn tập' : 'Lưu vào sổ tay ngữ pháp'}
            >
              <Bookmark className={`w-4 h-4 ${inReview ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-2 bg-white">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explanation'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lý thuyết & Ví dụ</span>
          </button>

          <button
            onClick={() => setActiveTab('quick-check')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quick-check'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quick Check (2 phút)</span>
          </button>

          <button
            onClick={() => setActiveTab('mistakes')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mistakes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Bẫy đề thi & Lỗi sai</span>
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'explanation' && (
            <GrammarExplanation topic={topic} />
          )}

          {activeTab === 'quick-check' && (
            <GrammarQuickCheck
              topic={topic}
              onLaunchFullPractice={() => {
                onClose();
                onLaunchPractice(topic);
              }}
            />
          )}

          {activeTab === 'mistakes' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900">
                <strong>Bí quyết đạt điểm 9+:</strong> Luôn phân tích các lỗi sai kinh điển để tránh mất điểm đáng tiếc trong phần trắc nghiệm ngữ pháp và viết lại câu.
              </div>

              {topic.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-slate-900">Bẫy {idx + 1}:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
                      <span className="font-bold block text-[10px] uppercase text-rose-600">Lựa chọn sai:</span>
                      <span className="line-through">{m.incorrect}</span>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
                      <span className="font-bold block text-[10px] uppercase text-emerald-600">Đáp án chuẩn:</span>
                      <span className="font-bold">{m.correct}</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700">
                    <strong>Giải thích chi tiết:</strong> {m.reason}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>
              Tiến độ: <strong>{stats.status === 'mastered' ? 'Đã thành thạo (90%+)' : stats.status === 'familiar' ? 'Khá quen thuộc' : stats.status === 'learning' ? 'Đang học' : 'Chưa luyện'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchPractice(topic);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Luyện trắc nghiệm Quiz Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
