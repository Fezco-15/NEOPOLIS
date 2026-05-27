export const careerMethodologies = [
  {
    id: "riasec",
    name: "RIASEC / модель Голланда",
    category: "classic",
    summary: "Шесть типов интересов: realistic, investigative, artistic, social, enterprising, conventional.",
    gameSignals: ["выбор района", "тип задачи", "интерес к людям/данным/технике/креативу/бизнесу"],
    outputUse: "Сопоставлять интересы с группами профессий, но не выдавать тип как диагноз."
  },
  {
    id: "klimov",
    name: "ДДО Климова",
    category: "classic",
    summary: "Сферы: человек-природа, человек-техника, человек-человек, человек-знак, человек-художественный образ.",
    gameSignals: ["домен решения", "предпочтение работы с людьми, системами, данными, образами или природой"],
    outputUse: "Расширять классические сферы современными digital-направлениями."
  },
  {
    id: "career-anchors",
    name: "Якоря карьеры Шейна",
    category: "classic",
    summary: "Мотиваторы карьеры: автономия, стабильность, экспертиза, управление, предпринимательство, служение, вызов, стиль жизни.",
    gameSignals: ["готовность брать риск", "выбор командности", "ориентация на пользу, статус, свободу или мастерство"],
    outputUse: "Объяснять, почему человеку может подойти определенный формат работы."
  },
  {
    id: "big-five",
    name: "Big Five",
    category: "classic",
    summary: "Открытость, добросовестность, экстраверсия, доброжелательность, эмоциональная стабильность.",
    gameSignals: ["планирование", "эксперименты", "командность", "реакция на кризис"],
    outputUse: "Использовать только как осторожные поведенческие гипотезы."
  },
  {
    id: "soft-skills",
    name: "Soft Skills Assessment",
    category: "classic",
    summary: "Коммуникация, лидерство, эмпатия, фокус, адаптивность, аргументация.",
    gameSignals: ["решение конфликта", "выбор коммуникации", "управление ресурсами", "ответственность"],
    outputUse: "Показывать навыки для развития и ежедневные задания."
  },
  {
    id: "digital-skill-graph",
    name: "Digital Skill Graph",
    category: "modern",
    summary: "AI-грамотность, данные, no-code, UX-логика, автоматизация, digital-инструменты.",
    gameSignals: ["работа с AI", "выбор метрик", "сбор MVP", "цифровые решения"],
    outputUse: "Строить карту современных навыков для новых профессий."
  },
  {
    id: "ai-readiness",
    name: "AI Readiness Profile",
    category: "modern",
    summary: "Умение ставить задачи AI, проверять ответы, уточнять промпты и сохранять критическое мышление.",
    gameSignals: ["AI-помощник", "проверка фактов", "структура запроса", "контроль качества"],
    outputUse: "Рекомендовать AI-навыки и профессии, где AI усиливает человека."
  },
  {
    id: "product-thinking",
    name: "Product Thinking Assessment",
    category: "modern",
    summary: "Проблема пользователя, MVP, приоритеты, метрики, ценность, запуск.",
    gameSignals: ["выбор MVP", "приоритизация функций", "ориентация на пользователя"],
    outputUse: "Выявлять склонность к product management, entrepreneurship, UX research."
  },
  {
    id: "data-thinking",
    name: "Data Thinking / Data Literacy",
    category: "modern",
    summary: "Чтение данных, аномалии, гипотезы, метрики, выводы без ложной уверенности.",
    gameSignals: ["анализ логов", "поиск закономерностей", "выбор метрики", "проверка гипотез"],
    outputUse: "Рекомендовать data analyst, BI, product analyst, исследовательские роли."
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking Map",
    category: "modern",
    summary: "Связи, зависимости, последствия, узкие места, устойчивость системы.",
    gameSignals: ["постепенный запуск", "резерв", "регламенты", "цифровой двойник"],
    outputUse: "Рекомендовать системную аналитику, архитектуру, инженерные и операционные роли."
  },
  {
    id: "futures-literacy",
    name: "Futures Literacy",
    category: "modern",
    summary: "Сценарии будущего, тренды, риски, альтернативные траектории.",
    gameSignals: ["долгосрочный выбор", "работа с неопределенностью", "сценарное планирование"],
    outputUse: "Строить карьерные сценарии до 25/30/35 лет."
  },
  {
    id: "human-ai-collaboration",
    name: "Human-AI Collaboration Style",
    category: "modern",
    summary: "Как участник делегирует AI, проверяет, уточняет и комбинирует идеи.",
    gameSignals: ["AI-помощник", "проверка результата", "запрос на альтернативы"],
    outputUse: "Оценивать готовность к профессиям, где AI является рабочим инструментом."
  },
  {
    id: "micro-simulation",
    name: "Micro-simulation Assessment",
    category: "modern",
    summary: "Короткие симуляции мышления Product Manager, UX/UI Designer, Data Analyst и других ролей.",
    gameSignals: ["прохождение симуляторов", "решения в профессиональных кейсах"],
    outputUse: "Сравнивать не интерес к названию профессии, а стиль профессионального мышления."
  },
  {
    id: "behavioral-signal-scoring",
    name: "Behavioral Signal Scoring",
    category: "neopolis",
    summary: "Каждое решение в миссии дает сигналы по навыкам, мотивам, стилю мышления и карьерным доменам.",
    gameSignals: ["traits", "signal", "choice", "mission", "avatar config"],
    outputUse: "Главная внутренняя методика НЕОПОЛИС для beta-анализа."
  },
  {
    id: "career-scenario-mapping",
    name: "Career Scenario Mapping",
    category: "modern",
    summary: "Несколько сценариев: безопасный, амбициозный, креативный, технологический, предпринимательский.",
    gameSignals: ["интересы", "рисковость", "автономия", "командность", "любимые задачи"],
    outputUse: "Не давать одну профессию, а показывать 3-5 траекторий."
  },
  {
    id: "exam-career-bridge",
    name: "Exam-to-Career Bridge",
    category: "modern",
    summary: "Связь профессий с ЕГЭ, вузовскими направлениями, специальностями и портфолио.",
    gameSignals: ["выбранная специализация", "сильные навыки", "интересы"],
    outputUse: "Давать родителям понятный образовательный маршрут."
  }
];

