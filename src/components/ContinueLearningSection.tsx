import React from 'react';
import { Play, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../types';

interface ContinueLearningSectionProps {
  student: StudentProfile;
  onResumeLesson: () => void;
  onExploreAllLessons: () => void;
}

export const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({
  student,
  onResumeLesson,
  onExploreAllLessons
}) => {
  const { recentLesson } = student;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Lưu vết học tập cá nhân
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Tiếp tục học
            </h2>
          </div>
          <button
            onClick={onExploreAllLessons}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Xem danh sách bài giảng đã lưu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlighted Recent Lesson Card */}
        <div className="bg-[#FAFAFA] border border-slate-200/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  {recentLesson.subject}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{recentLesson.unit}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Lớp {recentLesson.grade}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-400">Truy cập lần cuối: {recentLesson.lastAccessed}</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {recentLesson.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                  Chủ đề di sản văn hóa phi vật thể: Rèn luyện kỹ năng đọc hiểu đoạn văn học thuật 400 từ,
                  cách suy luận từ vựng theo ngữ cảnh và 3 câu hỏi ôn tập cuối bài.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Đã hoàn thành</span>
                  <span className="text-slate-900 font-bold tabular-nums">
                    {recentLesson.completedPercent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${recentLesson.completedPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Còn lại khoảng {recentLesson.remainingMinutes} phút
                  </span>
                  <span>Thời lượng: {recentLesson.totalMinutes} phút</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onResumeLesson}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Học tiếp ngay</span>
                </button>

                <button
                  onClick={onResumeLesson}
                  className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Làm câu hỏi ôn tập</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual Reference */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-2xs">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Tài liệu bổ trợ bài học
              </span>
              <ul className="text-xs space-y-2.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Bộ từ vựng chuyên đề di sản (Tangible vs Intangible)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Quy tắc câu bị động với động từ tường thuật (Reported Passives)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>3 câu hỏi trắc nghiệm tự chấm điểm kèm giải thích chi tiết</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                Nguồn: Sách giáo khoa Tiếng Anh 11 Global Success · GDPT 2018
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
