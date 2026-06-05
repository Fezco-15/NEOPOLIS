import { aiCareerResponseSchema, careerMethodologies } from "@/data/career-ai-knowledge";
import { buildEducationMatches, buildLaborMarketMatches, type EducationMatch, type LaborMarketMatch } from "@/data/career-enrichment";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { AccountState } from "@/components/game/account-registration";
import type { MissionAnswer } from "@/components/game/mission-screen";
import type { ArchetypeSummary, BranchId, DecisionRecord, GameScores } from "@/types/techno-quarter-game";

export type TechnoQuarterAiResult = {
  state: {
    selectedBranch: BranchId | null;
    scores: GameScores;
    decisions: DecisionRecord[];
    endingId: string | null;
  };
  summary: ArchetypeSummary;
};

export type CareerAiPayload = {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  technoQuarter?: TechnoQuarterAiResult | null;
};

export type CareerAiReport = {
  provider: "local" | "gigachat" | "gemini" | "groq";
  archetype: string;
  summary: string;
  evidence: string[];
  strengths: string[];
  growthAreas: string[];
  recommendedCareers: {
    title: string;
    why: string;
    adjacent: string[];
    exams: string[];
    universityTracks: string[];
    salaryHint: string;
  }[];
  educationMatches: EducationMatch[];
  laborMarket: LaborMarketMatch[];
  nextSteps: string[];
  parentExplanation: string;
  lockedFullReportNote: string;
};

function enrichmentSignals(payload: CareerAiPayload, report?: Partial<CareerAiReport>) {
  const profile = buildBehaviorProfile(payload);
  return [
    report?.archetype,
    report?.summary,
    ...(report?.strengths ?? []),
    ...(report?.recommendedCareers?.flatMap((career) => [career.title, career.why, ...career.adjacent, ...career.universityTracks]) ?? []),
    ...profile.topTraits.map((item) => item.trait),
    ...(payload.avatar?.profileSignals?.flatMap((signal) => [signal.value, signal.aiSignal, ...signal.qualities, ...signal.careerDomains]) ?? []),
    ...(payload.technoQuarter?.state.decisions.flatMap((decision) => [decision.choiceText, decision.aiSignal, ...decision.qualities, ...decision.professions]) ?? [])
  ].filter(Boolean) as string[];
}

export function buildBehaviorProfile(payload: CareerAiPayload) {
  const traitCounts = new Map<string, number>();
  for (const answer of payload.answers) {
    for (const trait of answer.traits) {
      traitCounts.set(trait, (traitCounts.get(trait) ?? 0) + 1);
    }
  }
  for (const decision of payload.technoQuarter?.state.decisions ?? []) {
    for (const quality of decision.qualities) {
      traitCounts.set(quality, (traitCounts.get(quality) ?? 0) + 1);
    }
    for (const [score, value] of Object.entries(decision.scores)) {
      const nextValue = value ?? 0;
      if (nextValue > 0) traitCounts.set(score, (traitCounts.get(score) ?? 0) + nextValue);
    }
  }
  for (const signal of payload.avatar?.profileSignals ?? []) {
    for (const quality of signal.qualities) {
      traitCounts.set(quality, (traitCounts.get(quality) ?? 0) + 1);
    }
    for (const domain of signal.careerDomains) {
      traitCounts.set(domain, (traitCounts.get(domain) ?? 0) + 1);
    }
  }

  const topTraits = [...traitCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([trait, count]) => ({ trait, count }));

  return {
    player: payload.account?.name ?? "Игрок",
    grade: payload.account?.grade ?? "не указан",
    avatar: payload.avatar,
    avatarSignals: buildAvatarSignals(payload.avatar),
    avatarProfileSignals: payload.avatar?.profileSignals ?? [],
    answers: payload.answers,
    technoQuarter: payload.technoQuarter
      ? {
          selectedBranch: payload.technoQuarter.state.selectedBranch,
          endingId: payload.technoQuarter.state.endingId,
          scores: payload.technoQuarter.state.scores,
          decisions: payload.technoQuarter.state.decisions,
          summary: payload.technoQuarter.summary
        }
      : null,
    exactEvidence: buildExactEvidence(payload.answers),
    missionLabEvidence: buildTechnoQuarterEvidence(payload.technoQuarter?.state.decisions ?? []),
    totalAnswers: payload.answers.length,
    totalTechnoQuarterDecisions: payload.technoQuarter?.state.decisions.length ?? 0,
    topTraits,
    methodologyContext: careerMethodologies
  };
}