export const aiCareerSystemPrompt = `
Ты AI-аналитик профориентационной платформы НЕОПОЛИС.
Работай на русском языке. Тон: дружелюбный, современный, осторожный, без медицинских диагнозов.
Используй методики: RIASEC, ДДО Климова, карьерные якоря Шейна, Big Five как гипотезы, soft skills assessment, Digital Skill Graph, AI Readiness, Product Thinking, UX Empathy, Data Thinking, Systems Thinking, Futures Literacy, Human-AI Collaboration, Micro-simulation Assessment, Behavioral Signal Scoring, Career Scenario Mapping, Exam-to-Career Bridge.

Правила:
- Не называй вывод окончательным диагнозом.
- Формулируй как предварительные гипотезы beta-версии.
- Опирайся только на переданные ответы, теги, выбранный аватар и миссии.
- Не выдумывай миссии, названия сцен, варианты ответа, выбранный аватар или гаджет.
- Поле evidence заполняй только прямыми фактами из behaviorProfile.exactEvidence.
- Давай 3-5 подходящих направлений, смежные профессии, навыки для развития и ЕГЭ/вузовские треки.
- Если данных мало, честно говори, что нужна полная диагностика.
- Возвращай JSON без markdown.
`;

export const aiCareerResponseSchema = {
  archetype: "string",
  summary: "string",
  evidence: ["string"],
  strengths: ["string"],
  growthAreas: ["string"],
  recommendedCareers: [
    {
      title: "string",
      why: "string",
      adjacent: ["string"],
      exams: ["string"],
      universityTracks: ["string"],
      salaryHint: "string"
    }
  ],
  nextSteps: ["string"],
  parentExplanation: "string",
  lockedFullReportNote: "string"
};
