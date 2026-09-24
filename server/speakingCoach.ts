import { GoogleGenAI } from '@google/genai';

export interface SpeakingCoachRequest {
  grade: '10' | '11' | '12';
  cefr: string;
  mode: 'guided' | 'free_talk' | 'exam_practice';
  scenario: {
    title: string;
    topic: string;
    prompt: string;
    promptVi: string;
    usefulPhrases: string[];
    vocabulary: string[];
    followUpQuestions: string[];
  };
  transcript: string;
  recentTurns?: Array<{ speaker: 'ai' | 'student'; text: string }>;
}

export interface SpeakingCoachResponse {
  feedback: {
    clarity: number;
    vocabulary: number;
    grammar: number;
    fluency: number;
    overall: number;
    praise: string;
    oneFix: string;
    nextStep: string;
    newPhrases: string[];
  };
  reply: string;
  replyVi: string;
  correction?: {
    original: string;
    improved: string;
    explanationVi: string;
  };
}

const model = 'gemini-2.5-flash';

function clamp(value: unknown, fallback = 70): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function extractJson(text: string): unknown {
  const cleaned = text.trim().replace(/^\`\`\`json\s*/i, '').replace(/^\`\`\`\s*/i, '').replace(/\s*\`\`\`$/i, '');
  return JSON.parse(cleaned);
}

function buildPrompt(input: SpeakingCoachRequest): string {
  const support =
    input.grade === '10'
      ? 'Lớp 10: rất nhẹ nhàng, câu ngắn, tiếng Việt hỗ trợ rõ, chỉ 1 lỗi cần sửa và tối đa 2 cụm từ mới.'
      : input.grade === '11'
        ? 'Lớp 11: cân bằng Anh-Việt, khuyến khích mở rộng ý, chỉ 1-2 điểm cần cải thiện và tối đa 3 cụm từ mới.'
        : 'Lớp 12: ưu tiên tiếng Anh, phong cách luyện thi nhưng vẫn thân thiện, tập trung tính mạch lạc và độ chính xác, tối đa 3 cụm từ mới.';

  return `Bạn là Linh, một AI English Speaking Buddy thân thiện cho học sinh THPT Việt Nam.
Mục tiêu là giúp học sinh nói tốt hơn mà KHÔNG bị choáng ngợp.

Hồ sơ:
- Lớp: ${input.grade}
- CEFR mục tiêu: ${input.cefr}
- Chế độ: ${input.mode}
- Quy tắc điều chỉnh: ${support}

Chủ đề:
- ${input.scenario.title} / ${input.scenario.topic}
- Câu hỏi: ${input.scenario.prompt}
- Gợi ý tiếng Việt: ${input.scenario.promptVi}
- Cụm từ hữu ích: ${input.scenario.usefulPhrases.join(', ')}
- Từ vựng mục tiêu: ${input.scenario.vocabulary.join(', ')}
- Câu hỏi tiếp theo: ${input.scenario.followUpQuestions.join(' | ')}

Câu trả lời của học sinh:
"${input.transcript}"

Lịch sử gần nhất:
${(input.recentTurns ?? []).slice(-6).map(t => `${t.speaker}: ${t.text}`).join('\n')}

Nguyên tắc bắt buộc:
1. Không chấm theo kiểu gây áp lực. Khen một điều cụ thể trước.
2. Không đưa một danh sách dài lỗi sai. Chỉ chọn điểm cải thiện có giá trị nhất ở lượt này.
3. Không dạy quá nhiều từ mới.
4. Nếu học sinh trả lời ngắn, hãy khuyến khích mở rộng bằng một câu hỏi nhỏ hoặc sentence starter.
5. Không biến một lỗi nhỏ thành bài giảng ngữ pháp dài.
6. Phản hồi phải phù hợp đúng lớp.
7. reply là câu Linh nói tiếp bằng tiếng Anh, tự nhiên và ngắn.
8. replyVi là diễn giải tiếng Việt ngắn để học sinh lớp 10-11 dễ hiểu; lớp 12 vẫn có thể dùng tiếng Việt khi cần.
9. Nếu câu trả lời có lỗi đáng sửa, correction chỉ chứa MỘT lỗi tiêu biểu.
10. Điểm số chỉ là tín hiệu tiến bộ, không phải điểm thi chính thức.

Trả về DUY NHẤT JSON hợp lệ theo schema:
{
  "feedback": {
    "clarity": number,
    "vocabulary": number,
    "grammar": number,
    "fluency": number,
    "overall": number,
    "praise": "string in Vietnamese",
    "oneFix": "string in Vietnamese",
    "nextStep": "string in Vietnamese",
    "newPhrases": ["string"]
  },
  "reply": "short English response/question",
  "replyVi": "short Vietnamese support",
  "correction": {
    "original": "student phrase",
    "improved": "better phrase",
    "explanationVi": "short Vietnamese explanation"
  }
}
`;
}

export async function coachSpeaking(input: SpeakingCoachRequest): Promise<SpeakingCoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  if (!input.transcript?.trim()) {
    throw new Error('Transcript is empty');
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model,
    contents: buildPrompt(input),
    config: {
      temperature: 0.45,
      responseMimeType: 'application/json',
      maxOutputTokens: 900
    }
  });

  const raw = response.text ?? '';
  const parsed = extractJson(raw) as Partial<SpeakingCoachResponse>;

  const feedback = parsed.feedback ?? {
    clarity: 70,
    vocabulary: 70,
    grammar: 70,
    fluency: 70,
    overall: 70,
    praise: 'Em đã bắt đầu rất tốt.',
    oneFix: 'Thử nói thêm một ý ngắn nhé.',
    nextStep: 'Hãy trả lời thêm một câu hỏi phụ.',
    newPhrases: []
  };

  return {
    feedback: {
      clarity: clamp(feedback.clarity),
      vocabulary: clamp(feedback.vocabulary),
      grammar: clamp(feedback.grammar),
      fluency: clamp(feedback.fluency),
      overall: clamp(feedback.overall),
      praise: String(feedback.praise || 'Em đã bắt đầu rất tốt.'),
      oneFix: String(feedback.oneFix || 'Thử nói thêm một ý ngắn nhé.'),
      nextStep: String(feedback.nextStep || 'Hãy tiếp tục nói thêm một câu.'),
      newPhrases: Array.isArray(feedback.newPhrases) ? feedback.newPhrases.slice(0, 3).map(String) : []
    },
    reply: String(parsed.reply || input.scenario.followUpQuestions[0] || 'Tell me one more thing.'),
    replyVi: String(parsed.replyVi || 'Mình nói thêm một ý ngắn nhé.'),
    correction: parsed.correction && parsed.correction.original
      ? {
          original: String(parsed.correction.original),
          improved: String(parsed.correction.improved || parsed.correction.original),
          explanationVi: String(parsed.correction.explanationVi || '')
        }
      : undefined
  };
}
