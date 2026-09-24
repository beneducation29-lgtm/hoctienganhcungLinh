/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Content Architecture Mock Database for High School English Learning Platform
 * Covering Grade 10, 11, 12 with full units, lessons, sections, question bank & review sets.
 */

import {
  Curriculum,
  Textbook,
  GradeModel,
  UnitModel,
  LessonModel,
  QuestionBankItem,
  ReviewSet,
  LearningActivity,
  StudentProgress,
  VocabularyItem,
  GrammarTopic,
  ReadingExercise,
  ListeningExercise,
  SpeakingExercise,
  WritingExercise
} from '../types/contentArchitecture';

// 1. CURRICULUM
export const mockCurriculum: Curriculum = {
  id: 'curriculum-thpt-2018',
  name: 'Chương trình Giáo dục Phổ thông Tiếng Anh THPT 2018',
  description: 'Khung chương trình chuẩn của Bộ Giáo dục & Đào tạo định hướng phát triển toàn diện năng lực giao tiếp và tư duy phản biện.',
  publisher: 'Bộ Giáo dục & Đào tạo',
  version: '2018 - Chuẩn quốc gia',
  grades: ['grade-10', 'grade-11', 'grade-12']
};

// 2. TEXTBOOKS
export const mockTextbooks: Textbook[] = [
  {
    id: 'tb-global-success-10',
    curriculumId: 'curriculum-thpt-2018',
    name: 'Global Success 10',
    grade: '10',
    description: 'Bộ sách Kết nối tri thức với cuộc sống - Tiếng Anh 10',
    publisher: 'NXB Giáo dục Việt Nam',
    units: ['unit-10-1', 'unit-10-2', 'unit-10-3']
  },
  {
    id: 'tb-global-success-11',
    curriculumId: 'curriculum-thpt-2018',
    name: 'Global Success 11',
    grade: '11',
    description: 'Bộ sách Kết nối tri thức với cuộc sống - Tiếng Anh 11',
    publisher: 'NXB Giáo dục Việt Nam',
    units: ['unit-11-1', 'unit-11-2', 'unit-11-6']
  },
  {
    id: 'tb-global-success-12',
    curriculumId: 'curriculum-thpt-2018',
    name: 'Global Success 12',
    grade: '12',
    description: 'Bộ sách Kết nối tri thức với cuộc sống - Tiếng Anh 12 (Trọng tâm ôn thi THPT Quốc gia)',
    publisher: 'NXB Giáo dục Việt Nam',
    units: ['unit-12-1', 'unit-12-2', 'unit-12-6']
  },
  {
    id: 'tb-friends-global-11',
    curriculumId: 'curriculum-thpt-2018',
    name: 'Friends Global 11',
    grade: '11',
    description: 'Bộ sách Chân trời sáng tạo - Tiếng Anh 11',
    publisher: 'NXB Giáo dục Việt Nam',
    units: ['unit-11-1', 'unit-11-2', 'unit-11-6']
  }
];

// 3. GRADES
export const mockGrades: GradeModel[] = [
  {
    id: 'grade-10',
    gradeNumber: '10',
    name: 'Tiếng Anh 10',
    description: 'Củng cố nền tảng ngữ âm, từ vựng đời sống và cấu trúc câu cơ bản. Chuyển giao từ THCS lên THPT.',
    targetCefr: 'B1',
    textbooks: ['tb-global-success-10'],
    units: ['unit-10-1', 'unit-10-2', 'unit-10-3'],
    progress: 80,
    completedUnitsCount: 8,
    totalUnitsCount: 10
  },
  {
    id: 'grade-11',
    gradeNumber: '11',
    name: 'Tiếng Anh 11',
    description: 'Mở rộng chủ đề học thuật, làm quen với đọc hiểu văn bản dài, viết đoạn văn và nghe đàm thoại chuyên sâu.',
    targetCefr: 'B1',
    textbooks: ['tb-global-success-11', 'tb-friends-global-11'],
    units: ['unit-11-1', 'unit-11-2', 'unit-11-6'],
    progress: 60,
    completedUnitsCount: 6,
    totalUnitsCount: 10
  },
  {
    id: 'grade-12',
    gradeNumber: '12',
    name: 'Tiếng Anh 12',
    description: 'Luyện đề thi THPT Quốc gia, chinh phục các dạng bài phân hóa 9+ điểm (Đảo ngữ, Mệnh đề quan hệ rút gọn, Cụm từ cố định).',
    targetCefr: 'B2',
    textbooks: ['tb-global-success-12'],
    units: ['unit-12-1', 'unit-12-2', 'unit-12-6'],
    progress: 30,
    completedUnitsCount: 3,
    totalUnitsCount: 10
  }
];

