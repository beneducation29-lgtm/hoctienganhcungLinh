export interface WritingCoachResponse {
  score: number;
  strengths: string[];
  priorityFix: string;
  corrections: Array<{ original: string; improved: string; explanationVi: string }>;
  nextStep: string;
  encouragingNote: string;
}

const WRITING_AI_TIMEOUT_MS = 12000;

export async function coachWriting(input: {
  grade: '10' | '11' | '12';
  level: string;
  prompt: string;
  draft: string;
  minimumWords: number;
  maximumWords: number;
}): Promise<WritingCoachResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), WRITING_AI_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch('/api/writing/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(input)
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Writing AI phản hồi hơi chậm. Mình chuyển sang nhận xét nhanh để em không phải chờ.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(String(data.error || `Writing API HTTP ${response.status}`));
  }
  return data as WritingCoachResponse;
}
