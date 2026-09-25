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

import type { GradeLevel } from '../types/contentArchitecture';
import type { SpeakingMode, SpeakingScenario, SpeakingTurn } from '../types/speakingRoom';

export async function coachSpeakingWithGemini(input: {
  grade: GradeLevel;
  cefr: string;
  mode: SpeakingMode;
  scenario: SpeakingScenario;
  transcript: string;
  recentTurns: SpeakingTurn[];
}): Promise<SpeakingCoachResponse> {
  const response = await fetch('/api/speaking/coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grade: input.grade,
      cefr: input.cefr,
      mode: input.mode,
      scenario: input.scenario,
      transcript: input.transcript,
      recentTurns: input.recentTurns.slice(-3).map((turn) => ({
        speaker: turn.speaker,
        text: turn.text
      }))
    })
  });

  const raw = await response.text();
  let data: Partial<SpeakingCoachResponse> & { error?: string; diagnostic?: string } | null = null;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    // The endpoint may return an HTML/Vercel error page instead of JSON.
  }

  if (!response.ok) {
    const serverMessage = typeof data?.error === 'string' ? data.error : '';
    const suffix = serverMessage ? ` — ${serverMessage.slice(0, 240)}` : '';
    throw new Error(
      `Speaking API HTTP ${response.status}${suffix}`
    );
  }

  if (!data || typeof data !== 'object' || !data.feedback || !data.reply) {
    throw new Error(
      `Speaking API returned invalid response (HTTP ${response.status})`
    );
  }

  return data as SpeakingCoachResponse;
}
