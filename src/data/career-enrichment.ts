export type EducationMatch = {
  tier?: string;
  university: string;
  city: string;
  program: string;
  specialty: string;
  passingScore: string;
  exams: string[];
  fitReason: string;
  adjacentPrograms: string[];
  imageUrl: string;
  imageSourceUrl: string;
  sourceLabel: string;
};

export type LaborMarketMatch = {
  role: string;
  fit: string;
  salaryRange: string;
  demand: string;
  companies: string[];
  skills: string[];
  adjacentRoles: string[];
  hhSearchUrl: string;
  sourceLabel: string;
};

type TrackId = "analytics" | "product" | "engineering" | "creative";

const universityTracks: Record<TrackId, EducationMatch[]> = {
  analytics: [
    {
      university: "НИУ ВШЭ",
      city: "Москва",
      program: "Прикладной анализ данных",
      specialty: "01.03.02 Прикладная математика и информатика / data-трек",
      passingScore: "ориентир: 285+ за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Сильная траектория для игрока, который выбирает данные, проверку гипотез и системное объяснение решений.",
      adjacentPrograms: ["Бизнес-информатика", "Экономика и анализ данных", "Компьютерные науки"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Фотография%20главного%20здания%20МИЭМ%20со%20стороны%20бульвара.JPG",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:National_Research_University_Higher_School_of_Economics",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "Университет ИТМО",
      city: "Санкт-Петербург",
      program: "Прикладная информатика / AI и цифровые продукты",
      specialty: "09.03.03 Прикладная информатика",
      passingScore: "ориентир: 270-295 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Хорошо ложится на профиль, где сочетаются технологии, аналитика, продуктовая логика и работа с AI.",
      adjacentPrograms: ["Искусственный интеллект", "Программная инженерия", "Информационные системы"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ITMO%20University%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:SPbSU_ITMO",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "МФТИ",
      city: "Долгопрудный",
      program: "Прикладная математика и информатика",
      specialty: "01.03.02 Прикладная математика и информатика",
      passingScore: "ориентир: 290+ за 3 ЕГЭ",
      exams: ["профильная математика", "информатика/физика", "русский язык"],
      fitReason: "Подходит для сильной исследовательско-инженерной траектории: модели, алгоритмы, системное мышление.",
      adjacentPrograms: ["Системный анализ", "Компьютерные науки", "AI/ML"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/MIPT%20main%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_Institute_of_Physics_and_Technology",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  product: [
    {
      university: "НИУ ВШЭ",
      city: "Москва",
      program: "Бизнес-информатика",
      specialty: "38.03.05 Бизнес-информатика",
      passingScore: "ориентир: 265-290 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика/обществознание", "русский язык"],
      fitReason: "Связывает аналитику, менеджмент и цифровые продукты, если игрок думает о пользователях и последствиях решений.",
      adjacentPrograms: ["Управление цифровым продуктом", "Экономика данных", "Маркетинговая аналитика"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Фотография%20главного%20здания%20МИЭМ%20со%20стороны%20бульвара.JPG",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:National_Research_University_Higher_School_of_Economics",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "РАНХиГС",
      city: "Москва",
      program: "Управление цифровыми проектами",
      specialty: "38.03.02 Менеджмент / digital-трек",
      passingScore: "ориентир: 245-275 за 3 ЕГЭ",
      exams: ["профильная математика", "обществознание", "русский язык"],
      fitReason: "Подходит для траектории product/project management: стратегия, команда, запуск и рост продукта.",
      adjacentPrograms: ["Предпринимательство", "Маркетинг", "Государственные цифровые сервисы"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/RANEPA%20Moscow.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Russian_Presidential_Academy_of_National_Economy_and_Public_Administration",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "Университет Иннополис",
      city: "Иннополис",
      program: "Computer Science / Software Engineering",
      specialty: "09.03.04 Программная инженерия",
      passingScore: "ориентир: высокий конкурс + профильные испытания/портфолио",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Вау-трек для игрока, который хочет соединить инженерный продукт, стартап-среду и международную IT-культуру.",
      adjacentPrograms: ["Data Science", "Robotics", "AI Product"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Innopolis%20University.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Innopolis_University",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  engineering: [
    {
      university: "МФТИ",
      city: "Долгопрудный",
      program: "Системный анализ и управление",
      specialty: "27.03.03 Системный анализ и управление",
      passingScore: "ориентир: 285-300 за 3 ЕГЭ",
      exams: ["профильная математика", "физика/информатика", "русский язык"],
      fitReason: "Лучший матч для инженерного профиля: устойчивость систем, моделирование, технические решения под давлением.",
      adjacentPrograms: ["Прикладная математика", "Радиотехника", "Компьютерная безопасность"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/MIPT%20main%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_Institute_of_Physics_and_Technology",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "МГТУ им. Н. Э. Баумана",
      city: "Москва",
      program: "Информатика и системы управления",
      specialty: "09.03.01 Информатика и вычислительная техника",
      passingScore: "ориентир: 260-290 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика/физика", "русский язык"],
      fitReason: "Для игрока, который выбирает ремонт, защиту, архитектуру и техническое восстановление сложных систем.",
      adjacentPrograms: ["Робототехника", "Информационная безопасность", "Автоматизация"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Bauman%20Moscow%20State%20Technical%20University%20main%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Bauman_Moscow_State_Technical_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "Университет ИТМО",
      city: "Санкт-Петербург",
      program: "Информационная безопасность / AI systems",
      specialty: "10.03.01 Информационная безопасность",
      passingScore: "ориентир: 270-295 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Подходит, если в миссии проявились безопасность, контроль рисков и работа с AI-инфраструктурой.",
      adjacentPrograms: ["AI", "Программная инженерия", "Кибербезопасность"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ITMO%20University%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:SPbSU_ITMO",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  creative: [
    {
      university: "НИУ ВШЭ",
      city: "Москва",
      program: "Дизайн и программирование цифрового продукта",
      specialty: "54.03.01 Дизайн / UX-трек",
      passingScore: "ориентир: ЕГЭ + портфолио/творческий конкурс",
      exams: ["русский язык", "литература/обществознание", "портфолио"],
      fitReason: "Для игрока, который соединяет креатив, исследование пользователей и цифровые интерфейсы.",
      adjacentPrograms: ["UX Research", "Сервис-дизайн", "EdTech-дизайн"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Фотография%20главного%20здания%20МИЭМ%20со%20стороны%20бульвара.JPG",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:National_Research_University_Higher_School_of_Economics",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "МГПУ",
      city: "Москва",
      program: "Цифровое образование и EdTech",
      specialty: "44.03.01 Педагогическое образование / цифровая среда",
      passingScore: "ориентир: 220-260 за 3 ЕГЭ",
      exams: ["русский язык", "обществознание", "математика/информатика"],
      fitReason: "Если профиль игрока показывает интерес к людям, обучению, интерфейсам и объяснению сложного.",
      adjacentPrograms: ["Психология образования", "UX в образовании", "Методический дизайн"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20City%20University.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_City_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      university: "Университет ИТМО",
      city: "Санкт-Петербург",
      program: "Цифровые продукты и интерфейсы",
      specialty: "09.03.03 Прикладная информатика / product design",
      passingScore: "ориентир: 250-285 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Сильная смежная траектория для UX + аналитика + технологии.",
      adjacentPrograms: ["Product Analytics", "Digital Design", "Human-AI Interaction"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ITMO%20University%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:SPbSU_ITMO",
      sourceLabel: "Wikimedia Commons"
    }
  ]
};

const accessibleUniversityTracks: Record<TrackId, EducationMatch[]> = {
  analytics: [
    {
      tier: "Базовый вход",
      university: "РТУ МИРЭА",
      city: "Москва",
      program: "Прикладная информатика",
      specialty: "09.03.03 Прикладная информатика",
      passingScore: "ориентир: 230-260 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Понятный старт для школьника: учишься работать с информационными системами, базами данных и прикладными задачами бизнеса.",
      adjacentPrograms: ["Информационные системы", "Бизнес-информатика", "Программная инженерия"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/MIREA%20main%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:MIREA_%E2%80%93_Russian_Technological_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      tier: "Средний конкурс",
      university: "Финансовый университет",
      city: "Москва",
      program: "Бизнес-информатика",
      specialty: "38.03.05 Бизнес-информатика",
      passingScore: "ориентир: 245-275 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика/обществознание", "русский язык"],
      fitReason: "Смежный путь для тех, кому близки данные, экономика, цифровые сервисы и понятная прикладная аналитика.",
      adjacentPrograms: ["Экономика данных", "Финансовая аналитика", "Маркетинговая аналитика"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Financial%20University%20under%20the%20Government%20of%20the%20Russian%20Federation.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Financial_University_under_the_Government_of_the_Russian_Federation",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  product: [
    {
      tier: "Базовый вход",
      university: "Московский Политех",
      city: "Москва",
      program: "Информационные системы и технологии",
      specialty: "09.03.02 Информационные системы и технологии",
      passingScore: "ориентир: 225-260 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Хороший первый шаг от общего IT к продуктам: сначала системы и разработка, потом продуктовая аналитика или управление.",
      adjacentPrograms: ["Прикладная информатика", "Менеджмент цифровых проектов", "UX/UI"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20Polytechnic%20University.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_Polytechnic_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      tier: "Средний конкурс",
      university: "РЭУ им. Г. В. Плеханова",
      city: "Москва",
      program: "Цифровая экономика",
      specialty: "38.03.01 Экономика / digital-трек",
      passingScore: "ориентир: 240-275 за 3 ЕГЭ",
      exams: ["профильная математика", "обществознание/информатика", "русский язык"],
      fitReason: "Смежная траектория для будущего product/project: экономика, рынок, пользователи и цифровые решения.",
      adjacentPrograms: ["Менеджмент", "Маркетинг", "Бизнес-информатика"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Plekhanov%20Russian%20University%20of%20Economics.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Plekhanov_Russian_University_of_Economics",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  engineering: [
    {
      tier: "Базовый вход",
      university: "РТУ МИРЭА",
      city: "Москва",
      program: "Информатика и вычислительная техника",
      specialty: "09.03.01 Информатика и вычислительная техника",
      passingScore: "ориентир: 225-260 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Понятная базовая техническая траектория: программирование, сети, архитектура компьютеров и инженерная база.",
      adjacentPrograms: ["Прикладная информатика", "Информационная безопасность", "Программная инженерия"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/MIREA%20main%20building.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:MIREA_%E2%80%93_Russian_Technological_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      tier: "Средний конкурс",
      university: "Московский Политех",
      city: "Москва",
      program: "Программная инженерия",
      specialty: "09.03.04 Программная инженерия",
      passingScore: "ориентир: 240-275 за 3 ЕГЭ",
      exams: ["профильная математика", "информатика", "русский язык"],
      fitReason: "Более прикладной путь для технаря: от общей инженерной логики к разработке продуктов и сервисов.",
      adjacentPrograms: ["Информационные системы", "Web-разработка", "Кибербезопасность"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20Polytechnic%20University.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_Polytechnic_University",
      sourceLabel: "Wikimedia Commons"
    }
  ],
  creative: [
    {
      tier: "Базовый вход",
      university: "МГПУ",
      city: "Москва",
      program: "Психология и цифровая образовательная среда",
      specialty: "37.03.01 Психология / education-tech",
      passingScore: "ориентир: 210-250 за 3 ЕГЭ",
      exams: ["русский язык", "биология/обществознание", "математика"],
      fitReason: "Если сначала хочется понять людей, поведение и обучение, а уже потом переходить к UX, EdTech или продукту.",
      adjacentPrograms: ["Педагогика", "Социальная психология", "UX Research"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20City%20University.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Moscow_City_University",
      sourceLabel: "Wikimedia Commons"
    },
    {
      tier: "Средний конкурс",
      university: "РГГУ",
      city: "Москва",
      program: "Реклама и связи с общественностью",
      specialty: "42.03.01 Реклама и связи с общественностью",
      passingScore: "ориентир: 230-265 за 3 ЕГЭ",
      exams: ["русский язык", "обществознание", "история/иностранный язык"],
      fitReason: "Смежный гуманитарный маршрут: коммуникации, смысл, аудитория, медиа, после чего можно идти в UX/content/product.",
      adjacentPrograms: ["Медиакоммуникации", "Брендинг", "Цифровой контент"],
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Russian%20State%20University%20for%20the%20Humanities.jpg",
      imageSourceUrl: "https://commons.wikimedia.org/wiki/Category:Russian_State_University_for_the_Humanities",
      sourceLabel: "Wikimedia Commons"
    }
  ]
};

const laborMarketTracks: Record<TrackId, LaborMarketMatch[]> = {
  analytics: [
    {
      role: "Data / Product Analyst",
      fit: "основной рынок",
      salaryRange: "Junior 90-150 тыс. ₽, Middle 180-320 тыс. ₽, Senior 350+ тыс. ₽",
      demand: "Высокий спрос в продуктах, банках, маркетплейсах, telecom и EdTech.",
      companies: ["Яндекс", "Сбер", "Т-Банк", "Ozon", "VK", "Avito"],
      skills: ["SQL", "Python", "дашборды", "A/B-тесты", "метрики продукта"],
      adjacentRoles: ["BI-аналитик", "Маркетинговый аналитик", "UX Researcher"],
      hhSearchUrl: "https://hh.ru/vacancies/data-analyst",
      sourceLabel: "HH.ru search"
    },
    {
      role: "Системный аналитик",
      fit: "сильная смежная роль",
      salaryRange: "Junior 80-140 тыс. ₽, Middle 170-300 тыс. ₽, Senior 320+ тыс. ₽",
      demand: "Нужен там, где хаос требований надо превратить в понятную систему и документацию.",
      companies: ["СберТех", "Госуслуги", "Ростелеком", "Лаборатория Касперского", "МТС"],
      skills: ["BPMN/UML", "API", "интервью", "требования", "системное мышление"],
      adjacentRoles: ["Бизнес-аналитик", "Solution Analyst", "Product Owner"],
      hhSearchUrl: "https://hh.ru/vacancies/sistemnyy_analitik",
      sourceLabel: "HH.ru search"
    }
  ],
  product: [
    {
      role: "Product Manager",
      fit: "основной рынок",
      salaryRange: "Junior 100-160 тыс. ₽, Middle 200-350 тыс. ₽, Senior/Lead 400+ тыс. ₽",
      demand: "Роль востребована в digital-продуктах, fintech, e-commerce, EdTech и B2B SaaS.",
      companies: ["Яндекс", "Авито", "Ozon", "VK", "Сбер", "Контур"],
      skills: ["discovery", "roadmap", "метрики", "приоритизация", "unit-экономика"],
      adjacentRoles: ["Product Owner", "Project Manager", "Growth Manager"],
      hhSearchUrl: "https://hh.ru/vacancies/product_manager",
      sourceLabel: "HH.ru search"
    },
    {
      role: "Product Analyst",
      fit: "смежная data/product роль",
      salaryRange: "Junior 110-170 тыс. ₽, Middle 220-360 тыс. ₽, Senior 400+ тыс. ₽",
      demand: "Подходит, если игрок принимает решения через данные, но хочет влиять на продукт.",
      companies: ["Т-Банк", "МТС", "Самокат", "Wildberries", "Skyeng"],
      skills: ["SQL", "Python", "A/B", "воронки", "исследование пользователей"],
      adjacentRoles: ["Data Analyst", "Product Manager", "UX Researcher"],
      hhSearchUrl: "https://hh.ru/vacancies/product-analyst",
      sourceLabel: "HH.ru search"
    }
  ],
  engineering: [
    {
      role: "Программист / Software Developer",
      fit: "базовая техническая профессия",
      salaryRange: "Junior 80-150 тыс. ₽, Middle 170-320 тыс. ₽, Senior 350+ тыс. ₽",
      demand: "Понятная стартовая IT-роль: разработка сервисов, внутренних систем, сайтов, мобильных и backend-продуктов.",
      companies: ["Яндекс", "Сбер", "VK", "Ozon", "Контур", "МТС"],
      skills: ["алгоритмы", "Python/Java/JavaScript", "Git", "базы данных", "тестирование"],
      adjacentRoles: ["Backend-разработчик", "Frontend-разработчик", "QA Automation"],
      hhSearchUrl: "https://hh.ru/vacancies/programmist",
      sourceLabel: "HH.ru search"
    },
    {
      role: "Инженер по информационной безопасности",
      fit: "сильная смежная техническая роль",
      salaryRange: "Junior 90-160 тыс. ₽, Middle 180-330 тыс. ₽, Senior 380+ тыс. ₽",
      demand: "Востребованность растёт из-за рисков инфраструктуры, данных, платежей, госуслуг и критических систем.",
      companies: ["Kaspersky", "Positive Technologies", "Сбер", "Ростелеком-Солар", "VK"],
      skills: ["сетевые протоколы", "SOC", "моделирование угроз", "логирование", "реагирование"],
      adjacentRoles: ["SOC-аналитик", "Security Analyst", "DevSecOps"],
      hhSearchUrl: "https://hh.ru/vacancies/informatsionnaya-bezopasnost",
      sourceLabel: "HH.ru search"
    },
    {
      role: "Системный аналитик",
      fit: "мост между техникой и продуктом",
      salaryRange: "Junior 80-140 тыс. ₽, Middle 170-300 тыс. ₽, Senior 320+ тыс. ₽",
      demand: "Подходит технарю, который умеет объяснять сложные системы, собирать требования и проектировать решения.",
      companies: ["СберТех", "Госуслуги", "Ростелеком", "Лаборатория Касперского", "МТС"],
      skills: ["BPMN/UML", "API", "интервью", "требования", "системное мышление"],
      adjacentRoles: ["Бизнес-аналитик", "Solution Analyst", "Product Owner"],
      hhSearchUrl: "https://hh.ru/vacancies/sistemnyy_analitik",
      sourceLabel: "HH.ru search"
    },
    {
      role: "AI / ML Engineer",
      fit: "следующий технологический уровень",
      salaryRange: "Junior 130-200 тыс. ₽, Middle 250-450 тыс. ₽, Senior 500+ тыс. ₽",
      demand: "Это не первый обязательный шаг, а продвинутая траектория после сильной базы в программировании, математике и данных.",
      companies: ["Яндекс", "Сбер AI", "VK", "MTS AI", "Контур", "Лаборатория Касперского"],
      skills: ["Python", "ML", "LLM", "MLOps", "математика", "оценка качества моделей"],
      adjacentRoles: ["Data Scientist", "ML Ops Engineer", "AI Product Analyst"],
      hhSearchUrl: "https://hh.ru/vacancies/machine-learning-engineer",
      sourceLabel: "HH.ru search"
    }
  ],
  creative: [
    {
      role: "UX Researcher",
      fit: "гуманитарно-аналитический трек",
      salaryRange: "Junior 80-130 тыс. ₽, Middle 160-280 тыс. ₽, Senior 300+ тыс. ₽",
      demand: "Нужен продуктовым командам, которым важно понимать поведение пользователей, а не только метрики.",
      companies: ["Яндекс", "Авито", "Ozon", "VK", "Skyeng", "Сбер"],
      skills: ["интервью", "JTBD", "опросы", "прототипы", "качественный анализ"],
      adjacentRoles: ["Product Designer", "UX Writer", "Product Analyst"],
      hhSearchUrl: "https://hh.ru/vacancies/ux-researcher",
      sourceLabel: "HH.ru search"
    },
    {
      role: "EdTech Product Designer",
      fit: "смежная продуктовая роль",
      salaryRange: "Junior 80-140 тыс. ₽, Middle 170-300 тыс. ₽, Lead 330+ тыс. ₽",
      demand: "Подходит для сочетания образования, дизайна, цифровых продуктов и исследований.",
      companies: ["Skyeng", "Skillbox", "Нетология", "Яндекс Практикум", "GeekBrains"],
      skills: ["UX/UI", "методика", "исследования", "Figma", "продуктовое мышление"],
      adjacentRoles: ["Методист", "Instructional Designer", "Product Manager"],
      hhSearchUrl: "https://hh.ru/vacancies/product-designer",
      sourceLabel: "HH.ru search"
    }
  ]
};

function selectTrack(signals: string[]): TrackId {
  const text = signals.join(" ").toLowerCase();
  const score = {
    analytics: 0,
    product: 0,
    engineering: 0,
    creative: 0
  };

  for (const match of text.matchAll(/аналит|data|данн|sql|метрик|гипотез|bi|dashboard|системн/g)) score.analytics += match[0] === "системн" ? 2 : 1;
  for (const match of text.matchAll(/инженер|безопас|ai|ml|робот|технолог|контроль|risk|safety|ремонт|инфраструктур/g)) score.engineering += /инженер|безопас|ai|ml/.test(match[0]) ? 2 : 1;
  for (const match of text.matchAll(/product manager|продуктов|бизнес|предприним|лидер|команд|roadmap|приоритет|mvp/g)) score.product += 1;
  for (const match of text.matchAll(/ux|дизайн|креатив|медиа|эмпат|психолог|storytelling|визуал/g)) score.creative += 1;

  const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]) as [TrackId, number][];
  return ranked[0][1] > 0 ? ranked[0][0] : "analytics";
}

export function buildEducationMatches(signals: string[]) {
  const track = selectTrack(signals);
  const base = universityTracks[track].map((item, index) => ({
    ...item,
    tier: item.tier ?? (index === 0 ? "Топ-трек" : index === 1 ? "Сильный конкурс" : "Амбициозный трек")
  }));
  const accessible = accessibleUniversityTracks[track];
  const analyticsFallback = [...accessibleUniversityTracks.analytics, ...universityTracks.analytics]
    .filter((item) => ![...accessible, ...base].some((current) => current.university === item.university && current.program === item.program))
    .map((item) => ({ ...item, tier: item.tier ?? "Смежный трек" }));
  return [...accessible, ...base, ...analyticsFallback].slice(0, 6);
}

export function buildLaborMarketMatches(signals: string[]) {
  const track = selectTrack(signals);
  const base = laborMarketTracks[track];
  const adjacent = [
    ...laborMarketTracks.analytics,
    ...laborMarketTracks.product,
    ...laborMarketTracks.engineering,
    ...laborMarketTracks.creative
  ].filter((item) => !base.some((current) => current.role === item.role));
  return [...base, ...adjacent].slice(0, 4);
}
