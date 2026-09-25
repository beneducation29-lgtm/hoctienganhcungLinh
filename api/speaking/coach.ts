import type { VercelRequest, VercelResponse } from '@vercel/node';
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
      ? 'Lớp 10: câu ngắn, tiếng Việt hỗ trợ; 1 lỗi, tối đa 2 cụm từ mới.'
      : input.grade === '11'
        ? 'Lớp 11: cân bằng Anh-Việt; 1 lỗi chính, tối đa 3 cụm từ mới.'
        : 'Lớp 12: ưu tiên tiếng Anh, luyện thi; tập trung mạch lạc/độ chính xác, tối đa 3 cụm từ mới.';

  const recent = (input.recentTurns ?? [])
    .slice(-4)
    .map((turn) => `${turn.speaker}: ${turn.text}`)
    .join('\n');

  return `Bạn là Linh, AI English Speaking Buddy cho học sinh THPT Việt Nam.
${support}
Lớp: ${input.grade}; CEFR: ${input.cefr}; mode: ${input.mode}.
Chủ đề: ${input.scenario.title} / ${input.scenario.topic}.
Câu hỏi: ${input.scenario.prompt}
Gợi ý Việt: ${input.scenario.promptVi}
Cụm từ: ${input.scenario.usefulPhrases.slice(0, 3).join(', ')}
Follow-up: ${input.scenario.followUpQuestions.slice(0, 2).join(' | ')}

Học sinh: "${input.transcript}"
Lịch sử gần đây:
${recent}

Yêu cầu:
- Khen 1 điều cụ thể trước.
- Chỉ sửa 1 điểm quan trọng, không giảng dài.
- Nếu câu ngắn, hỏi 1 câu nhỏ để mở rộng.
- reply là câu Linh nói tiếp bằng tiếng Anh, tự nhiên, ngắn.
- replyVi là hỗ trợ tiếng Việt ngắn.
- correction chỉ có khi có lỗi đáng sửa.
- Điểm là tín hiệu tiến bộ, không phải điểm thi.

Trả về DUY NHẤT JSON:
{
  "feedback": {
    "clarity": number,
    "vocabulary": number,
    "grammar": number,
    "fluency": number,
    "overall": number,
    "praise": "Vietnamese",
    "oneFix": "Vietnamese",
    "nextStep": "Vietnamese",
    "newPhrases": ["string"]
  },
  "reply": "short English response/question",
  "replyVi": "short Vietnamese support",
  "correction": {
    "original": "string",
    "improved": "string",
    "explanationVi": "short Vietnamese"
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
        temperature: 0.35,
        responseMimeType: 'application/json',
        maxOutputTokens: 480,
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
    reply: String(parsed.reply || input.scenario.followUpQuestions[0] || 'Tell me one more thing.'),
    replyVi: String(parsed.replyVi || 'Mình nói thêm một ý ngắn nhé.'),
    correction: parsed.correction?.original
      ? {
          original: String(parsed.correction.original),
          improved: String(parsed.correction.improved || parsed.correction.original),
          explanationVi: String(parsed.correction.explanationVi || '')
        }
      : undefined
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
