import {
  EnglishGradeCurriculum,
  EnglishUnit,
  SkillModule,
  DailyPracticeCard,
  StudentProfile,
  Lesson,
  Notification
} from '../types';

export const initialStudentProfile: StudentProfile = {
  name: 'Học sinh',
  school: 'Chưa đăng nhập',
  currentGrade: '11',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  studyTimeHours: 48.5,
  completedLessons: 142,
  averageScore: 8.8,
  streakDays: 14,
  englishLevel: 'B1',
  levelProgressPercent: 68,
  targetLevel: 'B2',
  skillMastery: {
    listening: 72,
    speaking: 58,
    reading: 84,
    writing: 65,
    vocabulary: 78,
    grammar: 81
  },
  strongestSkill: {
    name: 'Reading (Đọc hiểu học thuật)',
    score: 9.2,
    description: 'Nắm bắt ý chính, từ vựng ngữ cảnh và kỹ thuật Skimming/Scanning rất tốt.'
  },
  improvementSkill: {
    name: 'Speaking (Phát âm & Trôi chảy)',
    score: 7.4,
    description: 'Cần cải thiện ngữ điệu câu (intonation), phản xạ nối âm và từ nối khi tranh biện.'
  },
  recentLesson: {
    id: 'lesson-eng11-u6-read',
    subject: 'Tiếng Anh 11',
    title: 'Unit 6: Preserving Our Heritage — Reading Comprehension',
    grade: '11',
    unit: 'Unit 6: Preserving Our Heritage',
    remainingMinutes: 12,
    totalMinutes: 30,
    completedPercent: 60,
    lastAccessed: 'Hôm nay, 19:45'
  }
};

