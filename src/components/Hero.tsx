import React from 'react';
import {
  ArrowRight,
  Flame,
  Clock,
  CheckCircle,
  TrendingUp,
  Target,
  Play,
  Award,
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  PenTool
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeroProps {
  student: StudentProfile;
  onStartLearning: () => void;
  onExploreCurriculum: () => void;
  onResumeLesson: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  student,
  onStartLearning,
  onExploreCurriculum,
  onResumeLesson
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-100">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle Editorial Kicker (no pill box) */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>Tiếng Anh THPT Việt Nam</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Lớp 10 — 11 — 12</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>4 Kỹ Năng Nghe Nói Đọc Viết</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
            Học chắc Tiếng Anh. Luyện đúng kỹ năng.{' '}
            <span className="text-blue-600 inline-block">Tiến bộ mỗi ngày.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            Nền tảng học Tiếng Anh dành cho học sinh THPT — bám sát chương trình sách giáo khoa
            và phát triển toàn diện 4 kỹ năng.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Bắt đầu học</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCurriculum}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Khám phá chương trình
            </button>
          </div>
        </div>

        {/* Visual Card: Student English Dashboard */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Top Bar of Student Dashboard */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-base shrink-0">
                  {student.englishLevel}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Không gian học tập Tiếng Anh
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">Lớp {student.currentGrade}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    Chào {student.name}, mục tiêu lên trình độ {student.targetLevel} đạt {student.levelProgressPercent}%!
                  </h3>
                </div>
              </div>

              {/* Streak & Level Info */}
              <div className="flex items-center gap-3 self-start sm:self-auto text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/70 rounded-lg text-amber-800 font-medium text-xs">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{student.streakDays} ngày liên tiếp</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200/70 rounded-lg text-blue-800 font-medium text-xs">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>CEFR: {student.englishLevel} (Intermediate)</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Recent Lesson Spotlight */}
              <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-600 uppercase tracking-wider">Đang học dở dang</span>
                  <span>{student.recentLesson.lastAccessed}</span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {student.recentLesson.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {student.recentLesson.unit} · Sách Global Success
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Tiến độ bài học</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {student.recentLesson.completedPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${student.recentLesson.completedPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Còn lại khoảng {student.recentLesson.remainingMinutes} phút</span>
                    <span>Tổng thời lượng: {student.recentLesson.totalMinutes} phút</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={onResumeLesson}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Học tiếp ngay</span>
                  </button>

                  <span className="text-xs text-slate-500">
                    Kèm 2 câu hỏi ôn tập & bài đọc hiểu
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Metrics Breakdown */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Thời gian học</span>
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {student.studyTimeHours}h
                  </div>
                  <p className="text-[11px] text-slate-400">Tích lũy từ đầu kỳ</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Bài đã xong</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {student.completedLessons}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium">+14 bài tháng này</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Điểm kiểm tra</span>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {student.averageScore}
                    <span className="text-xs font-normal text-slate-400">/10</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Khảo sát năng lực THPT</p>
                </div>

                <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Kỹ năng mạnh</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 truncate">
                    Reading
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold tabular-nums">
                    9.2 điểm xuất sắc
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Session Highlight Row */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Buổi học hôm nay (Today’s English Session · 35 phút)
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                    <span>Từ vựng: 5p</span>
                    <span>·</span>
                    <span>Ngữ pháp: 5p</span>
                    <span>·</span>
                    <span>Nghe: 10p</span>
                    <span>·</span>
                    <span>Đọc: 10p</span>
                    <span>·</span>
                    <span>Nói: 5p</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartLearning}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer self-start md:self-auto flex items-center gap-1.5"
              >
                <span>Bắt đầu buổi học hôm nay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