// 4. QUESTION BANK (Universal across system)
export const mockQuestionBank: QuestionBankItem[] = [
  // Grade 10 Questions
  {
    id: 'qb-g10-1',
    grade: '10',
    skill: 'vocabulary',
    type: 'multiple_choice',
    difficulty: 'easy',
    cefrLevel: 'A2',
    question: 'In my family, both my parents work, so we divide the _____ equally to keep the house clean.',
    options: ['household chores', 'heavy lifting', 'groceries', 'breadwinner'],
    correctAnswer: 0,
    explanation: '"Household chores" có nghĩa là công việc vặt trong nhà (dọn dẹp, nấu ăn, rửa bát...).',
    hint: 'Cụm từ chỉ các việc lặt vặt hàng ngày trong gia đình.',
    tags: ['Family Life', 'Vocabulary', 'Unit 1']
  },
  {
    id: 'qb-g10-2',
    grade: '10',
    skill: 'grammar',
    type: 'multiple_choice',
    difficulty: 'medium',
    cefrLevel: 'B1',
    question: 'Look! My father _____ dinner in the kitchen right now.',
    options: ['cooks', 'is cooking', 'cooked', 'was cooking'],
    correctAnswer: 1,
    explanation: 'Dấu hiệu "Look!" và "right now" diễn tả hành động đang xảy ra tại thời điểm nói -> dùng thì Hiện tại tiếp diễn (is cooking).',
    tags: ['Present Continuous', 'Grammar', 'Unit 1']
  },
  {
    id: 'qb-g10-3',
    grade: '10',
    skill: 'reading',
    type: 'multiple_choice',
    difficulty: 'medium',
    cefrLevel: 'B1',
    question: 'According to the passage, adopting a green lifestyle helps individuals reduce their personal _____.',
    options: ['carbon footprint', 'solar panel', 'electric vehicle', 'grocery budget'],
    correctAnswer: 0,
    explanation: '"Carbon footprint" (dấu chân carbon) là lượng khí thải nhà kính do cá nhân hoặc tổ chức tạo ra.',
    tags: ['Environment', 'Reading', 'Unit 2']
  },

  // Grade 11 Questions
  {
    id: 'qb-g11-1',
    grade: '11',
    skill: 'vocabulary',
    type: 'multiple_choice',
    difficulty: 'medium',
    cefrLevel: 'B1',
    question: 'Regular aerobic exercises along with a balanced diet can greatly improve our life _____.',
    options: ['expectancy', 'expectation', 'expectant', 'expectedly'],
    correctAnswer: 0,
    explanation: 'Collocation học thuật: "life expectancy" mang nghĩa tuổi thọ trung bình.',
    hint: 'Một danh từ ghép chỉ khoảng thời gian một người được kỳ vọng sẽ sống.',
    tags: ['Health', 'Collocations', 'Unit 1']
  },
  {
    id: 'qb-g11-2',
    grade: '11',
    skill: 'grammar',
    type: 'multiple_choice',
    difficulty: 'medium',
    cefrLevel: 'B1',
    question: 'You _____ take pictures inside the royal sanctuary; it is strictly prohibited by law.',
    options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'needn\'t'],
    correctAnswer: 0,
    explanation: '"Mustn\'t" diễn tả sự cấm đoán mang tính pháp lý/quy định ("strictly prohibited"). "Don\'t have to" chỉ mang nghĩa không bắt buộc.',
    tags: ['Modal Verbs', 'Grammar', 'Unit 2']
  },
  {
    id: 'qb-g11-3',
    grade: '11',
    skill: 'reading',
    type: 'multiple_choice',
    difficulty: 'hard',
    cefrLevel: 'B2',
    question: 'The word "intangible" in paragraph 2 is closest in meaning to:',
    options: ['non-physical and spiritual', 'concrete and touchable', 'economically profitable', 'temporarily preserved'],
    correctAnswer: 0,
    explanation: '"Intangible heritage" là di sản phi vật thể (nhã nhạc, ca trù, quan họ) -> không cầm nắm được về mặt vật lý (non-physical).',
    tags: ['Heritage', 'Reading', 'Unit 6']
  },
  {
    id: 'qb-g11-4',
    grade: '11',
    skill: 'listening',
    type: 'multiple_choice',
    difficulty: 'medium',
    cefrLevel: 'B1',
    question: 'What was the primary obstacle mentioned by the student volunteer group?',
    options: ['Cross-referencing diverse historical archives', 'Securing local government permits', 'Purchasing expensive drone cameras', 'Recruiting enough high school members'],
    correctAnswer: 0,
    explanation: 'Trong đoạn băng nghe, tình nguyện viên nêu rõ: "Cross-referencing diverse historical archives was the most demanding challenge".',
    tags: ['Listening', 'Unit 6']
  },

  // Grade 12 Questions
  {
    id: 'qb-g12-1',
    grade: '12',
    skill: 'grammar',
    type: 'multiple_choice',
    difficulty: 'hard',
    cefrLevel: 'B2',
    question: 'Not until the scientist completed decades of research _____ recognized internationally.',
    options: ['was his discovery', 'his discovery was', 'did his discovery', 'had his discovery been'],
    correctAnswer: 0,
    explanation: 'Đảo ngữ với "Not until + Clause": Not until S + V, was/were + S + V3/ed (thể bị động của quá khứ đơn: was his discovery recognized).',
    tags: ['Inversion', 'Grammar', 'Grade 12']
  },
  {
    id: 'qb-g12-2',
    grade: '12',
    skill: 'vocabulary',
    type: 'multiple_choice',
    difficulty: 'hard',
    cefrLevel: 'B2',
    question: 'The young innovator was praised for his _____ determination in developing biodegradable bioplastics.',
    options: ['unwavering', 'hesitant', 'superficial', 'negligible'],
    correctAnswer: 0,
    explanation: '"Unwavering determination" là cụm từ học thuật diễn tả sự kiên định không hề lung lay.',
    tags: ['Vocabulary', 'Collocations', 'Grade 12']
  },
  {
    id: 'qb-g12-3',
    grade: '12',
    skill: 'reading',
    type: 'multiple_choice',
    difficulty: 'hard',
    cefrLevel: 'B2',
    question: 'What is the author\'s main conclusion regarding wildlife conservation corridors?',
    options: ['They are indispensable for maintaining genetic diversity among fragmented animal populations', 'They are too expensive to be adopted by developing nations', 'They should be replaced entirely by captive breeding zoos', 'They only benefit bird species rather than terrestrial mammals'],
    correctAnswer: 0,
    explanation: 'Đoạn kết luận chỉ rõ hành lang sinh thái đóng vai trò then chốt giúp duy trì tính đa dạng di truyền.',
    tags: ['Reading', 'Biodiversity', 'Grade 12']
  }
];

// 5. VOCABULARY ITEMS
export const mockVocabularyItems: Record<string, VocabularyItem[]> = {
  'lesson-10-1-1': [
    {
      id: 'vocab-10-1',
      lessonId: 'lesson-10-1-1',
      word: 'breadwinner',
      ipa: '/ˈbredwɪnər/',
      partOfSpeech: 'noun',
      meaning: 'a person who earns money to support a family',
      meaningVi: 'trụ cột kinh tế trong gia đình',
      example: 'In traditional households, the father was usually regarded as the primary breadwinner.',
      translation: 'Trong các gia đình truyền thống, người cha thường được xem là trụ cột kinh tế chính.',
      difficulty: 'medium',
      cefrLevel: 'B1',
      tags: ['Family Life', 'Unit 1'],
      collocations: ['sole breadwinner', 'primary breadwinner']
    },
    {
      id: 'vocab-10-2',
      lessonId: 'lesson-10-1-1',
      word: 'homemaker',
      ipa: '/ˈhəʊmmeɪkər/',
      partOfSpeech: 'noun',
      meaning: 'a person, especially a woman, who manages a home and takes care of the house and family',
      meaningVi: 'người nội trợ trong gia đình',
      example: 'Being a homemaker requires exceptional time-management and organizational skills.',
      translation: 'Làm một người nội trợ đòi hỏi kỹ năng quản lý thời gian và sắp xếp tuyệt vời.',
      difficulty: 'easy',
      cefrLevel: 'A2',
      tags: ['Family Life', 'Unit 1'],
      collocations: ['full-time homemaker']
    },
    {
      id: 'vocab-10-3',
      lessonId: 'lesson-10-1-1',
      word: 'heavy lifting',
      ipa: '/ˌhevi ˈlɪftɪŋ/',
      partOfSpeech: 'phrase',
      meaning: 'demanding physical work or the most difficult part of a task',
      meaningVi: 'việc nặng nhọc hoặc phần việc khó khăn nhất',
      example: 'My brother and I always take care of the heavy lifting when rearranging furniture.',
      translation: 'Anh trai và tôi luôn đảm nhận các công việc nặng khi sắp xếp lại đồ đạc.',
      difficulty: 'easy',
      cefrLevel: 'A2',
      tags: ['Family Life', 'Unit 1'],
      collocations: ['do the heavy lifting']
    }
  ],

  'lesson-11-6-1': [
    {
      id: 'vocab-11-1',
      lessonId: 'lesson-11-6-1',
      word: 'intangible',
      ipa: '/ɪnˈtændʒəbl/',
      partOfSpeech: 'adjective',
      meaning: 'that exists but that cannot be touched or seen easily; abstract values or cultural traditions',
      meaningVi: 'phi vật thể, vô hình (không sờ nắn được)',
      example: 'UNESCO recognized Quan Ho folk singing as an intangible cultural heritage of humanity.',
      translation: 'UNESCO đã công nhận dân ca Quan họ là di sản văn hóa phi vật thể của nhân loại.',
      difficulty: 'medium',
      cefrLevel: 'B2',
      tags: ['Heritage', 'Unit 6'],
      collocations: ['intangible cultural heritage', 'intangible assets']
    },
    {
      id: 'vocab-11-2',
      lessonId: 'lesson-11-6-1',
      word: 'monument',
      ipa: '/ˈmɒnjumənt/',
      partOfSpeech: 'noun',
      meaning: 'a building, column, or statue that is built to remind people of a famous person or event',
      meaningVi: 'đài tưởng niệm, công trình di tích lịch sử',
      example: 'The ancient citadel stands as a historic monument to national resilience.',
      translation: 'Khu hoàng thành cổ kính sừng sững như một di tích lịch sử ghi dấu tinh thần kiên cường của dân tộc.',
      difficulty: 'easy',
      cefrLevel: 'B1',
      tags: ['Heritage', 'Unit 6'],
      collocations: ['historic monument', 'ancient monument']
    },
    {
      id: 'vocab-11-3',
      lessonId: 'lesson-11-6-1',
      word: 'preserve',
      ipa: '/prɪˈzɜːv/',
      partOfSpeech: 'verb',
      meaning: 'to keep a particular quality, feature, or historical artifact intact and safe from decay',
      meaningVi: 'gìn giữ, bảo tồn nguyên vẹn',
      example: 'Local communities must collaborate to preserve traditional craftsmanship for future generations.',
      translation: 'Cộng đồng địa phương cần chung tay bảo tồn nghề thủ công truyền thống cho các thế hệ tương lai.',
      difficulty: 'easy',
      cefrLevel: 'B1',
      tags: ['Heritage', 'Unit 6'],
      collocations: ['preserve heritage', 'preserve traditions']
    }
  ],

  'lesson-12-1-1': [
    {
      id: 'vocab-12-1',
      lessonId: 'lesson-12-1-1',
      word: 'visionary',
      ipa: '/ˈvɪʒənri/',
      partOfSpeech: 'adjective',
      meaning: 'having or showing clear ideas about what should happen or be done in the future',
      meaningVi: 'có tầm nhìn xa trông rộng',
      example: 'His visionary leadership guided the tech venture through turbulent economic cycles.',
      translation: 'Sự lãnh đạo có tầm nhìn xa của ông đã chèo lái doanh nghiệp công nghệ qua những chu kỳ kinh tế đầy biến động.',
      difficulty: 'hard',
      cefrLevel: 'B2',
      tags: ['Life Stories', 'Grade 12'],
      collocations: ['visionary leader', 'visionary ideas']
    },
    {
      id: 'vocab-12-2',
      lessonId: 'lesson-12-1-1',
      word: 'perseverance',
      ipa: '/ˌpɜːsɪˈvɪərəns/',
      partOfSpeech: 'noun',
      meaning: 'the quality of continuing to try to achieve a particular aim despite difficulties',
      meaningVi: 'sự kiên trì, bền chí không nản lòng',
      example: 'Success in scientific research demands intellect and relentless perseverance.',
      translation: 'Thành công trong nghiên cứu khoa học đòi hỏi trí tuệ và sự bền bỉ không ngừng nghỉ.',
      difficulty: 'hard',
      cefrLevel: 'B2',
      tags: ['Life Stories', 'Grade 12'],
      collocations: ['relentless perseverance', 'show perseverance']
    }
  ]
};