// Units for Grade 11
const grade11Units: EnglishUnit[] = [
  {
    id: 'unit-eng11-u1',
    unitNumber: 1,
    grade: '11',
    title: 'A Long and Healthy Life',
    vietnameseTitle: 'Cuộc sống khỏe mạnh và trường thọ',
    theme: 'Health, Diet and Lifestyle',
    textbook: 'Global Success',
    durationHours: 6.5,
    progressPercent: 100,
    completedModulesCount: 8,
    totalModulesCount: 8,
    description: 'Tìm hiểu về chế độ ăn uống cân bằng, hệ miễn dịch, rèn luyện thể chất và tuổi thọ con người.',
    grammarFocus: 'Past Simple vs. Present Perfect · Stative Verbs in Continuous Forms',
    vocabularyTopic: 'Nutrition, Immune system, Life expectancy, Antibiotics',
    modules: [
      {
        type: 'vocab',
        title: 'Vocabulary: Health & Nutrition',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u1-m1',
          title: 'Unit 1: Vocabulary — Nutrition & Longevity',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'vocab',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Nắm vững 15 từ vựng học thuật quan trọng về sức khỏe, dinh dưỡng và hệ miễn dịch trong chương trình Tiếng Anh 11.',
          keyPoints: [
            'Phân biệt Nutritious (giàu dinh dưỡng) và Nutrient (chất dinh dưỡng)',
            'Các cụm từ: immune system, life expectancy, cut down on sugars',
            'Cách tra cứu và đọc đúng phiên âm IPA trọng âm'
          ],
          vocabulary: [
            {
              word: 'life expectancy',
              ipa: '/ˈlaɪf ɪkˌspek.tən.si/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Tuổi thọ trung bình dự tính của con người',
              definitionEn: 'The number of years that a person is likely to live',
              exampleSentence: 'Advances in medical technology have significantly boosted global life expectancy.',
              exampleTranslation: 'Những tiến bộ trong công nghệ y tế đã nâng cao đáng kể tuổi thọ trung bình toàn cầu.',
              collocations: ['boost/increase life expectancy', 'average life expectancy']
            },
            {
              word: 'immune system',
              ipa: '/ɪˈmjuːn ˌsɪs.təm/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Hệ thống miễn dịch',
              definitionEn: 'The cells and tissues in the body that fight against infection and disease',
              exampleSentence: 'Regular exercise and sufficient sleep help strengthen the body’s immune system.',
              exampleTranslation: 'Tập thể dục đều đặn và ngủ đủ giấc giúp tăng cường hệ miễn dịch của cơ thể.',
              collocations: ['strengthen/boost the immune system', 'weak immune system']
            },
            {
              word: 'nutrient',
              ipa: '/ˈnjuː.tri.ənt/',
              partOfSpeech: 'noun',
              definitionVi: 'Chất dinh dưỡng cần thiết cho sự sống',
              definitionEn: 'Any substance that plants or animals need in order to live and grow',
              exampleSentence: 'Green leafy vegetables are packed with essential nutrients and vitamins.',
              exampleTranslation: 'Rau lá xanh chứa nhiều vitamin và các chất dinh dưỡng thiết yếu.',
              collocations: ['essential nutrients', 'nutrient-rich diet']
            }
          ],
          completed: true,
          questions: [
            {
              id: 'q-u1-v1',
              question: 'Which of the following phrases means "the average period a person is expected to live"?',
              options: [
                'A. Life expectancy',
                'B. Immune deficiency',
                'C. Biological clock',
                'D. Vital nutrient'
              ],
              correctIndex: 0,
              explanation: '"Life expectancy" là tuổi thọ bình quân (thời gian trung bình mà một người dự kiến sẽ sống).',
              difficulty: 'Cơ bản',
              skill: 'vocabulary'
            }
          ]
        }
      },
      {
        type: 'grammar',
        title: 'Grammar: Past Simple vs Present Perfect',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u1-m2',
          title: 'Unit 1: Grammar — Past Simple vs. Present Perfect',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'grammar',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Phân biệt chính xác giữa Quá khứ đơn (hành động đã kết thúc tại thời điểm xác định trong quá khứ) và Hiện tại hoàn thành (hành động xảy ra trong quá khứ còn liên quan đến hiện tại).',
          keyPoints: [
            'Dấu hiệu thì Quá khứ đơn: yesterday, ago, last week, in 2010',
            'Dấu hiệu thì Hiện tại hoàn thành: since, for, already, yet, so far, recently',
            'Các động từ chỉ trạng thái (Stative verbs) không dùng ở thì tiếp diễn'
          ],
          grammar: {
            title: 'Thì Quá khứ đơn & Hiện tại hoàn thành',
            structure: 'Past Simple: S + V-ed / V2 · Present Perfect: S + have/has + V3/ed',
            explanation: 'Dùng Quá khứ đơn khi thời gian xảy ra hành động đã hoàn tất và kết thúc. Dùng Hiện tại hoàn thành khi thời gian còn tiếp diễn hoặc kết quả có ảnh hưởng đến hiện tại.',
            examples: [
              {
                en: 'She adopted a plant-based diet two years ago.',
                vi: 'Cô ấy đã chuyển sang chế độ ăn thuần thực vật cách đây hai năm. (Thời gian "two years ago" xác định trong quá khứ).'
              },
              {
                en: 'Scientists have discovered several longevity genes recently.',
                vi: 'Gần đây các nhà khoa học đã phát hiện ra một số gen liên quan đến trường thọ. (Thời gian chưa kết thúc, kết quả còn liên hệ).'
              }
            ],
            commonMistakes: [
              'Nhầm lẫn dùng Present Perfect với các mốc thời gian đã kết thúc (sai: "I have visited Hue in 2020", đúng: "I visited Hue in 2020").',
              'Quên đổi thì khi dùng "Since" (Mệnh đề sau Since chia Past Simple, mệnh đề chính chia Present Perfect).'
            ],
            practiceTip: 'Luôn tìm từ nhận biết thời gian (Time Markers) trong câu trắc nghiệm trước khi chọn thì.'
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-g1',
              question: 'Dr. John _____ research on longevity since he graduated from medical university in 2015.',
              options: [
                'A. conducted',
                'B. has conducted',
                'C. was conducting',
                'D. conducts'
              ],
              correctIndex: 1,
              explanation: 'Có liên từ "since" nối với mốc thời gian quá khứ "graduated", mệnh đề chính diễn tả hành động kéo dài đến hiện tại nên dùng thì Hiện tại hoàn thành "has conducted".',
              difficulty: 'Thông hiểu',
              skill: 'grammar'
            }
          ]
        }
      },
      {
        type: 'pronunciation',
        title: 'Pronunciation: Strong & Weak forms of Auxiliaries',
        duration: '20 phút',
        completed: true,
        lessonData: {
          id: 'u1-m3',
          title: 'Unit 1: Pronunciation — Strong and Weak forms of Auxiliaries',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'pronunciation',
          textbook: 'Global Success',
          durationMinutes: 20,
          summary: 'Phát âm dạng mạnh và dạng yếu của trợ động từ (have, has, can, do) trong lời nói tự nhiên của người bản ngữ.',
          keyPoints: [
            'Dạng yếu (/həv/, /həz/, /kən/) thường xuất hiện ở giữa câu khi không nhấn mạnh',
            'Dạng mạnh (/hæv/, /hæz/, /kæn/) xuất hiện ở cuối câu hỏi ngắn hoặc khi muốn nhấn mạnh'
          ],
          pronunciation: {
            sound: 'Strong / Weak Auxiliaries',
            description: 'Các trợ động từ trong tiếng Anh thường biến đổi cách phát âm tùy thuộc vào vị trí và ngữ cảnh nhấn mạnh trong câu.',
            rules: 'Trong câu khẳng định bình thường, trợ động từ ở dạng yếu (nhẹ, lướt nhanh). Trong câu phủ định hoặc câu trả lời ngắn cuối câu, dùng dạng mạnh.',
            examples: [
              { word: 'have (weak)', ipa: '/həv/', meaning: 'You have done well -> /jʊ həv dʌn wel/' },
              { word: 'have (strong)', ipa: '/hæv/', meaning: 'Yes, I have! -> /jes aɪ hæv/' },
              { word: 'can (weak)', ipa: '/kən/', meaning: 'I can swim -> /aɪ kən swɪm/' }
            ]
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-p1',
              question: 'In the sentence "Yes, we can!", the word "can" is pronounced in its:',
              options: [
                'A. Weak form /kən/',
                'B. Strong form /kæn/',
                'C. Silent form',
                'D. Reduced vowel form'
              ],
              correctIndex: 1,
              explanation: 'Trong câu trả lời ngắn ở cuối câu, trợ động từ mang trọng âm và được phát âm ở dạng mạnh (Strong form: /kæn/).',
              difficulty: 'Cơ bản',
              skill: 'mixed'
            }
          ]
        }
      },
      {
        type: 'reading',
        title: 'Reading: Secrets of the Blue Zones',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u1-m4',
          title: 'Unit 1: Reading — Secrets of the Blue Zones',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'reading',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Đọc hiểu bài báo nghiên cứu về 5 vùng "Blue Zones" trên thế giới nơi người dân có tỷ lệ sống thọ trên 100 tuổi cao nhất.',
          keyPoints: [
            'Luyện kỹ năng Skimming tìm ý chính của đoạn văn',
            'Scanning tìm số liệu và dẫn chứng về chế độ ăn uống',
            'Đoán nghĩa từ học thuật trong văn cảnh'
          ],
          readingPassage: {
            title: 'Secrets of Longevity in the Blue Zones',
            wordCount: 320,
            text: `Across the globe, researchers have identified several regions known as "Blue Zones," where an extraordinarily high percentage of the population lives past the age of one hundred. Notable examples include Okinawa in Japan, Sardinia in Italy, and the Nicoya Peninsula in Costa Rica.

While genetic predisposition plays a role, researchers agree that daily habits constitute the primary cornerstone of their vitality. First, their diets consist predominantly of locally grown legumes, whole grains, and fresh vegetables, while processed sugars and saturated fats are virtually absent. Second, physical activity is naturally integrated into their daily routines—they walk to local markets, cultivate garden plots, and engage in continuous low-intensity movement rather than lifting heavy weights in gyms.

Equally decisive is psychological resilience and social connectedness. Centenarians in these regions frequently maintain tight intergenerational bonds and a profound sense of life purpose. Rather than dwelling in isolation, they interact daily with family members and neighbors, drastically lowering chronic inflammation and stress hormone levels.`
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-r1',
              question: 'According to the passage, what is the primary cornerstone of longevity in Blue Zones?',
              options: [
                'A. Heavy weightlifting at fitness centers',
                'B. Daily habits and nutritional choices',
                'C. Pure genetic inheritance alone',
                'D. Frequent consumption of synthetic medicines'
              ],
              correctIndex: 1,
              explanation: 'Đoạn 2 nêu rõ: "researchers agree that daily habits constitute the primary cornerstone of their vitality."',
              difficulty: 'Thông hiểu',
              skill: 'reading'
            },
            {
              id: 'q-u1-r2',
              question: 'The word "predominantly" in paragraph 2 is closest in meaning to:',
              options: [
                'A. rarely',
                'B. mainly / mostly',
                'C. accidentally',
                'D. dangerously'
              ],
              correctIndex: 1,
              explanation: '"Predominantly" có nghĩa là phần lớn, chủ yếu (mainly / mostly).',
              difficulty: 'Thông hiểu',
              skill: 'reading'
            }
          ]
        }
      },
      {
        type: 'listening',
        title: 'Listening: An Interview with a Nutritionist',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u1-m5',
          title: 'Unit 1: Listening — Dietary Advice for High School Students',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'listening',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Nghe bài phỏng vấn với chuyên gia dinh dưỡng về thói quen ăn uống khoa học cho học sinh THPT trong mùa thi.',
          keyPoints: [
            'Kỹ năng bắt từ khóa (Keywords capturing)',
            'Nhận biết ý kiến đồng tình và phản bác trong đoạn hội thoại'
          ],
          listeningAudio: {
            title: 'Nutritionist Advice on Teen Eating Habits',
            duration: '3:45',
            audioTranscript: `Interviewer: Good morning, Dr. Tran. Many Vietnamese high school students report feeling lethargic during afternoon classes. What is the root cause?

Dr. Tran: Good morning. The most prevalent culprit is breakfast skipping or consuming foods with excessive refined sugar. When students ingest sugary snacks, blood glucose spikes quickly and crashes abruptly within ninety minutes, causing sudden fatigue.

Interviewer: What practical dietary adjustments do you advise?

Dr. Tran: I strongly suggest complex carbohydrates such as brown rice, oatmeal, paired with lean proteins and sufficient hydration. Drinking at least two liters of fresh water daily prevents dehydration headaches and maintains mental alertness.`
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-l1',
              question: 'What causes students to feel exhausted during afternoon classes according to Dr. Tran?',
              options: [
                'A. Skipping breakfast or eating high-sugar snacks',
                'B. Exercising too vigorously at sunrise',
                'C. Drinking too much filtered water',
                'D. Studying mathematics in the morning'
              ],
              correctIndex: 0,
              explanation: 'Trong bài nghe, bác sĩ Trần nói: "The most prevalent culprit is breakfast skipping or consuming foods with excessive refined sugar."',
              difficulty: 'Thông hiểu',
              skill: 'listening'
            }
          ]
        }
      },
      {
        type: 'speaking',
        title: 'Speaking: Giving Health Advice to a Friend',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u1-m6',
          title: 'Unit 1: Speaking — Giving Health Advice & Expressing Habits',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'speaking',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Thực hành hội thoại đưa ra lời khuyên sức khỏe bằng các cấu trúc: If I were you..., You ought to..., Have you considered...?',
          keyPoints: [
            'Cấu trúc đưa ra lời khuyên lịch sự',
            'Ngữ điệu thể hiện sự đồng cảm và khuyến khích'
          ],
          speakingPrompt: {
            title: 'Health Advice Roleplay',
            prompt: 'Your classmate often stays up until 2 a.m. studying and feels exhausted at school. Give him/her 3 constructive tips to balance revision and restorative rest.',
            usefulPhrases: [
              'If I were in your shoes, I would set a consistent bedtime.',
              'You ought to avoid blue-light screens 30 minutes before going to sleep.',
              'Why not try breaking down your study workload into 25-minute Pomodoro intervals?'
            ]
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-s1',
              question: 'Which of the following sentences expresses polite advice appropriately?',
              options: [
                'A. You must obey my command right now!',
                'B. Have you thought about taking short active breaks during your study sessions?',
                'C. Why are you always so lazy and inactive?',
                'D. I forbid you to touch your mobile phone forever.'
              ],
              correctIndex: 1,
              explanation: '"Have you thought about + V-ing...?" là cách diễn đạt lời khuyên lịch sự, tôn trọng người đối thoại.',
              difficulty: 'Cơ bản',
              skill: 'mixed'
            }
          ]
        }
      },
      {
        type: 'writing',
        title: 'Writing: A Guide on Healthy Habits for Teens',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u1-m7',
          title: 'Unit 1: Writing — An Article about Healthy Lifestyle for Teenagers',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'writing',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Viết bài viết ngắn (150-180 từ) đăng trên bản tin trường về các thói quen lành mạnh dành cho học sinh THPT.',
          keyPoints: [
            'Bố cục đoạn văn học thuật: Topic sentence -> Supporting details -> Concluding sentence',
            'Sử dụng các từ nối logic: First and foremost, In addition, Consequently, Overall'
          ],
          writingPrompt: {
            title: 'Writing an Advice Article (150-180 words)',
            prompt: 'Write an article for your school magazine giving teenagers three practical pieces of advice on maintaining physical and mental wellness during exam preparation.',
            modelEssay: `Maintaining optimal physical and mental vitality is imperative for high school students, especially during intensive examination periods. First and foremost, establishing a balanced nutritional routine provides sustained cognitive energy. Instead of depending on caffeinated beverages or processed confectionery, students should consume whole fruits, nuts, and complex carbohydrates. Furthermore, incorporating at least thirty minutes of moderate physical exercise each day—such as brisk walking or cycling—stimulates dopamine release, effectively alleviating chronic academic anxiety. Last but not least, prioritizing seven to eight hours of sound sleep each night is non-negotiable, as memories are consolidated and brain tissues rejuvenate during deep sleep stages. By committing to these wholesome practices, students will maximize both academic performance and lifelong well-being.`,
            guidelines: [
              'Có câu chủ đề nêu rõ mục đích bài viết',
              'Triển khai 3 lời khuyên kèm giải thích lợi ích',
              'Sử dụng từ nối chuyển đoạn rõ ràng',
              'Dung lượng trong khoảng 150 - 180 từ'
            ]
          },
          completed: true,
          questions: [
            {
              id: 'q-u1-w1',
              question: 'Which cohesive device is most appropriate to introduce the primary point in an essay?',
              options: [
                'A. First and foremost,',
                'B. On the contrary,',
                'C. Despite that,',
                'D. Nevertheless,'
              ],
              correctIndex: 0,
              explanation: '"First and foremost" (Trước hết và quan trọng nhất) thường dùng mở đầu luận điểm quan trọng đầu tiên trong bài viết học thuật.',
              difficulty: 'Cơ bản',
              skill: 'mixed'
            }
          ]
        }
      },
      {
        type: 'review',
        title: 'Review: Unit 1 Mastery Check',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u1-m8',
          title: 'Unit 1: Review & Self-Assessment',
          unitId: 'unit-eng11-u1',
          unitTitle: 'Unit 1: A Long and Healthy Life',
          grade: '11',
          moduleType: 'review',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Kiểm tra tổng hợp kiến thức từ vựng, ngữ pháp và đọc hiểu của Unit 1.',
          keyPoints: [
            'Tổng kết từ vựng chủ đề Sức khỏe',
            'Kiểm tra thì Quá khứ đơn & Hiện tại hoàn thành',
            'Đánh giá phản xạ ngôn ngữ'
          ],
          completed: true,
          questions: [
            {
              id: 'q-u1-rev-1',
              question: 'Eating a nutrient-rich diet can help _____ your immune system against seasonal flu.',
              options: ['A. boost', 'B. destroy', 'C. expire', 'D. avoid'],
              correctIndex: 0,
              explanation: 'Collocation chuẩn: "boost your immune system" (tăng cường hệ miễn dịch).',
              difficulty: 'Cơ bản',
              skill: 'vocabulary'
            },
            {
              id: 'q-u1-rev-2',
              question: 'My grandfather _____ daily yoga for twenty years and is still in excellent shape.',
              options: [
                'A. has practiced',
                'B. practiced',
                'C. was practicing',
                'D. practices'
              ],
              correctIndex: 0,
              explanation: 'Hành động bắt đầu trong quá khứ kéo dài 20 năm đến nay vẫn tiếp diễn (hiện tại vẫn in excellent shape) nên dùng thì Hiện tại hoàn thành "has practiced".',
              difficulty: 'Thông hiểu',
              skill: 'grammar'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'unit-eng11-u2',
    unitNumber: 2,
    grade: '11',
    title: 'The Generation Gap',
    vietnameseTitle: 'Khoảng cách thế hệ',
    theme: 'Family Relationships, Values and Conflicts',
    textbook: 'Global Success',
    durationHours: 6.0,
    progressPercent: 85,
    completedModulesCount: 6,
    totalModulesCount: 8,
    description: 'Thảo luận về sự khác biệt quan điểm sống giữa các thế hệ trong gia đình và giải pháp lắng nghe thấu hiểu.',
    grammarFocus: 'Modal Verbs: Must, Have to, Should, Ought to',
    vocabularyTopic: 'Generational values, Extended family, Nuclear family, Open-minded',
    modules: [
      {
        type: 'vocab',
        title: 'Vocabulary: Family Dynamics & Values',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u2-m1',
          title: 'Unit 2: Vocabulary — The Generation Gap',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'vocab',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Từ vựng chủ đề gia đình, sự khác biệt thế hệ, tư duy cởi mở và cách hòa giải mâu thuẫn.',
          keyPoints: [
            'Phân biệt Nuclear family (gia đình hạt nhân) và Extended family (gia đình đa thế hệ)',
            'Từ vựng tính từ: open-minded, conservative, traditional, independent',
            'Collocation: bridge the generation gap, impose one’s will on someone'
          ],
          vocabulary: [
            {
              word: 'generation gap',
              ipa: '/ˌdʒen.əˈreɪ.ʃən ˌɡæp/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Khoảng cách thế hệ',
              definitionEn: 'The difference in opinions or behavior between younger and older people',
              exampleSentence: 'Open and empathetic conversation can bridge the generation gap between parents and teens.',
              exampleTranslation: 'Cuộc trò chuyện cởi mở và thấu cảm có thể thu hẹp khoảng cách thế hệ giữa cha mẹ và con cái.',
              collocations: ['bridge/narrow the generation gap', 'cause a generation gap']
            },
            {
              word: 'extended family',
              ipa: '/ɪkˌsten.dɪd ˈfæm.əl.i/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Gia đình đa thế hệ (ông bà, cha mẹ, con cháu cùng sống chung)',
              definitionEn: 'A family that extends beyond the nuclear family, consisting of parents, children, grandparents and other relatives',
              exampleSentence: 'In Vietnamese culture, living in an extended family fosters strong kinship solidarity.',
              exampleTranslation: 'Trong văn hóa Việt Nam, sống trong gia đình đa thế hệ giúp bồi đắp tình cảm thân tộc gắn kết.',
              collocations: ['live in an extended family', 'extended family members']
            }
          ],
          completed: true,
          questions: [
            {
              id: 'q-u2-v1',
              question: 'Which term describes a family unit consisting of grandparents, parents, children, and aunts/uncles?',
              options: [
                'A. Nuclear family',
                'B. Extended family',
                'C. Single-parent family',
                'D. Blended family'
              ],
              correctIndex: 1,
              explanation: '"Extended family" là gia đình đa thế hệ, gồm ông bà, cha mẹ, con cái và họ hàng.',
              difficulty: 'Cơ bản',
              skill: 'vocabulary'
            }
          ]
        }
      },
      {
        type: 'grammar',
        title: 'Grammar: Modal Verbs (Must, Have to, Should)',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u2-m2',
          title: 'Unit 2: Grammar — Modal Verbs of Obligation & Advice',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'grammar',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Nắm vững cách dùng Must, Have to, Mustn\'t, Don\'t have to, Should, Ought to trong các ngữ cảnh bắt buộc, cấm đoán hoặc khuyên nhủ.',
          keyPoints: [
            'Must vs Have to: Must thể hiện sự bắt buộc từ chủ quan người nói; Have to thể hiện quy định bên ngoài',
            'Mustn\'t (cấm tuyệt đối) vs Don\'t have to (không bắt buộc, tùy ý làm hay không)',
            'Should / Ought to: đưa ra lời khuyên hoặc trách nhiệm đạo đức'
          ],
          grammar: {
            title: 'Động từ khuyết thiếu chỉ sự bắt buộc & khuyên nhủ',
            structure: 'S + must / have to / should / ought to + V(bare)',
            explanation: 'Phân biệt sắc thái biểu đạt nghĩa vụ và cấm đoán trong giao tiếp và các câu hỏi đề thi THPT.',
            examples: [
              {
                en: 'You must respect your grandparents’ cultural traditions.',
                vi: 'Bạn phải tôn trọng các truyền thống văn hóa của ông bà (nghĩa vụ đạo đức).'
              },
              {
                en: 'You don\'t have to agree with everything, but you ought to listen respectfully.',
                vi: 'Bạn không bắt buộc phải đồng tình mọi điều, nhưng bạn nên lắng nghe một cách tôn trọng.'
              }
            ],
            commonMistakes: [
              'Nhầm lẫn Mustn\'t với Don\'t have to. "You mustn\'t park here" = cấm đỗ xe; "You don\'t have to pay" = miễn phí, không phải trả tiền.',
              'Quên rằng sau Ought bắt buộc phải có "to" (Ought to + V).'
            ],
            practiceTip: 'Nếu câu có ý nghĩa "bị cấm theo luật hoặc quy tắc an toàn", chọn Mustn\'t.'
          },
          completed: true,
          questions: [
            {
              id: 'q-u2-g1',
              question: 'Students _____ use their personal smartphones during national examinations; it is strictly prohibited.',
              options: [
                'A. mustn\'t',
                'B. don\'t have to',
                'C. shouldn\'t',
                'D. needn\'t'
              ],
              correctIndex: 0,
              explanation: 'Hành động bị cấm nghiêm ngặt (strictly prohibited) nên dùng "mustn\'t".',
              difficulty: 'Thông hiểu',
              skill: 'grammar'
            }
          ]
        }
      },
      {
        type: 'pronunciation',
        title: 'Pronunciation: Contractions of Modals',
        duration: '20 phút',
        completed: true,
        lessonData: {
          id: 'u2-m3',
          title: 'Unit 2: Pronunciation — Contractions of Modal Verbs',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'pronunciation',
          textbook: 'Global Success',
          durationMinutes: 20,
          summary: 'Cách phát âm các dạng viết tắt của động từ khuyết thiếu (mustn\'t, shouldn\'t, can\'t).',
          keyPoints: [
            'Âm /t/ thường bị nuốt (elision) khi đứng trước một phụ âm khác',
            'Phát âm rõ âm /nt/ trong câu phủ định'
          ],
          completed: true,
          questions: [
            {
              id: 'q-u2-p1',
              question: 'In spoken English, how is the word "mustn\'t" typically pronounced?',
              options: [
                'A. /ˈmʌs.ənt/',
                'B. /ˈmʌst.nɒt/',
                'C. /ˈmjuː.zɪnt/',
                'D. /ˈmʌst.nt/'
              ],
              correctIndex: 0,
              explanation: '"Mustn\'t" được phát âm chuẩn là /ˈmʌs.ənt/ (âm "t" bị tiêu giảm).',
              difficulty: 'Cơ bản',
              skill: 'mixed'
            }
          ]
        }
      },
      {
        type: 'reading',
        title: 'Reading: Bridging the Generational Divide',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u2-m4',
          title: 'Unit 2: Reading — Bridging the Generational Divide',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'reading',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Phân tích nguyên nhân khác biệt quan điểm giữa thế hệ Baby Boomers, Gen X và Gen Z về nghề nghiệp, công nghệ và lối sống.',
          keyPoints: [
            'Đọc hiểu so sánh quan điểm các thế hệ',
            'Xác định đại từ quy chiếu (reference words)'
          ],
          completed: true,
          questions: [
            {
              id: 'q-u2-r1',
              question: 'What is frequently identified as the core origin of misunderstandings between Gen Z and their parents?',
              options: [
                'A. Differing views on digital media consumption and career priorities',
                'B. Inability to speak the same language',
                'C. Complete disagreement on food preferences only',
                'D. Lack of school homework'
              ],
              correctIndex: 0,
              explanation: 'Nguyên nhân cốt lõi dẫn đến bất đồng thường xuất phát từ quan điểm khác nhau về công nghệ số và định hướng nghề nghiệp.',
              difficulty: 'Thông hiểu',
              skill: 'reading'
            }
          ]
        }
      },
      {
        type: 'listening',
        title: 'Listening: A Family Conversation',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u2-m5',
          title: 'Unit 2: Listening — Choosing a Career Path',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'listening',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Nghe đoạn đối thoại giữa một bạn học sinh muốn theo học ngành Thiết kế đồ họa và cha mẹ mong muốn con thi vào ngành Tài chính ngân hàng.',
          keyPoints: [
            'Bắt giọng điệu thuyết phục và thương lượng',
            'Nhận biết các giải pháp dung hòa đôi bên'
          ],
          completed: true,
          questions: [
            {
              id: 'q-u2-l1',
              question: 'How do the parents initially react to their daughter’s dream of becoming an animation illustrator?',
              options: [
                'A. They express concern regarding financial stability and long-term career security.',
                'B. They immediately invest in an expensive drawing tablet.',
                'C. They forbid her from attending high school completely.',
                'D. They celebrate enthusiastically with a party.'
              ],
              correctIndex: 0,
              explanation: 'Ban đầu phụ huynh lo lắng về tính ổn định tài chính và tương lai nghề nghiệp của ngành hội họa.',
              difficulty: 'Thông hiểu',
              skill: 'listening'
            }
          ]
        }
      },
      {
        type: 'speaking',
        title: 'Speaking: Expressing Opinions and Disagreements Politely',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u2-m6',
          title: 'Unit 2: Speaking — Debating Family Curfews & Rules',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'speaking',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Thực hành các mẫu câu bày tỏ quan điểm và bất đồng một cách hòa nhã: I see your point, but..., That may be true, however...',
          keyPoints: [
            'Bày tỏ phản biện lịch sự',
            'Đưa ra dẫn chứng thực tế thuyết phục'
          ],
          completed: true,
          questions: [
            {
              id: 'q-u2-s1',
              question: 'Which response demonstrates polite disagreement in a classroom discussion?',
              options: [
                'A. That is totally wrong and ridiculous!',
                'B. I understand your perspective; however, have we taken recent technological shifts into account?',
                'C. Be quiet, your argument is completely invalid.',
                'D. I do not care what you think.'
              ],
              correctIndex: 1,
              explanation: '"I understand your perspective; however, have we taken... into account?" là cách phản biện chuẩn mực và lịch sự trong môi trường học thuật.',
              difficulty: 'Cơ bản',
              skill: 'mixed'
            }
          ]
        }
      },
      {
        type: 'writing',
        title: 'Writing: A Letter of Advice to Parents',
        duration: '35 phút',
        completed: false,
        lessonData: {
          id: 'u2-m7',
          title: 'Unit 2: Writing — An Opinion Essay on Teen Autonomy',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'writing',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Viết bài luận bày tỏ quan điểm về việc phụ huynh có nên để học sinh THPT tự do lựa chọn trang phục và định hướng môn học.',
          keyPoints: [
            'Trình bày quan điểm cân bằng (Balanced perspective)',
            'Sử dụng các trạng từ liên kết luận điểm'
          ],
          completed: false,
          questions: []
        }
      },
      {
        type: 'review',
        title: 'Review: Unit 2 Mock Quiz',
        duration: '25 phút',
        completed: false,
        lessonData: {
          id: 'u2-m8',
          title: 'Unit 2: Review Quiz',
          unitId: 'unit-eng11-u2',
          unitTitle: 'Unit 2: The Generation Gap',
          grade: '11',
          moduleType: 'review',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Bài kiểm tra ôn tập Unit 2 với 10 câu hỏi trắc nghiệm.',
          keyPoints: ['Ôn tập động từ khuyết thiếu', 'Củng cố từ vựng gia đình'],
          completed: false,
          questions: []
        }
      }
    ]
  },
  {
    id: 'unit-eng11-u6',
    unitNumber: 6,
    grade: '11',
    title: 'Preserving Our Heritage',
    vietnameseTitle: 'Bảo tồn di sản văn hóa và thiên nhiên',
    theme: 'Culture, Heritage and Conservation',
    textbook: 'Global Success',
    durationHours: 7.0,
    progressPercent: 60,
    completedModulesCount: 4,
    totalModulesCount: 8,
    description: 'Nghiên cứu về di sản vật thể, phi vật thể và trách nhiệm của thế hệ trẻ trong việc số hóa và gìn giữ văn hóa dân tộc.',
    grammarFocus: 'To-infinitive clauses · Passive voice with reporting verbs',
    vocabularyTopic: 'Tangible heritage, Intangible cultural heritage, Restoration, Relic',
    modules: [
      {
        type: 'vocab',
        title: 'Vocabulary: Tangible & Intangible Heritage',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u6-m1',
          title: 'Unit 6: Vocabulary — Cultural Heritage Preservation',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'vocab',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Hệ thống từ vựng học thuật chuẩn đề thi THPT về di sản văn hóa vật thể, phi vật thể và công tác trùng tu.',
          keyPoints: [
            'Phân biệt Tangible Heritage và Intangible Cultural Heritage',
            'Các động từ: preserve, restore, digitize, celebrate',
            'Collocations: world heritage site, cultural identity, historical monument'
          ],
          vocabulary: [
            {
              word: 'tangible heritage',
              ipa: '/ˈtæn.dʒə.bəl ˈher.ɪ.tɪdʒ/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Di sản vật thể (công trình kiến trúc, di tích lịch sử, hiện vật)',
              definitionEn: 'Physical artifacts, monuments, and buildings inherited from past generations',
              exampleSentence: 'The Complex of Hue Monuments is a world-renowned tangible cultural heritage.',
              exampleTranslation: 'Quần thể di tích Cố đô Huế là một di sản văn hóa vật thể nổi tiếng thế giới.',
              collocations: ['preserve tangible heritage', 'tangible cultural relics']
            },
            {
              word: 'intangible heritage',
              ipa: '/ɪnˈtæn.dʒə.bəl ˈher.ɪ.tɪdʒ/',
              partOfSpeech: 'noun phrase',
              definitionVi: 'Di sản phi vật thể (dân ca, lễ hội, bí quyết nghề truyền thống)',
              definitionEn: 'Non-physical traditions, performing arts, rituals, and folklore passed down through generations',
              exampleSentence: 'Quan Ho Bac Ninh folk songs represent an exemplary masterpiece of intangible heritage.',
              exampleTranslation: 'Dân ca Quan họ Bắc Ninh đại diện cho một kiệt tác mẫu mực về di sản văn hóa phi vật thể.',
              collocations: ['UNESCO intangible heritage list', 'safeguard intangible heritage']
            },
            {
              word: 'restoration',
              ipa: '/ˌres.təˈreɪ.ʃən/',
              partOfSpeech: 'noun',
              definitionVi: 'Công tác trùng tu, phục chế công trình lịch sử',
              definitionEn: 'The process of repairing and cleaning something back to its former good condition',
              exampleSentence: 'Architects undertook the meticulous restoration of the ancient Cham towers.',
              exampleTranslation: 'Các kiến trúc sư đã tiến hành việc trùng tu tỉ mỉ các tháp Chăm cổ.',
              collocations: ['undertake restoration', 'restoration project']
            }
          ],
          completed: true,
          questions: [
            {
              id: 'q-u6-v1',
              question: 'Which of the following is an example of INTANGIBLE cultural heritage?',
              options: [
                'A. The Thang Long Imperial Citadel',
                'B. Nha Nhac (Vietnamese Court Music)',
                'C. Ha Long Bay limestone islands',
                'D. My Son Sanctuary ruins'
              ],
              correctIndex: 1,
              explanation: 'Nhã nhạc cung đình Huế (Nha Nhac) là di sản văn hóa phi vật thể được UNESCO vinh danh.',
              difficulty: 'Cơ bản',
              skill: 'vocabulary'
            }
          ]
        }
      },
      {
        type: 'grammar',
        title: 'Grammar: To-infinitive Clauses & Passive of Reporting Verbs',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u6-m2',
          title: 'Unit 6: Grammar — To-infinitive Clauses & Impersonal Passive',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'grammar',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Cấu trúc mệnh đề To-V rút gọn mệnh đề quan hệ và câu bị động với các động từ tường thuật (say, believe, report).',
          keyPoints: [
            'Rút gọn mệnh đề quan hệ bằng To-infinitive sau the first, the second, the only, the best',
            'Câu bị động khách quan: It is believed that... / S + is believed to V...'
          ],
          grammar: {
            title: 'Mệnh đề To-Infinitive & Bị động với động từ tường thuật',
            structure: 'Subject + is/are/was/were + said/believed/reported + to + V(bare) / to have V3/ed',
            explanation: 'Dùng khi muốn truyền đạt thông tin khách quan từ các chuyên gia hoặc dư luận.',
            examples: [
              {
                en: 'Trang An was the first site in Southeast Asia to be recognized as a mixed heritage.',
                vi: 'Tràng An là địa danh đầu tiên ở Đông Nam Á được công nhận là di sản kép.'
              },
              {
                en: 'Ancient pagodas are said to carry profound spiritual values.',
                vi: 'Các ngôi chùa cổ được cho là mang những giá trị tâm linh sâu sắc.'
              }
            ],
            commonMistakes: [
              'Quên đổi thì sang "to have + V3/ed" khi hành động trong mệnh đề tường thuật xảy ra trước thời điểm hiện tại.',
              'Nhầm lẫn giữa mệnh đề chủ động và bị động của To-V.'
            ],
            practiceTip: 'Nếu đứng sau "the only, the first, the last", ưu tiên sử dụng To-Infinitive.'
          },
          completed: true,
          questions: [
            {
              id: 'q-u6-g1',
              question: 'Yuri Gagarin was the first human _____ into outer space.',
              options: [
                'A. to travel',
                'B. traveling',
                'C. traveled',
                'D. travels'
              ],
              correctIndex: 0,
              explanation: 'Đứng sau cụm "the first human" dùng To-infinitive để rút gọn mệnh đề quan hệ.',
              difficulty: 'Thông hiểu',
              skill: 'grammar'
            }
          ]
        }
      },
      {
        type: 'reading',
        title: 'Reading: Digital Preservation of Vietnamese Antiquities',
        duration: '35 phút',
        completed: true,
        lessonData: {
          id: 'u6-m3',
          title: 'Unit 6: Preserving Our Heritage — Reading Comprehension',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'reading',
          textbook: 'Global Success',
          durationMinutes: 30,
          summary: 'Bài đọc chuyên sâu về dự án ứng dụng công nghệ thực tế ảo VR/AR và quét 3D để phục chế di sản văn hóa Việt Nam.',
          keyPoints: [
            'Phân biệt Tangible Heritage và Intangible Cultural Heritage',
            'Kỹ thuật xác định đại từ quy chiếu và từ đồng nghĩa trong ngữ cảnh',
            'Đọc hiểu suy luận học thuật'
          ],
          readingPassage: {
            title: 'Reviving Ancient Relics Through Digital Innovation',
            wordCount: 340,
            text: `In recent years, Vietnam has pioneered the confluence of cultural conservation and cutting-edge technology. Facing natural weathering, humidity, and the inevitable decay of time, many centuries-old communal houses and pagodas across the Red River Delta have been placed in severe jeopardy.

To address these vulnerabilities, collaborative initiatives between universities and the Ministry of Culture have accelerated the 3D scanning and virtual reconstruction of historical artifacts. High-resolution LiDAR scanners capture millimetric details of wooden carvings, Buddhist statues, and stone steles. Once digitized, these photorealistic assets are curated into open-access online repositories.

The merits of this endeavor are two-fold. Firstly, architects possess exact geometric blueprints to orchestrate authentic restorations should physical structures suffer catastrophic damage. Secondly, and perhaps more importantly, digital archives democratize educational access for high schoolers nationwide. Students can manipulate 3D artifacts directly in classrooms, fostering intrinsic pride and proactive stewardship over national identity.`
          },
          completed: true,
          questions: [
            {
              id: 'q-u6-r1',
              question: 'The phrase "in severe jeopardy" in paragraph 1 is closest in meaning to:',
              options: [
                'A. in extreme danger of destruction',
                'B. thoroughly renovated',
                'C. financially prosperous',
                'D. globally popular'
              ],
              correctIndex: 0,
              explanation: '"In severe jeopardy" có nghĩa là đang gặp nguy hiểm nghiêm trọng, có nguy cơ bị hủy hoại.',
              difficulty: 'Thông hiểu',
              skill: 'reading'
            },
            {
              id: 'q-u6-r2',
              question: 'According to paragraph 3, how does digital archiving specifically benefit high school students?',
              options: [
                'A. It forces them to pay expensive museum entrance fees.',
                'B. It permits them to interact with 3D models and develop national pride.',
                'C. It replaces all traditional textbook reading entirely.',
                'D. It tests their programming skills under strict time limits.'
              ],
              correctIndex: 1,
              explanation: 'Đoạn cuối chỉ rõ: "Students can manipulate 3D artifacts directly in classrooms, fostering intrinsic pride and proactive stewardship over national identity."',
              difficulty: 'Thông hiểu',
              skill: 'reading'
            }
          ]
        }
      },
      {
        type: 'speaking',
        title: 'Speaking: Proposing a Heritage Preservation Project',
        duration: '25 phút',
        completed: true,
        lessonData: {
          id: 'u6-m4',
          title: 'Unit 6: Speaking — Presenting a Youth Heritage Campaign',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'speaking',
          textbook: 'Global Success',
          durationMinutes: 25,
          summary: 'Thuyết trình đề xuất một dự án bảo tồn làng nghề truyền thống hoặc di tích địa phương.',
          keyPoints: [
            'Cấu trúc bài thuyết trình 3 phần chuẩn học thuật',
            'Từ nối chuyển ý chuyên nghiệp'
          ],
          completed: true,
          questions: []
        }
      },
      {
        type: 'writing',
        title: 'Writing: A Proposal for a School Heritage Trip',
        duration: '35 phút',
        completed: false,
        lessonData: {
          id: 'u6-m5',
          title: 'Unit 6: Writing — Formal Proposal for a Field Trip',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'writing',
          textbook: 'Global Success',
          durationMinutes: 35,
          summary: 'Viết bản đề xuất (Proposal) gửi Ban giám hiệu nhà trường về chuyến đi thực tế tìm hiểu di sản làng gốm Bát Tràng.',
          keyPoints: [
            'Cấu trúc văn bản đề xuất: Title, To, From, Objectives, Expected Costs, Benefits',
            'Ngôn phong trang trọng (Formal register)'
          ],
          completed: false,
          questions: []
        }
      },
      {
        type: 'review',
        title: 'Review: Unit 6 Comprehensive Test',
        duration: '30 phút',
        completed: false,
        lessonData: {
          id: 'u6-m6',
          title: 'Unit 6: Review & Final Assessment',
          unitId: 'unit-eng11-u6',
          unitTitle: 'Unit 6: Preserving Our Heritage',
          grade: '11',
          moduleType: 'review',
          textbook: 'Global Success',
          durationMinutes: 30,
          summary: 'Đề kiểm tra đánh giá toàn diện kỹ năng Unit 6.',
          keyPoints: ['Tổng hợp từ vựng di sản', 'Luyện giải đề câu bị động'],
          completed: false,
          questions: []
        }
      }
    ]
  }
];

