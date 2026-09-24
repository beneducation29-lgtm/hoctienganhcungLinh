import React, { useMemo, useState } from 'react';
import { BookOpen, Clock3, Target, Brain, ChevronRight, RotateCcw } from 'lucide-react';
import { GradeLevel } from '../../types/contentArchitecture';
import { readingService, ReadingLabItem } from '../../services/readingService';
import { questionSelector } from '../../services/questionSelector';

interface ReadingLabViewProps {
  initialGrade: GradeLevel;
  onStartQuizPractice: (title: string, subtitle: string, questions: any[], quizId?: string) => void;
}

export const ReadingLabView: React.FC<ReadingLabViewProps> = ({ initialGrade, onStartQuizPractice }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showStrategy, setShowStrategy] = useState(false);

  const exercises = useMemo(() => readingService.getExercises(selectedGrade), [selectedGrade]);
  const selected: ReadingLabItem | undefined = exercises.find((item) => item.id === selectedId) ?? exercises[0];

  const startPractice = (item: ReadingLabItem) => {
    let questions = questionSelector.getQuestionsByLessonAndSkill(item.lessonId, 'reading', 8);
    if (questions.length === 0) questions = questionSelector.getQuestionsByUnitAndSkill(item.unitId, 'reading', 8);
    onStartQuizPractice(
      'Reading Lab: ' + item.title,
      'Luyện ' + item.skills.join(', ') + ' · ' + item.level + ' · ' + item.wordCount + ' từ',
      questions,
      item.lessonId
    );
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" /> READING LAB · ĐỌC HIỂU
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Đọc hiểu có chiến lược.</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Đọc bài theo chủ đề THPT, luyện Skimming, Scanning và Inference, rồi chuyển thẳng sang Question Bank và Quiz Engine.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {(['10', '11', '12'] as GradeLevel[]).map((grade) => (
              <button
                key={grade}
                onClick={() => { setSelectedGrade(grade); setSelectedId(null); }}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (selectedGrade === grade ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20')}
              >
                Lớp {grade}
              </button>
            ))}
            <button
              onClick={() => setShowStrategy((v) => !v)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-500/20 border border-blue-300/20 hover:bg-blue-500/30 flex items-center gap-1.5"
            >
              <Brain className="w-3.5 h-3.5" /> Chiến thuật đọc
            </button>
          </div>
        </div>
      </section>

      {showStrategy && (
        <section className="grid md:grid-cols-3 gap-4">
          {[
            ['Skimming', 'Đọc nhanh tiêu đề, câu đầu/cuối đoạn để nắm ý chính.'],
            ['Scanning', 'Tìm tên riêng, số liệu, từ khóa và chi tiết được hỏi.'],
            ['Inference', 'Dựa vào bằng chứng trong bài, tránh suy diễn ngoài văn bản.']
          ].map(([title, desc]) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>
      )}

      <section className="grid lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">Bài đọc theo Unit</h2>
            <span className="text-xs text-slate-500">{exercises.length} bài</span>
          </div>
          {exercises.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={'w-full text-left p-4 rounded-2xl border transition-all ' + (selected?.id === item.id ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-200')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{item.unitTitle}</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
                    <Clock3 className="w-3 h-3" /> {item.estimatedTime} phút · {item.wordCount} từ
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </aside>

        {selected ? (
          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold">{selected.level}</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">{selected.difficulty}</span>
                {selected.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">{skill}</span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selected.title}</h2>
              <p className="text-xs text-slate-500 mt-2">{selected.wordCount} từ · khoảng {selected.estimatedTime} phút</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                {selected.passage.split(/\n\n+/).map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base leading-8 text-slate-700 mb-5">{paragraph}</p>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900"><Target className="w-4 h-4" /> Từ vựng trọng tâm</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selected.vocabulary.map((word) => (
                    <span key={word} className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-amber-900">{word}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => startPractice(selected)}
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" /> Làm câu hỏi Reading
                </button>
                <button
                  onClick={() => setShowStrategy(true)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" /> Xem chiến thuật
                </button>
                <button
                  onClick={() => startPractice(selected)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Luyện lại
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">Chưa có bài Reading cho khối này.</div>
        )}
      </section>
    </div>
  );
};