// 6. GRAMMAR TOPICS
export const mockGrammarTopics: Record<string, GrammarTopic> = {
  'lesson-10-1-2': {
    id: 'grammar-10-1',
    lessonId: 'lesson-10-1-2',
    title: 'Present Simple vs. Present Continuous',
    structure: 'Present Simple: S + V(s/es) | Present Continuous: S + am/is/are + V-ing',
    explanation: 'Thì Hiện tại đơn dùng cho các thói quen, chân lý và sự việc cố định lặp đi lặp lại. Thì Hiện tại tiếp diễn diễn tả hành động đang diễn ra tại thời điểm nói hoặc các xu hướng tạm thời.',
    rules: [
      {
        ruleTitle: 'Hành động cố định vs Tạm thời',
        description: 'Dùng Hiện tại đơn cho sự thật hiển nhiên hoặc công việc hàng ngày. Dùng Hiện tại tiếp diễn cho hành động tạm thời xảy ra xung quanh thời điểm nói.',
        pattern: 'Every day vs. At the moment / Right now'
      },
      {
        ruleTitle: 'Động từ chỉ trạng thái (Stative Verbs)',
        description: 'Các động từ chỉ cảm xúc, giác quan và sở hữu (like, love, know, understand, believe, belong) KHÔNG dùng ở thì tiếp diễn.',
        pattern: 'I understand (NOT: I am understanding)'
      }
    ],
    examples: [
      {
        en: 'My mother usually washes the dishes after dinner, but today my brother is doing it.',
        vi: 'Mẹ tôi thường rửa bát sau bữa tối, nhưng hôm nay anh trai tôi đang làm việc đó.'
      },
      {
        en: 'Water boils at 100 degrees Celsius.',
        vi: 'Nước sôi ở 100 độ C (Chân lý khoa học).'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I am knowing the answer right now.',
        correct: 'I know the answer right now.',
        reason: '"Know" là động từ chỉ nhận thức, không chia ở dạng tiếp diễn.'
      },
      {
        incorrect: 'She is go to school by bicycle every morning.',
        correct: 'She goes to school by bicycle every morning.',
        reason: 'Hành động lặp đi lặp lại có "every morning" phải chia thì Hiện tại đơn.'
      }
    ],
    relatedExercises: ['qb-g10-2']
  },

  'lesson-11-1-2': {
    id: 'grammar-11-1',
    lessonId: 'lesson-11-1-2',
    title: 'Past Simple vs. Present Perfect with Time Expressions',
    structure: 'Past Simple: S + V2/ed | Present Perfect: S + have/has + V3/ed',
    explanation: 'Quá khứ đơn diễn tả sự việc đã chấm dứt hoàn toàn tại mốc thời gian xác định trong quá khứ (yesterday, in 2020, ago). Hiện tại hoàn thành diễn tả hành động bắt đầu trong quá khứ kéo dài đến hiện tại hoặc kết quả còn lưu lại (since, for, already, yet, recently).',
    rules: [
      {
        ruleTitle: 'Thời điểm xác định vs Không xác định',
        description: 'Có mốc thời gian rõ ràng trong quá khứ -> Dùng Quá khứ đơn. Không có mốc thời gian cụ thể hoặc thời gian chưa kết thúc -> Dùng Hiện tại hoàn thành.'
      },
      {
        ruleTitle: 'Cặp từ Since và For',
        description: 'Since + mốc thời gian (since 2015, since last week). For + khoảng thời gian (for 5 years, for two days).'
      }
    ],
    examples: [
      {
        en: 'Dr. John has worked at this hospital for twelve years.',
        vi: 'Bác sĩ John đã làm việc tại bệnh viện này được mười hai năm (hiện tại vẫn đang làm việc).'
      },
      {
        en: 'She moved to Da Nang three years ago.',
        vi: 'Cô ấy chuyển đến Đà Nẵng 3 năm trước (hành động đã kết thúc trong quá khứ).'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I have seen him yesterday afternoon.',
        correct: 'I saw him yesterday afternoon.',
        reason: 'Có trạng từ thời gian quá khứ xác định "yesterday" phải dùng Quá khứ đơn.'
      }
    ],
    relatedExercises: ['qb-g11-1']
  },

  'lesson-12-1-2': {
    id: 'grammar-12-1',
    lessonId: 'lesson-12-1-2',
    title: 'Inversion with Negative Adverbials (Đảo ngữ nâng cao 9+)',
    structure: 'Negative Adverbial + Auxiliary Verb (Trợ động từ) + S + V(bare/ed)',
    explanation: 'Cấu trúc đảo ngữ đưa trạng từ phủ định lên đầu câu nhằm nhấn mạnh ý nghĩa câu văn. Thường xuất hiện trong các câu phân loại học sinh giỏi đề thi THPT Quốc gia.',
    rules: [
      {
        ruleTitle: 'Not until / Only when',
        description: 'Not until / Only when + Clause/Time phrase + Auxiliary + S + V',
        pattern: 'Not until the rain stopped did we set off.'
      },
      {
        ruleTitle: 'Hardly / Scarcely / No sooner',
        description: 'Hardly/Scarcely + had + S + V3/ed + WHEN + S + V2/ed. No sooner + had + S + V3/ed + THAN + S + V2/ed.',
        pattern: 'Hardly had he arrived when the bell rang.'
      }
    ],
    examples: [
      {
        en: 'Seldom have we witnessed such remarkable scientific progress in such a brief period.',
        vi: 'Hiếm khi chúng ta được chứng kiến sự tiến bộ khoa học vượt bậc đến vậy trong một khoảng thời gian ngắn ngủi.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Hardly he had finished the exam when the bell rang.',
        correct: 'Hardly had he finished the exam when the bell rang.',
        reason: 'Sau từ phủ định "Hardly" phải đảo trợ động từ "had" lên trước chủ ngữ.'
      }
    ],
    relatedExercises: ['qb-g12-1']
  }
};

