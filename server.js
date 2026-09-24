import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { coachSpeaking } from './server/speakingCoach.ts';
import { coachWriting } from './server/writingCoach.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '64kb' }));

app.post('/api/speaking/coach', async (req, res) => {
  try {
    const result = await coachSpeaking(req.body);
    res.json(result);
  } catch (error) {
    console.error('[speaking-coach]', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Speaking AI request failed'
    });
  }
});

app.post('/api/writing/coach', async (req, res) => {
  try {
    const result = await coachWriting(req.body);
    res.json(result);
  } catch (error) {
    console.error('[writing-coach]', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Writing AI request failed'
    });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`EduTHPT server listening on http://0.0.0.0:${port}`);
});
