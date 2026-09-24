import React, { useState } from 'react';
import { X, Search, BookOpen, Layers, ArrowRight, Languages } from 'lucide-react';
import { sampleLessons } from '../data/mockData';
import { Lesson } from '../types';

interface SearchModalProps {
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');

  const filtered = sampleLessons.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.unitTitle.toLowerCase().includes(query.toLowerCase()) ||
      l.summary.toLowerCase().includes(query.toLowerCase()) ||
      (l.vocabulary && l.vocabulary.some((v) => v.word.toLowerCase().includes(query.toLowerCase()))) ||
      (l.grammar && l.grammar.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm Unit, từ vựng (life expectancy, heritage), ngữ pháp (past simple, modals)..."
            className="w-full text-sm sm:text-base outline-none text-slate-900 placeholder:text-slate-400 bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <span className="font-semibold text-slate-400 shrink-0">Từ khóa phổ biến:</span>
          {['Heritage Unit 6', 'Past Simple vs Present Perfect', 'Modal Verbs', 'Tangible', 'Life Expectancy', 'Lớp 11'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-white border border-slate-200 rounded-md hover:border-blue-500 hover:text-blue-600 shrink-0 cursor-pointer transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectLesson(item);
                  onClose();
                }}
                className="py-3 px-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-blue-600">{item.unitTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span>Lớp {item.grade}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.textbook}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{item.summary}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all mt-2 shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              Không tìm thấy bài học phù hợp với từ khóa "{query}". Hãy thử tìm kiếm từ vựng như "heritage", "nutrient", hoặc ngữ pháp "modal verbs".
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-slate-50 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
          <span>Bấm ESC hoặc nhấp bên ngoài để đóng</span>
          <span>Hệ thống dữ liệu Tiếng Anh chuẩn SGK 2018</span>
        </div>
      </div>
    </div>
  );
};
