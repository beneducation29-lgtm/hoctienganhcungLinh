import { GoogleGenAI } from '@google/genai';

export interface WritingCoachInput {
  grade: '10' | '11' | '12';
  level: string;
  title: string;
  prompt: string;
  essay: string;
  minimumWords: number;
  maximumWords: number;
}

export interface WritingCoachResponse {
  score: number;
  strengths: string[];
  priorityFix: string;
  corrections: { original: string; improved: string; reason: string }[];
  nextStep: string;
  encouragingNote: string;
}

const clamp = (value: unknown) => Math.max(0, Math.min(100, Number(value) || 0));

export async function coachWriting(input: WritingCoachInput): Promise<WritingCoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const ai = new GoogleGenAI({ apiKey });
  const gradeGuidance = {
    '10': 'Use short, clear sentences. Explain feedback simply and give at most 2 new phrases.',
    '11': 'Balance English feedback with concise Vietnamese support. Focus on organization, grammar and useful academic language.',
    '12': 'Use more English and exam-oriented feedback. Focus on coherence, lexical precision and grammatical range.'
  }[input.grade];

  const prompt = [
    'You are Linh, a supportive English writing coach for Vietnamese high-school students.',
    'Do not rewrite the entire essay for the student. Coach them so they can revise it themselves.',
    gradeGuidance,
    'Give one priority fix and no more than 3 sentence-level corrections.',
    'Return ONLY valid JSON with keys: score, strengths, priorityFix, corrections, nextStep, encouragingNote.',
    'score is a progress signal from 0 to 100, not an official exam score.',
    '',
    'STUDENT DATA:',
    JSON.stringify({
      grade: input.grade,
      level: input.level,
      title: input.title,
      prompt: input.prompt,
      wordRange: [input.minimumWords, input.maximumWords],
      essay: input.essay
    })
  ].join('\n');

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.35,
      responseMimeType: 'application/json',
      maxOutputTokens: 900
    }
  });

  const raw = result.text?.trim() || '{}';
  const cleaned = raw.replace(/^\`\`\`json\s*/i, '').replace(/\s*\`\`\`$/i, '');
  const parsed = JSON.parse(cleaned);

  return {
    score: clamp(parsed.score),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3) : [],
    priorityFix: parsed.priorityFix || 'Hãy kiểm tra lại cách triển khai ý chính và câu chủ đề.',
    corrections: Array.isArray(parsed.corrections) ? parsed.corrections.slice(0, 3) : [],
    nextStep: parsed.nextStep || 'Sửa một điểm ưu tiên rồi đọc lại toàn bài.',
    encouragingNote: parsed.encouragingNote || 'Bạn đã hoàn thành một bản nháp — hãy chỉnh từng bước.'
  };
}
