import React from 'react';
import { SkillBreakdownProgress } from '../../types/contentArchitecture';

interface SkillProgressBarProps {
  progress: SkillBreakdownProgress;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({ progress }) => {
  const skills = [
    { key: 'vocabulary', label: 'Từ vựng (Vocabulary)', value: progress.vocabulary, color: 'bg-emerald-500' },
    { key: 'grammar', label: 'Ngữ pháp (Grammar)', value: progress.grammar, color: 'bg-blue-500' },
    { key: 'reading', label: 'Đọc hiểu (Reading)', value: progress.reading, color: 'bg-indigo-500' },
    { key: 'listening', label: 'Nghe hiểu (Listening)', value: progress.listening, color: 'bg-purple-500' },
    { key: 'speaking', label: 'Nói (Speaking)', value: progress.speaking, color: 'bg-amber-500' },
    { key: 'writing', label: 'Viết (Writing)', value: progress.writing, color: 'bg-rose-500' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Tiến độ 6 Kỹ năng Học phần
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân tích năng lực tổng hợp theo chuẩn đánh giá THPT & CEFR
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Trung bình:</span>
          <div className="text-lg font-black text-blue-600 font-mono">
            {progress.overall}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{s.label}</span>
              <span className="font-bold text-slate-900">{s.value}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${s.color} rounded-full transition-all duration-500`}
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
