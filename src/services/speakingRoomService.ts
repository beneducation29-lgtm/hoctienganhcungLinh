import type { GradeLevel } from '../types/contentArchitecture';
import type {
  SpeakingFeedback,
  SpeakingLevelProfile,
  SpeakingScenario
} from '../types/speakingRoom';

export const speakingLevelProfiles: Record<GradeLevel, SpeakingLevelProfile> = {
  '10': {
    grade: '10',
    cefr: 'A2',
    label: 'Lớp 10 · Làm quen & tự tin nói',
    maxNewPhrasesPerTurn: 2,
    targetWordsPerTurn: 28,
    suggestedSeconds: 30,
    vietnameseSupport: 'high',
    correctionStyle: 'gentle'
  },
  '11': {
    grade: '11',
    cefr: 'B1',
    label: 'Lớp 11 · Phản xạ & mở rộng ý',
    maxNewPhrasesPerTurn: 3,
    targetWordsPerTurn: 45,
    suggestedSeconds: 45,
    vietnameseSupport: 'medium',
    correctionStyle: 'balanced'
  },
  '12': {
    grade: '12',
    cefr: 'B1',
    label: 'Lớp 12 · Speaking & luyện thi',
    maxNewPhrasesPerTurn: 3,
    targetWordsPerTurn: 60,
    suggestedSeconds: 60,
    vietnameseSupport: 'low',
    correctionStyle: 'exam_ready'
  }
};

const scenarios: SpeakingScenario[] = [
  {
    id: 'g10-daily-life',
    grade: '10',
    title: 'My Daily Life',
    titleVi: 'Cuộc sống hằng ngày',
    topic: 'Daily life',
    difficulty: 'easy',
    mode: 'guided',
    prompt: 'Tell me about one thing you usually do after school.',
    promptVi: 'Hãy kể về một việc em thường làm sau giờ học.',
    starter: 'After school, I usually...',
    usefulPhrases: ['I usually...', 'I enjoy...', 'It helps me...'],
    vocabulary: ['usually', 'relax', 'exercise', 'homework'],
    followUpQuestions: ['Why do you enjoy it?', 'How often do you do it?']
  },
  {
    id: 'g10-friends',
    grade: '10',
    title: 'A Good Friend',
    titleVi: 'Một người bạn tốt',
    topic: 'Relationships',
    difficulty: 'easy',
    mode: 'guided',
    prompt: 'Describe one quality you value in a good friend.',
    promptVi: 'Hãy nói về một phẩm chất em coi trọng ở một người bạn tốt.',
    starter: 'A good friend should...',
    usefulPhrases: ['I think...', 'For me...', 'because...'],
    vocabulary: ['kind', 'honest', 'helpful', 'reliable'],
    followUpQuestions: ['Can you give an example?', 'Why is this quality important?']
  },
  {
    id: 'g11-environment',
    grade: '11',
    title: 'A Greener School',
    titleVi: 'Trường học xanh hơn',
    topic: 'Environment',
    difficulty: 'medium',
    mode: 'guided',
    prompt: 'Suggest one simple way students can make their school greener.',
    promptVi: 'Hãy đề xuất một cách đơn giản để học sinh làm trường học xanh hơn.',
    starter: 'I think our school could...',
    usefulPhrases: ['In my opinion...', 'One simple solution is...', 'This would help...'],
    vocabulary: ['recycle', 'reduce waste', 'energy', 'environment'],
    followUpQuestions: ['What could students do first?', 'What result would you expect?']
  },
  {
    id: 'g11-social-media',
    grade: '11',
    title: 'Social Media',
    titleVi: 'Mạng xã hội',
    topic: 'Technology',
    difficulty: 'medium',
    mode: 'free_talk',
    prompt: 'Do you think social media is helpful for students? Give one reason.',
    promptVi: 'Em có nghĩ mạng xã hội hữu ích với học sinh không? Hãy nêu một lý do.',
    starter: 'I think social media is...',
    usefulPhrases: ['On the one hand...', 'For example...', 'However...'],
    vocabulary: ['communicate', 'information', 'distraction', 'balance'],
    followUpQuestions: ['What is one possible disadvantage?', 'How can students use it wisely?']
  },
  {
    id: 'g12-career',
    grade: '12',
    title: 'Future Career',
    titleVi: 'Nghề nghiệp tương lai',
    topic: 'Future plans',
    difficulty: 'medium',
    mode: 'exam_practice',
    prompt: 'Talk about a career you are interested in and explain why.',
    promptVi: 'Hãy nói về một nghề nghiệp em quan tâm và giải thích lý do.',
    starter: 'In the future, I would like to...',
    usefulPhrases: ['I am interested in...', 'One reason is that...', 'In the long term...'],
    vocabulary: ['career', 'skills', 'experience', 'opportunity'],
    followUpQuestions: ['What skills will you need?', 'How will you prepare for this career?']
  },
  {
    id: 'g12-education',
    grade: '12',
    title: 'Learning for the Future',
    titleVi: 'Học tập cho tương lai',
    topic: 'Education',
    difficulty: 'hard',
    mode: 'exam_practice',
    prompt: 'Do you think students should learn practical skills at school? Explain your view.',
    promptVi: 'Em có nghĩ học sinh nên học các kỹ năng thực tế ở trường không? Hãy giải thích quan điểm.',
    starter: 'From my perspective, students should...',
    usefulPhrases: ['From my perspective...', 'This is important because...', 'For instance...'],
    vocabulary: ['practical skills', 'problem-solving', 'independent', 'career-ready'],
    followUpQuestions: ['Which practical skill matters most?', 'How could schools teach it?']
  }
];