// 7. READING EXERCISES
export const mockReadingExercises: Record<string, ReadingExercise> = {
  'lesson-11-6-3': {
    id: 'read-11-6',
    lessonId: 'lesson-11-6-3',
    title: 'Preserving Vietnam\'s Intangible Cultural Heritage',
    level: 'B2',
    difficulty: 'medium',
    estimatedTime: 20,
    wordCount: 380,
    passage: `Cultural heritage represents the collective memory and spiritual identity of a civilization. While tangible heritage—such as imperial citadels, ancient pagodas, and architectural monuments—can be physically restored with mortar and stone, intangible cultural heritage presents fundamentally different preservation challenges.

Intangible heritage encompasses oral traditions, performing arts, social rituals, and traditional craftsmanship passed down through generations. In Vietnam, world-renowned forms such as Hue Royal Court Music (Nha Nhac) and Quan Ho folk songs reflect centuries of aesthetic refinement. However, rapid urban modernization and globalization have inevitably altered the lifestyle of younger generations. With digital entertainment competing for teenagers' attention, fewer youth are committing themselves to the painstaking years required to master traditional instruments or ancient vocal ornamentation.

To counteract this attrition, forward-thinking educators and cultural organizations are turning to innovative pedagogical methods. Integrating heritage appreciation directly into high school curricula enables students to discover the historical contexts behind folk poetry and musical scales. Moreover, modern digital initiatives—such as interactive podcasts, virtual acoustic tours, and student-led recording projects—bridge the generational chasm.

Ultimately, safeguarding intangible heritage does not mean freezing ancient art forms in an untouchable museum exhibit. Rather, it means empowering communities to practice, evolve, and celebrate their traditions so that ancient melodies remain vibrant threads in modern society.`,
    vocabulary: ['tangible', 'intangible', 'heritage', 'craftsmanship', 'counteract', 'attrition'],
    skills: ['skimming', 'scanning', 'inference', 'reference'],
    questions: [mockQuestionBank[4], mockQuestionBank[5]]
  }
};

// 8. LISTENING EXERCISES
export const mockListeningExercises: Record<string, ListeningExercise> = {
  'lesson-11-6-4': {
    id: 'listen-11-6',
    lessonId: 'lesson-11-6-4',
    title: 'Youth Innovations in Heritage Preservation',
    level: 'B1',
    difficulty: 'medium',
    duration: 180, // 3 minutes
    audioUrl: '/mock-audio/heritage-youth-interview.mp3',
    speakers: ['Radio Host (Lan)', 'Student Leader (Minh)'],
    audioTranscript: `Lan: Welcome back to our weekly Youth in Action segment on National Radio. Today, we are privileged to host Minh, a grade 11 student who spearheaded a heritage conservation club. Minh, could you tell us what motivated your team?

Minh: Thank you, Lan. It started when our history class visited the ancient temple complex in our hometown. We noticed many architectural details were deteriorating, yet very few young people knew the stories behind them. We decided to create a bilingual mobile app featuring 3D models and audio commentary recorded by students themselves.

Lan: That sounds like a sophisticated initiative! What was the most demanding challenge your team encountered?

Minh: Cross-referencing diverse historical archives was the most demanding challenge we encountered. Local elders had oral stories that differed from textbook records, so we consulted municipal historians to ensure every factual statement was completely accurate.

Lan: What advice would you give to other high school students wishing to undertake similar cultural projects?

Minh: Start small. You don't need a huge budget; just passion, disciplined teamwork, and respect for your community's roots.`,
    questions: [mockQuestionBank[6]]
  }
};

// 9. SPEAKING EXERCISES
export const mockSpeakingExercises: Record<string, SpeakingExercise> = {
  'lesson-11-6-5': {
    id: 'speak-11-6',
    lessonId: 'lesson-11-6-5',
    title: 'Oral Presentation: Preserving a Local Heritage Site',
    level: 'B1',
    difficulty: 'medium',
    prompt: 'Describe a cultural heritage site or traditional craft in Vietnam that you believe deserves urgent preservation. Explain why it is significant and suggest concrete steps youth can take.',
    instructions: 'Prepare your thoughts in 60 seconds. Speak continuously for 90 to 120 seconds. Use linking phrases to organize your ideas clearly into Introduction, Significance, Proposed Solutions, and Conclusion.',
    duration: 120,
    preparationTime: 60,
    usefulPhrases: [
      'I would like to shed light on...',
      'First and foremost, its historical significance stems from...',
      'From my perspective, younger generations can play a pivotal role by...',
      'In conclusion, safeguarding this relic is not merely a nostalgia trip, but...'
    ],
    sampleAnswer: 'I would like to talk about the ancient pottery village of Bat Trang. First and foremost, its significance stems from over seven centuries of handcrafted ceramics that mirror Vietnamese artistic evolution. In recent times, industrial mass production has threatened traditional kilns. From my perspective, high schoolers can support artisans by sharing documentary clips on social media and organizing cultural workshops. In conclusion, preserving Bat Trang keeps our ancestors\' craftsmanship alive in contemporary life.',
    evaluationCriteria: [
      { criterion: 'Fluency & Coherence', weight: 30, description: 'Smooth flow of speech, natural pacing, clear use of discourse markers' },
      { criterion: 'Lexical Resource', weight: 25, description: 'Accurate vocabulary related to cultural heritage and preservation' },
      { criterion: 'Grammatical Range', weight: 25, description: 'Use of complex sentences, conditionals, and passive voice' },
      { criterion: 'Pronunciation', weight: 20, description: 'Clear word stress, intonation patterns, and sentence rhythm' }
    ]
  }
};

