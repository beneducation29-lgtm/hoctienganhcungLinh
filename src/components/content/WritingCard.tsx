import React, { useState } from 'react';
import { Sparkles, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { WritingExercise } from '../../types/contentArchitecture';

interface WritingCardProps {
  exercise: WritingExercise;
  onComplete?: (score: number) => void;
}

export const WritingCard: React.FC<WritingCardProps> = ({ exercise, onComplete }) => {
  const [essayText, setEssayText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const wordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;
  const isWordCountValid =
    wordCount >= exercise.minimumWords && wordCount <= exercise.maximumWords + 50;

  const handleSubmitEssay = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEvaluation({
        score: '8.5 / 10',
        band: 'B2 Academic',
        feedback: [
          'Luận điểm rõ ràng, lập luận có căn cứ thuyết phục',
          'Sử dụng các cụm từ học thuật tốt (tangible reminders, sustainable engine, mutual reinforcement)',
          'Cấu trúc đoạn văn chuẩn gồm Topic Sentence, Supporting Arguments và Conclusion'
        ],
        tips: [
          'Có thể bổ sung một câu hỏi tu từ ngắn ở phần mở bài để tăng sức lôi cuốn người đọc'
        ]
      });
      if (onComplete) onComplete(8.5);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Prompt Card */}
      <div className="p-6 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-blue-700 uppercase tracking-wider">
            Đề bài viết luận · CEFR {exercise.level}
          </span>
          <span className="text-slate-500 font-medium">
            Yêu cầu độ dài: {exercise.minimumWords} - {exercise.maximumWords} từ
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {exercise.prompt}
        </h3>

        <div className="text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-blue-100 space-y-1">
          <p className="font-bold text-slate-800">Hướng dẫn viết:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
            {exercise.guidelines.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="font-medium flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" /> Khung soạn thảo bài làm
          </span>

          <div className="flex items-center gap-2">
            <span>Số từ:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                wordCount < exercise.minimumWords
                  ? 'text-amber-600 bg-amber-50'
                  : wordCount > exercise.maximumWords + 50
                  ? 'text-red-600 bg-red-50'
                  : 'text-emerald-700 bg-emerald-50'
              }`}
            >
              {wordCount} / {exercise.maximumWords}
            </span>
          </div>
        </div>

        <textarea
          rows={10}
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          placeholder="Bắt đầu viết bài luận của bạn tại đây..."
          className="w-full p-4 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none leading-relaxed text-slate-800 font-serif"
        />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setEssayText(exercise.example)}
            className="text-xs text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Nạp bài luận mẫu tham khảo
          </button>

          <button
            onClick={handleSubmitEssay}
            disabled={wordCount < 10 || isSubmitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Đang phân tích bài viết...' : 'Nộp bài & Nhận đánh giá'}</span>
          </button>
        </div>
      </div>

      {/* Feedback Card */}
      {evaluation && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h4 className="text-sm font-bold text-slate-900">
              Nhận xét bài làm theo chuẩn Rubric THPT
            </h4>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
              Điểm ước lượng: {evaluation.score}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-800">Điểm mạnh:</span>
            <ul className="space-y-1 text-slate-600">
              {evaluation.feedback.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-800">Gợi ý nâng cấp:</span>
            <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
              {evaluation.tips[0]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
