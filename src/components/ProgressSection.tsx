import React from 'react';
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Flame,
  Award,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface ProgressSectionProps {
  student: StudentProfile;
  onViewDetailedProgress: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  student,
  onViewDetailedProgress
}) => {
  // Weekly study data
  const weekDays = [
    { day: 'T2', hours: 2.5, targetReached: true },
    { day: 'T3', hours: 3.0, targetReached: true },
    { day: 'T4', hours: 1.8, targetReached: true },
    { day: 'T5', hours: 2.2, targetReached: true },
    { day: 'T6', hours: 3.5, targetReached: true },
    { day: 'T7', hours: 4.0, targetReached: true },
    { day: 'CN', hours: 2.0, targetReached: true }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Báo cáo năng lực học tập
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
              Tiến độ của bạn
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Dữ liệu được cập nhật theo thời gian thực dựa trên các bài học, bài tập ôn luyện và bài kiểm tra 4 kỹ năng đã làm.
            </p>
          </div>

          <button
            onClick={onViewDetailedProgress}
            className="self-start md:self-auto text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Xem phân tích chi tiết</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {/* 1. Tổng thời gian học */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Tổng thời gian học
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {student.studyTimeHours}
              <span className="text-lg font-medium text-slate-500 ml-1">giờ</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Tương đương 291 bài học và bài luyện tập tích lũy.
            </p>
          </div>

          {/* 2. Bài đã hoàn thành */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Bài đã hoàn thành
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {student.completedLessons}
              <span className="text-lg font-medium text-slate-500 ml-1">bài</span>
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-2">
              Đạt 82% chỉ tiêu chương trình học kỳ hiện tại.
            </p>
          </div>

          {/* 3. Điểm trung bình */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Điểm trung bình
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {student.averageScore}
              <span className="text-lg font-normal text-slate-400 ml-1">/ 10</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Xếp loại Giỏi theo thang đánh giá chuẩn THPT.
            </p>
          </div>

          {/* 4. Streak */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Chuỗi học tập liên tục
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-amber-500" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {student.streakDays}
              <span className="text-lg font-medium text-slate-500 ml-1">ngày</span>
            </div>
            <p className="text-xs text-amber-600 font-medium mt-2">
              Chỉ cần 1 ngày nữa để đạt huy hiệu Kỷ luật Vàng.
            </p>
          </div>

          {/* 5. Kỹ năng mạnh nhất */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Kỹ năng mạnh nhất
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              {student.strongestSkill.name}
            </div>
            <div className="text-sm font-semibold text-emerald-600 tabular-nums mt-1">
              Điểm số: {student.strongestSkill.score}/10
            </div>
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
              {student.strongestSkill.description}
            </p>
          </div>

          {/* 6. Kỹ năng cần cải thiện */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Kỹ năng cần cải thiện
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              {student.improvementSkill.name}
            </div>
            <div className="text-sm font-semibold text-amber-600 tabular-nums mt-1">
              Điểm số: {student.improvementSkill.score}/10
            </div>
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
              {student.improvementSkill.description}
            </p>
          </div>
        </div>

        {/* Weekly Activity Distribution Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <h4 className="text-base font-bold text-slate-900">Thời gian học trong tuần</h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Mục tiêu: Đạt tối thiểu 2.5 giờ mỗi ngày
              </p>
            </div>
            <div className="text-xs text-slate-500">
              Tổng tuần: <strong className="text-slate-900 tabular-nums font-semibold">19.0 giờ</strong> (Vượt 12% chỉ tiêu)
            </div>
          </div>

          {/* Bar Columns */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-36 pt-4">
            {weekDays.map((w, idx) => {
              const maxHours = 5.0;
              const heightPercent = (w.hours / maxHours) * 100;
              const isToday = idx === 3; // e.g. Thursday
              return (
                <div key={w.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {w.hours}h
                  </span>
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isToday
                          ? 'bg-blue-600'
                          : w.targetReached
                          ? 'bg-slate-800 group-hover:bg-blue-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isToday ? 'text-blue-600 font-bold' : 'text-slate-600'
                    }`}
                  >
                    {w.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