// 10. WRITING EXERCISES
export const mockWritingExercises: Record<string, WritingExercise> = {
  'lesson-11-6-6': {
    id: 'write-11-6',
    lessonId: 'lesson-11-6-6',
    title: 'Academic Opinion Essay: Protecting Cultural Relics',
    level: 'B2',
    difficulty: 'medium',
    prompt: 'Some people argue that developing countries should prioritize economic industrialization over the preservation of historical relics and traditional arts. To what extent do you agree or disagree with this statement?',
    instructions: 'Write a well-structured argumentative essay of 180 to 220 words. Include an introductory paragraph with your clear thesis statement, two supporting body paragraphs with convincing evidence, and an effective conclusion.',
    minimumWords: 180,
    maximumWords: 240,
    guidelines: [
      'State your stance clearly in the introduction (Total agreement, disagreement, or balanced perspective).',
      'Use topic sentences at the beginning of each body paragraph.',
      'Employ academic transitional devices (e.g., Furthermore, Conversely, Consequently).',
      'Avoid conversational slang; adhere strictly to formal academic register.'
    ],
    example: `In the contemporary era of globalization, the tension between economic modernization and heritage conservation has sparked intensive debates. While industrial growth undoubtedly fuels national prosperity, I strongly disagree with the notion that historical preservation should be sidelined in pursuit of material wealth.

First and foremost, cultural relics and historic monuments represent the irreplaceable identity of a sovereign nation. Without tangible reminders of past struggles and achievements, future generations risk losing their sense of origin and shared community pride. Furthermore, cultural tourism has proven to be a sustainable and lucrative economic engine worldwide. Historic cities such as Hoi An and Hue generate substantial revenue and create thousands of jobs, demonstrating that preservation and economic progress are mutually reinforcing rather than contradictory.

In conclusion, sacrificing heritage for short-term industrial expansion is short-sighted. A nation thrives best when it marries state-of-the-art infrastructure with unwavering reverence for its cultural legacy.`,
    evaluationCriteria: [
      { criterion: 'Task Achievement', weight: 25, description: 'Fully addresses all parts of the prompt with well-developed ideas' },
      { criterion: 'Cohesion & Coherence', weight: 25, description: 'Logical sequencing of paragraphs and smooth transitions' },
      { criterion: 'Lexical Resource', weight: 25, description: 'Academic vocabulary with accurate collocations' },
      { criterion: 'Grammatical Accuracy', weight: 25, description: 'Syntactic variety with minimal grammatical errors' }
    ]
  }
};