export const sampleLessons: Lesson[] = [
  grade11Units[2].modules[2].lessonData, // Unit 6 reading
  grade11Units[0].modules[1].lessonData, // Unit 1 grammar
  grade11Units[0].modules[0].lessonData  // Unit 1 vocab
];

export const gradeCurriculums: EnglishGradeCurriculum[] = [
  {
    grade: '10',
    title: 'Tiếng Anh 10',
    subtitle: 'Nền tảng & Củng cố Ngữ pháp Trọng tâm (A2 -> B1)',
    description: 'Xây dựng nền tảng từ vựng chủ đề Đời sống gia đình, Môi trường, Âm nhạc và Bình đẳng giới. Làm chủ các thì cơ bản, câu bị động và mệnh đề quan hệ.',
    targetLevel: 'B1',
    unitsCount: 10,
    lessonsCount: 80,
    progressPercent: 78,
    completedUnits: 7,
    badge: 'Đã hoàn thành 78%',
    keyThemes: ['Family Life', 'Humans & Environment', 'Music', 'For a Better Community', 'Inventions'],
    units: []
  },
  {
    grade: '11',
    title: 'Tiếng Anh 11',
    subtitle: 'Tăng tốc & Phát triển Tư duy Học thuật (B1 -> B2)',
    description: 'Mở rộng từ vựng chuyên sâu về Sức khỏe, Khoảng cách thế hệ, Di sản văn hóa, Đô thị hóa và Giáo dục đại học. Rèn luyện kỹ năng đọc Skimming/Scanning và viết đoạn văn học thuật.',
    targetLevel: 'B2',
    unitsCount: 10,
    lessonsCount: 80,
    progressPercent: 62,
    completedUnits: 6,
    badge: 'Đang học trọng tâm',
    keyThemes: [
      'A Long and Healthy Life',
      'The Generation Gap',
      'Cities of the Future',
      'ASEAN and Vietnam',
      'Preserving Our Heritage'
    ],
    units: grade11Units
  },
  {
    grade: '12',
    title: 'Tiếng Anh 12',
    subtitle: 'Về đích B2 & Chiến thuật Ôn thi THPT Quốc gia',
    description: 'Hệ thống hóa toàn bộ ngữ pháp phân hóa cao: Đảo ngữ, Câu điều kiện hỗn hợp, Mệnh đề danh từ, Thành ngữ (Idioms) và Phrasal Verbs thường xuất hiện trong đề thi tốt nghiệp.',
    targetLevel: 'B2',
    unitsCount: 10,
    lessonsCount: 80,
    progressPercent: 35,
    completedUnits: 3,
    badge: 'Lộ trình chuẩn kỳ thi 2026',
    keyThemes: [
      'Life Stories We Admire',
      'A Diversity of Cultures',
      'Green Living',
      'Urbanisation',
      'The World of Work'
    ],
    units: []
  }
];

