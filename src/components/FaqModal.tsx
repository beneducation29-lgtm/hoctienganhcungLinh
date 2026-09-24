import React from 'react';
import { X, HelpCircle, Shield, BookOpen, Mail, Languages } from 'lucide-react';

interface FaqModalProps {
  type: 'faq' | 'about' | 'guidelines' | 'policy' | 'contact';
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ type, onClose }) => {
  const getHeader = () => {
    switch (type) {
      case 'faq':
        return {
          title: 'Câu hỏi thường gặp (FAQ)',
          icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
          subtitle: 'Giải đáp thắc mắc về lộ trình học Tiếng Anh THPT và thi tốt nghiệp'
        };
      case 'about':
        return {
          title: 'Giới thiệu ENGLISH. THPT Platform',
          icon: <Languages className="w-5 h-5 text-blue-600" />,
          subtitle: 'Nền tảng chuyên sâu Tiếng Anh bám sát SGK và phát triển 4 kỹ năng'
        };
      case 'guidelines':
        return {
          title: 'Phương pháp học Tiếng Anh 35 phút/ngày',
          icon: <BookOpen className="w-5 h-5 text-blue-600" />,
          subtitle: 'Lộ trình kết hợp Từ vựng - Ngữ pháp - 4 Kỹ năng - Flashcards'
        };
      case 'policy':
        return {
          title: 'Chính sách dữ liệu học tập',
          icon: <Shield className="w-5 h-5 text-blue-600" />,
          subtitle: 'Bảo mật tuyệt đối hồ sơ năng lực và điểm số học sinh'
        };
      case 'contact':
        return {
          title: 'Liên hệ Ban cố vấn Tiếng Anh',
          icon: <Mail className="w-5 h-5 text-blue-600" />,
          subtitle: 'Đội ngũ giáo viên chuyên Tiếng Anh THPT sẵn sàng đồng hành cùng bạn'
        };
    }
  };

  const header = getHeader();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white border border-slate-200 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
              {header.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{header.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{header.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
          {type === 'faq' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  1. Nền tảng hỗ trợ những bộ sách giáo khoa Tiếng Anh nào?
                </h4>
                <p className="text-xs text-slate-600">
                  Nền tảng hỗ trợ đầy đủ các bộ sách giáo khoa Tiếng Anh theo chương trình GDPT 2018: Global Success (Kết nối tri thức), Friends Global (Chân trời sáng tạo), i-Learn Smart World và Bright.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  2. Phòng luyện 4 kỹ năng có chuẩn hóa theo thang điểm CEFR không?
                </h4>
                <p className="text-xs text-slate-600">
                  Có. Nội dung bài đọc, audio bài nghe và đề luyện viết/nói được thiết kế theo các nấc thang CEFR từ A2, B1 đến B2, tương thích với định hướng kỳ thi tốt nghiệp THPT và kỳ thi đánh giá năng lực.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  3. Làm sao để phát âm chuẩn từ vựng trong bài học?
                </h4>
                <p className="text-xs text-slate-600">
                  Bạn chỉ cần bấm biểu tượng Loa (Audio) bên cạnh bất kỳ từ vựng hoặc đoạn văn nào, hệ thống sẽ phát âm giọng chuẩn bản xứ để bạn nghe và nhại lại (Shadowing).
                </p>
              </div>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-3">
              <p>
                <strong>ENGLISH.</strong> là nền tảng học Tiếng Anh chuyên sâu thế hệ mới dành riêng cho học sinh THPT Việt Nam.
                Chúng tôi giúp học sinh giải quyết triệt để vấn đề "học vẹt ngữ pháp", thay bằng việc làm chủ từ vựng theo ngữ cảnh,
                nắm vững quy tắc ngữ pháp ứng dụng và phát triển thực chiến 4 kỹ năng Nghe - Nói - Đọc - Viết.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs">
                  <strong className="text-blue-900 block mb-1">Chuẩn Sách Giáo Khoa 2018</strong>
                  10 Units mỗi năm học với hệ thống phân loại câu hỏi thông minh.
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs">
                  <strong className="text-indigo-900 block mb-1">Phòng 4 Kỹ Năng</strong>
                  Luyện tập Nghe, Nói, Đọc, Viết với giọng đọc bản xứ và gợi ý bài luận.
                </div>
              </div>
            </div>
          )}

          {type === 'guidelines' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Lộ trình 35 phút mỗi ngày giúp bứt phá điểm số Tiếng Anh THPT:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
                <li><strong>5 phút:</strong> Ôn tập 10 từ vựng và collocations qua thẻ Flashcards lặp lại ngắt quãng.</li>
                <li><strong>10 phút:</strong> Học lý thuyết ngữ pháp trọng điểm của Unit và làm ngay 3 câu trắc nghiệm.</li>
                <li><strong>15 phút:</strong> Luyện đọc hiểu 1 bài báo học thuật hoặc nghe 1 đoạn hội thoại và bắt từ khóa.</li>
                <li><strong>5 phút:</strong> Hỏi đáp hoặc giải đáp thắc mắc cùng AI Study Advisor.</li>
              </ol>
            </div>
          )}

          {type === 'policy' && (
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                ENGLISH. cam kết bảo vệ dữ liệu học tập và bảo mật quyền riêng tư cho học sinh THPT.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Dữ liệu điểm số và bài làm chỉ sử dụng để phân tích điểm mạnh - yếu của từng kỹ năng.</li>
                <li>Không thu thập dữ liệu cá nhân nhạy cảm, không quảng cáo làm phiền việc học.</li>
                <li>Học sinh có toàn quyền sao lưu hoặc xóa lịch sử học tập.</li>
              </ul>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Nếu bạn có câu hỏi học thuật, cần giải thích đề thi THPT hoặc hỗ trợ kỹ thuật:
              </p>
              <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2">
                <div><strong>Email học vụ:</strong> english.thpt@edugroup.vn</div>
                <div><strong>Cố vấn trực tuyến:</strong> 1800 8899 (Miễn phí từ 08:00 - 22:00)</div>
                <div><strong>Văn phòng học thuật:</strong> Khu Công nghệ Giáo dục, Cầu Giấy, Hà Nội</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
