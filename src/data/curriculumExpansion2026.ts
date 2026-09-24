import {
  UnitModel,
  LessonModel,
  VocabularyItem,
  QuestionBankItem,
  GradeLevel,
  LessonType,
  StandardDifficulty,
  CEFRLevel
} from '../types/contentArchitecture';

/**
 * 2026 curriculum expansion.
 * This is original companion content aligned to the Global Success topic map,
 * not a reproduction of textbook pages or copyrighted exercises.
 */

type UnitSeed = {
  grade: GradeLevel;
  number: number;
  title: string;
  vietnameseTitle: string;
  topic: string;
  theme: string;
  description: string;
  grammar: string;
  vocabTopic: string;
  cefr: CEFRLevel;
  words: Array<[string, string, string, string]>;
};

const seeds: UnitSeed[] = [
  // Grade 10
  {
    grade: '10', number: 4, title: 'For a Better Community', vietnameseTitle: 'Vì một cộng đồng tốt đẹp hơn',
    topic: 'Volunteering and community service', theme: 'Community engagement',
    description: 'Học cách nói về hoạt động tình nguyện, lợi ích cộng đồng và trách nhiệm của người trẻ.',
    grammar: 'Past simple and present perfect in personal experience', vocabTopic: 'volunteering, charity, community',
    cefr: 'A2', words: [
      ['volunteer','noun','người tình nguyện','A person who freely offers to help others.'],
      ['charity','noun','tổ chức/hoạt động từ thiện','An organisation or activity that helps people in need.'],
      ['donate','verb','quyên góp','To give money, goods, or time to help others.'],
      ['community','noun','cộng đồng','A group of people living or working together.'],
      ['campaign','noun','chiến dịch','An organised series of actions for a purpose.'],
      ['beneficial','adjective','có lợi','Producing a useful or positive effect.']
    ]
  },
  {
    grade: '10', number: 5, title: 'Inventions', vietnameseTitle: 'Những phát minh',
    topic: 'Technology and useful inventions', theme: 'Innovation in daily life',
    description: 'Khám phá cách các phát minh giải quyết vấn đề trong học tập và đời sống.',
    grammar: 'The present perfect and relative clauses', vocabTopic: 'inventions, devices, innovation',
    cefr: 'A2', words: [
      ['invention','noun','phát minh','A new device, method, or idea created to solve a problem.'],
      ['device','noun','thiết bị','An object or machine designed for a particular purpose.'],
      ['portable','adjective','có thể mang theo','Easy to carry or move.'],
      ['innovative','adjective','mang tính đổi mới','Using new ideas or methods.'],
      ['function','noun','chức năng','The purpose that something is designed to perform.'],
      ['convenient','adjective','thuận tiện','Easy and useful for a particular situation.']
    ]
  },
  {
    grade: '10', number: 6, title: 'Gender Equality', vietnameseTitle: 'Bình đẳng giới',
    topic: 'Equal opportunities and social roles', theme: 'Fairness and inclusion',
    description: 'Phát triển vốn từ về cơ hội bình đẳng và cách trao đổi ý kiến tôn trọng.',
    grammar: 'Passive voice with modal verbs', vocabTopic: 'gender equality, rights, opportunity',
    cefr: 'B1', words: [
      ['equality','noun','sự bình đẳng','The state of being equal in rights and opportunities.'],
      ['equal','adjective','bình đẳng','Having the same rights, opportunities, or value.'],
      ['opportunity','noun','cơ hội','A favourable chance to do or achieve something.'],
      ['discrimination','noun','sự phân biệt đối xử','Unfair treatment based on a personal characteristic.'],
      ['empower','verb','trao quyền','To give someone the confidence or power to act.'],
      ['stereotype','noun','định kiến khuôn mẫu','A fixed and oversimplified idea about a group.']
    ]
  },
  {
    grade: '10', number: 7, title: 'Viet Nam and International Organisations', vietnameseTitle: 'Việt Nam và các tổ chức quốc tế',
    topic: 'International cooperation', theme: 'Global citizenship',
    description: 'Tìm hiểu vai trò của hợp tác quốc tế và cách trình bày thông tin về các tổ chức.',
    grammar: 'Relative clauses and reported speech', vocabTopic: 'international organisations, cooperation',
    cefr: 'B1', words: [
      ['organisation','noun','tổ chức','A group formed for a particular purpose.'],
      ['cooperation','noun','sự hợp tác','The act of working together toward a shared goal.'],
      ['humanitarian','adjective','nhân đạo','Concerned with improving human welfare.'],
      ['development','noun','sự phát triển','The process of growth or improvement.'],
      ['sustainable','adjective','bền vững','Able to continue without causing serious harm.'],
      ['contribute','verb','đóng góp','To give something to help achieve a result.']
    ]
  },
  {
    grade: '10', number: 8, title: 'New Ways to Learn', vietnameseTitle: 'Những cách học mới',
    topic: 'Digital and blended learning', theme: 'Learning innovation',
    description: 'Luyện ngôn ngữ để mô tả học trực tuyến, lớp học kết hợp và thói quen tự học.',
    grammar: 'Reported speech and sentence stress', vocabTopic: 'online learning, digital tools, study habits',
    cefr: 'B1', words: [
      ['blended learning','phrase','học tập kết hợp','Learning that combines online and face-to-face study.'],
      ['platform','noun','nền tảng','An online system used for a particular activity.'],
      ['interactive','adjective','có tính tương tác','Designed to involve people by responding to their actions.'],
      ['resource','noun','tài nguyên','A useful source of information or support.'],
      ['self-directed','adjective','tự định hướng','Managed and organised by the learner.'],
      ['distraction','noun','sự xao nhãng','Something that takes attention away from a task.']
    ]
  },
  {
    grade: '10', number: 9, title: 'Protecting the Environment', vietnameseTitle: 'Bảo vệ môi trường',
    topic: 'Environmental problems and solutions', theme: 'Green living',
    description: 'Học cách mô tả vấn đề môi trường và đề xuất giải pháp thiết thực cho học sinh.',
    grammar: 'Conditional sentences types 1 and 2', vocabTopic: 'pollution, conservation, climate',
    cefr: 'B1', words: [
      ['pollution','noun','ô nhiễm','Harmful substances added to air, water, or soil.'],
      ['carbon footprint','phrase','dấu chân carbon','The amount of greenhouse gases linked to an activity.'],
      ['conservation','noun','sự bảo tồn','Protection and careful management of natural resources.'],
      ['recycle','verb','tái chế','To process used materials so they can be used again.'],
      ['emission','noun','khí thải','A substance released into the environment.'],
      ['renewable','adjective','có thể tái tạo','Naturally replaced at a rate similar to its use.']
    ]
  },
  {
    grade: '10', number: 10, title: 'Ecotourism', vietnameseTitle: 'Du lịch sinh thái',
    topic: 'Responsible travel and nature', theme: 'Sustainable tourism',
    description: 'Phát triển ngôn ngữ để giới thiệu điểm đến tự nhiên và du lịch có trách nhiệm.',
    grammar: 'Conditional sentences and advice', vocabTopic: 'ecotourism, destinations, responsible travel',
    cefr: 'B1', words: [
      ['ecotourism','noun','du lịch sinh thái','Travel that supports nature conservation and local communities.'],
      ['destination','noun','điểm đến','A place to which people travel.'],
      ['biodiversity','noun','đa dạng sinh học','The variety of living things in an area.'],
      ['local community','phrase','cộng đồng địa phương','People who live in a particular local area.'],
      ['responsible','adjective','có trách nhiệm','Acting carefully and considering the effects on others or nature.'],
      ['preserve','verb','bảo tồn','To protect something so it remains in good condition.']
    ]
  },

  // Grade 11
  {
    grade: '11', number: 3, title: 'Cities of the Future', vietnameseTitle: 'Những thành phố của tương lai',
    topic: 'Smart cities and urban life', theme: 'Future urban development',
    description: 'Mô tả thành phố thông minh, giao thông xanh và các giải pháp nâng cao chất lượng sống.',
    grammar: 'Future forms and participle clauses', vocabTopic: 'smart cities, transport, urban planning',
    cefr: 'B1', words: [
      ['smart city','phrase','thành phố thông minh','A city that uses technology to improve services and living conditions.'],
      ['infrastructure','noun','cơ sở hạ tầng','The basic systems and structures a city needs to operate.'],
      ['congestion','noun','tình trạng ùn tắc','A situation in which traffic or movement is too crowded.'],
      ['sustainable','adjective','bền vững','Able to continue with limited harm to people or nature.'],
      ['public transport','phrase','giao thông công cộng','Transport services available for members of the public.'],
      ['livable','adjective','đáng sống','Suitable or pleasant for people to live in.']
    ]
  },
  {
    grade: '11', number: 4, title: 'ASEAN and Viet Nam', vietnameseTitle: 'ASEAN và Việt Nam',
    topic: 'Regional cooperation and identity', theme: 'ASEAN citizenship',
    description: 'Tìm hiểu hợp tác khu vực, giao lưu văn hóa và vai trò của thanh niên trong ASEAN.',
    grammar: 'Infinitives and gerunds in common patterns', vocabTopic: 'ASEAN, cooperation, regional identity',
    cefr: 'B1', words: [
      ['regional','adjective','thuộc khu vực','Relating to a particular area or region.'],
      ['member state','phrase','quốc gia thành viên','A country that belongs to an organisation.'],
      ['integration','noun','sự hội nhập','The process of combining or becoming part of a larger group.'],
      ['diversity','noun','sự đa dạng','The presence of many different forms or groups.'],
      ['diplomatic','adjective','mang tính ngoại giao','Connected with managing relations between countries.'],
      ['youth exchange','phrase','trao đổi thanh niên','A programme allowing young people from different places to learn together.']
    ]
  },
  {
    grade: '11', number: 5, title: 'Global Warming', vietnameseTitle: 'Nóng lên toàn cầu',
    topic: 'Climate change and action', theme: 'Climate responsibility',
    description: 'Luyện đọc hiểu và tranh luận về nguyên nhân, tác động và giải pháp ứng phó biến đổi khí hậu.',
    grammar: 'Perfect participles and cause-effect connectors', vocabTopic: 'global warming, climate action',
    cefr: 'B1', words: [
      ['global warming','phrase','nóng lên toàn cầu','The long-term rise in Earth’s average temperature.'],
      ['greenhouse gas','phrase','khí nhà kính','A gas that contributes to heat being retained in the atmosphere.'],
      ['drought','noun','hạn hán','A long period with unusually little rain.'],
      ['mitigate','verb','giảm nhẹ','To make a harmful effect less severe.'],
      ['adaptation','noun','sự thích ứng','Adjustment to new or changing conditions.'],
      ['climate resilience','phrase','khả năng chống chịu khí hậu','The ability to prepare for and recover from climate impacts.']
    ]
  },
  {
    grade: '11', number: 7, title: 'Education Options for School-leavers', vietnameseTitle: 'Lựa chọn giáo dục sau THPT',
    topic: 'Study and career pathways', theme: 'Education and employability',
    description: 'So sánh đại học, giáo dục nghề nghiệp và các lựa chọn học tập sau khi tốt nghiệp.',
    grammar: 'Relative clauses and modal expressions', vocabTopic: 'education pathways, qualifications, careers',
    cefr: 'B1', words: [
      ['qualification','noun','bằng cấp/chứng chỉ','An official record showing that a person has completed training or study.'],
      ['vocational','adjective','thuộc nghề nghiệp','Related to training for a particular occupation.'],
      ['apprenticeship','noun','chương trình học nghề','A period of training while working in a particular job.'],
      ['scholarship','noun','học bổng','Money awarded to support a student’s education.'],
      ['career pathway','phrase','lộ trình nghề nghiệp','A planned sequence of education and work experiences.'],
      ['employability','noun','khả năng có việc làm','The skills and qualities that make someone suitable for employment.']
    ]
  },
  {
    grade: '11', number: 8, title: 'Becoming Independent', vietnameseTitle: 'Trở nên tự lập',
    topic: 'Life skills and independence', theme: 'Personal responsibility',
    description: 'Phát triển từ vựng về quản lý thời gian, tài chính cá nhân và kỹ năng sống.',
    grammar: 'Modal verbs and advice structures', vocabTopic: 'independence, budgeting, life skills',
    cefr: 'B1', words: [
      ['independent','adjective','độc lập','Able to manage without depending on others.'],
      ['budget','noun','ngân sách','A plan for how money will be earned and spent.'],
      ['responsibility','noun','trách nhiệm','A duty to deal with something or someone carefully.'],
      ['prioritise','verb','ưu tiên','To decide what is most important and deal with it first.'],
      ['self-discipline','noun','tính tự giác','The ability to control actions and stay focused on a goal.'],
      ['decision-making','noun','quá trình ra quyết định','The process of choosing between possible actions.']
    ]
  },
  {
    grade: '11', number: 9, title: 'Social Issues', vietnameseTitle: 'Các vấn đề xã hội',
    topic: 'Social challenges and solutions', theme: 'Responsible citizenship',
    description: 'Luyện ngôn ngữ thảo luận các vấn đề xã hội và đề xuất giải pháp dựa trên bằng chứng.',
    grammar: 'Reported speech and conditionals', vocabTopic: 'social issues, inequality, support',
    cefr: 'B2', words: [
      ['inequality','noun','bất bình đẳng','An unfair difference in opportunities or resources.'],
      ['homelessness','noun','tình trạng vô gia cư','The condition of having no permanent home.'],
      ['awareness','noun','nhận thức','Knowledge or understanding of an issue.'],
      ['vulnerable','adjective','dễ bị tổn thương','More likely to be harmed or affected.'],
      ['social support','phrase','hỗ trợ xã hội','Help provided by people, communities, or services.'],
      ['advocate','verb','ủng hộ/bảo vệ quan điểm','To publicly support a cause or policy.']
    ]
  },
  {
    grade: '11', number: 10, title: 'The Ecosystem', vietnameseTitle: 'Hệ sinh thái',
    topic: 'Ecosystems and biodiversity', theme: 'Nature and balance',
    description: 'Tìm hiểu quan hệ giữa sinh vật, môi trường sống và cân bằng sinh thái.',
    grammar: 'Reduced relative clauses and academic connectors', vocabTopic: 'ecosystems, habitats, biodiversity',
    cefr: 'B2', words: [
      ['ecosystem','noun','hệ sinh thái','A community of organisms and their physical environment.'],
      ['habitat','noun','môi trường sống','The natural home of a plant or animal.'],
      ['predator','noun','động vật săn mồi','An animal that hunts other animals for food.'],
      ['species','noun','loài','A group of living things with shared characteristics that can reproduce.'],
      ['food chain','phrase','chuỗi thức ăn','A sequence showing how energy and food pass between organisms.'],
      ['ecological balance','phrase','cân bằng sinh thái','A stable relationship among organisms and their environment.']
    ]
  },

  // Grade 12
  {
    grade: '12', number: 3, title: 'Green Living', vietnameseTitle: 'Lối sống xanh',
    topic: 'Sustainable lifestyles', theme: 'Environmental responsibility',
    description: 'Phân tích thói quen sống xanh và cách lựa chọn tiêu dùng có trách nhiệm.',
    grammar: 'Cleft sentences and emphasis', vocabTopic: 'green living, consumption, sustainability',
    cefr: 'B2', words: [
      ['sustainable lifestyle','phrase','lối sống bền vững','A way of living that reduces long-term harm to people and nature.'],
      ['ethical consumption','phrase','tiêu dùng có đạo đức','Choosing products while considering social and environmental effects.'],
      ['single-use','adjective','dùng một lần','Designed to be used once and then discarded.'],
      ['carbon-neutral','adjective','trung hòa carbon','Having no net increase in carbon emissions.'],
      ['conserve','verb','tiết kiệm/bảo tồn','To use something carefully to avoid waste or loss.'],
      ['renewable energy','phrase','năng lượng tái tạo','Energy from sources that are naturally replenished.']
    ]
  },
  {
    grade: '12', number: 4, title: 'Urbanisation', vietnameseTitle: 'Đô thị hóa',
    topic: 'Urban growth and living', theme: 'Cities and society',
    description: 'Đánh giá cơ hội và thách thức của đô thị hóa đối với chất lượng sống.',
    grammar: 'Comparisons and complex noun phrases', vocabTopic: 'urbanisation, housing, migration',
    cefr: 'B2', words: [
      ['urbanisation','noun','đô thị hóa','The growth of towns and cities as more people move to urban areas.'],
      ['migration','noun','sự di cư','Movement of people from one place to another.'],
      ['housing shortage','phrase','thiếu nhà ở','A situation where available homes are insufficient for demand.'],
      ['density','noun','mật độ','The number of people or things in a particular area.'],
      ['urban planning','phrase','quy hoạch đô thị','The process of designing and managing the development of cities.'],
      ['amenity','noun','tiện ích','A feature or service that makes a place comfortable or convenient.']
    ]
  },
  {
    grade: '12', number: 5, title: 'The World of Work', vietnameseTitle: 'Thế giới việc làm',
    topic: 'Employment and future skills', theme: 'Career readiness',
    description: 'Luyện từ vựng về tuyển dụng, kỹ năng nghề nghiệp và thay đổi của thị trường lao động.',
    grammar: 'Advanced relative clauses and participle clauses', vocabTopic: 'employment, skills, workplace',
    cefr: 'B2', words: [
      ['employer','noun','người sử dụng lao động','A person or organisation that employs people.'],
      ['employee','noun','người lao động','A person who is paid to work for an organisation.'],
      ['internship','noun','kỳ thực tập','A period of practical work experience.'],
      ['competence','noun','năng lực','The ability to do something successfully or effectively.'],
      ['adaptability','noun','khả năng thích ứng','The ability to adjust to new conditions.'],
      ['workplace','noun','nơi làm việc','A place where people do their jobs.']
    ]
  },
  {
    grade: '12', number: 7, title: 'The World of Mass Media', vietnameseTitle: 'Thế giới truyền thông đại chúng',
    topic: 'Media, information and digital citizenship', theme: 'Media literacy',
    description: 'Phân biệt thông tin đáng tin cậy, nội dung số và cách sử dụng truyền thông có trách nhiệm.',
    grammar: 'Reported speech and discourse markers', vocabTopic: 'media literacy, news, misinformation',
    cefr: 'B2', words: [
      ['mass media','phrase','truyền thông đại chúng','Communication channels that reach large audiences.'],
      ['misinformation','noun','thông tin sai lệch','False or inaccurate information shared without necessarily intending harm.'],
      ['source','noun','nguồn tin','A person or place from which information comes.'],
      ['verify','verb','xác minh','To check that information is accurate or true.'],
      ['bias','noun','thiên kiến','An unfair preference that affects judgement.'],
      ['media literacy','phrase','năng lực truyền thông','The ability to access, analyse, evaluate, and create media responsibly.']
    ]
  },
  {
    grade: '12', number: 8, title: 'Wildlife Conservation', vietnameseTitle: 'Bảo tồn động vật hoang dã',
    topic: 'Wildlife and biodiversity protection', theme: 'Conservation science',
    description: 'Luyện đọc hiểu và thảo luận về bảo tồn sinh cảnh, đa dạng sinh học và chống săn bắt.',
    grammar: 'Inversion with negative adverbials', vocabTopic: 'wildlife, conservation, extinction',
    cefr: 'B2', words: [
      ['wildlife conservation','phrase','bảo tồn động vật hoang dã','Protection of wild animals, plants, and their habitats.'],
      ['poaching','noun','săn bắt trái phép','Illegal hunting or capturing of wild animals.'],
      ['endangered','adjective','có nguy cơ tuyệt chủng','At risk of extinction.'],
      ['habitat loss','phrase','mất môi trường sống','The reduction or destruction of a natural habitat.'],
      ['reintroduction','noun','tái thả/tái du nhập','The return of a species to an area where it once lived.'],
      ['biodiversity hotspot','phrase','điểm nóng đa dạng sinh học','A region with exceptional biodiversity that faces significant threats.']
    ]
  },
  {
    grade: '12', number: 9, title: 'Career Paths', vietnameseTitle: 'Con đường nghề nghiệp',
    topic: 'Career choice and employability', theme: 'Future planning',
    description: 'Xây dựng vốn từ để phân tích sở thích, năng lực và lựa chọn nghề nghiệp dài hạn.',
    grammar: 'Mixed conditionals and advanced linking', vocabTopic: 'career paths, aptitude, professional growth',
    cefr: 'B2', words: [
      ['career path','phrase','con đường nghề nghiệp','A sequence of jobs and learning experiences over a career.'],
      ['aptitude','noun','năng khiếu','A natural ability to learn or do something well.'],
      ['professional development','phrase','phát triển nghề nghiệp','Learning activities that improve professional knowledge and skills.'],
      ['entrepreneurship','noun','tinh thần khởi nghiệp','The activity of creating and managing a business.'],
      ['work-life balance','phrase','cân bằng công việc và cuộc sống','A healthy balance between work and personal life.'],
      ['long-term goal','phrase','mục tiêu dài hạn','An objective planned for a distant future.']
    ]
  },
  {
    grade: '12', number: 10, title: 'Lifelong Learning', vietnameseTitle: 'Học tập suốt đời',
    topic: 'Continuous learning and personal growth', theme: 'Future-ready learning',
    description: 'Phát triển tư duy học tập suốt đời và kỹ năng tự học sau khi rời ghế nhà trường.',
    grammar: 'Advanced discourse, nominalisation and review', vocabTopic: 'lifelong learning, upskilling, growth',
    cefr: 'B2', words: [
      ['lifelong learning','phrase','học tập suốt đời','Learning throughout a person’s life for personal or professional growth.'],
      ['upskill','verb','nâng cao kỹ năng','To learn new skills or improve existing ones.'],
      ['reskill','verb','học kỹ năng mới để chuyển hướng','To learn new skills for a different role or career.'],
      ['curiosity','noun','sự tò mò ham học hỏi','A strong desire to know or learn something.'],
      ['self-reflection','noun','tự phản tỉnh','Careful thought about one’s experiences and actions.'],
      ['continuous improvement','phrase','cải tiến liên tục','A regular effort to make skills or results better over time.']
    ]
  }
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const units: UnitModel[] = seeds.map((s) => {
  const unitId = `unit-${s.grade}-${s.number}`;
  const lessonIds = [1, 2, 3].map((n) => `lesson-${s.grade}-${s.number}-${n}`);
  return {
    id: unitId,
    gradeId: `grade-${s.grade}`,
    gradeNumber: s.grade,
    textbookId: `tb-global-success-${s.grade}`,
    textbookName: `Global Success ${s.grade}`,
    number: s.number,
    title: s.title,
    vietnameseTitle: s.vietnameseTitle,
    description: s.description,
    topic: s.topic,
    theme: s.theme,
    learningObjectives: [
      `Hiểu và sử dụng từ vựng trọng tâm chủ đề ${s.topic}.`,
      `Vận dụng ${s.grammar} trong câu và bài tập ngữ cảnh.`,
      'Đọc, nói và viết về chủ đề bằng ngôn ngữ phù hợp với trình độ.'
    ],
    lessons: lessonIds,
    progress: 0,
    grammarFocus: s.grammar,
    vocabularyTopic: s.vocabTopic,
    durationHours: 4.5
  };
});

const lessonTypes: Array<{ type: LessonType; title: string; description: string }> = [
  { type: 'Vocabulary', title: 'Vocabulary in Context', description: 'Từ vựng trọng tâm, collocations và ví dụ ngữ cảnh.' },
  { type: 'Grammar', title: 'Grammar & Language Use', description: 'Ngữ pháp trọng tâm và cách nhận diện trong câu.' },
  { type: 'Reading', title: 'Reading & Application', description: 'Đọc hiểu ngắn và vận dụng từ vựng trong văn cảnh.' }
];

const lessons: LessonModel[] = [];
const vocabulary: VocabularyItem[] = [];
const questions: QuestionBankItem[] = [];

for (const s of seeds) {
  const unitId = `unit-${s.grade}-${s.number}`;
  const unit = units.find((u) => u.id === unitId)!;
  for (let i = 0; i < lessonTypes.length; i++) {
    const meta = lessonTypes[i];
    const lessonId = `lesson-${s.grade}-${s.number}-${i + 1}`;
    const level = s.cefr;
    const lesson: LessonModel = {
      id: lessonId,
      unitId,
      gradeNumber: s.grade,
      title: `Unit ${s.number} · ${meta.title}`,
      description: meta.description,
      order: i + 1,
      duration: i === 0 ? 20 : i === 1 ? 25 : 30,
      type: meta.type,
      sections: [{
        id: `${lessonId}-section`,
        lessonId,
        type: i === 0 ? 'vocabulary' : i === 1 ? 'grammar' : 'reading',
        title: meta.title,
        content: `${s.description} ${meta.description}`,
        order: 1
      }],
      difficulty: i === 2 ? 'medium' : 'easy',
      cefrLevel: level,
      status: 'available'
    };
    lessons.push(lesson);

    const wordSlice = s.words.slice(i * 2, i * 2 + 2);
    wordSlice.forEach(([word, pos, vi, meaning], index) => {
      const vocab: VocabularyItem = {
        id: `vocab-${s.grade}-${s.number}-${i + 1}-${index + 1}`,
        lessonId,
        unitId,
        word,
        ipa: '',
        partOfSpeech: pos as VocabularyItem['partOfSpeech'],
        meaning,
        meaningVi: vi,
        example: `Students can use ${word} when discussing ${s.topic.toLowerCase()}.`,
        translation: `Học sinh có thể dùng “${word}” khi thảo luận về ${s.topic.toLowerCase()}.`,
        difficulty: i === 2 ? 'medium' : 'easy',
        cefrLevel: level,
        tags: [`Grade ${s.grade}`, `Unit ${s.number}`, s.topic],
        collocations: [`${word} in context`]
      };
      vocabulary.push(vocab);
    });

    if (i === 0) {
      const [targetWord] = s.words[0];
      questions.push({
        id: `qb-${s.grade}-${s.number}-vocab`,
        lessonId,
        unitId,
        grade: s.grade,
        skill: 'vocabulary',
        type: 'multiple_choice',
        difficulty: 'easy',
        cefrLevel: level,
        question: `Which word best matches the meaning of "${s.words[0][2]}"?`,
        options: [targetWord, s.words[1][0], s.words[2][0], s.words[3][0]],
        correctAnswer: 0,
        explanation: `The target word is “${targetWord}”, which means ${s.words[0][3].toLowerCase()}.`,
        tags: [`Unit ${s.number}`, s.topic, 'vocabulary']
      });
    }
    if (i === 1) {
      questions.push({
        id: `qb-${s.grade}-${s.number}-grammar`,
        lessonId,
        unitId,
        grade: s.grade,
        skill: 'grammar',
        type: 'multiple_choice',
        difficulty: 'medium',
        cefrLevel: level,
        question: `Which grammar focus is central to Unit ${s.number}, ${s.title}?`,
        options: [s.grammar, 'Only basic word order', 'Only pronunciation of vowels', 'Only spelling rules'],
        correctAnswer: 0,
        explanation: `Unit ${s.number} focuses on ${s.grammar.toLowerCase()}.`,
        tags: [`Unit ${s.number}`, s.title, 'grammar']
      });
    }
  }
}

export const curriculumExpansionUnits2026 = units;
export const curriculumExpansionLessons2026 = lessons;
export const curriculumExpansionVocabulary2026 = vocabulary;
export const curriculumExpansionQuestions2026 = questions;
export const curriculumExpansionSummary2026 = {
  unitsAdded: units.length,
  lessonsAdded: lessons.length,
  vocabularyAdded: vocabulary.length,
  questionsAdded: questions.length,
  scope: 'Original companion content aligned to Global Success topic map'
};
