import React from 'react';
import {
  Clock,
  CheckCircle,
  TrendingUp,
  Flame,
  Award,
  AlertCircle,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Target,
  History
} from 'lucide-react';
import { StudentProfile } from '../types';
import { contentService } from '../services/contentService';
import { LearningActivity } from '../types/contentArchitecture';
import { adaptiveLearningService } from '../services/adaptiveLearningService';

interface ProgressViewProps {
  student: StudentProfile;
  onOpenRecentLesson: () => void;
  onOpenSkill?: (skill: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  student,
  onOpenRecentLesson,
  onOpenSkill
}) => {
  const studentId = (student as any).id || 'hs-student-01';
  const recentActivities: LearningActivity[] = contentService.getRecentActivities(studentId, 6);
  const adaptivePlan = adaptiveLearningService.getPlan(student, studentId);
  const skillLabel: Record<string, string> = { vocabulary: 'Từ vựng', grammar: 'Ngữ pháp', reading: 'Đọc hiểu', listening: 'Nghe hiểu', speaking: 'Nói', writing: 'Viết' };

  const englishCompetencies = [
    {
      name: 'Reading Comprehension (Đọc hiểu)',
      score: student.skillMastery.reading,
      level: 'B2',
      status: 'Xuất sắc',
      desc: 'Nắm vững kỹ thuật Skimming/Scanning, đại từ quy chiếu và đoán nghĩa từ.'
    },
    {
      name: 'Grammar & Syntax (Ngữ pháp & Cấu trúc câu)',
      score: student.skillMastery.grammar,
      level: 'B2',
      status: 'Tốt',
      desc: 'Làm chủ thì động từ, câu điều kiện, câu bị động tường thuật và mệnh đề quan hệ.'
    },
    {
      name: 'Vocabulary & Collocations (Từ vựng học thuật)',
      score: student.skillMastery.vocabulary,
      level: 'B1+',
      status: 'Khá tốt',
      desc: 'Ghi nhớ tốt từ vựng Unit 1-6 SGK Global Success và Friends Global.'
    },
    {
      name: 'Listening Comprehension (Nghe hiểu)',
      score: student.skillMastery.listening,
      level: 'B1',
      status: 'Khá',
      desc: 'Cần luyện thêm dạng nghe điền từ với tốc độ nói tự nhiên của người bản ngữ.'
    },
    {
      name: 'Academic Writing (Viết luận & Viết đoạn)',
      score: student.skillMastery.writing,
      level: 'B1',
      status: 'Cần luyện thêm',
      desc: 'Cần đa dạng hóa liên từ chuyển ý và các cấu trúc câu phức tạp hơn.'
    },
    {
      name: 'Speaking & Fluency (Nói & Giao tiếp)',
      score: student.skillMastery.speaking,
      level: 'B1-',
      status: 'Trọng tâm cải thiện',
      desc: 'Cần chú ý trọng âm từ 3 âm tiết và phản xạ ngữ điệu câu hỏi.'
    }
  ];

  const gradeUnitProgress = [
    { grade: 'Tiếng Anh 10', completedUnits: 8, totalUnits: 10, percent: 80, avg: 8.9 },
    { grade: 'Tiếng Anh 11', completedUnits: 6, totalUnits: 10, percent: 60, avg: 8.8 },
    { grade: 'Tiếng Anh 12 (Ôn thi THPT Quốc gia)', completedUnits: 3, totalUnits: 10, percent: 30, avg: 8.2 }
  ];

  const badges = [
    {
      id: 'b1',
      title: 'Chiến binh Streak 14 Ngày',
      desc: 'Học Tiếng Anh liên tục 14 ngày không ngắt quãng',
      date: 'Mới đạt hôm nay',
      icon: '🔥',
      unlocked: true
    },
    {
      id: 'b2',
      title: 'Bậc thầy Đọc hiểu B2',
      desc: 'Đạt điểm tuyệt đối 5 bài đọc học thuật SGK',
      date: 'Đạt được 3 ngày trước',
      icon: '📖',
      unlocked: true
    },
    {
      id: 'b3',
      title: 'Vua Collocations Unit 6',
      desc: 'Trả lời đúng toàn bộ 20 cụm từ chủ đề Heritage',
      date: 'Đạt được tuần trước',
      icon: '🏛️',
      unlocked: true
    },
    {
      id: 'b4',
      title: 'Nhà Thuyết Trình Tiềm Năng',
      desc: 'Hoàn thành 10 bài luyện nói Speaking',
      date: 'Chưa mở khóa (còn 2 bài)',
      icon: '🎙️',
      unlocked: false
    }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Hồ sơ học tập & Phân tích năng lực Tiếng Anh
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Báo cáo Tiến độ & Năng lực của {student.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Lớp {student.currentGrade} · {student.school} · Trình độ hiện tại: CEFR {student.englishLevel}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl self-start sm:self-auto text-xs">
          <span className="text-slate-500 block">Mục tiêu năm học:</span>
          <strong className="text-blue-700 text-sm font-bold">
            Đạt CEFR B2 & 9.0+ Tiếng Anh THPT
          </strong>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Tổng giờ học</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {student.studyTimeHours}h
          </div>
          <p className="text-xs text-slate-500">Mục tiêu kỳ I: 60 giờ học tập</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Bài hoàn thành</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {student.completedLessons}
          </div>
          <p className="text-xs text-emerald-600 font-medium">+18 bài so với tháng trước</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Điểm trung bình</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {student.averageScore}
            <span className="text-sm font-normal text-slate-400">/10</span>
          </div>
          <p className="text-xs text-slate-500">Thuộc Top 5% học sinh của trường</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase tracking-wider">Chuỗi liên tiếp</span>
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {student.streakDays}
            <span className="text-sm font-normal text-slate-400"> ngày</span>
          </div>
          <p className="text-xs text-amber-600 font-medium">Kỷ luật tự giác rất cao</p>
        </div>
      </div>

      {/* Adaptive Daily Learning Plan */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> KẾ HOẠCH HỌC THÍCH ỨNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">Hôm nay Linh gợi ý {adaptivePlan.totalMinutes} phút</h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Kế hoạch được tạo từ tiến độ, kết quả luyện tập và kỹ năng cần củng cố của bạn — chỉ tập trung vào vài việc quan trọng để không bị quá tải.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Trọng tâm hôm nay</div>
            <div className="text-lg font-extrabold mt-1">{skillLabel[adaptivePlan.focusSkill]} · {adaptivePlan.focusScore}%</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {adaptivePlan.items.map((item, index) => (
            <button key={item.id} type="button" onClick={() => onOpenSkill?.(item.skill)} className="text-left rounded-2xl bg-white/10 border border-white/10 p-5 flex flex-col hover:bg-white/15 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs font-extrabold">{index + 1}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{item.estimatedMinutes} phút</span>
              </div>
              <h3 className="font-bold text-sm mt-4">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-5 mt-2">{item.description}</p>
              <div className="mt-auto pt-4">
                <div className="text-[10px] text-slate-400 leading-4">{item.reason}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white">
                  {item.priority === 'high' ? 'Ưu tiên hôm nay' : 'Duy trì kỹ năng'} <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {Object.entries(adaptivePlan.skillBreakdown).filter(([key]) => key !== 'overall').map(([skill, score]) => (
            <div key={skill} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <div className="text-[10px] text-slate-400">{skillLabel[skill]}</div>
              <div className="text-sm font-extrabold mt-0.5">{score}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Log (from ContentService) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <span>Nhật ký hoạt động học tập gần đây</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ghi nhận các bài học, bài đọc hiểu và quiz đã hoàn thành
            </p>
          </div>
          <span className="text-xs text-slate-400">{recentActivities.length} hoạt động</span>
        </div>

        <div className="space-y-3">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{act.contentTitle}</h4>
                  <div className="text-slate-500 text-[11px] mt-0.5 capitalize">
                    Kỹ năng: {act.skill} · Thời lượng: {act.durationMinutes} phút · Điểm: {act.score}/10
                  </div>
                </div>
              </div>

              <span className="text-slate-400 text-[11px] font-mono shrink-0">
                {act.createdAt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Core English Competencies Breakdown */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Đánh giá năng lực theo 6 hợp phần Tiếng Anh
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Chuẩn hóa theo thang tham chiếu Châu Âu CEFR và ma trận đề thi Bộ Giáo Dục & Đào Tạo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {englishCompetencies.map((comp) => (
            <div
              key={comp.name}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800">{comp.name}</span>
                <span className="text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {comp.level} · {comp.score}%
                </span>
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${comp.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>{comp.desc}</span>
                <span className="font-semibold text-slate-700 shrink-0 ml-2">{comp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade-by-grade Progress */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Tiến độ hoàn thành theo chương trình Tiếng Anh các lớp
        </h3>

        <div className="space-y-5">
          {gradeUnitProgress.map((gp) => (
            <div key={gp.grade} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-800">{gp.grade}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">
                    ĐTB: <strong className="text-blue-600">{gp.avg}</strong>
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {gp.completedUnits}/{gp.totalUnits} Units ({gp.percent}%)
                  </span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${gp.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges and Honors */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Huy hiệu & Cột mốc vinh danh Tiếng Anh
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ghi nhận sự kiên trì và bứt phá điểm số của học sinh THPT.
            </p>
          </div>
          <span className="text-xs text-slate-400">Đã mở khóa 3/4 huy hiệu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-xl border transition-all ${
                b.unlocked
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-50/50 border-dashed border-slate-200 opacity-60'
              }`}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
              <span className="text-[10px] text-slate-400 mt-3 block font-mono">
                {b.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
