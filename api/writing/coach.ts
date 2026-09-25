import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

type WritingRequest = {
  grade: '10' | '11' | '12';
  level: string;
  prompt: string;
  draft: string;
  minimumWords: number;
  maximumWords: number;
};

const clamp = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 70;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body as Partial<WritingRequest>;
  if (!body?.draft?.trim()) return res.status(400).json({ error: 'Bản nháp đang trống.' });

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY chưa được cấu hình.' });

  const ai = new GoogleGenAI({ apiKey });
  const gradeSupport = body.grade === '10'
    ? 'Lớp 10: phản hồi ngắn, dễ hiểu, hỗ trợ tiếng Việt.'
    : body.grade === '11'
      ? 'Lớp 11: cân bằng tiếng Anh và tiếng Việt, tập trung độ rõ ràng.'
      : 'Lớp 12: ưu tiên tính mạch lạc, độ chính xác và phong cách học thuật.';

  const wordRange = `${body.minimumWords || 0}-${body.maximumWords || 999} từ`;
  const systemPrompt = `Bạn là Linh, AI Writing Coach cho học sinh THPT Việt Nam.
${gradeSupport}
Đề bài: ${body.prompt}
Giới hạn: ${wordRange}
Bản nháp:
"${body.draft}"

Nguyên tắc:
- Đánh giá bài viết như một bản nháp học tập, không phải chấm thi chính thức.
- Không viết lại toàn bộ bài.
- Nêu 1 điểm mạnh cụ thể.
- Chỉ chọn 1 lỗi/điểm cần ưu tiên.
- Tối đa 3 sửa câu đáng chú ý.
- Không đổi ý nghĩa, luận điểm hoặc giọng văn của học sinh.
- Nếu câu đúng nhưng chưa tự nhiên, không bắt buộc sửa.
- nextStep phải là một hành động nhỏ có thể làm ngay.
- encouragingNote ngắn, tích cực.

Trả về JSON duy nhất.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            priorityFix: { type: Type.STRING },
            corrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  improved: { type: Type.STRING },
                  explanationVi: { type: Type.STRING }
                },
                required: ['original', 'improved', 'explanationVi']
              }
            },
            nextStep: { type: Type.STRING },
            encouragingNote: { type: Type.STRING }
          },
          required: ['score', 'strengths', 'priorityFix', 'corrections', 'nextStep', 'encouragingNote']
        },
        maxOutputTokens: 420,
        thinkingConfig: { thinkingLevel: 'minimal' }
      }
    });

    const text = response.text?.trim();
    if (!text) throw new Error('Gemini trả về phản hồi trống.');
    const parsed = JSON.parse(text);
    return res.status(200).json({
      score: clamp(parsed.score),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 2).map(String) : [],
      priorityFix: String(parsed.priorityFix || 'Hãy kiểm tra một lỗi ngữ pháp quan trọng nhất trước.'),
      corrections: Array.isArray(parsed.corrections) ? parsed.corrections.slice(0, 3) : [],
      nextStep: String(parsed.nextStep || 'Thêm một ví dụ cụ thể vào bài viết.'),
      encouragingNote: String(parsed.encouragingNote || 'Em đang đi đúng hướng.')
    });
  } catch (error) {
    console.error('[writing-coach]', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Writing AI request failed' });
  }
}
