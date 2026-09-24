import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Volume2
} from 'lucide-react';

interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
  suggestions?: string[];
  keyNotes?: string[];
}

interface AITutorViewProps {
  onOpenLesson?: (lesson: any) => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ onOpenLesson }) => {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      text: 'Xin chào! Mình là AI Study Advisor — trợ lý đồng hành học Tiếng Anh THPT của bạn. Bạn muốn củng cố ngữ pháp Unit nào, cần chữa lỗi một câu tiếng Anh hay muốn luyện phản xạ từ vựng hôm nay?',
      time: 'Vừa xong',
      suggestions: [
        'Giải thích thì Quá khứ đơn vs Hiện tại hoàn thành Unit 1',
        'Phân biệt Mustn\'t và Don\'t have to Unit 2',
        '10 Collocations ghi điểm chủ đề Di sản Unit 6',
        'Mẹo làm bài Đọc hiểu Skimming & Scanning đề THPT'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Pre-configured intelligent simulated responses for high school English curriculum
  const knowledgeBase: Record<string, { reply: string; notes: string[]; followUps: string[] }> = {
    'unit 1': {
      reply: `📌 **Ngữ pháp trọng tâm Unit 1: Past Simple vs. Present Perfect**

1. **Quá khứ đơn (Past Simple)**:
   - Dùng cho hành động đã xảy ra và **kết thúc hoàn toàn** tại thời điểm xác định trong quá khứ.
   - Dấu hiệu: *yesterday, ago, last year, in 2018, when I was young*.
   - Ví dụ: *"Dr. Tran published the medical research in 2021."* (Đã hoàn tất năm 2021).

2. **Hiện tại hoàn thành (Present Perfect)**:
   - Dùng cho hành động xảy ra trong quá khứ nhưng **kết quả hoặc thời gian còn tiếp diễn đến hiện tại**.
   - Dấu hiệu: *since, for, already, yet, so far, recently, twice, never*.
   - Ví dụ: *"Dr. Tran has published three papers on longevity so far."* (Đến nay đã xuất bản 3 bài, tương lai có thể tiếp tục).

💡 **Mẹo thi THPT:** Nếu có liên từ **SINCE**:
\`S + have/has + V3/ed + SINCE + S + V2/ed (mốc quá khứ)\``,
      notes: [
        'Past Simple: thời gian kết thúc',
        'Present Perfect: liên hệ đến hiện tại',
        'Công thức SINCE: Hiện tại hoàn thành + since + Quá khứ đơn'
      ],
      followUps: [
        'Cho mình 3 câu bài tập trắc nghiệm phần này',
        'Các động từ chỉ trạng thái (Stative verbs) là gì?'
      ]
    },
    'must': {
      reply: `📌 **Phân biệt MUSTN'T vs DON'T HAVE TO (Unit 2: The Generation Gap)**

Rất nhiều bạn học sinh hay nhầm lẫn 2 cấu trúc này trong đề thi:

1. **MUSTN'T (Cấm tuyệt đối)**:
   - Không được phép làm điều gì đó (vi phạm luật pháp, nội quy trường hoặc gây nguy hiểm).
   - *Ví dụ:* *"You mustn't bring smartphones into the official exam hall."* (Cấm mang điện thoại).

2. **DON'T / DOESN'T HAVE TO (Không bắt buộc)**:
   - Không cần thiết phải làm, nhưng nếu muốn thì bạn vẫn có thể làm.
   - *Ví dụ:* *"Tomorrow is Sunday, so you don't have to wear the school uniform."* (Bạn không bắt buộc phải mặc đồng phục, nếu thích vẫn mặc được).

💡 **Tóm tắt nhanh:**
- Mustn't = **FORBIDDEN (CẤM)**
- Don't have to = **OPTIONAL / NOT NECESSARY (TÙY Ý)**`,
      notes: [
        'Mustn\'t: Cấm đoán nghiêm ngặt (Strict Prohibition)',
        'Don\'t have to: Không bắt buộc (Lack of Obligation)',
        'Ought to = Should (Khuyên nhủ)'
      ],
      followUps: [
        'Luyện tập câu trắc nghiệm Unit 2',
        'Giải thích cấu trúc Should vs Ought to'
      ]
    },
    'heritage': {
      reply: `📌 **Bộ Collocations chủ đề Heritage (Unit 6: Preserving Our Heritage)**

Để đạt điểm 8.5+ bài thi Tiếng Anh THPT, hãy ghi nhớ các cụm kết hợp từ tự nhiên sau:

1. **preserve / safeguard cultural heritage** (bảo tồn / gìn giữ di sản văn hóa)
2. **tangible cultural relics** (các di vật văn hóa vật thể)
3. **intangible cultural heritage** (di sản văn hóa phi vật thể - ví dụ: Dân ca Quan họ)
4. **undertake a restoration project** (tiến hành dự án trùng tu, phục dựng)
5. **foster a sense of national pride** (bồi đắp lòng tự hào dân tộc)
6. **place historical sites in severe jeopardy** (đẩy các di tích vào tình trạng nguy hiểm)
7. **pass down traditions through generations** (lưu truyền truyền thống qua các thế hệ)

🎧 Hãy áp dụng ngay các cụm này vào phần thi Writing & Speaking!`,
      notes: [
        'Safeguard đi với Intangible Heritage',
        'In severe jeopardy = at risk / in danger',
        'Tangible (vật thể) vs Intangible (phi vật thể)'
      ],
      followUps: [
        'Cho mình xem bài mẫu Writing về Di sản văn hóa',
        'Phát âm từ "heritage" và "jeopardy" như thế nào?'
      ]
    },
    'reading': {
      reply: `📌 **Chiến thuật Đọc hiểu Skimming & Scanning chuẩn đề thi THPT**

1. **Skimming (Đọc lướt bắt ý chính)**:
   - Đọc câu đầu tiên (Topic sentence) và câu cuối cùng của mỗi đoạn văn.
   - Không dừng lại tra từng từ vựng mới; tập trung trả lời câu hỏi: *"Bài này nói về chủ đề gì?"*.

2. **Scanning (Đọc quét tìm dữ kiện cụ thể)**:
   - Dùng khi trả lời câu hỏi về Năm, Tên riêng, Số liệu hoặc Từ khóa trong câu hỏi.
   - Di chuyển mắt theo hình zíc-zắc từ trên xuống dưới để định vị từ khóa.

3. **Câu hỏi từ vựng "Closest in meaning"**:
   - Thay lần lượt 4 phương án vào chỗ trống trong đoạn văn để kiểm tra tính hợp lý về ngữ cảnh, không chọn theo cảm tính dịch thô!`,
      notes: [
        'Skimming: tìm ý chính / đại ý',
        'Scanning: tìm số liệu / tên riêng / chi tiết',
        'Đoán nghĩa từ: dựa vào liên từ đối lập (however, although, but)'
      ],
      followUps: [
        'Mở bài đọc luyện tập Skimming ngay',
        'Cách làm dạng câu hỏi đại từ quy chiếu (reference words)'
      ]
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: TutorMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Vừa xong'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matched = knowledgeBase['unit 1'];

      if (lower.includes('must') || lower.includes('have to') || lower.includes('unit 2') || lower.includes('thế hệ')) {
        matched = knowledgeBase['must'];
      } else if (lower.includes('heritage') || lower.includes('di sản') || lower.includes('unit 6') || lower.includes('collocation')) {
        matched = knowledgeBase['heritage'];
      } else if (lower.includes('đọc') || lower.includes('reading') || lower.includes('skimming') || lower.includes('chiến thuật')) {
        matched = knowledgeBase['reading'];
      }

      const replyMsg: TutorMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'tutor',
        text: matched.reply,
        time: 'Vừa xong',
        keyNotes: matched.notes,
        suggestions: matched.followUps
      };

      setMessages((prev) => [...prev, replyMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI English Study Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Góc cố vấn học tập Tiếng Anh
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Giải đáp ngữ pháp, tra cứu collocations và hướng dẫn chiến thuật làm bài bám sát SGK THPT.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl self-start sm:self-auto text-xs text-blue-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Sẵn sàng hỗ trợ Lớp 10 · 11 · 12</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${
                  isTutor ? 'self-start' : 'self-end ml-auto flex-row-reverse'
                }`}
              >
                {isTutor && (
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 font-bold text-xs">
                    AI
                  </div>
                )}

                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isTutor
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-blue-600 text-white shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>

                  {/* Tutor Key Notes Pills */}
                  {isTutor && msg.keyNotes && msg.keyNotes.length > 0 && (
                    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs space-y-1.5">
                      <span className="font-bold text-blue-800 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                        Ghi nhớ cốt lõi:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                        {msg.keyNotes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions Chips */}
                  {isTutor && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Gợi ý câu hỏi tiếp theo:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-xs bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg text-slate-600 transition-colors text-left"
                          >
                            {sug} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
              <span>AI Advisor đang tổng hợp kiến thức...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập câu hỏi ngữ pháp, từ vựng hoặc Unit bạn cần cố vấn..."
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Hỏi</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
