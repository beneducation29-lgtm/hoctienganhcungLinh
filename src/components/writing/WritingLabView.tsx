import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Eye, EyeOff, FileText, Sparkles, Target, WandSparkles } from 'lucide-react';
import { GradeLevel } from '../../types/contentArchitecture';
import { writingService, WritingLabItem } from '../../services/writingService';
import { coachWriting, WritingCoachResponse } from '../../services/writingAiService';

interface WritingLabViewProps {
  initialGrade: GradeLevel;
}

export const WritingLabView: React.FC<WritingLabViewProps> = ({ initialGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [essay, setEssay] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [feedback, setFeedback] = useState<WritingCoachResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exercises = useMemo(() => writingService.getExercises(selectedGrade), [selectedGrade]);
  const selected: WritingLabItem | undefined = exercises.find((item) => item.id === selectedId) ?? exercises[0];
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const inRange = selected ? wordCount >= selected.minimumWords && wordCount <= selected.maximumWords : false;

  const selectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setSelectedId(null);
    setEssay('');
    setFeedback(null);
  };

  const handleCoach = async () => {
    if (!selected || !essay.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await coachWriting({
        grade: selected.grade,
        level: selected.level,
        title: selected.title,
        prompt: selected.prompt,
        essay,
        minimumWords: selected.minimumWords,
        maximumWords: selected.maximumWords
      });
      setFeedback(result);
    } catch {
      setError('Linh chưa thể phản hồi lúc này. Bạn vẫn có thể tự kiểm tra bài theo checklist bên dưới.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <section className="rounded-3xl bg-gradient-to-br from-violet-950 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" /> WRITING LAB · VIẾT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Viết từng bước, sửa đúng một điểm.</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Viết theo đề bài của chương trình, kiểm tra độ dài và nhận phản hồi từ Linh theo khối lớp — không biến bài viết thành một bài giảng ngữ pháp dài.
          </p>
          <div className="flex flex-wrap gap-2">
            {(['10', '11', '12'] as GradeLevel[]).map((grade) => (
              <button key={grade} onClick={() => selectGrade(grade)}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (selectedGrade === grade ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20')}>
                Lớp {grade}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">Đề viết theo Unit</h2>
            <span className="text-xs text-slate-500">{exercises.length} đề</span>
          </div>
          {exercises.map((item) => (
            <button key={item.id} onClick={() => { setSelectedId(item.id); setFeedback(null); }}
              className={'w-full text-left p-4 rounded-2xl border transition-all ' + (selected?.id === item.id ? 'bg-violet-50 border-violet-300 shadow-sm' : 'bg-white border-slate-200 hover:border-violet-200')}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-violet-600">{item.unitTitle}</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{item.title}</div>
              <div className="text-[11px] text-slate-500 mt-2">{item.level} · {item.minimumWords}–{item.maximumWords} từ</div>
            </button>
          ))}
          {exercises.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-xs text-slate-500">
              Chưa có đề Writing cho khối này trong kho nội dung hiện tại.
            </div>
          )}
        </aside>

        {selected ? (
          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-[11px] font-bold">{selected.level}</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">{selected.difficulty}</span>
                <span className={'px-2.5 py-1 rounded-lg text-[11px] font-bold ' + (inRange ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')}>
                  {wordCount} / {selected.minimumWords}–{selected.maximumWords} từ
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selected.title}</h2>
              <p className="text-sm text-slate-600 mt-3 leading-7">{selected.prompt}</p>
              <div className="mt-4 p-4 rounded-2xl bg-violet-50 border border-violet-100">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-900"><Target className="w-4 h-4" /> Checklist trước khi nộp</div>
                <ul className="mt-2 space-y-1.5 text-xs text-violet-900">
                  {selected.guidelines.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <textarea value={essay} onChange={(e) => setEssay(e.target.value)}
                placeholder="Bắt đầu viết bài của bạn ở đây..."
                className="w-full min-h-[360px] p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm leading-7 text-slate-800 resize-y" />

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleCoach} disabled={!essay.trim() || loading}
                  className="px-5 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 disabled:opacity-50 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> {loading ? 'Linh đang đọc bài...' : 'Nhờ Linh nhận xét'}
                </button>
                <button onClick={() => setShowExample((v) => !v)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 flex items-center gap-2">
                  {showExample ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showExample ? 'Ẩn bài mẫu' : 'Xem bài mẫu'}
                </button>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Bản nháp không tự gửi đi cho đến khi bạn bấm nhận xét.
                </span>
              </div>

              {error && <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800">{error}</div>}

              {showExample && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Bài mẫu</div>
                  <p className="text-sm leading-7 text-slate-700 whitespace-pre-line">{selected.example}</p>
                </div>
              )}

              {feedback && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-violet-50 border border-violet-100 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-violet-700 uppercase tracking-wider">Writing progress signal</div>
                        <div className="text-3xl font-extrabold text-slate-900 mt-1">{feedback.score}/100</div>
                      </div>
                      <WandSparkles className="w-7 h-7 text-violet-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-3">{feedback.encouragingNote}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50">
                      <div className="text-sm font-bold text-emerald-900 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Điểm bạn đang làm tốt</div>
                      <ul className="mt-3 space-y-2 text-xs text-emerald-900">{feedback.strengths.map((s) => <li key={s}>• {s}</li>)}</ul>
                    </div>
                    <div className="p-5 rounded-2xl border border-amber-100 bg-amber-50">
                      <div className="text-sm font-bold text-amber-900">Một điểm ưu tiên</div>
                      <p className="mt-3 text-xs leading-6 text-amber-900">{feedback.priorityFix}</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-sm font-bold text-slate-900">Sửa tối đa 3 câu tiêu biểu</div>
                    <div className="mt-3 space-y-3">
                      {feedback.corrections.map((c) => (
                        <div key={c.original} className="p-3 rounded-xl bg-white border border-slate-200">
                          <div className="text-xs text-rose-700">Gốc: {c.original}</div>
                          <div className="text-xs text-emerald-700 mt-1">Gợi ý: {c.improved}</div>
                          <div className="text-[11px] text-slate-500 mt-1">{c.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                    <div className="text-sm font-bold text-blue-900">Bước tiếp theo</div>
                    <p className="mt-2 text-xs leading-6 text-blue-900">{feedback.nextStep}</p>
                  </div>
                </div>
              )}
            </div>
          </article>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">
            Chọn một đề Writing để bắt đầu.
          </div>
        )}
      </section>
    </div>
  );
};
