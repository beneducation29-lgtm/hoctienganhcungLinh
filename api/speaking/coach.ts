import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

export interface SpeakingCoachRequest {
  grade: '10' | '11' | '12';
  cefr: string;
  mode: 'guided' | 'free_talk' | 'exam_practice';
  scenario: {
    title: string;
    topic: string;
    prompt: string;
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

const model = 'gemini-3.5-flash-lite';

function describeGeminiError(error: unknown): { status: number; code: string; message: string } {
  const value = error as { status?: unknown; code?: unknown; message?: unknown; error?: { code?: unknown; message?: unknown } };
  const nested = value?.error;
  const statusNumber = Number(value?.status ?? value?.code);
  const status = Number.isFinite(statusNumber) && statusNumber >= 400 && statusNumber < 600 ? statusNumber : 502;
  const rawMessage = String(nested?.message ?? value?.message ?? 'Gemini request failed');
  const normalized = rawMessage.toLowerCase();
  let code = String(nested?.code ?? 'gemini_error');
  if (status === 401) code = 'authentication';
  else if (status === 403) code = 'permission_denied';
  else if (status === 404) code = 'model_not_found_or_resource_missing';
  else if (status === 429) code = 'quota_or_rate_limit';
  else if (normalized.includes('api key')) code = 'authentication';
  return { status, code, message: rawMessage.slice(0, 500) };
}

function clamp(value: unknown, fallback = 70): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function extractJson(text: string): unknown {
  const cleaned = text.trim()
    .replace(/^\`\`\`json\s*/i, '')
    .replace(/^\`\`\`\s*/i, '')
    .replace(/\s*\`\`\`$/i, '');
  return JSON.parse(cleaned);
}

function buildPrompt(input: SpeakingCoachRequest): string {
  const support =
    input.grade === '10'
      ? 'Lớp 10: dễ hiểu, tiếng Việt hỗ trợ, sửa nhẹ.'
      : input.grade === '11'
        ? 'Lớp 11: cân bằng Anh-Việt, sửa 1 lỗi chính.'
        : 'Lớp 12: ưu tiên tiếng Anh, tự nhiên và mạch lạc, sửa 1 lỗi chính.';

  const recent = (input.recentTurns ?? [])
    .slice(-2)
    .map((turn) => `${turn.speaker}: ${turn.text}`)
    .join('\n');

  return `Bạn là Linh, AI Speaking Buddy cho học sinh THPT Việt Nam.
${support}
Ngữ cảnh: ${input.scenario.title} | ${input.scenario.topic}
Câu hỏi gốc: ${input.scenario.prompt}
Follow-up có thể dùng: ${input.scenario.followUpQuestions.slice(0, 2).join(' | ')}

Học sinh vừa nói: "${input.transcript}"
Lịch sử gần nhất:
${recent}

Nguyên tắc:
- Ưu tiên hội thoại tự nhiên hơn chấm điểm.
- Khen 1 điểm cụ thể, ngắn.
- Chỉ sửa lỗi rõ ràng và đáng sửa ở trình độ này.
- Chỉ tạo correction khi có lỗi ngữ pháp rõ ràng; không sửa câu chỉ vì cách diễn đạt chưa tự nhiên.
- Không tự biến danh từ/cụm từ hợp lệ thành một cụm khác. "reduce glass", "glass", "glass waste" có thể là ý hợp lệ theo ngữ cảnh.
- Nếu học sinh dùng câu ngắn như "no use glass", hãy ưu tiên hội thoại tự nhiên; chỉ sửa nếu lỗi ngữ pháp thật sự cản trở hiểu ý.
- Không tự đoán ý hoặc đổi một từ hợp lệ thành từ khác. "glass" không tự đổi thành "plastic".
- Nếu câu có nghĩa hợp lý, chấp nhận cách diễn đạt và hỏi tiếp.
- Nếu câu mơ hồ, hỏi lại nhẹ nhàng.
- reply: 1 câu ngắn, tối đa 2 câu rất ngắn; không lặp lại nguyên câu học sinh.
- Chọn follow-up dựa trên nội dung vừa nói; nếu đã trả lời đủ, hỏi một câu mở rộng tự nhiên.
- Luân phiên kiểu follow-up: hỏi về hành động cụ thể, lý do, lợi ích/kết quả, ví dụ, hoặc ý tưởng khác.
- Tuyệt đối không lặp lại cùng một câu hỏi follow-up đã xuất hiện trong lịch sử gần nhất.
- Không mặc định dùng "What could students do first?" nếu câu này đã được dùng.
- replyVi: 1 câu hỗ trợ tiếng Việt, không dịch từng chữ.
- newPhrases: tối đa ${input.grade === '10' ? 2 : 3} cụm từ.
- correction chỉ xuất hiện khi thật sự cần.
- Điểm chỉ là tín hiệu tiến bộ.

Trả về DUY NHẤT JSON:
{
  "feedback": {
    "clarity": number,
    "vocabulary": number,
    "grammar": number,
    "fluency": number,
    "overall": number,
    "praise": "ngắn",
    "oneFix": "ngắn",
    "nextStep": "ngắn",
    "newPhrases": ["string"]
  },
  "reply": "short natural English response",
  "replyVi": "short Vietnamese support",
  "correction": {
    "original": "string",
    "improved": "string",
    "explanationVi": "short"
  }
}`;
}

export async function coachSpeaking(input: SpeakingCoachRequest): Promise<SpeakingCoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('Speaking configuration error: GEMINI_API_KEY is not configured');
  if (!input.transcript?.trim()) throw new Error('Speaking validation error: Transcript is empty');

  const ai = new GoogleGenAI({ apiKey });
  let response;
  try {
    response = await ai.models.generateContent({
      model,
      contents: buildPrompt(input),
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: {
              type: Type.OBJECT,
              properties: {
                clarity: { type: Type.NUMBER },
                vocabulary: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                fluency: { type: Type.NUMBER },
                overall: { type: Type.NUMBER },
                praise: { type: Type.STRING },
                oneFix: { type: Type.STRING },
                nextStep: { type: Type.STRING },
                newPhrases: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['clarity', 'vocabulary', 'grammar', 'fluency', 'overall', 'praise', 'oneFix', 'nextStep', 'newPhrases']
            },
            reply: { type: Type.STRING },
            replyVi: { type: Type.STRING },
            correction: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                improved: { type: Type.STRING },
                explanationVi: { type: Type.STRING }
              },
              required: ['original', 'improved', 'explanationVi']
            }
          },
          required: ['feedback', 'reply', 'replyVi']
        },
        maxOutputTokens: 320,
        thinkingConfig: { thinkingLevel: 'minimal' }
      }
    });
  } catch (error) {
    const detail = describeGeminiError(error);
    console.error('[speaking-coach] Gemini request failed', {
      model,
      status: detail.status,
      code: detail.code,
      message: detail.message
    });
    throw new Error(`Gemini ${detail.code} (${detail.status}): ${detail.message}`);
  }

  const responseText = response.text ?? '';
  if (!responseText.trim()) {
    throw new Error('Gemini response error: Gemini returned an empty response');
  }

  let parsed: Partial<SpeakingCoachResponse>;
  try {
    parsed = extractJson(responseText) as Partial<SpeakingCoachResponse>;
  } catch (error) {
    console.error('[speaking-coach] Gemini JSON parse failed', {
      model,
      responsePreview: responseText.slice(0, 300),
      error: error instanceof Error ? error.message : String(error)
    });
    throw new Error(
      `Gemini response parse error: ${error instanceof Error ? error.message : String(error)}`
    );
  }

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

  const detectedCorrection = parsed.correction?.original
    ? { original: String(parsed.correction.original), improved: String(parsed.correction.improved || parsed.correction.original), explanationVi: String(parsed.correction.explanationVi || '') }
    : undefined;
  const shouldVerbMatch = input.transcript.match(/\bshould\s+([a-z]+(?:s|es))\b/i);
  const fallbackCorrection = !detectedCorrection && shouldVerbMatch
    ? { original: shouldVerbMatch[0], improved: "should " + shouldVerbMatch[1].replace(/(?:es|s)$/i, ''), explanationVi: 'Sau “should”, động từ giữ nguyên mẫu.' }
    : undefined;
  const correction = detectedCorrection ?? fallbackCorrection;
  const recent = (input.recentTurns ?? [])
    .slice(-4)
    .map((turn) => `${turn.speaker}: ${turn.text}`)
    .join('\n');
  let reply = String(parsed.reply || input.scenario.followUpQuestions[0] || 'Tell me one more thing.');
  if (correction && !reply.toLowerCase().includes(correction.improved.toLowerCase())) {
    const followUp = input.scenario.followUpQuestions.find(
      (question) => !recent.toLowerCase().includes(question.toLowerCase())
    ) || 'What result would you expect from that?';
    reply = 'Good idea! Small correction: "' + correction.improved + '" ' + followUp;
  }

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
      newPhrases: Array.isArray(feedback.newPhrases)
        ? feedback.newPhrases.slice(0, 3).map(String)
        : []
    },
    reply,
    replyVi: String(correction ? 'Sửa nhẹ một điểm ngữ pháp rồi mình nói tiếp nhé.' : parsed.replyVi || 'Mình nói thêm một ý ngắn nhé.'),
    correction
  };
}


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Speaking request body is missing or invalid', diagnostic: 'invalid-request-body' });
    }
    const result = await coachSpeaking(body as SpeakingCoachRequest);
    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error || 'Speaking AI request failed');
    const statusMatch = message.match(/(?:Gemini|Speaking API) [^()]+\((4\\d{2}|5\\d{2})\)/i);
    const status = statusMatch ? Number(statusMatch[1]) : 500;
    console.error('[speaking-coach]', { message, stack: error instanceof Error ? error.stack : undefined });
    return res.status(status).json({
      error: message.slice(0, 800),
      diagnostic: 'speaking-function-runtime-error',
      phase: message.startsWith('Gemini response parse error') ? 'response-parse'
        : message.startsWith('Gemini response error') ? 'gemini-response'
        : message.startsWith('Gemini ') ? 'gemini-request'
        : message.startsWith('Speaking configuration') ? 'configuration'
        : message.startsWith('Speaking validation') ? 'validation'
        : 'function-runtime'
    });
  }
}