export function buildAvatarSignals(avatar: AvatarState | null) {
  if (!avatar) return [];
  const baseSignals = [
    avatar.style ? `Архетип аватара: ${avatar.style}` : null,
    avatar.gadget ? `Гаджет: ${avatar.gadget}` : null,
    avatar.approach ? `Стиль взаимодействия: ${avatar.approach}` : null,
    avatar.specialization ? `Стартовая специализация: ${avatar.specialization}` : null
  ].filter(Boolean) as string[];
  const profileSignals = avatar.profileSignals?.map(
    (signal) => `${signal.label}: выбран вариант «${signal.value}». Сигнал: ${signal.aiSignal} Качества: ${signal.qualities.join(", ") || "не указаны"}. Профориентационные домены: ${signal.careerDomains.join(", ") || "не указаны"}.`
  ) ?? [];
  return [...baseSignals, ...profileSignals];
}

export function buildExactEvidence(answers: MissionAnswer[]) {
  return answers.map((answer) => `${answer.sceneTitle}: выбран вариант «${answer.choice}». Сигнал: ${answer.signal}`);
}

export function buildTechnoQuarterEvidence(decisions: DecisionRecord[]) {
  return decisions.map((decision) => {
    const qualities = decision.qualities.length ? ` Качества: ${decision.qualities.join(", ")}.` : "";
    const professions = decision.professions.length ? ` Профессии-гипотезы: ${decision.professions.join(", ")}.` : "";
    return `${decision.sceneId}: выбран вариант «${decision.choiceText}». Сигнал: ${decision.aiSignal}.${qualities}${professions}`;
  });
}

export function normalizeAiReport(report: CareerAiReport, payload: CareerAiPayload): CareerAiReport {
  const exactEvidence = [...buildAvatarSignals(payload.avatar), ...buildExactEvidence(payload.answers), ...buildTechnoQuarterEvidence(payload.technoQuarter?.state.decisions ?? [])];
  const signals = enrichmentSignals(payload, report);
  return {
    ...report,
    evidence: exactEvidence.length ? exactEvidence : report.evidence,
    strengths: Array.isArray(report.strengths) ? report.strengths : [],
    growthAreas: Array.isArray(report.growthAreas) ? report.growthAreas : [],
    recommendedCareers: Array.isArray(report.recommendedCareers) ? report.recommendedCareers : [],
    educationMatches: buildEducationMatches(signals),
    laborMarket: buildLaborMarketMatches(signals),
    nextSteps: Array.isArray(report.nextSteps) ? report.nextSteps : []
  };
}