// 11. LESSONS (Structured with sections)
export const mockLessons: Record<string, LessonModel> = {
  // GRADE 10 - UNIT 1 LESSONS
  'lesson-10-1-1': {
    id: 'lesson-10-1-1',
    unitId: 'unit-10-1',
    gradeNumber: '10',
    title: 'Lesson 1: Vocabulary & Speaking — Household Chores',
    description: 'Học các từ vựng chủ đề gia đình, phân chia công việc nhà và hội thoại chia sẻ trách nhiệm.',
    order: 1,
    duration: 35,
    type: 'Vocabulary',
    difficulty: 'easy',
    cefrLevel: 'A2',
    status: 'completed',
    sections: [
      {
        id: 'sec-10-1-1-intro',
        lessonId: 'lesson-10-1-1',
        type: 'introduction',
        title: 'Mục tiêu bài học',
        content: 'Nắm vững 10 từ vựng cốt lõi về phân công việc nhà, bổn phận gia đình và rèn luyện kỹ năng nói tự nhiên.',
        order: 1
      },
      {
        id: 'sec-10-1-1-vocab',
        lessonId: 'lesson-10-1-1',
        type: 'vocabulary',
        title: 'Từ vựng trọng tâm',
        content: 'Học từ vựng qua phiên âm IPA, nghĩa tiếng Việt và ví dụ ngữ cảnh.',
        order: 2,
        vocabularyItems: mockVocabularyItems['lesson-10-1-1']
      },
      {
        id: 'sec-10-1-1-practice',
        lessonId: 'lesson-10-1-1',
        type: 'review',
        title: 'Câu hỏi củng cố',
        content: 'Kiểm tra độ ghi nhớ từ vựng qua các câu trắc nghiệm thực hành.',
        order: 3,
        exercises: ['qb-g10-1']
      }
    ]
  },
  'lesson-10-1-2': {
    id: 'lesson-10-1-2',
    unitId: 'unit-10-1',
    gradeNumber: '10',
    title: 'Lesson 2: Grammar Focus — Present Simple vs. Continuous',
    description: 'Phân biệt cách dùng thì Hiện tại đơn và Hiện tại tiếp diễn, dấu hiệu nhận biết và các động từ chỉ trạng thái.',
    order: 2,
    duration: 40,
    type: 'Grammar',
    difficulty: 'medium',
    cefrLevel: 'B1',
    status: 'completed',
    sections: [
      {
        id: 'sec-10-1-2-grammar',
        lessonId: 'lesson-10-1-2',
        type: 'grammar',
        title: 'Ngữ pháp chuyên sâu',
        content: 'Quy tắc chia thì, cấu trúc và ví dụ so sánh song song.',
        order: 1,
        grammarTopic: mockGrammarTopics['lesson-10-1-2']
      },
      {
        id: 'sec-10-1-2-exercises',
        lessonId: 'lesson-10-1-2',
        type: 'review',
        title: 'Luyện tập trắc nghiệm',
        content: 'Luyện tập các câu hỏi chia động từ chuẩn cấu trúc đề thi THPT.',
        order: 2,
        exercises: ['qb-g10-2']
      }
    ]
  },
  'lesson-10-1-3': {
    id: 'lesson-10-1-3',
    unitId: 'unit-10-1',
    gradeNumber: '10',
    title: 'Lesson 3: Reading & Writing — Family Values in Modern Life',
    description: 'Đọc hiểu đoạn văn về sự thay đổi của các thế hệ gia đình và viết đoạn văn 120 từ về vai trò các thành viên.',
    order: 3,
    duration: 45,
    type: 'Mixed',
    difficulty: 'medium',
    cefrLevel: 'B1',
    status: 'available',
    sections: [
      {
        id: 'sec-10-1-3-read',
        lessonId: 'lesson-10-1-3',
        type: 'reading',
        title: 'Đọc hiểu văn bản',
        content: 'Rèn luyện kỹ năng đọc lướt lấy ý chính và quét tìm thông tin chi tiết.',
        order: 1
      }
    ]
  },

  // GRADE 11 - UNIT 6 LESSONS (Focal Unit)
  'lesson-11-6-1': {
    id: 'lesson-11-6-1',
    unitId: 'unit-11-6',
    gradeNumber: '11',
    title: 'Lesson 1: Vocabulary & Pronunciation — Cultural Relics',
    description: 'Nắm vững các thuật ngữ học thuật về bảo tồn di sản văn hóa vật thể và phi vật thể.',
    order: 1,
    duration: 35,
    type: 'Vocabulary',
    difficulty: 'medium',
    cefrLevel: 'B2',
    status: 'completed',
    sections: [
      {
        id: 'sec-11-6-1-vocab',
        lessonId: 'lesson-11-6-1',
        type: 'vocabulary',
        title: 'Từ vựng học thuật Unit 6',
        content: 'Bộ từ vựng chủ điểm di sản văn hóa kèm collocations quan trọng.',
        order: 1,
        vocabularyItems: mockVocabularyItems['lesson-11-6-1']
      }
    ]
  },
  'lesson-11-6-2': {
    id: 'lesson-11-6-2',
    unitId: 'unit-11-6',
    gradeNumber: '11',
    title: 'Lesson 2: Reading & Listening — Safeguarding Our Heritage',
    description: 'Đọc hiểu bài báo 380 từ và luyện nghe phóng sự phỏng vấn học sinh về dự án số hóa di sản.',
    order: 2,
    duration: 45,
    type: 'Reading',
    difficulty: 'hard',
    cefrLevel: 'B2',
    status: 'in_progress',
    sections: [
      {
        id: 'sec-11-6-2-reading',
        lessonId: 'lesson-11-6-2',
        type: 'reading',
        title: 'Bài đọc học thuật: Preserving Heritage',
        content: 'Phân tích văn bản học thuật và trả lời câu hỏi trắc nghiệm.',
        order: 1,
        readingExercise: mockReadingExercises['lesson-11-6-3']
      },
      {
        id: 'sec-11-6-2-listening',
        lessonId: 'lesson-11-6-2',
        type: 'listening',
        title: 'Bài nghe: Phỏng vấn tình nguyện viên',
        content: 'Luyện nghe giọng bản xứ kèm bản gỡ băng.',
        order: 2,
        listeningExercise: mockListeningExercises['lesson-11-6-4']
      }
    ]
  },
  'lesson-11-6-3': {
    id: 'lesson-11-6-3',
    unitId: 'unit-11-6',
    gradeNumber: '11',
    title: 'Lesson 3: Speaking & Writing — Heritage Advocacy Workshop',
    description: 'Thực hành thuyết trình đề tài bảo tồn di sản địa phương và viết bài luận 200 từ.',
    order: 3,
    duration: 45,
    type: 'Writing',
    difficulty: 'hard',
    cefrLevel: 'B2',
    status: 'available',
    sections: [
      {
        id: 'sec-11-6-3-speaking',
        lessonId: 'lesson-11-6-3',
        type: 'speaking',
        title: 'Phòng luyện nói thuyết trình',
        content: 'Luyện nói có bấm giờ chuẩn bị và tiêu chí chấm chi tiết.',
        order: 1,
        speakingExercise: mockSpeakingExercises['lesson-11-6-5']
      },
      {
        id: 'sec-11-6-3-writing',
        lessonId: 'lesson-11-6-3',
        type: 'writing',
        title: 'Khung soạn thảo bài luận học thuật',
        content: 'Viết bài luận quan điểm và tham khảo bài mẫu điểm cao.',
        order: 2,
        writingExercise: mockWritingExercises['lesson-11-6-6']
      }
    ]
  },

  // GRADE 12 - UNIT 1 LESSONS
  'lesson-12-1-1': {
    id: 'lesson-12-1-1',
    unitId: 'unit-12-1',
    gradeNumber: '12',
    title: 'Lesson 1: Vocabulary & Collocations — Life Stories We Admire',
    description: 'Từ vựng cấp độ B2 diễn tả tính cách, cống hiến và thành tựu của các danh nhân lịch sử.',
    order: 1,
    duration: 40,
    type: 'Vocabulary',
    difficulty: 'hard',
    cefrLevel: 'B2',
    status: 'completed',
    sections: [
      {
        id: 'sec-12-1-1-vocab',
        lessonId: 'lesson-12-1-1',
        type: 'vocabulary',
        title: 'Từ vựng danh nhân & thành tựu',
        content: 'Các tính từ và danh từ cao cấp hay gặp trong bài thi tốt nghiệp THPT.',
        order: 1,
        vocabularyItems: mockVocabularyItems['lesson-12-1-1']
      }
    ]
  },
  'lesson-12-1-2': {
    id: 'lesson-12-1-2',
    unitId: 'unit-12-1',
    gradeNumber: '12',
    title: 'Lesson 2: Advanced Grammar — Inversion with Negative Adverbials',
    description: 'Chuyên đề đảo ngữ phân loại 9+ điểm trong kỳ thi tốt nghiệp THPT Quốc gia.',
    order: 2,
    duration: 45,
    type: 'Grammar',
    difficulty: 'hard',
    cefrLevel: 'B2',
    status: 'in_progress',
    sections: [
      {
        id: 'sec-12-1-2-grammar',
        lessonId: 'lesson-12-1-2',
        type: 'grammar',
        title: 'Chuyên đề Đảo ngữ 9+',
        content: 'Toàn bộ các cấu trúc đảo ngữ: Not until, Hardly... when, Seldom, Never before.',
        order: 1,
        grammarTopic: mockGrammarTopics['lesson-12-1-2']
      },
      {
        id: 'sec-12-1-2-quiz',
        lessonId: 'lesson-12-1-2',
        type: 'review',
        title: 'Luyện đề trắc nghiệm đảo ngữ',
        content: 'Trích đoạn các câu hỏi phân hóa từ đề thi chính thức Bộ GD&ĐT.',
        order: 2,
        exercises: ['qb-g12-1']
      }
    ]
  },
  'lesson-12-1-3': {
    id: 'lesson-12-1-3',
    unitId: 'unit-12-1',
    gradeNumber: '12',
    title: 'Lesson 3: Reading & Writing — Inspiring Biographies',
    description: 'Đọc tiểu sử những nhà khoa học đột phá và luyện kỹ năng viết thư xin học bổng du học.',
    order: 3,
    duration: 45,
    type: 'Mixed',
    difficulty: 'hard',
    cefrLevel: 'B2',
    status: 'available',
    sections: [
      {
        id: 'sec-12-1-3-read',
        lessonId: 'lesson-12-1-3',
        type: 'reading',
        title: 'Văn bản tiểu sử danh nhân',
        content: 'Bài đọc phân tích hành trình vượt khó và các phát minh vĩ đại.',
        order: 1
      }
    ]
  }
};

