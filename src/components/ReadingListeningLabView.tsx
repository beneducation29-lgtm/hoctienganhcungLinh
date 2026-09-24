import React, { useMemo, useState } from 'react';
import {
  BookOpenText,
  Headphones,
  Play,
  Square,
  Eye,
  EyeOff,
  Target,
  Clock3,
  Layers3,
  ArrowRight,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { GradeLevel } from '../types/contentArchitecture';
import { questionSelector } from '../services/questionSelector';
import { quizService } from '../services/quizService';
import { QuizEngine } from './quiz/QuizEngine';
import { QuizSession } from '../types/quiz';

type LabMode = 'reading' | 'listening';

interface ReadingListeningLabViewProps {
  initialGrade: GradeLevel;
}

const readingPassages = {
  '10': {
    title: 'Small Actions, Big Environmental Impact',
    topic: 'Environment & daily habits',
    level: 'A2',
    text: 'Many students want to protect the environment but do not know where to start. Small daily actions can make a difference. Turning off lights, using a reusable bottle, and walking short distances instead of using a motorbike can reduce energy use and waste. More importantly, these habits can influence friends and family. When a group of people changes simple routines together, the result can become much bigger than one person working alone.'
  },
  '11': {
    title: 'Why Cultural Heritage Matters',
    topic: 'Culture & heritage',
    level: 'B1',
    text: 'Cultural heritage is more than a collection of old buildings or traditional objects. It includes stories, skills, celebrations, landscapes, and knowledge passed from one generation to another. Protecting heritage helps communities understand where they come from while giving younger people a chance to connect with their identity. At the same time, responsible tourism can create income for local residents. The challenge is to welcome visitors without allowing commercial activity to damage the cultural and natural values that make a place special.'
  },
  '12': {
    title: 'Technology and the Future of Learning',
    topic: 'Education & technology',
    level: 'B2',
    text: 'Digital learning has changed the way students access information. A learner can now watch a short lesson, practise a skill, receive instant feedback, and review difficult material at a convenient time. However, access to information does not automatically produce deep learning. Students still need to evaluate sources, connect new ideas with prior knowledge, and practise retrieving information without looking at their notes. The most effective learning environments therefore combine useful technology with clear goals, active practice, and thoughtful reflection.'
  }
} as const;

export const ReadingListeningLabView: React.FC<ReadingListeningLabViewProps> = ({ initialGrade }) => {
  const [mode, setMode] = useState<LabMode>('reading');
  const [grade, setGrade] = useState<GradeLevel>(initialGrade);
  const [showTranscript, setShowTranscript] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const reading = readingPassages[grade];

  const readingQuestions = useMemo(
    () => questionSelector.getQuestionsByGrade(grade).filter((q) => q.skill === 'reading').slice(0, 6),
    [grade]
  );

  const listeningQuestions = useMemo(
    () =>
      questionSelector
        .getQuestionsByGrade(grade)
        .filter((q) => q.skill === 'listening' && q.audioTranscript)
        .slice(0, 6),
    [grade]
  );

  const listeningTranscript =
    listeningQuestions[0]?.audioTranscript ||
    'Welcome to our English listening practice. Listen carefully for key words, numbers, and the speaker’s main idea.';

  const startQuiz = (skill: 'reading' | 'listening') => {
    const questions = skill === 'reading' ? readingQuestions : listeningQuestions;
    if (questions.length === 0) return;

    const session = quizService.createQuiz({
      quizTitle: skill === 'reading' ? `Reading Lab · Lớp ${grade}` : `Listening Lab · Lớp ${grade}`,
      quizSubtitle:
        skill === 'reading'
          ? 'Đọc hiểu theo chiến thuật: main idea, scanning, inference và vocabulary in context.'
          : 'Nghe hiểu theo chiến thuật: bắt từ khóa, chi tiết, số liệu và ý chính.',
      quizMode: 'skill_practice',
      skill,
      questions,
      randomize: true
    });
    setQuizSession(session);
  };

  const playListening = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(listeningTranscript);
    utterance.lang = 'en-US';
    utterance.rate = grade === '10' ? 0.82 : grade === '11' ? 0.9 : 0.96;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  if (quizSession) {
    return (
      <QuizEngine
        session={quizSession}
        onExit={() => setQuizSession(null)}
        onPracticeWrongAnswers={(ids) => setQuizSession(quizService.retryWrongAnswers('hs-student-01', ids))}
      />
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-7 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
            <Layers3 className="w-3.5 h-3.5" />
            Reading + Listening Lab
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Đọc hiểu & Nghe hiểu có chiến lược</h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Học kỹ năng ngay trên nội dung bài, sau đó chuyển thẳng sang Question Bank và Quiz Engine để kiểm tra mức độ hiểu.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {(['10', '11', '12'] as GradeLevel[]).map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGrade(g);
                  setShowTranscript(false);
                  stopListening();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${grade === g ? 'bg-white text-blue-950' : 'bg-white/10 hover:bg-white/15 text-white'}`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => {
            setMode('reading');
            stopListening();
          }}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ${mode === 'reading' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}
        >
          <BookOpenText className="w-4 h-4" /> Reading
        </button>
        <button
          onClick={() => setMode('listening')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ${mode === 'listening' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'}`}
        >
          <Headphones className="w-4 h-4" /> Listening
        </button>
      </div>

      {mode === 'reading' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-6">
          <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">{reading.level} · {reading.topic}</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{reading.title}</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
                <Clock3 className="w-3.5 h-3.5" /> 5–8 phút
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              {reading.text.split(' ').reduce<string[][]>((rows, word, index) => {
                const row = rows[rows.length - 1];
                if (!row || row.length >= 42) rows.push([word]);
                else row.push(word);
                return rows;
              }, []).map((words, index) => (
                <p key={index} className="text-[15px] leading-8 text-slate-700">
                  {words.join(' ')}
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => startQuiz('reading')}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <Target className="w-4 h-4" /> Làm 6 câu đọc hiểu
              </button>
              <span className="px-4 py-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Question Bank · Reading
              </span>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Lightbulb className="w-4 h-4 text-amber-500" /> 3 bước đọc nhanh
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['1', 'Skimming', 'Đọc tiêu đề + câu đầu để nắm ý chính.'],
                  ['2', 'Scanning', 'Tìm nhanh tên riêng, số liệu và từ khóa.'],
                  ['3', 'Inference', 'Dùng bằng chứng trong bài trước khi suy luận.']
                ].map(([n, title, desc]) => (
                  <div key={n} className="flex gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Liên kết hệ thống</p>
              <p className="text-sm font-semibold text-slate-800 mt-2">
                Reading → Question Bank → Quiz Engine → Sổ tay câu sai
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Câu sai sau khi nộp bài được Quiz Engine ghi nhận để học sinh có thể luyện lại.
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr] gap-6">
          <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Listening · Lớp {grade}</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Nghe chủ động, không nhìn transcript trước</h2>
                <p className="text-xs text-slate-500 mt-2">
                  Bản audio demo dùng Speech Synthesis của trình duyệt; khi có audio thật, có thể thay bằng file/URL mà không đổi Quiz Engine.
                </p>
              </div>
              <Headphones className="w-7 h-7 text-indigo-600 shrink-0" />
            </div>

            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
              <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Bài nghe</p>
              <p className="text-sm text-slate-700 leading-7">
                Hãy nghe 1–2 lần, ghi lại từ khóa và trả lời câu hỏi trước khi xem transcript.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={isSpeaking ? stopListening : playListening}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  {isSpeaking ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isSpeaking ? 'Dừng phát' : 'Phát bài nghe'}
                </button>
                <button
                  onClick={() => setShowTranscript((v) => !v)}
                  className="px-4 py-3 bg-white border border-indigo-200 text-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showTranscript ? 'Ẩn transcript' : 'Xem transcript'}
                </button>
              </div>
            </div>

            {showTranscript && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm leading-7 text-slate-700">
                {listeningTranscript}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => startQuiz('listening')}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <Target className="w-4 h-4" /> Làm 6 câu nghe hiểu
              </button>
              <span className="px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Question Bank · Listening
              </span>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chiến thuật</p>
              <div className="mt-4 space-y-3">
                {[
                  'Lần 1: nghe ý chính và ai đang nói.',
                  'Lần 2: bắt số liệu, thời gian và từ khóa.',
                  'Không nhìn transcript trước khi trả lời.',
                  'Sau khi chấm: nghe lại đúng câu mình sai.'
                ].map((tip) => (
                  <div key={tip} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" /> {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chuỗi luyện tập</p>
              <p className="text-sm font-semibold text-slate-800 mt-2">
                Listening → Question Bank → Quiz Engine → Wrong Answers
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