export const dailyPracticeCards: DailyPracticeCard[] = [
  {
    id: 'dp-vocab',
    title: 'Từ vựng mỗi ngày',
    subtitle: '15 từ vựng học thuật chủ đề Môi trường & Di sản (B1 - B2)',
    duration: '5 phút',
    tag: 'Từ vựng trọng tâm',
    questionsCount: 15,
    type: 'vocab'
  },
  {
    id: 'dp-grammar',
    title: 'Ngữ pháp thực chiến',
    subtitle: 'Luyện tập mệnh đề quan hệ rút gọn & Đảo ngữ đề thi THPT',
    duration: '8 phút',
    tag: 'Trọng điểm thi',
    questionsCount: 10,
    type: 'grammar'
  },
  {
    id: 'dp-reading',
    title: 'Đọc hiểu 1 đoạn văn',
    subtitle: 'Văn bản 350 từ bám sát cấu trúc đề thi tốt nghiệp THPT',
    duration: '10 phút',
    tag: 'Kỹ năng Skimming',
    questionsCount: 5,
    type: 'reading'
  },
  {
    id: 'dp-listening',
    title: 'Nghe hiểu hội thoại',
    subtitle: 'Luyện bắt từ khóa tốc độ nói tự nhiên của người bản ngữ',
    duration: '7 phút',
    tag: 'Audio bản xứ',
    questionsCount: 6,
    type: 'listening'
  },
  {
    id: 'dp-5min-quiz',
    title: 'Quiz phản xạ 5 phút',
    subtitle: 'Thử thách phản xạ nhanh với 8 câu hỏi trắc nghiệm ngẫu nhiên',
    duration: '5 phút',
    tag: 'Thử thách ngày',
    questionsCount: 8,
    type: 'quiz'
  },
  {
    id: 'dp-quick-review',
    title: 'Ôn tập thẻ Flashcards',
    subtitle: 'Lặp lại ngắt quãng (Spaced Repetition) các cụm từ dễ nhầm',
    duration: '4 phút',
    tag: 'Ghi nhớ sâu',
    questionsCount: 10,
    type: 'review'
  }
];