// 12. UNITS
export const mockUnits: Record<string, UnitModel> = {
  // GRADE 10 UNITS
  'unit-10-1': {
    id: 'unit-10-1',
    gradeId: 'grade-10',
    gradeNumber: '10',
    textbookId: 'tb-global-success-10',
    textbookName: 'Global Success 10',
    number: 1,
    title: 'Family Life',
    vietnameseTitle: 'Đời sống gia đình và sự sẻ chia việc nhà',
    description: 'Khám phá từ vựng về phân chia bổn phận trong gia đình, bình đẳng giới và thì Hiện tại đơn vs Hiện tại tiếp diễn.',
    topic: 'Family Life & Household Responsibilities',
    theme: 'Family values and daily domestic routines',
    learningObjectives: [
      'Nắm vững 25 từ vựng chủ đề công việc gia đình và các collocations thông dụng',
      'Phân biệt và vận dụng thành thạo thì Hiện tại đơn vs Hiện tại tiếp diễn',
      'Phát âm chuẩn cụm phụ âm /br/, /kr/ và /tr/',
      'Đọc hiểu đoạn văn 250 từ về lợi ích của việc cùng làm việc nhà',
      'Viết đoạn văn ngắn 100-120 từ chia sẻ về trách nhiệm gia đình bản thân'
    ],
    lessons: ['lesson-10-1-1', 'lesson-10-1-2', 'lesson-10-1-3'],
    progress: 85,
    grammarFocus: 'Present Simple vs. Present Continuous',
    vocabularyTopic: 'Household chores, breadwinner, homemaker, groceries',
    durationHours: 6.0
  },
  'unit-10-2': {
    id: 'unit-10-2',
    gradeId: 'grade-10',
    gradeNumber: '10',
    textbookId: 'tb-global-success-10',
    textbookName: 'Global Success 10',
    number: 2,
    title: 'Humans and the Environment',
    vietnameseTitle: 'Con người và Môi trường sống',
    description: 'Học về lối sống xanh, giảm thiểu rác thải nhựa và cách dùng Will vs Be going to và Thể bị động.',
    topic: 'Green Living and Environmental Preservation',
    theme: 'Eco-friendly habits and climate awareness',
    learningObjectives: [
      'Mở rộng vốn từ vựng về bảo vệ môi trường, dấu chân carbon và năng lượng tái tạo',
      'Sử dụng chính xác Will vs Be going to để diễn tả các kế hoạch và dự đoán tương lai',
      'Luyện nghe hiểu bản tin thời sự về sáng kiến phân loại rác thải tại trường học',
      'Viết đề xuất giải pháp xanh cho cộng đồng học sinh'
    ],
    lessons: ['lesson-10-1-1', 'lesson-10-1-2', 'lesson-10-1-3'], // mapped for test
    progress: 70,
    grammarFocus: 'Future with Will and Be going to · Passive Voice',
    vocabularyTopic: 'Carbon footprint, eco-friendly, biodegradable, emissions',
    durationHours: 6.5
  },
  'unit-10-3': {
    id: 'unit-10-3',
    gradeId: 'grade-10',
    gradeNumber: '10',
    textbookId: 'tb-global-success-10',
    textbookName: 'Global Success 10',
    number: 3,
    title: 'Music and Arts',
    vietnameseTitle: 'Âm nhạc và Nghệ thuật',
    description: 'Tìm hiểu về các dòng nhạc truyền thống và hiện đại, danh động từ và động từ nguyên mẫu có to.',
    topic: 'Musical Genres and Creative Arts',
    theme: 'Youth culture and aesthetic appreciation',
    learningObjectives: [
      'Ghi nhớ từ vựng về các nhạc cụ, buổi hòa nhạc và cuộc thi âm nhạc',
      'Vận dụng cấu trúc câu ghép (Compound sentences) và To-infinitive / Bare infinitive',
      'Luyện kỹ năng nghe bắt từ khóa trong đoạn giới thiệu nghệ sĩ'
    ],
    lessons: ['lesson-10-1-1', 'lesson-10-1-2', 'lesson-10-1-3'],
    progress: 50,
    grammarFocus: 'Compound sentences · To-infinitive & Bare infinitive',
    vocabularyTopic: 'Concert, musical instrument, audience, performance',
    durationHours: 6.0
  },

  // GRADE 11 UNITS
  'unit-11-1': {
    id: 'unit-11-1',
    gradeId: 'grade-11',
    gradeNumber: '11',
    textbookId: 'tb-global-success-11',
    textbookName: 'Global Success 11',
    number: 1,
    title: 'A Long and Healthy Life',
    vietnameseTitle: 'Sống khỏe và nâng cao tuổi thọ',
    description: 'Chủ đề dinh dưỡng, thói quen thể dục, phòng chống bệnh tật và sự khác biệt giữa Quá khứ đơn vs Hiện tại hoàn thành.',
    topic: 'Physical Health, Nutrition & Longevity',
    theme: 'Healthy habits and disease prevention',
    learningObjectives: [
      'Học 30 từ vựng về miễn dịch, chế độ ăn uống khoa học và bài tập aerobic',
      'Phân biệt dứt khoát Quá khứ đơn (mốc xác định) và Hiện tại hoàn thành (kết quả)',
      'Luyện đọc hiểu bài báo khoa học về tuổi thọ trung bình của người dân các nước',
      'Viết đoạn văn 150 từ hướng dẫn chế độ sinh hoạt cân bằng'
    ],
    lessons: ['lesson-10-1-1', 'lesson-10-1-2', 'lesson-10-1-3'],
    progress: 90,
    grammarFocus: 'Past Simple vs. Present Perfect',
    vocabularyTopic: 'Life expectancy, immune system, balanced diet, aerobic exercise',
    durationHours: 6.5
  },
  'unit-11-2': {
    id: 'unit-11-2',
    gradeId: 'grade-11',
    gradeNumber: '11',
    textbookId: 'tb-global-success-11',
    textbookName: 'Global Success 11',
    number: 2,
    title: 'The Generation Gap',
    vietnameseTitle: 'Khoảng cách giữa các thế hệ',
    description: 'Tìm hiểu xung đột quan điểm giữa cha mẹ và con cái, động từ khuyết thiếu (Must, Have to, Should, Ought to).',
    topic: 'Intergenerational Dialogue & Cultural Mindsets',
    theme: 'Family communication and emotional mutual understanding',
    learningObjectives: [
      'Làm chủ các động từ tình thái (Modal verbs) chỉ nghĩa vụ, lời khuyên và sự cấm đoán',
      'Hiểu sâu sắc nguồn gốc khoảng cách thế hệ và cách đối thoại hòa giải',
      'Phát âm chuẩn ngữ điệu trong câu hỏi lựa chọn và câu hỏi xác nhận'
    ],
    lessons: ['lesson-10-1-1', 'lesson-10-1-2', 'lesson-10-1-3'],
    progress: 75,
    grammarFocus: 'Modal Verbs: Must / Have to / Should / Ought to',
    vocabularyTopic: 'Curfew, generation gap, open-minded, nuclear family',
    durationHours: 6.0
  },
  'unit-11-6': {
    id: 'unit-11-6',
    gradeId: 'grade-11',
    gradeNumber: '11',
    textbookId: 'tb-global-success-11',
    textbookName: 'Global Success 11',
    number: 6,
    title: 'Preserving Our Heritage',
    vietnameseTitle: 'Bảo tồn di sản văn hóa dân tộc',
    description: 'Chủ đề trọng tâm Unit 6 bám sát ma trận thi học kỳ và phát triển toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết.',
    topic: 'Tangible & Intangible Cultural Heritage',
    theme: 'Youth empowerment and cultural stewardship',
    learningObjectives: [
      'Làm chủ 20 từ vựng và collocations học thuật chủ đề di sản UNESCO',
      'Củng cố thể bị động với động từ tường thuật và mệnh đề phân từ rút gọn',
      'Luyện đọc hiểu văn bản 380 từ với các câu hỏi suy luận và từ đồng nghĩa',
      'Luyện nghe phóng sự phỏng vấn học sinh tình nguyện viên số hóa di sản',
      'Thuyết trình oral presentation và viết bài luận học thuật 200 từ'
    ],
    lessons: ['lesson-11-6-1', 'lesson-11-6-2', 'lesson-11-6-3'],
    progress: 60,
    grammarFocus: 'Participle Clauses & Reported Passive Voice',
    vocabularyTopic: 'Intangible heritage, monuments, preservation, folklore',
    durationHours: 7.0
  },

  // GRADE 12 UNITS
  'unit-12-1': {
    id: 'unit-12-1',
    gradeId: 'grade-12',
    gradeNumber: '12',
    textbookId: 'tb-global-success-12',
    textbookName: 'Global Success 12',
    number: 1,
    title: 'Life Stories We Admire',
    vietnameseTitle: 'Những câu chuyện cuộc đời truyền cảm hứng',
    description: 'Đọc tiểu sử những vĩ nhân, củng cố thì Quá khứ đơn vs Quá khứ tiếp diễn và mạo từ Articles.',
    topic: 'Biographies of Visionary Pioneers',
    theme: 'Resilience, ethical dedication and historical milestones',
    learningObjectives: [
      'Trau dồi vốn từ học thuật B2 về phẩm chất lãnh đạo và thành tựu nhân loại',
      'Làm chủ các cấu trúc mạo từ A, An, The và Zero Article trong đề thi tốt nghiệp',
      'Thực hành dạng bài đọc điền từ vào đoạn văn (Cloze Test) phân loại cao'
    ],
    lessons: ['lesson-12-1-1', 'lesson-12-1-2', 'lesson-12-1-3'],
    progress: 40,
    grammarFocus: 'Articles (A/An/The/Zero) · Past Narrative Tenses',
    vocabularyTopic: 'Visionary, perseverance, devoted, pioneering, generosity',
    durationHours: 7.0
  },
  'unit-12-2': {
    id: 'unit-12-2',
    gradeId: 'grade-12',
    gradeNumber: '12',
    textbookId: 'tb-global-success-12',
    textbookName: 'Global Success 12',
    number: 2,
    title: 'A Diversity of Cultures',
    vietnameseTitle: 'Sự đa dạng của các nền văn hóa thế giới',
    description: 'Tìm hiểu phong tục tập quán các nước, mệnh đề trạng ngữ chỉ thời gian và nguyên nhân.',
    topic: 'Cross-cultural Etiquette & Traditions',
    theme: 'Global citizenship and cultural tolerance',
    learningObjectives: [
      'Nắm vững từ vựng về nghi lễ, phong tục giao tiếp và điều kiêng kỵ văn hóa',
      'Sử dụng linh hoạt mệnh đề trạng ngữ chỉ thời gian, nhượng bộ và nguyên nhân',
      'Luyện kỹ năng viết thư trao đổi văn hóa quốc tế'
    ],
    lessons: ['lesson-12-1-1', 'lesson-12-1-2', 'lesson-12-1-3'],
    progress: 20,
    grammarFocus: 'Adverbial Clauses of Time, Concession & Reason',
    vocabularyTopic: 'Cultural etiquette, superstition, ritual, customary, banquet',
    durationHours: 6.5
  },
  'unit-12-6': {
    id: 'unit-12-6',
    gradeId: 'grade-12',
    gradeNumber: '12',
    textbookId: 'tb-global-success-12',
    textbookName: 'Global Success 12',
    number: 6,
    title: 'Endangered Species & Biodiversity',
    vietnameseTitle: 'Bảo vệ các loài động thực vật nguy cấp',
    description: 'Chủ đề trọng điểm trong đề thi tốt nghiệp THPT Quốc gia với nhiều câu hỏi từ vựng phân hóa cao.',
    topic: 'Wildlife Conservation & Biodiversity corridors',
    theme: 'Ecological balance and anti-poaching campaigns',
    learningObjectives: [
      'Chinh phục các câu hỏi từ vựng 9+ về môi trường sống, sự tuyệt chủng và chuỗi thức ăn',
      'Vận dụng cấu trúc Đảo ngữ (Inversion) và So sánh kép (Double Comparatives)',
      'Luyện giải trọn vẹn 2 bài đọc hiểu dài trong format đề thi chính thức'
    ],
    lessons: ['lesson-12-1-1', 'lesson-12-1-2', 'lesson-12-1-3'],
    progress: 15,
    grammarFocus: 'Inversion with Negative Adverbials · Double Comparatives',
    vocabularyTopic: 'Poaching, biodiversity, extinction, habitat destruction',
    durationHours: 7.5
  }
};