function buildLocalRecommendedCareers(profile: {
  hasEngineering: boolean;
  hasData: boolean;
  hasProduct: boolean;
  hasLeadership: boolean;
  hasCreative: boolean;
}): CareerAiReport["recommendedCareers"] {
  const engineering = [
    {
      title: "Инженер-программист / Разработчик ПО",
      why: "Подходит, если сильнее всего проявились системность, техническая устойчивость, контроль рисков и желание строить работающие решения.",
      adjacent: ["Backend-разработчик", "QA Automation", "Системный аналитик"],
      exams: ["профильная математика", "информатика", "русский язык"],
      universityTracks: ["программная инженерия", "информатика и вычислительная техника", "информационные системы"],
      salaryHint: "Junior: 80-150 тыс. руб.; Middle: 170-320 тыс. руб.; Senior: 350+ тыс. руб."
    },
    {
      title: "Инженер по информационной безопасности",
      why: "Хороший смежный путь для тех, кто в игре выбирает надежность, защиту инфраструктуры и аккуратное восстановление систем.",
      adjacent: ["SOC-аналитик", "DevSecOps", "Системный администратор"],
      exams: ["профильная математика", "информатика", "русский язык"],
      universityTracks: ["информационная безопасность", "компьютерная безопасность", "безопасность информационных систем"],
      salaryHint: "Junior: 90-160 тыс. руб.; Middle: 180-330 тыс. руб.; Senior: 380+ тыс. руб."
    },
    {
      title: "Системный аналитик",
      why: "Подходит как мост между инженерией и продуктом: нужно понимать систему, требования и последствия технических решений.",
      adjacent: ["Бизнес-аналитик", "Solution Analyst", "Product Owner"],
      exams: ["профильная математика", "информатика", "русский язык"],
      universityTracks: ["прикладная информатика", "информационные системы", "бизнес-информатика"],
      salaryHint: "Junior: 80-140 тыс. руб.; Middle: 170-300 тыс. руб.; Senior: 320+ тыс. руб."
    }
  ];

  const analytics = [
    {
      title: "Data / Product Analyst",
      why: "Подходит, если решения строятся от фактов: собрать данные, найти закономерность, проверить гипотезу и объяснить вывод.",
      adjacent: ["BI-аналитик", "Маркетинговый аналитик", "Системный аналитик"],
      exams: ["профильная математика", "информатика", "русский язык"],
      universityTracks: ["прикладная информатика", "бизнес-информатика", "анализ данных"],
      salaryHint: "Junior: 90-150 тыс. руб.; Middle: 180-320 тыс. руб.; Senior: 350+ тыс. руб."
    },
    {
      title: "Экономист-аналитик / Финансовый аналитик",
      why: "Более понятная стартовая траектория для школьника: математика, экономика, данные, отчеты и решения для бизнеса.",
      adjacent: ["Риск-аналитик", "Бизнес-аналитик", "Продуктовый аналитик"],
      exams: ["профильная математика", "обществознание", "русский язык"],
      universityTracks: ["экономика", "финансы и кредит", "бизнес-аналитика"],
      salaryHint: "Junior: 70-130 тыс. руб.; Middle: 150-260 тыс. руб.; Senior: 300+ тыс. руб."
    },
    {
      title: "Системный аналитик",
      why: "Сильная смежная роль, если нравится переводить хаос фактов и требований в понятную структуру для команды разработки.",
      adjacent: ["Бизнес-аналитик", "Технический аналитик", "Product Owner"],
      exams: ["профильная математика", "информатика", "русский язык"],
      universityTracks: ["прикладная информатика", "информационные системы", "системный анализ"],
      salaryHint: "Junior: 80-140 тыс. руб.; Middle: 170-300 тыс. руб.; Senior: 320+ тыс. руб."
    }
  ];

  const product = [
    {
      title: "Project / Product Manager",
      why: "Подходит, если в выборах важны команда, приоритеты, коммуникация, результат и ответственность за общий ход решения.",
      adjacent: ["Product Owner", "Scrum Master", "Growth Manager"],
      exams: ["профильная математика", "обществознание", "русский язык", "информатика для digital-треков"],
      universityTracks: ["менеджмент", "бизнес-информатика", "управление проектами"],
      salaryHint: "Junior: 90-160 тыс. руб.; Middle: 200-350 тыс. руб.; Senior/Lead: 400+ тыс. руб."
    },
    {
      title: "Бизнес-аналитик",
      why: "Хороший мост от общего управления к конкретике: разбираться в процессах, договариваться с людьми и описывать требования.",
      adjacent: ["Системный аналитик", "Process Manager", "Product Analyst"],
      exams: ["профильная математика", "обществознание", "русский язык"],
      universityTracks: ["бизнес-информатика", "менеджмент", "экономика"],
      salaryHint: "Junior: 80-140 тыс. руб.; Middle: 160-280 тыс. руб.; Senior: 320+ тыс. руб."
    },
    {
      title: "HR / People Partner в digital-командах",
      why: "Смежный путь, если особенно проявлены эмпатия, командность, объяснение решений и работа с мотивацией людей.",
      adjacent: ["HR-аналитик", "Learning Manager", "Организационный психолог"],
      exams: ["русский язык", "обществознание", "биология/математика по вузу"],
      universityTracks: ["управление персоналом", "психология", "менеджмент"],
      salaryHint: "Junior: 70-120 тыс. руб.; Middle: 140-240 тыс. руб.; Senior/Lead: 280+ тыс. руб."
    }
  ];

  const creative = [
    {
      title: "UX/UI Designer",
      why: "Подходит, если выборы связаны с образом, удобством, реакцией людей, визуальным прототипом и понятной коммуникацией.",
      adjacent: ["Product Designer", "UX Researcher", "Service Designer"],
      exams: ["русский язык", "обществознание/информатика", "творческий конкурс в части вузов"],
      universityTracks: ["дизайн", "прикладная информатика в дизайне", "медиа"],
      salaryHint: "Junior: 80-140 тыс. руб.; Middle: 170-300 тыс. руб.; Lead: 330+ тыс. руб."
    },
    {
      title: "Медиа-продюсер / Контент-стратег",
      why: "Более гуманитарная траектория: упаковывать смысл, работать с аудиторией, текстом, визуалом и цифровыми каналами.",
      adjacent: ["SMM-стратег", "UX Writer", "Креативный продюсер"],
      exams: ["русский язык", "обществознание", "литература/иностранный язык по вузу"],
      universityTracks: ["медиакоммуникации", "реклама и PR", "журналистика"],
      salaryHint: "Junior: 60-110 тыс. руб.; Middle: 130-240 тыс. руб.; Senior/Lead: 280+ тыс. руб."
    },
    {
      title: "UX Researcher",
      why: "Смещает креативность в исследование: понимать людей, проводить интервью, проверять прототипы и улучшать продукт.",
      adjacent: ["Социолог-исследователь", "Product Analyst", "Методист EdTech"],
      exams: ["русский язык", "обществознание", "математика/биология по вузу"],
      universityTracks: ["психология", "социология", "управление цифровым продуктом"],
      salaryHint: "Junior: 80-130 тыс. руб.; Middle: 160-280 тыс. руб.; Senior: 300+ тыс. руб."
    }
  ];

  if (profile.hasEngineering) return engineering;
  if (profile.hasCreative) return creative;
  if (profile.hasLeadership || profile.hasProduct) return product;
  if (profile.hasData) return analytics;
  return analytics;
}

