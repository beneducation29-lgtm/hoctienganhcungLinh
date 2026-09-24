import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Heart,
  Mic,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2
} from 'lucide-react';
import type { GradeLevel } from '../types/contentArchitecture';
import type { SpeakingFeedback, SpeakingMode, SpeakingTurn } from '../types/speakingRoom';
import {
  createAiReply,
  evaluateSpeaking,
  getScenarioById,
  getSpeakingScenarios,
  speakingLevelProfiles
} from '../services/speakingRoomService';

interface SpeakingRoomViewProps {
  initialGrade?: GradeLevel;
}

interface SpeechRecognitionEventLike {
  results: { [key: number]: { [key: number]: { transcript: string } } };
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

const getSpeechRecognition = (): SpeechRecognitionCtor | null => {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export const SpeakingRoomView: React.FC<SpeakingRoomViewProps> = ({ initialGrade = '10' }) => {
  const [grade, setGrade] = useState<GradeLevel>(initialGrade);
  const [mode, setMode] = useState<SpeakingMode>('guided');
  const [scenarioId, setScenarioId] = useState('');
  const [turns, setTurns] = useState<SpeakingTurn[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedback | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const profile = speakingLevelProfiles[grade];
  const scenarios = useMemo(() => getSpeakingScenarios(grade), [grade]);
  const scenario = useMemo(
    () => getScenarioById(scenarioId) ?? scenarios[0],
    [scenarioId, scenarios]
  );

  useEffect(() => {
    if (!scenario) return;
    setScenarioId(scenario.id);
    setTurns([{
      id: 'ai-' + Date.now(),
      speaker: 'ai',
      text: createAiReply(scenario, grade),
      translation: scenario.promptVi,
      timestamp: 'Vừa xong'
    }]);
    setFeedback(null);
    setTranscript('');
  }, [grade, scenario?.id]);

  useEffect(() => () => {
    recognitionRef.current?.stop();
    window.speechSynthesis?.cancel();
  }, []);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = grade === '10' ? 0.82 : grade === '11' ? 0.9 : 0.96;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setFeedback({
        clarity: 70,
        vocabulary: 60,
        grammar: 70,
        fluency: 65,
        overall: 66,
        praise: 'Trình duyệt này chưa hỗ trợ nhận giọng nói tự động.',
        oneFix: 'Em có thể gõ câu trả lời vào ô bên dưới và vẫn nhận được phản hồi luyện nói.',
        nextStep: 'Hãy thử nói thành tiếng rồi gõ lại ý chính.',
        newPhrases: scenario?.usefulPhrases.slice(0, profile.maxNewPhrasesPerTurn) ?? []
      });
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    setIsListening(true);
    setTranscript('');
    setFeedback(null);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const submitAnswer = () => {
    if (!scenario || !transcript.trim()) return;
    const result = evaluateSpeaking(transcript, scenario, profile);
    setFeedback(result);

    const nextAiText = createAiReply(scenario, grade, result);
    setTurns((prev) => prev.concat([
      {
        id: 'student-' + Date.now(),
        speaker: 'student',
        text: transcript.trim(),
        timestamp: 'Vừa xong',
        feedback: result
      },
      {
        id: 'ai-' + (Date.now() + 1),
        speaker: 'ai',
        text: nextAiText,
        translation: scenario.followUpQuestions[0],
        timestamp: 'Vừa xong'
      }
    ]));
    setTranscript('');
  };

  const resetRoom = () => {
    if (!scenario) return;
    setTurns([{
      id: 'ai-' + Date.now(),
      speaker: 'ai',
      text: createAiReply(scenario, grade),
      translation: scenario.promptVi,
      timestamp: 'Vừa xong'
    }]);
    setTranscript('');
    setFeedback(null);
    stopListening();
  };

  if (!scenario) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-sky-50/80 via-white to-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
              <Sparkles className="w-4 h-4" />
              AI English Speaking Room
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Phòng luyện nói riêng cho Lớp {grade}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Nói từng bước, không quá tải kiến thức. AI chỉ sửa một điểm quan trọng mỗi lượt
              và điều chỉnh cách nói theo lớp của em.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['10', '11', '12'] as GradeLevel[]).map((item) => (
              <button
                key={item}
                onClick={() => setGrade(item)}
                className={cx(
                  'px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer',
                  grade === item
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                )}
              >
                Lớp {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-5">
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-[260px_minmax(0,1fr)] min-h-[620px]">
              <aside className="bg-gradient-to-b from-sky-100 to-blue-50 p-5 flex flex-col">
                <div className={cx(
                  'relative rounded-3xl overflow-hidden bg-white shadow-sm border border-white/70',
                  isSpeaking && 'ring-4 ring-sky-200'
                )}>
                  <img
                    src="/src/components/speaking/aiSpeakingAvatar.svg"
                    alt="AI English speaking tutor"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between rounded-xl bg-white/90 backdrop-blur px-3 py-2">
                    <span className="text-xs font-bold text-slate-800">Linh · AI Speaking Buddy</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white/80 border border-white p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-800">
                    <Heart className="w-4 h-4 fill-sky-200" />
                    Không áp lực
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    Sai cũng được. AI sẽ sửa nhẹ, nói chậm và chỉ đưa thêm vài từ mới mỗi lượt.
                  </p>
                </div>

                <button
                  onClick={() => speak(scenario.prompt)}
                  className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white border border-sky-200 px-3 py-2.5 text-xs font-bold text-sky-700 hover:bg-sky-50 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  Nghe câu hỏi
                </button>
              </aside>

              <div className="flex flex-col min-w-0">
                <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-sky-600">{scenario.topic}</div>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-1">{scenario.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">{scenario.titleVi}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="w-4 h-4" />
                    Khoảng {profile.suggestedSeconds}s/lượt
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[430px]">
                  {turns.map((turn) => (
                    <div key={turn.id} className={cx('flex gap-3', turn.speaker === 'student' && 'justify-end')}>
                      {turn.speaker === 'ai' && (
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-sky-100">
                          <img src="/src/components/speaking/aiSpeakingAvatar.svg" alt="" className="w-full h-full" />
                        </div>
                      )}
                      <div className={cx(
                        'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        turn.speaker === 'student'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-50 border border-slate-200 text-slate-800'
                      )}>
                        <p>{turn.text}</p>
                        {turn.translation && (
                          <p className="mt-2 text-xs text-slate-500 border-t border-slate-200/70 pt-2">
                            Gợi ý tiếng Việt: {turn.translation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/70">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {scenario.usefulPhrases.slice(0, profile.maxNewPhrasesPerTurn).map((phrase) => (
                      <button
                        key={phrase}
                        onClick={() => setTranscript((prev) => prev + (prev ? ' ' : '') + phrase.replace('...', ''))}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"
                      >
                        {phrase}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={3}
                    placeholder={isListening ? 'Mình đang nghe... hãy nói tự nhiên nhé.' : scenario.starter}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                  />

                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={cx(
                        'flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold cursor-pointer transition-colors',
                        isListening ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                      )}
                    >
                      {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isListening ? 'Dừng nghe' : 'Bấm để nói'}
                    </button>
                    <button
                      onClick={submitAnswer}
                      disabled={!transcript.trim()}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white px-4 py-3 text-sm font-bold cursor-pointer disabled:cursor-not-allowed"
                    >
                      Gửi câu trả lời
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Clock3 className="w-4 h-4 text-sky-600" />
                Mức luyện tập
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(['guided', 'free_talk', 'exam_practice'] as SpeakingMode[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    className={cx(
                      'rounded-xl border px-2 py-2 text-[11px] font-bold cursor-pointer',
                      mode === item ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-500'
                    )}
                  >
                    {item === 'guided' ? 'Có hướng dẫn' : item === 'free_talk' ? 'Tự do' : 'Luyện thi'}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{profile.label}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <BookOpen className="w-4 h-4 text-sky-600" />
                Chọn chủ đề
              </div>
              <div className="mt-3 space-y-2">
                {scenarios.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScenarioId(item.id)}
                    className={cx(
                      'w-full text-left rounded-xl border px-3 py-2.5 cursor-pointer',
                      scenario.id === item.id ? 'border-sky-400 bg-sky-50' : 'border-slate-200 hover:border-sky-200'
                    )}
                  >
                    <div className="text-xs font-bold text-slate-800">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.titleVi}</div>
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">AI nhận xét</h3>
                  <span className="text-lg font-extrabold text-emerald-600">{feedback.overall}/100</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {[
                    ['Rõ ý', feedback.clarity],
                    ['Từ vựng', feedback.vocabulary],
                    ['Ngữ pháp', feedback.grammar],
                    ['Độ trôi chảy', feedback.fluency]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-2.5">
                      <div className="text-[10px] text-slate-500">{label}</div>
                      <div className="text-sm font-bold text-slate-800">{value}/100</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span>{feedback.praise}</span></div>
                  <div className="flex gap-2"><ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" /><span>{feedback.oneFix}</span></div>
                  <div className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400 shrink-0" /><span>{feedback.nextStep}</span></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {feedback.newPhrases.map((phrase) => (
                    <span key={phrase} className="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 text-[10px] font-bold">{phrase}</span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={resetRoom}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Bắt đầu lại lượt luyện
            </button>

            <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-800">
                <ShieldCheck className="w-4 h-4" />
                Thiết kế chống quá tải
              </div>
              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-600 leading-relaxed">
                <li>• Mỗi lượt chỉ thêm {profile.maxNewPhrasesPerTurn} cụm từ mới.</li>
                <li>• Câu hỏi ngắn, tăng dần theo lớp {grade}.</li>
                <li>• Chỉ sửa 1 điểm quan trọng sau mỗi câu trả lời.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
