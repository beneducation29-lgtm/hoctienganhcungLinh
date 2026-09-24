import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Mic,
  MicOff,
  RotateCcw,
  CheckCircle2,
  Volume2,
  FileText,
  PenTool,
  Sparkles,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { SkillModule, SkillLevel } from '../types';

interface SkillModalProps {
  skill: SkillModule;
  initialLevel?: SkillLevel;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  initialLevel,
  onClose
}) => {
  const [level, setLevel] = useState<SkillLevel>(initialLevel || skill.level);

  // Listening states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [showTranscript, setShowTranscript] = useState(false);

  // Speaking states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Reading states
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({});
  const [showReadingResults, setShowReadingResults] = useState(false);

  // Writing states
  const [essayText, setEssayText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const wordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;

  const handleEvaluateEssay = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        overallBand: '8.0 / 10',
        strengths: [
          'Cấu trúc luận điểm rõ ràng, mở bài và kết bài cân đối',
          'Vốn từ vựng chuyên đề tốt (sử dụng được renewable energy, transmission grid, Net-Zero pledge)',
          'Sử dụng liên từ chuyển đoạn linh hoạt (Furthermore, In contrast, Consequently)'
        ],
        improvements: [
          'Nên kiểm soát thêm mạo từ "the" trước các danh từ chuyên biệt',
          'Cần thêm một phản đề (counter-argument) ngắn ở thân bài để tăng tính phản biện'
        ]
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <span>Phòng luyện {skill.title}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">{skill.vietnameseTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {skill.practiceSample.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header: Level switch */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Cấp độ bài luyện:</span>
            <div className="flex items-center gap-1">
              {(['Beginner', 'Intermediate', 'Upper Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    level === lvl
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          <span className="text-slate-400 hidden sm:inline">Chủ đề: {skill.currentTopic}</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* LISTENING PRACTICE */}
          {skill.id === 'listening' && (
            <div className="space-y-6">
              {/* Audio player card */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Audio Track · High School Interview (B2 Academic)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-blue-300">01:45 / 03:20</span>
                </div>

                {/* Simulated Waveform / Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>01:12</span>
                    <span>Tốc độ: 1.0x</span>
                    <span>03:20</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => setAudioProgress((p) => Math.max(0, p - 10))}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                  >
                    -10s
                  </button>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform hover:scale-105"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => setAudioProgress((p) => Math.min(100, p + 10))}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                  >
                    +10s
                  </button>
                </div>
              </div>

              {/* Transcript toggle */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{showTranscript ? 'Ẩn bản gỡ băng (Transcript)' : 'Xem bản gỡ băng (Transcript)'}</span>
                </button>
                <span>Nên nghe 2 lần trước khi mở văn bản</span>
              </div>

              {showTranscript && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed animate-in fade-in space-y-2">
                  <p><strong>Speaker A (Host):</strong> Welcome back! Today we are discussing youth initiatives for tangible and intangible heritage conservation in Vietnam.</p>
                  <p><strong>Speaker B (Student):</strong> Thank you. Our main focus is creating an interactive 3D digital model for high schoolers to explore historical relics online.</p>
                  <p><strong>Speaker A:</strong> What was the most demanding challenge during your preliminary research?</p>
                  <p><strong>Speaker B:</strong> Cross-referencing diverse historical archives was the most demanding challenge we encountered.</p>
                </div>
              )}

              {/* Questions */}
              {skill.practiceSample.questions && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">Câu hỏi kiểm tra nghe hiểu:</h4>
                  {skill.practiceSample.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-50 rounded-xl space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className="p-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-blue-400 cursor-pointer"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SPEAKING PRACTICE */}
          {skill.id === 'speaking' && (
            <div className="space-y-6">
              <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                  Đề bài thuyết trình / Tranh biện
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {skill.practiceSample.speakingPrompt}
                </p>
              </div>

              {/* Recording Stage */}
              <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center relative">
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-40" />
                  )}
                  <button
                    onClick={() => {
                      if (!isRecording) {
                        setIsRecording(true);
                        setHasRecorded(true);
                      } else {
                        setIsRecording(false);
                      }
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                      isRecording ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {isRecording ? 'Đang ghi âm bài nói của bạn...' : 'Bấm nút mic để bắt đầu nói'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Thời lượng khuyến nghị: 90 - 120 giây. Hệ thống sẽ phân tích độ trôi chảy và ngữ điệu.
                  </p>
                </div>

                {hasRecorded && !isRecording && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-left text-xs space-y-2 animate-in fade-in max-w-xl mx-auto">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phân tích giọng nói tự động:
                    </span>
                    <ul className="space-y-1 text-emerald-800">
                      <li>• Tốc độ nói: <strong>128 từ/phút</strong> (Tốc độ chuẩn tự nhiên, dễ nghe)</li>
                      <li>• Trọng âm từ: <strong>88% chính xác</strong> ở các từ đa âm tiết</li>
                      <li>• Gợi ý: Chú ý phát âm đuôi /s/ và /ed/ khi nói về các hành động trong quá khứ</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* READING PRACTICE */}
          {skill.id === 'reading' && (
            <div className="space-y-6">
              {/* Passage Box */}
              <div className="p-6 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Văn bản học thuật chuyên sâu
                  </span>
                  <span className="text-xs text-slate-400">Độ dài: 380 từ</span>
                </div>
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-serif sm:text-base">
                  {skill.practiceSample.passage}
                </div>
              </div>

              {/* Questions */}
              {skill.practiceSample.questions && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Câu hỏi kiểm tra đọc hiểu:</h4>
                  {skill.practiceSample.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = readingAnswers[q.id] === oIdx;
                          const isCorrect = oIdx === q.correctIndex;
                          let cls = 'bg-white border-slate-200 text-slate-700';
                          if (showReadingResults) {
                            if (isCorrect) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                            else if (isSelected) cls = 'bg-red-50 border-red-400 text-red-900';
                          } else if (isSelected) {
                            cls = 'bg-blue-50 border-blue-600 text-blue-900 font-medium';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                if (!showReadingResults) {
                                  setReadingAnswers((p) => ({ ...p, [q.id]: oIdx }));
                                }
                              }}
                              className={`w-full text-left p-3 text-xs border rounded-lg transition-all cursor-pointer ${cls}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {showReadingResults && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mt-2">
                          <strong>Giải thích:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="pt-2 flex justify-end">
                    {!showReadingResults ? (
                      <button
                        onClick={() => setShowReadingResults(true)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Kiểm tra đáp án
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold">
                        Đã chấm điểm thành công!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WRITING PRACTICE */}
          {skill.id === 'writing' && (
            <div className="space-y-6">
              <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                  Đề bài viết luận học thuật (Academic Writing)
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {skill.practiceSample.writingPrompt}
                </p>
              </div>

              {/* Textarea editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Khung soạn thảo bài luận</span>
                  <span>
                    Số từ: <strong className="text-slate-900 tabular-nums">{wordCount}</strong> / 220 từ
                  </span>
                </div>
                <textarea
                  rows={9}
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="Bắt đầu viết bài luận của bạn tại đây..."
                  className="w-full p-4 text-sm bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none leading-relaxed text-slate-800"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setEssayText(
                      'In recent years, social media platforms have undeniably reshaped the academic routines and psychological well-being of high school students. On the positive side, these networks facilitate instantaneous peer collaboration and rapid access to valuable educational resources. For instance, dedicated study forums enable learners to discuss demanding mathematics assignments or share literature revision materials seamlessly.\n\nNevertheless, the adverse repercussions cannot be overlooked. Excessive screen time frequently induces digital fatigue and shortens attention spans during conventional lectures. Furthermore, the persistent exposure to idealized lifestyles often cultivates subtle psychological pressure. Consequently, schools and parents should jointly cultivate digital literacy, helping teenagers strike a healthy equilibrium between online interaction and focused academic study.'
                    );
                  }}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Nạp bài mẫu chất lượng cao để tham khảo
                </button>

                <button
                  onClick={handleEvaluateEssay}
                  disabled={wordCount < 10 || isEvaluating}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEvaluating ? 'Đang phân tích bài viết...' : 'Chấm điểm & Nhận xét'}</span>
                </button>
              </div>

              {/* Evaluation Result */}
              {evaluationResult && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900">
                      Đánh giá theo Rubric chuẩn THPT & IELTS
                    </h4>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      Điểm ước lượng: {evaluationResult.overallBand}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800">Điểm mạnh nổi bật:</span>
                    <ul className="space-y-1 text-slate-600">
                      {evaluationResult.strengths.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800">Gợi ý nâng cấp:</span>
                    <ul className="space-y-1 text-slate-600">
                      {evaluationResult.improvements.map((imp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
          >
            Đóng phòng luyện
          </button>
        </div>
      </div>
    </div>
  );
};