export function getSpeakingScenarios(grade: GradeLevel): SpeakingScenario[] {
  return scenarios.filter((item) => item.grade === grade);
}

export function getScenarioById(id: string): SpeakingScenario | undefined {
  return scenarios.find((item) => item.id === id);
}

export function evaluateSpeaking(
  transcript: string,
  scenario: SpeakingScenario,
  profile: SpeakingLevelProfile
): SpeakingFeedback {
  const clean = transcript.trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  const lower = clean.toLowerCase();

  const vocabularyHits = scenario.vocabulary.filter((word) => lower.includes(word.toLowerCase())).length;
  const phraseHits = scenario.usefulPhrases.filter((phrase) =>
    lower.includes(phrase.toLowerCase().replace('...', ''))
  ).length;

  const clarity = Math.min(95, 62 + Math.min(words, 45));
  const vocabulary = Math.min(95, 58 + vocabularyHits * 10 + phraseHits * 7);
  const grammar = Math.min(94, 65 + (/[.!?]/.test(clean) ? 7 : 0) + (words > 12 ? 10 : 0));
  const fluency = Math.min(95, 55 + Math.min(35, Math.round(words * 0.8)));
  const overall = Math.round((clarity + vocabulary + grammar + fluency) / 4);

  const praise =
    words < 6
      ? 'Em đã bắt đầu đúng hướng — chỉ cần nói thêm một chút là câu trả lời sẽ rõ hơn.'
      : overall >= 80
        ? 'Rất tốt! Ý của em khá rõ và em đang dùng tiếng Anh tự nhiên hơn.'
        : 'Tốt lắm! Em đã truyền đạt được ý chính. Mình cải thiện từng bước nhé.';

  const oneFix =
    words < profile.targetWordsPerTurn * 0.45
      ? 'Thử nói thêm ' + Math.max(5, Math.round(profile.targetWordsPerTurn * 0.45 - words)) + ' từ để ý đầy đủ hơn.'
      : vocabularyHits === 0
        ? 'Thử dùng 1 từ trong nhóm: ' + scenario.vocabulary.slice(0, 2).join(', ') + '.'
        : 'Thử nối hai ý bằng “because”, “so” hoặc “however” để câu trả lời mạch lạc hơn.';

  const nextStep =
    profile.grade === '12'
      ? 'Bây giờ hãy trả lời câu hỏi phụ trong khoảng 45–60 giây.'
      : profile.grade === '11'
        ? 'Bây giờ thêm một lý do hoặc ví dụ ngắn.'
        : 'Bây giờ nói lại một lần nữa, chậm và rõ hơn.';

  return {
    clarity,
    vocabulary,
    grammar,
    fluency,
    overall,
    praise,
    oneFix,
    nextStep,
    newPhrases: scenario.usefulPhrases.slice(0, profile.maxNewPhrasesPerTurn)
  };
}

export function createAiReply(
  scenario: SpeakingScenario,
  grade: GradeLevel,
  feedback?: SpeakingFeedback
): string {
  if (!feedback) {
    if (grade === '10') return 'Hi! Let’s practise together. ' + scenario.prompt;
    if (grade === '11') return 'Great, let’s talk about ' + scenario.topic.toLowerCase() + '. ' + scenario.prompt;
    return 'Let’s practise a short exam-style answer. ' + scenario.prompt;
  }

  if (feedback.overall >= 80) {
    return grade === '12'
      ? 'Nice answer. Now let’s go one step deeper: ' + scenario.followUpQuestions[0]
      : 'Well done! Let’s add one more idea. ' + scenario.followUpQuestions[0];
  }

  return 'Good start. No pressure. Try again with this starter: “' + scenario.starter + '”';
}