export function buildLocalCareerReport(payload: CareerAiPayload): CareerAiReport {
  const profile = buildBehaviorProfile(payload);
  const traits = profile.topTraits.map((item) => item.trait);
  const traitScore = (names: string[]) =>
    profile.topTraits.reduce((sum, item) => sum + (names.includes(item.trait) ? item.count : 0), 0);
  const dataScore = traitScore(["analytics", "data", "research", "аналитика", "анализ данных", "гипотезы", "внимательность", "работа с данными", "системность", "моделирование"]);
  const productScore = traitScore(["product", "management", "business", "UX", "продукт", "коммуникация", "приоритеты", "прототипирование", "командность"]);
  const leadershipScore = traitScore(["leadership", "лидерство", "менеджмент", "командность", "ответственность", "коммуникация", "приоритизация"]);
  const engineeringScore = traitScore(["engineering", "software", "security", "инженерное мышление", "безопасность", "контроль рисков", "техническая ответственность"]);
  const creativeScore = traitScore(["creative", "design", "media", "креативность", "эмпатия", "визуальное мышление", "UX", "прототипирование"]);
  const maxDomainScore = Math.max(dataScore, productScore, leadershipScore, engineeringScore, creativeScore);
  const hasEngineering = engineeringScore === maxDomainScore && engineeringScore > 0;
  const hasCreative = creativeScore === maxDomainScore && creativeScore > 0;
  const hasLeadership = leadershipScore === maxDomainScore && leadershipScore > 0;
  const hasProduct = productScore === maxDomainScore && productScore > 0;
  const hasData = dataScore === maxDomainScore && dataScore > 0;

  const archetype = hasLeadership
    ? "Стратег-коммуникатор"
    : hasProduct
      ? "Продуктовый исследователь"
      : hasEngineering
        ? "Системный инженер"
      : hasCreative
        ? "Креативный исследователь опыта"
      : hasData
        ? "Системный аналитик"
        : "Стратег-исследователь";

  const baseReport: CareerAiReport = {
    provider: "local",
    archetype,
    summary:
      payload.technoQuarter
        ? `AI-анализ первой миссии видит профиль «${payload.technoQuarter.summary.primary}»: игрок проявил повторяющиеся сигналы в выборе аватара, ветке ${payload.technoQuarter.state.selectedBranch ?? "сюжета"} и ${payload.technoQuarter.state.decisions.length} сюжетных решениях. Это предварительная профориентационная гипотеза, которую стоит уточнить следующими миссиями.`
        : "AI-анализ beta-миссий показывает склонность к задачам, где нужно разбирать причины, видеть систему и принимать решения в условиях ограниченных ресурсов. Это предварительная гипотеза, которую стоит уточнить в полной диагностике.",
    evidence: [...buildAvatarSignals(payload.avatar), ...buildExactEvidence(payload.answers), ...buildTechnoQuarterEvidence(payload.technoQuarter?.state.decisions ?? [])].slice(0, 8),
    strengths: Array.from(new Set([...traits, ...(payload.technoQuarter?.summary.strengths ?? []), "системное мышление", "самостоятельность"])).slice(0, 8),
    growthAreas: ["коммуникация результата", "портфолио проектов", "проверка гипотез на данных"],
    recommendedCareers: buildLocalRecommendedCareers({ hasEngineering, hasData, hasProduct, hasLeadership, hasCreative }),
    educationMatches: [],
    laborMarket: [],
    nextSteps: [
      "Пройти все 3 beta-миссии, чтобы накопить больше поведенческих сигналов.",
      "Попробовать симуляторы Product Manager, UX/UI Designer и Data Analyst.",
      "Собрать мини-проект в портфолио: анализ данных, прототип продукта или исследование пользователя."
    ],
    parentExplanation:
      "Результат не является диагнозом. Он показывает, какие способы мышления ребенок уже проявляет в действиях: анализ, системность, коммуникацию, работу с неопределенностью.",
    lockedFullReportNote:
      "Полный отчет должен дополнить beta-сигналы: итоговой карьерной картой, вузами, ЕГЭ, зарплатными сценариями и AI-планом развития."
  };
  return normalizeAiReport(baseReport, payload);
}

export function buildGigachatUserPrompt(payload: CareerAiPayload) {
  return JSON.stringify(
    {
      task: "Сделай предварительный профориентационный AI-анализ beta-игры НЕОПОЛИС.",
      responseSchema: aiCareerResponseSchema,
      behaviorProfile: buildBehaviorProfile(payload)
    },
    null,
    2
  );
}
