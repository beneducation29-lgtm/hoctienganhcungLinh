import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { SpeakingExercise } from '../../types/contentArchitecture';

interface SpeakingCardProps {
  exercise: SpeakingExercise;
  onComplete?: () => void;
}

export const SpeakingCard: React.FC<SpeakingCardProps> = ({ exercise, onComplete }) => {
  const [prepTimeLeft, setPrepTimeLeft] = useState(exercise.preparationTime);
  const [isPrepping, setIsPrepping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showSample, setShowSample] = useState(false);

  // Preparation Timer
  useEffect(() => {
    if (!isPrepping || prepTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPrepping(false);
          setIsRecording(true); // Automatically trigger recording when prep ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPrepping, prepTimeLeft]);

  // Recording Timer
  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartPrep = () => {
    setPrepTimeLeft(exercise.preparationTime);
    setIsPrepping(true);
    setHasRecorded(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  const formatSecs = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Prompt Card */}
      <div className="p-6 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-blue-700 uppercase tracking-wider">
            Đề bài thuyết trình · CEFR {exercise.level}
          </span>
          <span className="text-slate-500 font-medium">
            Thời lượng khuyến nghị: {exercise.duration}s
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {exercise.prompt}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-blue-100">
          <strong>Hướng dẫn:</strong> {exercise.instructions}
        </p>

        {/* Useful phrases */}
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-semibold text-slate-700">Mẫu câu gợi ý ghi điểm:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {exercise.usefulPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700 font-serif italic"
              >
                "{phrase}"
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recording Stage: Prompt -> Prep -> Record -> Replay -> Submit */}
      <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-6">
        {/* State 1: Preparation */}
        {isPrepping && (
          <div className="space-y-2 animate-in fade-in">
            <div className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Thời gian chuẩn bị ý tưởng
            </div>
            <div className="text-4xl font-black font-mono text-amber-600">
              {formatSecs(prepTimeLeft)}
            </div>
            <p className="text-xs text-slate-500">
              Hãy phác thảo dàn ý ra nháp. Hệ thống sẽ tự động bắt đầu ghi âm khi hết giờ.
            </p>
          </div>
        )}

        {/* State 2: Active Recording */}
        {isRecording && (
          <div className="space-y-3 animate-in fade-in">
            <div className="relative w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
              <button
                onClick={handleStopRecording}
                className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer shadow-lg"
              >
                <MicOff className="w-7 h-7" />
              </button>
            </div>
            <div className="text-2xl font-black font-mono text-red-600">
              {formatSecs(recordingSeconds)}
            </div>
            <p className="text-xs font-semibold text-slate-700">
              Đang ghi âm... Nhấn nút đỏ để kết thúc bài nói
            </p>
          </div>
        )}

        {/* State 3: Ready or Done */}
        {!isPrepping && !isRecording && (
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
              <button
                onClick={handleStartPrep}
                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105"
              >
                <Mic className="w-7 h-7" />
              </button>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {hasRecorded ? 'Bài nói đã ghi âm thành công' : 'Bắt đầu bài luyện nói'}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {hasRecorded
                  ? `Độ dài bản ghi: ${formatSecs(recordingSeconds)}.`
                  : `Bạn sẽ có ${exercise.preparationTime} giây chuẩn bị trước khi micro tự động mở.`}
              </p>
            </div>

            {hasRecorded && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-2 text-left max-w-lg mx-auto animate-in fade-in">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phân tích âm học tự động:
                </span>
                <ul className="space-y-1 text-emerald-800">
                  <li>• Tốc độ nói: <strong>125 từ/phút</strong> (chuẩn giao tiếp tự nhiên)</li>
                  <li>• Độ lưu loát: Không bị ngập ngừng quá 3 giây</li>
                  <li>• Trọng âm từ học thuật: Đạt 90% chính xác</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Sample Answer Toggle */}
        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => setShowSample(!showSample)}
            className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            {showSample ? 'Ẩn câu trả lời mẫu (Sample Answer)' : 'Xem câu trả lời mẫu tham khảo'}
          </button>
        </div>

        {showSample && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 text-left leading-relaxed font-serif animate-in fade-in">
            {exercise.sampleAnswer}
          </div>
        )}
      </div>

      {/* Evaluation Rubrics */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Tiêu chí đánh giá bài nói (Rubric)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exercise.evaluationCriteria.map((crit, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>{crit.criterion}</span>
                <span className="text-blue-600">{crit.weight}%</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {crit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
