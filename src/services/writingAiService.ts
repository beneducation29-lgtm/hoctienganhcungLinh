export interface WritingCoachResponse {
  score: number;
  strengths: string[];
  priorityFix: string;
  corrections: { original: string; improved: string; reason: string }[];
  nextStep: string;
  encouragingNote: string;
}

export async function coachWriting(input: {
  grade: '10' | '11' | '12';
  level: string;
  title: string;
  prompt: string;
  essay: string;
  minimumWords: number;
  maximumWords: number;
}): Promise<WritingCoachResponse> {
  const response = await fetch('/api/writing/coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error('Writing coach request failed');
  return response.json();
}
