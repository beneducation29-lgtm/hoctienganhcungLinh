export interface WritingCoachResponse {
  score: number;
  strengths: string[];
  priorityFix: string;
  corrections: Array<{ original: string; improved: string; explanationVi: string }>;
  nextStep: string;
  encouragingNote: string;
}

export async function coachWriting(input: {
  grade: '10' | '11' | '12';
  level: string;
  prompt: string;
  draft: string;
  minimumWords: number;
  maximumWords: number;
}): Promise<WritingCoachResponse> {
  const response = await fetch('/api/writing/coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(String(data.error || `Writing API HTTP ${response.status}`));
  }
  return data as WritingCoachResponse;
}
