import React, { useEffect, useMemo, useState } from 'react';
import { Headphones, Play, Pause, Square, Eye, EyeOff, Clock3, Radio, ChevronRight } from 'lucide-react';
import { GradeLevel } from '../../types/contentArchitecture';
import { listeningService, ListeningLabItem } from '../../services/listeningService';
import { questionSelector } from '../../services/questionSelector';

interface ListeningLabViewProps {
  initialGrade: GradeLevel;
  onStartQuizPractice: (title: string, subtitle: string, questions: any[], quizId?: string) => void;
}

export const ListeningLabView: React.FC<ListeningLabViewProps> = ({ initialGrade, onStartQuizPractice }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const exercises = useMemo(() => listeningService.getExercises(selectedGrade), [selectedGrade]);
  const selected: ListeningLabItem | undefined = exercises.find((item) => item.id === selectedId) ?? exercises[0];

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    setShowTranscript(false);
    setIsPlaying(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, [selected?.id]);

  const toggleSpeech = () => {
    if (!selected || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(selected.audioTranscript);
    utterance.lang = 'en-US';
    utterance.rate = selected.grade === '10' ? 0.82 : selected.grade === '11' ? 0.9 : 0.96;
    utterance.pitch = 1;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const startPractice = (item: ListeningLabItem) => {
    let questions = questionSelector.getQuestionsByLessonAndSkill(item.lessonId, 'listening', 8);
    if (questions.length === 0) questions = questionSelector.getQuestionsByUnitAndSkill(item.unitId, 'listening', 8);
    onStartQuizPractice(
      'Listening Lab: ' + item.title,
      'Luyện bắt từ khóa · ' + item.level + ' · ' + Math.round(item.duration / 60) + ' phút',
      questions,
      item.lessonId
    );
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" /> LISTENING LAB · NGHE HIỂU
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Nghe từng bước, hiểu từng ý.</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Bài nghe theo khối lớp, nghe bằng TTS ngay trong trình duyệt, ẩn transcript khi luyện và chuyển thẳng sang Question Bank.
          </p>
          <div className="flex flex-wrap gap-2">
            {(['10', '11', '12'] as GradeLevel[]).map((grade) => (
              <button
                key={grade}
                onClick={() => { setSelectedGrade(grade); setSelectedId(null); }}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (selectedGrade === grade ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20')}
              >
                Lớp {grade}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">Bài nghe theo Unit</h2>
            <span className="text-xs text-slate-500">{exercises.length} bài</span>
          </div>
          {exercises.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={'w-full text-left p-4 rounded-2xl border transition-all ' + (selected?.id === item.id ? 'bg-emerald-50 border-emerald-300 shadow-sm' : 'bg-white border-slate-200 hover:border-emerald-200')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">{item.unitTitle}</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
                    <Clock3 className="w-3 h-3" /> {Math.round(item.duration / 60)} phút · {item.level}
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
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">{selected.level}</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">{selected.difficulty}</span>
                {selected.speakers.map((speaker) => (
                  <span key={speaker} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold">{speaker}</span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selected.title}</h2>
              <p className="text-xs text-slate-500 mt-2">{Math.round(selected.duration / 60)} phút · tốc độ TTS được điều chỉnh theo khối</p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl bg-slate-950 text-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Listening Player</div>
                    <div className="font-bold mt-1">Nghe lần 1: bắt ý chính · Nghe lần 2: bắt từ khóa</div>
                  </div>
                  <Radio className="w-7 h-7 text-emerald-300" />
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  <button onClick={toggleSpeech} className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-2">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {isPlaying ? 'Tạm dừng' : 'Phát bài nghe'}
                  </button>
                  <button onClick={stopSpeech} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 font-bold text-xs flex items-center gap-2">
                    <Square className="w-3.5 h-3.5" /> Dừng
                  </button>
                  <button onClick={() => setShowTranscript((v) => !v)} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 font-bold text-xs flex items-center gap-2">
                    {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showTranscript ? 'Ẩn transcript' : 'Hiện transcript'}
                  </button>
                </div>
              </div>

              {showTranscript && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Transcript</div>
                  <p className="text-sm leading-7 text-slate-700 whitespace-pre-line">{selected.audioTranscript}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button onClick={() => startPractice(selected)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 flex items-center gap-2">
                  <Headphones className="w-4 h-4" /> Làm câu hỏi Listening
                </button>
                <button onClick={toggleSpeech} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200">
                  Nghe lại bài
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">Chưa có bài Listening cho khối này.</div>
        )}
      </section>
    </div>
  );
};
