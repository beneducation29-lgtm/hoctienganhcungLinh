import type { VercelRequest, VercelResponse } from '@vercel/node';
import { coachSpeaking } from './speakingCoach';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        error: 'Speaking request body is missing or invalid',
        diagnostic: 'invalid-request-body'
      });
    }

    const result = await coachSpeaking(body);
    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error || 'Speaking AI request failed');
    const statusMatch = message.match(/(?:Gemini|Speaking API) [^()]+\((4\d{2}|5\d{2})\)/i);
    const status = statusMatch ? Number(statusMatch[1]) : 500;

    console.error('[speaking-coach]', {
      message,
      stack: error instanceof Error ? error.stack : undefined
    });

    return res.status(status).json({
      error: message.slice(0, 800),
      diagnostic: 'speaking-function-runtime-error',
      phase: message.startsWith('Gemini response parse error')
        ? 'response-parse'
        : message.startsWith('Gemini response error')
          ? 'gemini-response'
          : message.startsWith('Gemini ')
            ? 'gemini-request'
            : message.startsWith('Speaking configuration')
              ? 'configuration'
              : message.startsWith('Speaking validation')
                ? 'validation'
                : 'function-runtime'
    });
  }
}
