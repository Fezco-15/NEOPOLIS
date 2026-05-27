export type AvatarConfig = {
  archetype: string;
  visualStyle: string;
  appearance: {
    face: string;
    hair: string;
    hairColor: string;
    eyes: string;
    expression: string;
    outfit: string;
    accessories: string;
  };
  aura: string;
  gadget: string;
  interactionStyle: string;
  specialization: string;
};

export type AvatarOption = {
  id: string;
  name: string;
  description: string;
  bonuses?: string[];
  image?: string;
  color?: string;
  future?: string[];
};

export const archetypes: AvatarOption[] = [
  {
    id: "analyst",
    name: "Аналитик",
    description: "Замечает закономерности, любит точность, факты и точные модели.",
    bonuses: ["аналитика", "логика", "фокус"],
    image: "/avatar-analyst.svg"
  },
  {
    id: "creator",
    name: "Создатель",
    description: "Генерирует идеи, видит новые форматы и нестандартные решения.",
    bonuses: ["креативность", "storytelling", "визуальное мышление"],
    image: "/avatar-creator.svg"
  },
  {
    id: "researcher",
    name: "Исследователь",
    description: "Задает вопросы, ищет скрытые причины и проверяет гипотезы.",
    bonuses: ["исследование", "критическое мышление", "curiosity"],
    image: "/avatar-researcher.svg"
  },
  {
    id: "leader",
    name: "Лидер",
    description: "Берет ответственность, мотивирует команду и добивается результата.",
    bonuses: ["лидерство", "коммуникация", "стратегия"],
    image: "/avatar-leader.svg"
  },
  {
    id: "innovator",
    name: "Инноватор",
    description: "Любит технологии, эксперименты, AI и новые инструменты.",
    bonuses: ["digital skills", "AI-грамотность", "экспериментальность"],
    image: "/avatar-creator.svg"
  },
  {
    id: "strategist",
    name: "Стратег",
    description: "Видит последствия решений, строит планы и выбирает лучший путь.",
    bonuses: ["planning", "prioritization", "decision making"],
    image: "/avatar-analyst.svg"
  },
  {
    id: "architect",
    name: "Архитектор",
    description: "Любит строить системы, структуры и улучшать сложные процессы.",
    bonuses: ["systems thinking", "engineering thinking", "optimization"],
    image: "/avatar-researcher.svg"
  },
  {
    id: "diplomat",
    name: "Дипломат",
    description: "Чувствует людей, умеет договариваться и находить общий язык.",
    bonuses: ["empathy", "negotiation", "emotional intelligence"],
    image: "/avatar-leader.svg"
  }
];

export const visualStyles: AvatarOption[] = [
  { id: "techwear", name: "Techwear", description: "Технологичный, минималистичный, современный." },
  { id: "cyber", name: "Cyber", description: "Неон, digital future, яркие акценты." },
  { id: "creative", name: "Creative", description: "Цветной, свободный, креативный." },
  { id: "academic", name: "Academic", description: "Интеллектуальный, спокойный, аккуратный." },
  { id: "street", name: "Street", description: "Уличный, уверенный, современный." },
  { id: "minimal", name: "Minimal", description: "Чистый, спокойный, лаконичный." }
];

export const appearanceTabs = [
  {
    id: "face",
    name: "Лицо",
    options: ["Мягкий овал", "Острое лицо", "Круглое лицо", "Скульптурное лицо"]
  },
  {
    id: "hair",
    name: "Волосы",
    options: ["Короткие", "Волнистые", "Каре", "Собранные", "Объемные"]
  },
  {
    id: "eyes",
    name: "Глаза",
    options: ["Спокойные", "Внимательные", "Яркие", "Сфокусированные"]
  },
  {
    id: "outfit",
    name: "Одежда",
    options: ["Куртка техно", "Худи", "Пиджак", "Комбинезон", "Легкая мантия"]
  },
  {
    id: "accessories",
    name: "Аксессуары",
    options: ["Очки", "Наушники", "Digital backpack", "Браслет", "Без аксессуара"]
  }
] as const;

export const hairColors = ["Коралловый", "Темный", "Фиолетовый", "Золотой", "Бирюзовый"];
export const expressions = ["Спокойное", "Уверенное", "Любопытное", "Сосредоточенное"];