// 13. REVIEW SETS
export const mockReviewSets: ReviewSet[] = [
  {
    id: 'rev-quick-5min',
    title: 'Quiz 5 Phút Phản Xạ Nhanh',
    subtitle: '5 câu hỏi trọng điểm củng cố từ vựng & ngữ pháp vừa học',
    grade: '11',
    unitId: 'unit-11-6',
    skills: ['vocabulary', 'grammar'],
    estimatedTime: 5,
    difficulty: 'medium',
    questionCount: 3,
    questions: [mockQuestionBank[3], mockQuestionBank[4], mockQuestionBank[1]]
  },
  {
    id: 'rev-unit11-full',
    title: 'Unit 6 Comprehensive Review Test',
    subtitle: 'Kiểm tra toàn diện Unit 6 theo format đề thi THPT Bộ GD&ĐT',
    grade: '11',
    unitId: 'unit-11-6',
    skills: ['vocabulary', 'grammar', 'reading', 'listening'],
    estimatedTime: 20,
    difficulty: 'hard',
    questionCount: 4,
    questions: [
      mockQuestionBank[3],
      mockQuestionBank[4],
      mockQuestionBank[5],
      mockQuestionBank[6]
    ]
  },
  {
    id: 'rev-inversion-mastery',
    title: 'Chuyên đề Đảo ngữ 9+ Điểm Lớp 12',
    subtitle: 'Rèn luyện phản xạ bẫy đề thi tốt nghiệp THPT',
    grade: '12',
    unitId: 'unit-12-1',
    skills: ['grammar'],
    estimatedTime: 15,
    difficulty: 'hard',
    questionCount: 2,
    questions: [mockQuestionBank[7], mockQuestionBank[8]]
  }
];

// 14. INITIAL LEARNING ACTIVITIES
export const mockLearningActivities: LearningActivity[] = [
  {
    id: 'act-1',
    studentId: 'student-thpt-01',
    type: 'lesson_completed',
    contentId: 'lesson-11-6-1',
    contentTitle: 'Unit 6 Lesson 1: Vocabulary & Pronunciation',
    skill: 'vocabulary',
    score: 9.5,
    durationMinutes: 25,
    createdAt: 'Hôm nay, 10:15'
  },
  {
    id: 'act-2',
    studentId: 'student-thpt-01',
    type: 'quiz_completed',
    contentId: 'rev-quick-5min',
    contentTitle: 'Quiz 5 phút: Collocations Di sản văn hóa',
    skill: 'mixed',
    score: 8.8,
    durationMinutes: 5,
    createdAt: 'Hôm qua, 20:45'
  },
  {
    id: 'act-3',
    studentId: 'student-thpt-01',
    type: 'practice_completed',
    contentId: 'lesson-11-6-2',
    contentTitle: 'Reading Exercise: Preserving Vietnam\'s Intangible Heritage',
    skill: 'reading',
    score: 9.0,
    durationMinutes: 20,
    createdAt: '3 ngày trước'
  }
];

// 15. INITIAL STUDENT PROGRESS RECORDS
export const mockStudentProgressList: StudentProgress[] = [
  {
    studentId: 'student-thpt-01',
    grade: '11',
    unitId: 'unit-11-6',
    lessonId: 'lesson-11-6-1',
    skill: 'vocabulary',
    status: 'completed',
    progress: 100,
    score: 9.5,
    accuracy: 95,
    lastStudiedAt: '2026-09-24T10:15:00Z',
    completedAt: '2026-09-24T10:30:00Z'
  },
  {
    studentId: 'student-thpt-01',
    grade: '11',
    unitId: 'unit-11-6',
    lessonId: 'lesson-11-6-2',
    skill: 'reading',
    status: 'in_progress',
    progress: 60,
    score: 8.5,
    accuracy: 85,
    lastStudiedAt: '2026-09-23T19:20:00Z'
  },
  {
    studentId: 'student-thpt-01',
    grade: '11',
    unitId: 'unit-11-6',
    lessonId: 'lesson-11-6-3',
    skill: 'writing',
    status: 'available',
    progress: 0,
    lastStudiedAt: '2026-09-22T14:00:00Z'
  }
];
