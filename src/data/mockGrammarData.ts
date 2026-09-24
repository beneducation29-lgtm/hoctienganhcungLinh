/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Standardized High School English Grammar Topics Database (12 Detailed Topics)
 * Covering Grade 10, 11, 12, Structures, Rules, Bilingual Examples, Common Mistakes & Exercises
 */

import { GrammarTopic } from '../types/contentArchitecture';

export interface ExtendedGrammarTopic extends GrammarTopic {
  grade: '10' | '11' | '12';
  unitId: string;
  unitTitle: string;
  level: string; // CEFR Level (A2, B1, B2, C1)
  difficulty: 'easy' | 'medium' | 'hard';
  shortDescription: string;
  whenToUse: string[];
  forms: {
    positive: string;
    negative: string;
    question: string;
  };
  quickCheckQuestionIds: string[];
}

export const comprehensiveGrammarList: ExtendedGrammarTopic[] = [
  // ==========================================
  // TOPIC 1: PRESENT SIMPLE VS PRESENT CONTINUOUS (G10 - Unit 1)
  // ==========================================
  {
    id: 'grm-10-01',
    grade: '10',
    unitId: 'unit-10-1',
    unitTitle: 'Unit 1: Family Life',
    lessonId: 'lesson-10-1-2',
    title: 'Present Simple vs. Present Continuous',
    shortDescription: 'Phân biệt thói quen cố định lặp lại và hành động đang diễn ra tại thời điểm nói.',
    level: 'A2-B1',
    difficulty: 'easy',
    structure: 'Present Simple: S + V(s/es) | Present Continuous: S + am/is/are + V-ing',
    explanation: 'Thì Hiện tại đơn dùng cho các chân lý vĩnh cửu, thói quen và lịch trình cố định. Thì Hiện tại tiếp diễn diễn tả hành động đang xảy ra tại thời điểm nói, xu hướng tạm thời, hoặc lời phàn nàn lặp đi lặp lại với "always".',
    whenToUse: [
      'Hiện tại đơn: Chân lý hiển nhiên (The sun rises in the east), thói quen hàng ngày (I wash dishes every evening).',
      'Hiện tại tiếp diễn: Hành động đang xảy ra trước mắt (Look! The baby is smiling), kế hoạch đã chốt thời gian trong tương lai gần (We are meeting at 7 PM).'
    ],
    forms: {
      positive: 'S + V(s/es) / S + am/is/are + V-ing',
      negative: 'S + do/does not + V(bare) / S + am/is/are not + V-ing',
      question: 'Do/Does + S + V(bare)? / Am/Is/Are + S + V-ing?'
    },
    rules: [
      {
        ruleTitle: 'Hành động cố định vs. Tạm thời',
        description: 'Dùng Hiện tại đơn cho việc xảy ra lâu dài, định kỳ. Dùng Hiện tại tiếp diễn cho việc tạm thời chỉ diễn ra trong vài ngày hoặc vài tuần.',
        pattern: 'usually / always vs. at the moment / this week'
      },
      {
        ruleTitle: 'Động từ chỉ trạng thái & cảm xúc (Stative Verbs)',
        description: 'Các động từ chỉ nhận thức, cảm xúc, sở hữu (know, understand, believe, love, hate, belong, own) KHÔNG dùng ở dạng tiếp diễn.',
        pattern: 'I understand (NOT: I am understanding)'
      }
    ],
    examples: [
      {
        en: 'My mother usually cooks dinner, but today my father is preparing a special meal.',
        vi: 'Mẹ tôi thường nấu bữa tối, nhưng hôm nay bố tôi đang chuẩn bị một món đặc biệt.',
        note: 'Usually cooks (thói quen) vs. is preparing (tạm thời hôm nay).'
      },
      {
        en: 'Water freezes at zero degrees Celsius.',
        vi: 'Nước đóng băng ở 0 độ C.',
        note: 'Chân lý khoa học vĩnh cửu.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I am knowing the answer right now.',
        correct: 'I know the answer right now.',
        reason: '"Know" là stative verb, không chia tiếp diễn ngay cả khi có "right now".'
      },
      {
        incorrect: 'She is go to work by bus every single morning.',
        correct: 'She goes to work by bus every single morning.',
        reason: 'Có trạng từ tần suất "every single morning" bắt buộc chia Hiện tại đơn.'
      }
    ],
    relatedExercises: ['q-grm-03', 'qb-g10-2'],
    quickCheckQuestionIds: ['q-grm-03']
  },

  // ==========================================
  // TOPIC 2: BE GOING TO VS WILL (G10 - Unit 2)
  // ==========================================
  {
    id: 'grm-10-02',
    grade: '10',
    unitId: 'unit-10-2',
    unitTitle: 'Unit 2: Humans and the Environment',
    lessonId: 'lesson-10-2-2',
    title: 'Future Intentions: Be Going To vs. Will',
    shortDescription: 'Dự đoán có bằng chứng cụ thể và kế hoạch định trước vs. Quyết định tức thời.',
    level: 'B1',
    difficulty: 'medium',
    structure: 'Be going to: S + am/is/are going to + V | Will: S + will + V',
    explanation: '"Be going to" dùng để diễn tả dự định đã suy tính từ trước hoặc dự đoán có bằng chứng xác thực ở hiện tại. "Will" dùng cho quyết định nảy sinh ngay lúc nói, lời hứa, đề nghị giúp đỡ, hoặc dự đoán theo linh cảm.',
    whenToUse: [
      'Be going to: Dự định cá nhân đã lên kế hoạch (I have bought tickets; I am going to see the concert), Bằng chứng thực tế (Look at the clouds! It is going to rain).',
      'Will: Quyết định tức thời (The phone is ringing. I will answer it), Lời hứa (I promise I will arrive on time).'
    ],
    forms: {
      positive: 'S + am/is/are going to + V / S + will + V',
      negative: 'S + am/is/are not going to + V / S + will not (won\'t) + V',
      question: 'Am/Is/Are + S + going to + V? / Will + S + V?'
    },
    rules: [
      {
        ruleTitle: 'Bằng chứng trực quan ở hiện tại',
        description: 'Khi có dấu hiệu rõ ràng trước mắt, luôn ưu tiên "be going to".',
        pattern: 'Look at...! / Listen! -> be going to'
      }
    ],
    examples: [
      {
        en: 'Look at those dark clouds! It is going to rain very heavily.',
        vi: 'Nhìn những đám mây đen kia kìa! Trời sắp mưa rất to đấy.',
        note: 'Dự đoán dựa trên bằng chứng mây đen trước mắt.'
      },
      {
        en: 'I am so tired. — Don\'t worry, I will carry your backpack.',
        vi: 'Tôi mệt quá. — Đừng lo, tôi sẽ xách ba lô giúp bạn.',
        note: 'Quyết định và đề nghị giúp đỡ phát sinh ngay tại thời điểm nói.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Look at that boy on the edge! He will fall down.',
        correct: 'Look at that boy on the edge! He is going to fall down.',
        reason: 'Có bằng chứng trước mắt (cậu bé ở mép tường), phải dùng "is going to fall".'
      }
    ],
    relatedExercises: ['q-grm-04'],
    quickCheckQuestionIds: ['q-grm-04']
  },

  // ==========================================
  // TOPIC 3: GERUNDS AND TO-INFINITIVES (G10 - Unit 3)
  // ==========================================
  {
    id: 'grm-10-03',
    grade: '10',
    unitId: 'unit-10-3',
    unitTitle: 'Unit 3: Music',
    lessonId: 'lesson-10-3-2',
    title: 'Gerunds vs. To-Infinitives after Verbs',
    shortDescription: 'Quy tắc dùng danh động từ V-ing hay động từ nguyên mẫu có to sau các động từ thường.',
    level: 'B1',
    difficulty: 'medium',
    structure: 'Verb + to-V (decide, hope, want, plan, manage) | Verb + V-ing (enjoy, avoid, practice, mind)',
    explanation: 'Một số động từ luôn đi cùng to-infinitive (kỳ vọng, dự định, quyết định), một số động từ luôn đi với V-ing (tận hưởng, trì hoãn, né tránh), và một nhóm thay đổi nghĩa (remember, forget, stop, try).',
    whenToUse: [
      'To-Infinitive: Diễn tả mục đích, hành động hướng tới tương lai (decide to apply, hope to win).',
      'Gerund (V-ing): Diễn tả hành động đang trải nghiệm hoặc thói quen, sau giới từ (interested in learning, avoid making mistakes).'
    ],
    forms: {
      positive: 'S + V + to-V / S + V + V-ing',
      negative: 'S + V + not to-V / S + V + not V-ing',
      question: 'Do/Does + S + V + to-V / V-ing?'
    },
    rules: [
      {
        ruleTitle: 'Nhóm động từ đổi nghĩa: STOP',
        description: 'Stop to V = Dừng lại để làm gì khác. Stop V-ing = Dừng hẳn hành động đang làm.',
        pattern: 'He stopped to drink water vs. He stopped smoking'
      },
      {
        ruleTitle: 'Nhóm động từ đổi nghĩa: REMEMBER / FORGET',
        description: 'Remember to V = Nhớ phải làm gì (bổn phận). Remember V-ing = Nhớ đã làm gì trong quá khứ.',
        pattern: 'Remember to lock the door vs. I remember locking it'
      }
    ],
    examples: [
      {
        en: 'My sister decided to sign up for the youth violin workshop.',
        vi: 'Em gái tôi đã quyết định đăng ký tham gia lớp học đàn violin cho thanh thiếu niên.',
        note: 'Decide + to-V.'
      },
      {
        en: 'He avoided answering personal questions during the press interview.',
        vi: 'Anh ấy đã tránh trả lời những câu hỏi mang tính cá nhân trong buổi họp báo.',
        note: 'Avoid + V-ing.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I decided going to Da Nang next summer.',
        correct: 'I decided to go to Da Nang next summer.',
        reason: 'Động từ "decide" bắt buộc đi với "to-V".'
      }
    ],
    relatedExercises: ['q-grm-09'],
    quickCheckQuestionIds: ['q-grm-09']
  },

  // ==========================================
  // TOPIC 4: PASSIVE VOICE WITH MODALS (G10 - Unit 6)
  // ==========================================
  {
    id: 'grm-10-04',
    grade: '10',
    unitId: 'unit-10-6',
    unitTitle: 'Unit 6: Gender Equality',
    lessonId: 'lesson-10-6-2',
    title: 'Passive Voice with Modal Verbs',
    shortDescription: 'Cấu trúc câu bị động với can, must, should, may, have to trong các chủ đề xã hội.',
    level: 'B1',
    difficulty: 'medium',
    structure: 'Modal Verb + be + Past Participle (V3/ed)',
    explanation: 'Thể bị động với động từ khuyết thiếu dùng để nhấn mạnh vào hành động và đối tượng chịu tác động thay vì chủ thể thực hiện, thường gặp trong các điều luật, quy định xã hội và khuyến nghị.',
    whenToUse: [
      'Khi đối tượng chịu tác động quan trọng hơn người thực hiện.',
      'Khi nói về quyền lợi bình đẳng: "Equal opportunities must be provided to all genders."'
    ],
    forms: {
      positive: 'S + modal + be + V3/ed',
      negative: 'S + modal + not + be + V3/ed',
      question: 'Modal + S + be + V3/ed?'
    },
    rules: [
      {
        ruleTitle: 'Cấu trúc nguyên mẫu "be"',
        description: 'Sau động từ khuyết thiếu (must, should, can, will, may) luôn giữ nguyên dạng "be", theo sau là phân từ hai V3/ed.',
        pattern: 'must be done / should be cleaned'
      }
    ],
    examples: [
      {
        en: 'Traditional heritage houses must be preserved for posterity.',
        vi: 'Những ngôi nhà di sản truyền thống phải được bảo tồn cho thế hệ mai sau.',
        note: 'Must be preserved.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Domestic violence must eliminated completely.',
        correct: 'Domestic violence must be eliminated completely.',
        reason: 'Thiếu trợ động từ "be" trong cấu trúc bị động của modal verb.'
      }
    ],
    relatedExercises: ['q-grm-13'],
    quickCheckQuestionIds: ['q-grm-13']
  },

  // ==========================================
  // TOPIC 5: PAST SIMPLE VS PRESENT PERFECT (G11 - Unit 1)
  // ==========================================
  {
    id: 'grm-11-01',
    grade: '11',
    unitId: 'unit-11-1',
    unitTitle: 'Unit 1: A Long and Healthy Life',
    lessonId: 'lesson-11-1-2',
    title: 'Past Simple vs. Present Perfect with Time Expressions',
    shortDescription: 'Mốc thời gian xác định đã kết thúc vs. Trải nghiệm, kết quả còn lưu lại ở hiện tại.',
    level: 'B1',
    difficulty: 'medium',
    structure: 'Past Simple: S + V2/ed | Present Perfect: S + have/has + V3/ed',
    explanation: 'Quá khứ đơn diễn tả sự việc đã xảy ra và kết thúc hoàn toàn tại thời điểm xác định trong quá khứ (yesterday, in 2020, two years ago). Hiện tại hoàn thành diễn tả hành động bắt đầu trong quá khứ kéo dài đến hiện tại, hoặc vừa mới xảy ra để lại hệ quả (since, for, already, yet, recently).',
    whenToUse: [
      'Quá khứ đơn: Có mốc thời gian cụ thể (I moved here in 2018; She graduated yesterday).',
      'Hiện tại hoàn thành: Kéo dài từ quá khứ đến nay (I have lived here for 5 years), trải nghiệm đời người (I have never eaten sushi).'
    ],
    forms: {
      positive: 'S + V2/ed / S + have/has + V3/ed',
      negative: 'S + did not + V(bare) / S + have/has not + V3/ed',
      question: 'Did + S + V(bare)? / Have/Has + S + V3/ed?'
    },
    rules: [
      {
        ruleTitle: 'Cặp từ Since và For',
        description: 'Since + mốc thời gian bắt đầu (since Monday, since 2019). For + khoảng thời gian (for three hours, for ten years).',
        pattern: 'Since + point in time / For + period of time'
      }
    ],
    examples: [
      {
        en: 'Dr. John has worked at this community clinic since 2015.',
        vi: 'Bác sĩ John đã làm việc tại phòng khám cộng đồng này từ năm 2015 (hiện nay vẫn đang làm).',
        note: 'Present perfect with since.'
      },
      {
        en: 'She lived in Da Nang for two years before moving to Hanoi in 2022.',
        vi: 'Cô ấy từng sống ở Đà Nẵng 2 năm trước khi chuyển tới Hà Nội vào năm 2022 (hành động đã kết thúc hoàn toàn).',
        note: 'Past simple with for.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I have seen him two hours ago.',
        correct: 'I saw him two hours ago.',
        reason: 'Có "ago" là dấu hiệu thời gian quá khứ xác định, bắt buộc dùng Quá khứ đơn.'
      },
      {
        incorrect: 'I have lived here since five years.',
        correct: 'I have lived here for five years.',
        reason: '"Five years" là khoảng thời gian nên dùng "for", không dùng "since".'
      }
    ],
    relatedExercises: ['q-grm-06', 'qb-g11-1'],
    quickCheckQuestionIds: ['q-grm-06']
  },

  // ==========================================
  // TOPIC 6: MODAL VERBS: MUST, MUSTN'T, HAVE TO, SHOULD (G11 - Unit 2)
  // ==========================================
  {
    id: 'grm-11-02',
    grade: '11',
    unitId: 'unit-11-2',
    unitTitle: 'Unit 2: The Generation Gap',
    lessonId: 'lesson-11-2-2',
    title: 'Modal Verbs of Obligation and Advice',
    shortDescription: 'Phân biệt mức độ bắt buộc (Must / Have to), cấm đoán (Mustn\'t) và khuyên nhủ (Should).',
    level: 'B1',
    difficulty: 'medium',
    structure: 'Must / Mustn\'t / Have to / Should + V(bare)',
    explanation: '"Must" mang tính bắt buộc chủ quan từ người nói hoặc quy tắc pháp luật. "Mustn\'t" là sự cấm đoán tuyệt đối. "Don\'t have to" là không cần thiết (tùy ý). "Should / Shouldn\'t" là lời khuyên nên hay không nên làm.',
    whenToUse: [
      'Must: Bắt buộc (You must fasten your seatbelt).',
      'Mustn\'t: Cấm tiệt (You mustn\'t park here).',
      'Don\'t have to: Không bắt buộc (You don\'t have to wear a suit).',
      'Should: Lời khuyên tốt (You should drink more water).'
    ],
    forms: {
      positive: 'S + must/have to/should + V(bare)',
      negative: 'S + mustn\'t / don\'t have to / shouldn\'t + V(bare)',
      question: 'Do + S + have to + V? / Should + S + V?'
    },
    rules: [
      {
        ruleTitle: 'Mustn\'t vs. Don\'t have to',
        description: 'Cực kỳ dễ nhầm lẫn trong đề thi: Mustn\'t = Bị cấm (không được phép làm). Don\'t have to = Không cần làm (nhưng nếu thích làm vẫn được).',
        pattern: 'Mustn\'t (prohibition) != Don\'t have to (lack of obligation)'
      }
    ],
    examples: [
      {
        en: 'You mustn\'t take photographs inside the temple; it is strictly forbidden.',
        vi: 'Bạn không được phép chụp ảnh bên trong ngôi đền; điều đó bị cấm tuyệt đối.',
        note: 'Mustn\'t = Cấm đoán mang tính tôn nghiêm/pháp luật.'
      },
      {
        en: 'Tomorrow is Sunday, so we don\'t have to get up at 6 AM.',
        vi: 'Ngày mai là Chủ nhật, vì vậy chúng ta không cần phải dậy lúc 6 giờ sáng.',
        note: 'Don\'t have to = Không bắt buộc.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'You don\'t have to smoke here; it is dangerous.',
        correct: 'You mustn\'t smoke here; it is dangerous.',
        reason: 'Hút thuốc ở nơi nguy hiểm là hành vi cấm đoán, phải dùng "mustn\'t".'
      }
    ],
    relatedExercises: ['qb-g11-2', 'q-grm-12'],
    quickCheckQuestionIds: ['qb-g11-2']
  },

  // ==========================================
  // TOPIC 7: REDUCED RELATIVE CLAUSES: TO-INF & PARTICIPLES (G11 - Unit 6 - Focal)
  // ==========================================
  {
    id: 'grm-11-06',
    grade: '11',
    unitId: 'unit-11-6',
    unitTitle: 'Unit 6: Preserving Our Heritage',
    lessonId: 'lesson-11-6-1',
    title: 'Reduced Relative Clauses: Participles & To-Infinitives',
    shortDescription: 'Kỹ thuật rút gọn mệnh đề quan hệ chủ động (V-ing), bị động (V3/ed) và số thứ tự (to-V).',
    level: 'B2',
    difficulty: 'hard',
    structure: 'Active: V-ing | Passive: V3/ed | Ordinals/Superlatives: to-V / to be V3/ed',
    explanation: 'Rút gọn mệnh đề quan hệ giúp câu văn súc tích, mang phong cách học thuật cao cấp. Mệnh đề chủ động rút gọn thành V-ing, bị động rút thành V3/ed, và mệnh đề đứng sau các từ chỉ thứ tự (the first, the second, the last, the only, so sánh nhất) rút thành to-V.',
    whenToUse: [
      'Khi mệnh đề quan hệ và mệnh đề chính có thể liên kết trực tiếp để tăng tính học thuật.',
      'Đặc biệt trong các câu phân loại điểm 8-9 của đề thi tốt nghiệp THPT.'
    ],
    forms: {
      positive: 'Noun + V-ing / V3/ed / to-V',
      negative: 'Noun + not V-ing / not to-V',
      question: 'Dùng như cụm danh từ hoàn chỉnh trong câu hỏi'
    },
    rules: [
      {
        ruleTitle: 'Quy tắc số thứ tự & So sánh nhất (The First, The Only)',
        description: 'Khi danh từ được bổ nghĩa bởi "the first, the second, the last, the only" hoặc tính từ so sánh nhất, dạng rút gọn BẮT BUỘC là "to-infinitive".',
        pattern: 'The first person TO land on the Moon'
      },
      {
        ruleTitle: 'Rút gọn bị động với Quá khứ phân từ',
        description: 'Lược bỏ đại từ quan hệ và to be, chỉ giữ lại V3/ed.',
        pattern: 'The citadel (which was) damaged by the war'
      }
    ],
    examples: [
      {
        en: 'Neil Armstrong was the first human to step on the Moon in 1969.',
        vi: 'Neil Armstrong là người đầu tiên đặt chân lên Mặt Trăng vào năm 1969.',
        note: 'Có "the first" -> Rút gọn bằng "to step".'
      },
      {
        en: 'The ancient fortress built in the 17th century has now been opened to visitors.',
        vi: 'Pháo đài cổ kính được xây dựng vào thế kỷ 17 nay đã mở cửa cho du khách.',
        note: 'Bị động: which was built -> built.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'She was the first student winning the international biology olympiad.',
        correct: 'She was the first student to win the international biology olympiad.',
        reason: 'Sau "the first" không được dùng V-ing, bắt buộc phải dùng "to win".'
      },
      {
        incorrect: 'The bridge building last year collapsed.',
        correct: 'The bridge built last year collapsed.',
        reason: 'Cây cầu được xây (bị động) nên phải dùng quá khứ phân từ "built".'
      }
    ],
    relatedExercises: ['q-grm-01', 'q-grm-02', 'q-grm-07', 'q-grm-08'],
    quickCheckQuestionIds: ['q-grm-01', 'q-grm-02']
  },

  // ==========================================
  // TOPIC 8: INVERSION WITH NEGATIVE ADVERBIALS (G12 - Unit 1 - 9+ Focus)
  // ==========================================
  {
    id: 'grm-12-01',
    grade: '12',
    unitId: 'unit-12-1',
    unitTitle: 'Unit 1: Life Stories We Admire',
    lessonId: 'lesson-12-1-2',
    title: 'Inversion with Negative Adverbials (Đảo ngữ nâng cao 9+)',
    shortDescription: 'Cấu trúc đảo trợ động từ lên trước chủ ngữ nhằm nhấn mạnh: Not until, Seldom, Hardly... when.',
    level: 'B2-C1',
    difficulty: 'hard',
    structure: 'Negative Adverbial + Auxiliary Verb + S + V(bare/ed)',
    explanation: 'Khi đưa các trạng từ phủ định hoặc bán phủ định (Never, Seldom, Rarely, Hardly, Not until, Only when) lên đầu câu để tạo hiệu ứng văn phong trang trọng, ta phải đảo trợ động từ lên trước chủ ngữ giống như câu hỏi.',
    whenToUse: [
      'Văn phong học thuật, bài luận nâng cao, và đề thi phân loại điểm 9+ THPT Quốc gia.',
      'Nhấn mạnh tính hiếm hoi, tính bất ngờ, hoặc mốc thời gian đặc biệt.'
    ],
    forms: {
      positive: 'Negative Adverb + Aux + S + V',
      negative: 'Bản thân cấu trúc đã mang nghĩa phủ định nhấn mạnh',
      question: 'Cấu trúc đảo trợ động từ tương tự thể nghi vấn'
    },
    rules: [
      {
        ruleTitle: 'Cấu trúc Not until',
        description: 'Not until + time/clause + Trợ động từ + S + V. Lưu ý: Mệnh đề sau "Not until" giữ nguyên, đảo ngữ xảy ra ở mệnh đề chính.',
        pattern: 'Not until the rain stopped did we depart.'
      },
      {
        ruleTitle: 'Cặp liên từ: Hardly... when / No sooner... than',
        description: 'Hardly had S + V3/ed + WHEN + S + V2/ed. No sooner had S + V3/ed + THAN + S + V2/ed.',
        pattern: 'Hardly had he arrived when the bell rang.'
      }
    ],
    examples: [
      {
        en: 'Not until the scientist completed decades of research was his discovery recognized.',
        vi: 'Mãi cho đến khi nhà khoa học hoàn thành nhiều thập kỷ nghiên cứu thì phát minh của ông mới được công nhận.',
        note: 'Not until + S + V (completed), was (aux) + S + recognized.'
      },
      {
        en: 'Seldom have we witnessed such outstanding artistic talent in one so young.',
        vi: 'Hiếm khi chúng ta được chứng kiến một tài năng nghệ thuật xuất chúng ở độ tuổi trẻ như vậy.',
        note: 'Seldom + have (aux) + we (S) + witnessed.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Not until yesterday she understood the truth.',
        correct: 'Not until yesterday did she understand the truth.',
        reason: 'Sau "Not until yesterday" phải đảo trợ động từ "did" lên trước chủ ngữ "she".'
      },
      {
        incorrect: 'No sooner had I arrived when the phone rang.',
        correct: 'No sooner had I arrived than the phone rang.',
        reason: '"No sooner" bắt buộc đi với "than", còn "Hardly/Scarcely" mới đi với "when".'
      }
    ],
    relatedExercises: ['q-grm-05', 'qb-g12-1'],
    quickCheckQuestionIds: ['q-grm-05']
  },

  // ==========================================
  // TOPIC 9: CONDITIONAL SENTENCE TYPE 3 & MIXED CONDITIONALS (G12 - Unit 4)
  // ==========================================
  {
    id: 'grm-12-04',
    grade: '12',
    unitId: 'unit-12-4',
    unitTitle: 'Unit 4: Urbanisation',
    lessonId: 'lesson-12-4-2',
    title: 'Conditional Sentences Type 3 & Mixed Conditionals',
    shortDescription: 'Giả định trái thực tế trong quá khứ và sự kết hợp giả định quá khứ dẫn tới kết quả hiện tại.',
    level: 'B2',
    difficulty: 'hard',
    structure: 'Type 3: If + had + V3/ed, S + would/could + have + V3/ed | Mixed: If + had + V3/ed, S + would + V',
    explanation: 'Câu điều kiện loại 3 dùng để tiếc nuối hoặc suy đoán về sự việc không có thật trong quá khứ. Câu điều kiện hỗn hợp (Mixed Conditionals) liên kết nguyên nhân trong quá khứ với hệ quả đang diễn ra ở hiện tại.',
    whenToUse: [
      'Loại 3: Tiếc nuối một việc đã qua (If I had studied harder, I would have passed the exam).',
      'Hỗn hợp: Quá khứ ảnh hưởng hiện tại (If she had taken the job offer last year, she would be living in Paris now).'
    ],
    forms: {
      positive: 'If + S + had + V3/ed, S + would have + V3/ed',
      negative: 'If + S + had not + V3/ed, S + would not have + V3/ed',
      question: 'Would + S + have + V3/ed if + S + had + V3/ed?'
    },
    rules: [
      {
        ruleTitle: 'Đảo ngữ câu điều kiện loại 3',
        description: 'Bỏ "If", đảo "Had" lên đầu câu: Had + S + (not) + V3/ed, S + would have + V3/ed.',
        pattern: 'Had I known the truth, I would not have spoken so harshly.'
      }
    ],
    examples: [
      {
        en: 'If the city had invested in drainage systems, the roads would not have been flooded yesterday.',
        vi: 'Nếu thành phố đã đầu tư hệ thống thoát nước thì hôm qua đường phố đã không bị ngập lụt.',
        note: 'Conditional type 3: cả 2 vế đều thuộc quá khứ.'
      },
      {
        en: 'If he had saved money in his youth, he would be financially independent now.',
        vi: 'Nếu thời trẻ anh ấy biết tiết kiệm tiền thì bây giờ anh ấy đã độc lập tài chính rồi.',
        note: 'Mixed conditional: had saved (quá khứ) -> would be (hiện tại).'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'If she arrived on time, she would not have missed the keynote speaker.',
        correct: 'If she had arrived on time, she would not have missed the keynote speaker.',
        reason: 'Mệnh đề If của câu điều kiện loại 3 phải dùng quá khứ hoàn thành "had arrived".'
      }
    ],
    relatedExercises: ['q-grm-10', 'q-grm-14'],
    quickCheckQuestionIds: ['q-grm-10']
  },

  // ==========================================
  // TOPIC 10: RELATIVE CLAUSES: DEFINING & NON-DEFINING (G12 - Unit 5)
  // ==========================================
  {
    id: 'grm-12-05',
    grade: '12',
    unitId: 'unit-12-5',
    unitTitle: 'Unit 5: The World of Work',
    lessonId: 'lesson-12-5-2',
    title: 'Defining vs. Non-Defining Relative Clauses',
    shortDescription: 'Phân biệt mệnh đề quan hệ xác định (không có dấu phẩy) và không xác định (có dấu phẩy).',
    level: 'B1-B2',
    difficulty: 'medium',
    structure: 'Defining: Noun + who/which/that + Clause | Non-defining: Proper Noun, who/which + Clause,',
    explanation: 'Mệnh đề xác định cung cấp thông tin cốt lõi để nhận diện danh từ (nếu bỏ đi câu mất nghĩa). Mệnh đề không xác định chỉ bổ sung thông tin phụ cho danh từ đã rõ ràng (tên riêng, có this/that/my), luôn ngăn cách bằng dấu phẩy và KHÔNG BAO GIỜ dùng "that".',
    whenToUse: [
      'Non-defining: Dùng khi danh từ là danh từ riêng hoặc đã xác định cụ thể (Hanoi, which is the capital of Vietnam, is charming).',
      'Tuyệt đối không dùng "that" trong mệnh đề có dấu phẩy.'
    ],
    forms: {
      positive: 'Noun (,) relative pronoun + Clause (,)',
      negative: 'Phụ thuộc vào mệnh đề quan hệ',
      question: 'Phụ thuộc câu chính'
    },
    rules: [
      {
        ruleTitle: 'Cấm dùng THAT sau dấu phẩy và sau giới từ',
        description: 'Không bao giờ dùng "that" trong mệnh đề quan hệ không xác định hoặc ngay sau giới từ (in which, to whom).',
        pattern: ', who/which (NOT: , that) | in which (NOT: in that)'
      }
    ],
    examples: [
      {
        en: 'My uncle, who is an environmental engineer, lives in Da Nang.',
        vi: 'Chú của tôi, người là kỹ sư môi trường, đang sinh sống ở Đà Nẵng.',
        note: 'Mệnh đề không xác định ngăn cách bằng dấu phẩy.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Ha Long Bay, that is a UNESCO World Heritage site, attracts millions of visitors.',
        correct: 'Ha Long Bay, which is a UNESCO World Heritage site, attracts millions of visitors.',
        reason: 'Có dấu phẩy sau "Ha Long Bay" nên không được dùng "that", bắt buộc dùng "which".'
      }
    ],
    relatedExercises: ['q-grm-15'],
    quickCheckQuestionIds: ['q-grm-15']
  }
];