export const auras: AvatarOption[] = [
  { id: "cyan", name: "Cyan", description: "Аналитика и технологии", color: "#00D1C6" },
  { id: "purple", name: "Purple", description: "Креативность и воображение", color: "#A78BFA" },
  { id: "orange", name: "Orange", description: "Лидерство и энергия", color: "#FF9F43" },
  { id: "green", name: "Green", description: "Спокойствие и исследование", color: "#00D46A" },
  { id: "pink", name: "Pink", description: "Коммуникация и эмоции", color: "#FF6B9A" },
  { id: "gold", name: "Gold", description: "Амбиции и влияние", color: "#FFD166" }
];

export const gadgets: AvatarOption[] = [
  {
    id: "drone",
    name: "Дрон",
    description: "Собирает данные и помогает замечать закономерности.",
    bonuses: ["analytics"],
    image: "/gadget-drone.svg"
  },
  {
    id: "band",
    name: "Нейро-браслет",
    description: "Помогает держать фокус и отслеживать концентрацию.",
    bonuses: ["discipline"],
    image: "/gadget-band.svg"
  },
  {
    id: "tablet",
    name: "Планшет архитектора",
    description: "Помогает управлять задачами, проектами и идеями.",
    bonuses: ["systems thinking"],
    image: "/gadget-tablet.svg"
  },
  {
    id: "holo",
    name: "Голографический модуль",
    description: "Позволяет визуализировать идеи и создавать концепты.",
    bonuses: ["creativity"],
    image: "/gadget-holo.svg"
  },
  {
    id: "ai",
    name: "AI-помощник",
    description: "Дает подсказки в заданиях и помогает учиться быстрее.",
    bonuses: ["AI skills"],
    image: "/gadget-tablet.svg"
  },
  {
    id: "emotion",
    name: "Сканер эмоций",
    description: "Помогает понимать людей, эмоции и коммуникацию.",
    bonuses: ["empathy"],
    image: "/gadget-band.svg"
  }
];

export const interactionStyles: AvatarOption[] = [
  {
    id: "solo",
    name: "Действовать одному",
    description: "Я люблю сам разбираться в задачах и погружаться глубоко.",
    bonuses: ["focus", "independence"]
  },
  {
    id: "team",
    name: "Работать в команде",
    description: "Мне важно обсуждать, договариваться и делать вместе.",
    bonuses: ["communication", "leadership"]
  },
  {
    id: "experiment",
    name: "Экспериментировать",
    description: "Я люблю пробовать новое и искать нестандартные пути.",
    bonuses: ["creativity", "innovation"]
  },
  {
    id: "plan",
    name: "Планировать заранее",
    description: "Мне комфортнее, когда есть структура и понятный план.",
    bonuses: ["strategy", "discipline"]
  }
];

export const specializations: AvatarOption[] = [
  { id: "tech", name: "Технологии", description: "AI, робототехника, цифровые продукты.", future: ["AI-разработчик", "Робототехник", "Product Engineer"] },
  { id: "media", name: "Медиа", description: "Контент, коммуникации, креативные индустрии.", future: ["Медиапродюсер", "SMM-стратег", "Креативный директор"] },
  { id: "analytics", name: "Аналитика", description: "Данные, закономерности, решения.", future: ["Data Analyst", "BI-аналитик", "Исследователь продукта"] },
  { id: "business", name: "Бизнес", description: "Управление, финансы, рост проектов.", future: ["Product Manager", "Предприниматель", "Финансовый аналитик"] },
  { id: "design", name: "Дизайн", description: "UX/UI, визуальные системы, опыт пользователей.", future: ["UX/UI Designer", "Service Designer", "Motion Designer"] },
  { id: "science", name: "Наука", description: "Исследования, гипотезы, лаборатории.", future: ["Исследователь", "Биоинформатик", "R&D-специалист"] },
  { id: "psychology", name: "Психология", description: "Люди, эмоции, поведение, поддержка.", future: ["Психолог", "HR-специалист", "UX Researcher"] },
  { id: "entrepreneurship", name: "Предпринимательство", description: "Идеи, MVP, рынок, команда.", future: ["Основатель стартапа", "Growth Manager", "Product Lead"] }
];

export const defaultAvatarConfig: AvatarConfig = {
  archetype: "analyst",
  visualStyle: "techwear",
  appearance: {
    face: "Мягкий овал",
    hair: "Короткие",
    hairColor: "Темный",
    eyes: "Внимательные",
    expression: "Сосредоточенное",
    outfit: "Куртка техно",
    accessories: "Очки"
  },
  aura: "cyan",
  gadget: "drone",
  interactionStyle: "solo",
  specialization: "tech"
};

export function findAvatarOption(items: AvatarOption[], id: string) {
  return items.find((item) => item.id === id) ?? items[0];
}
