import React, { useMemo, useState } from 'react';
import { BookOpenText, CheckCircle2, Clock3, Lightbulb, Send, Sparkles, Target } from 'lucide-react';
import { writingService, WritingExerciseSummary } from '../../services/writingService';
import { coachWriting, WritingCoachResponse } from '../../services/writingAiService';
import { GradeLevel } from '../../types/contentArchitecture';

interface WritingLabViewProps {
  initialGrade?: GradeLevel;
}

const fallbackCoach = (draft: string, exercise: WritingExerciseSummary): WritingCoachResponse => ({
  score: Math.min(100, 55 + Math.round(Math.min(20, draft.trim().length / 40))),
  strengths: ['Em đã hoàn thành một bản nháp có ý chính rõ ràng.'],
  priorityFix: 'Hãy kiểm tra động từ, mạo từ và sự thống nhất chủ ngữ - động từ trước khi nộp.',
  corrections: [],
  nextStep: 'Thêm một ví dụ hoặc kết quả cụ thể để bài viết thuyết phục hơn.',
  encouragingNote: 'Cứ viết hết ý trước, sau đó mình cùng sửa từng điểm quan trọng.'
});

export const WritingLabView: React.FC<WritingLabViewProps> = ({ initialGrade = '11' }) => {
  const [grade, setGrade] = useState<GradeLevel>(initialGrade);
  const exercises = useMemo(() => writingService.getExercises(grade), [grade]);
  const [selectedId, setSelectedId] = useState<string>('');
  const selected = exercises.find((item) => item.id === selectedId) || exercises[0];
  const [draft, setDraft] = useState('');
  const [feedback, setFeedback] = useState<WritingCoachResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  React.useEffect(() => {
    setSelectedId(exercises[0]?.id || '');
    setDraft('');
    setFeedback(null);
    setApiError('');
  }, [grade]);

  const submit = async () => {
    if (!selected || !draft.trim()) return;
    setLoading(true);
    setApiError('');
    try {
      const result = await coachWriting({
        grade,
        level: selected.level,
        prompt: selected.prompt,
        draft,
        minimumWords: selected.minimumWords,
        maximumWords: selected.maximumWords
      });
      setFeedback(result);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Chưa kết nối được AI Writing Coach.');
      setFeedback(fallbackCoach(draft, selected));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-10">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-200 bg-rose-500/10 border border-rose-400/20 px-3 py-1 rounded-full">
            <BookOpenText className="w-3.5 h-3.5" /> Writing Lab · Phòng luyện Viết
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Write first. Improve with Linh.</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Viết bài theo đúng chủ đề chương trình, tự kiểm tra độ dài và chỉ nhận một vài góp ý quan trọng để không bị quá tải.
          </p>
        </div>
      </section>

      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        {(['10', '11', '12'] as GradeLevel[]).map((g) => (
          <button key={g} onClick={() => setGrade(g)}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${grade === g ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>
            Lớp {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Đề viết theo chương trình</div>
          {exercises.map((item) => (
            <button key={item.id} onClick={() => { setSelectedId(item.id); setDraft(''); setFeedback(null); }}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${selected?.id === item.id ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`}>
              <div className="text-[11px] font-bold text-blue-700">Unit · {item.unitTitle}</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{item.title}</div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock3 className="w-3.5 h-3.5" /> {item.minimumWords}–{item.maximumWords} từ · {item.level}
              </div>
            </button>
          ))}
        </aside>

        {selected ? (
          <section className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">Lớp {grade}</span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{selected.level}</span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{selected.difficulty}</span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">{selected.title}</h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selected.prompt}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {selected.guidelines.slice(0, 4).map((guide) => (
                  <div key={guide} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" /> {guide}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Bài viết của em</span>
                  <span className={`font-semibold ${wordCount >= selected.minimumWords && wordCount <= selected.maximumWords ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {wordCount} / {selected.minimumWords}–{selected.maximumWords} từ
                  </span>
                </div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)}
                  placeholder="Hãy viết bằng tiếng Anh ở đây..."
                  className="min-h-[300px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-y" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">Bản nháp chỉ được gửi cho AI khi em bấm “Nhờ Linh nhận xét”.</p>
                <button disabled={!draft.trim() || loading} onClick={submit}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <Send className="w-4 h-4" /> {loading ? 'Linh đang đọc...' : 'Nhờ Linh nhận xét'}
                </button>
              </div>
              {apiError && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">{apiError}</p>}
            </div>

            {feedback && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Sparkles className="w-4 h-4 text-blue-600" /> Phản hồi của Linh</div>
                  <div className="text-2xl font-black text-blue-700">{feedback.score}<span className="text-xs font-semibold text-slate-400">/100</span></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {feedback.strengths.map((item) => <div key={item} className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-800"><CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />{item}</div>)}
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-bold uppercase text-amber-800 flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Một điểm cần ưu tiên</div>
                  <p className="text-sm text-slate-800 mt-1">{feedback.priorityFix}</p>
                </div>
                {feedback.corrections.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">Sửa câu đáng chú ý</div>
                    {feedback.corrections.slice(0, 3).map((c) => (
                      <div key={c.original} className="p-3 bg-slate-50 rounded-xl text-xs">
                        <div><span className="line-through text-rose-600">{c.original}</span> → <span className="font-semibold text-emerald-700">{c.improved}</span></div>
                        <div className="text-slate-500 mt-1">{c.explanationVi}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm text-blue-900">
                  <strong>Bước tiếp theo:</strong> {feedback.nextStep}
                </div>
                <p className="text-xs text-slate-500">{feedback.encouragingNote}</p>
              </div>
            )}
          </section>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-sm text-slate-500">Chưa có đề viết cho khối này.</div>
        )}
      </div>
    </div>
  );
};