export const fourSkillModules: SkillModule[] = [
  {
    id: 'listening',
    title: 'LISTENING',
    vietnameseTitle: 'Kỹ năng Nghe hiểu (Listening Comprehension)',
    description: 'Rèn luyện khả năng bắt từ khóa, nhận diện âm thanh nối, nuốt âm và phân biệt bẫy ngữ âm trong các bài nói tốc độ tự nhiên.',
    level: 'Intermediate',
    cefrLevel: 'B1',
    iconName: 'Headphones',
    exerciseCount: 48,
    averageScore: 8.5,
    currentTopic: 'Campus Life, Healthy Living & Heritage Conservation',
    recommendedTime: '15 phút/ngày',
    practiceSample: {
      title: 'Listening: Protecting Traditional Craft Villages in Hanoi',
      description: 'Nghe đoạn ghi âm phỏng vấn nghệ nhân gốm Bát Tràng về công tác bảo tồn di sản.',
      audioUrl: 'https://example.com/audio/sample-thpt.mp3',
      questions: [
        {
          id: 'lq1',
          question: 'What is the most significant challenge facing traditional pottery artisans according to the audio?',
          options: [
            'A. Lack of domestic clay supplies',
            'B. Competition from mass-produced plastic alternatives and youth migration',
            'C. Prohibitive export tariffs imposed by foreign governments',
            'D. High electricity expenses'
          ],
          correctIndex: 1,
          explanation: 'Nghệ nhân chia sẻ: "Our biggest headache is competing against cheap factory plastics while young people leave the village for city jobs."',
          difficulty: 'Thông hiểu',
          skill: 'listening'
        }
      ]
    }
  },
  {
    id: 'speaking',
    title: 'SPEAKING',
    vietnameseTitle: 'Kỹ năng Nói & Giao tiếp (Speaking & Presentation)',
    description: 'Thực hành phát âm chuẩn bảng IPA, làm chủ trọng âm từ và câu, phản xạ trả lời câu hỏi và triển khai luận điểm mạch lạc.',
    level: 'Intermediate',
    cefrLevel: 'B1',
    iconName: 'Mic',
    exerciseCount: 36,
    averageScore: 7.4,
    currentTopic: 'Expressing Opinions: Preserving Heritage vs. Modernization',
    recommendedTime: '20 phút/ngày',
    practiceSample: {
      title: 'Speaking Prompt: How can youth contribute to safeguarding local culture?',
      description: 'Chuẩn bị bài nói 2 phút với 2 giải pháp cụ thể: ứng dụng mạng xã hội và tổ chức câu lạc bộ trường.',
      speakingPrompt: 'Present your perspective on youth involvement in cultural preservation. Structure your talk: 1. Introduction -> 2. Two tangible ideas (Digital storytelling & School heritage club) -> 3. Conclusion.'
    }
  },
  {
    id: 'reading',
    title: 'READING',
    vietnameseTitle: 'Kỹ năng Đọc hiểu Chuyên sâu (Academic Reading)',
    description: 'Luyện tập phương pháp Skimming & Scanning, xác định đại từ thay thế, đoán nghĩa từ theo văn cảnh và kỹ năng làm bài đọc điền từ.',
    level: 'Upper Intermediate',
    cefrLevel: 'B2',
    iconName: 'BookOpen',
    exerciseCount: 64,
    averageScore: 9.2,
    currentTopic: 'Renewable Energy Innovations & Sustainable Cities',
    recommendedTime: '25 phút/ngày',
    practiceSample: {
      title: 'Reading Passage: The Evolution of Urban Architecture in Vietnam',
      description: 'Đọc văn bản phân tích về sự kết hợp giữa kiến trúc xanh hiện đại và nhà sàn truyền thống.',
      passage: `In recent decades, Vietnamese architectural visionaries have captured international acclaim by harmonizing vernacular building techniques with eco-friendly modernism. Incorporating expansive bamboo lattices and natural cross-ventilation, contemporary schools and public libraries in Da Nang and Ho Chi Minh City minimize air conditioning dependency while honoring regional heritage.

This green renaissance directly addresses climate vulnerability. As tropical urban centers endure unprecedented heatwaves, integrating vernacular wisdom proves not merely an aesthetic luxury, but an environmental imperative for the sustainable future.`,
      questions: [
        {
          id: 'rq1',
          question: 'According to the passage, what is a key feature of contemporary eco-friendly buildings in Vietnam?',
          options: [
            'A. Full reliance on artificial air conditioning units',
            'B. Incorporation of bamboo lattices and natural cross-ventilation',
            'C. Demolition of all traditional wooden relics',
            'D. Use of imported steel and non-recyclable glass only'
          ],
          correctIndex: 1,
          explanation: 'Đoạn văn nêu rõ: "Incorporating expansive bamboo lattices and natural cross-ventilation... minimize air conditioning dependency."',
          difficulty: 'Cơ bản',
          skill: 'reading'
        }
      ]
    }
  },
  {
    id: 'writing',
    title: 'WRITING',
    vietnameseTitle: 'Kỹ năng Viết đoạn & Viết luận (Academic Writing)',
    description: 'Nắm vững cấu trúc đoạn văn học thuật (PEEL / TEEL), cách dùng liên từ mượt mà, đa dạng hóa cấu trúc ngữ pháp và tránh dịch từng từ kiểu Word-by-Word.',
    level: 'Upper Intermediate',
    cefrLevel: 'B2',
    iconName: 'PenTool',
    exerciseCount: 32,
    averageScore: 8.1,
    currentTopic: 'Opinion Essay: Single-use Plastics Ban in High Schools',
    recommendedTime: '30 phút/ngày',
    practiceSample: {
      title: 'Writing Task: An Opinion Paragraph (150-180 words)',
      description: 'Viết đoạn văn bày tỏ quan điểm về việc cấm đồ nhựa dùng một lần trong căng tin trường học.',
      writingPrompt: 'Write an opinion paragraph (150-180 words) discussing whether high school canteens should eliminate single-use plastic utensils and cups completely. Provide reasons and concrete examples.'
    }
  }
];

