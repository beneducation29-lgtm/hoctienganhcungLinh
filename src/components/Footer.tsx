import React from 'react';
import { Languages, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenFaq: () => void;
  onOpenAbout: () => void;
  onOpenGuidelines: () => void;
  onOpenPolicy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFaq,
  onOpenAbout,
  onOpenGuidelines,
  onOpenPolicy,
  onOpenContact
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Languages className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                ENGLISH<span className="text-blue-600">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Nền tảng học Tiếng Anh bám sát chương trình sách giáo khoa THPT Việt Nam (Lớp 10, 11, 12).
              Phát triển toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết và ôn thi tốt nghiệp THPT Quốc gia.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>english.thpt@edugroup.vn</span>
              </div>
            </div>
          </div>

          {/* Col 3: Điều hướng học tập */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Chương trình Tiếng Anh
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Giới thiệu nền tảng
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuidelines}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Phương pháp 35p/ngày
                </button>
              </li>
              <li>
                <span className="text-slate-500">Tiếng Anh 10 (A2 → B1)</span>
              </li>
              <li>
                <span className="text-slate-500">Tiếng Anh 11 (B1 → B2)</span>
              </li>
              <li>
                <span className="text-slate-500">Tiếng Anh 12 (B2 & Ôn thi)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: 4 Kỹ năng & Tiện ích */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Phòng 4 Kỹ Năng
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-500">Listening (Bản ngữ & Phản xạ)</span>
              </li>
              <li>
                <span className="text-slate-500">Speaking (Trọng âm & Diễn đạt)</span>
              </li>
              <li>
                <span className="text-slate-500">Reading (Skimming/Scanning)</span>
              </li>
              <li>
                <span className="text-slate-500">Writing (Đoạn văn & Luận)</span>
              </li>
              <li>
                <span className="text-slate-500">AI Study Advisor</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Hỗ trợ & Chính sách */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Hỗ trợ & Pháp lý
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenFaq}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Câu hỏi thường gặp (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPolicy}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Chính sách bảo mật dữ liệu
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Liên hệ ban cố vấn Tiếng Anh
                </button>
              </li>
              <li>
                <span className="text-slate-500">Khung năng lực ngoại ngữ 6 bậc</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            © {new Date().getFullYear()} ENGLISH. THPT Platform. Chuẩn hóa theo chương trình GDPT 2018.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Tiến bộ mỗi ngày cùng học sinh THPT Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
