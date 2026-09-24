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
      recentTurns: input.recentTurns.slice(-6).map((turn) => ({
        speaker: turn.speaker,
        text: turn.text
      }))
    })
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || 'AI speaking service is unavailable');
  }

  return data as SpeakingCoachResponse;
}