export const quickFlashcards = [
  {
    topic: 'Unit 6 · Collocation',
    question: '"_____ cultural heritage" (bảo tồn di sản)',
    answer: 'PRESERVE / SAFEGUARD / CONSERVE cultural heritage',
    tip: 'Từ "safeguard" đặc biệt hay đi cùng Intangible Cultural Heritage theo tài liệu UNESCO.'
  },
  {
    topic: 'Unit 1 · Vocabulary',
    question: 'Nêu từ tiếng Anh của "Tuổi thọ trung bình dự tính"?',
    answer: 'LIFE EXPECTANCY (/ˈlaɪf ɪkˌspek.tən.si/)',
    tip: 'Ví dụ: "Medical advancements have prolonged human life expectancy."'
  },
  {
    topic: 'Unit 2 · Grammar',
    question: 'Phân biệt MUSTN\'T và DON\'T HAVE TO?',
    answer: 'MUSTN\'T = Bị cấm tuyệt đối · DON\'T HAVE TO = Không bắt buộc (làm hay không tùy ý)',
    tip: '"You mustn\'t cheat during the exam" vs "Tomorrow is Sunday, you don\'t have to wake up early".'
  },
  {
    topic: 'Phát âm · Đuôi -ED',
    question: 'Đuôi -ED được phát âm là /ɪd/ khi nào?',
    answer: 'Khi động từ tận cùng bằng âm /t/ hoặc /d/',
    tip: 'Ghi nhớ nhanh: "Tiền Đô" (t, d) -> wanted, needed, decided.'
  },
  {
    topic: 'Phrasal Verb · Đề thi THPT',
    question: '"Cut _____ on" có nghĩa là gì?',
    answer: 'CUT DOWN ON = Cắt giảm bớt tiêu thụ',
    tip: '"We should cut down on electricity consumption and fast food."'
  },
  {
    topic: 'Ngữ pháp · Mệnh đề rút gọn',
    question: 'Khi nào rút gọn mệnh đề quan hệ bằng TO-INFINITIVE?',
    answer: 'Khi có từ chỉ thứ tự: the first, the second, the last, the only, the best...',
    tip: 'Ví dụ: "He was the first student to submit the English test."'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Streak học Tiếng Anh 14 ngày!',
    message: 'Chúc mừng bạn đã duy trì chuỗi học tập 14 ngày liên tục. Trình độ B1 của bạn đang tăng tốc tới mục tiêu B2!',
    timeAgo: '10 phút trước',
    read: false,
    type: 'achievement'
  },
  {
    id: 'notif-2',
    title: 'Cập nhật đề thi mới: Unit 6 Preserving Heritage',
    message: 'Bộ câu hỏi đọc hiểu chuyên sâu và câu bị động tường thuật đã sẵn sàng để bạn ôn tập.',
    timeAgo: '2 giờ trước',
    read: false,
    type: 'curriculum'
  },
  {
    id: 'notif-3',
    title: 'Nhắc nhở buổi học hôm nay (35 phút)',
    message: 'Bạn còn 1 bài luyện nghe và 10 câu ôn tập ngữ pháp để hoàn thành chỉ tiêu ngày.',
    timeAgo: '4 giờ trước',
    read: true,
    type: 'reminder'
  }
];
