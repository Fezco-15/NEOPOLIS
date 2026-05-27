import { aiCareerResponseSchema, careerMethodologies } from "@/data/career-ai-knowledge";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { AccountState } from "@/components/game/account-registration";
import type { MissionAnswer } from "@/components/game/mission-screen";

export type CareerAiPayload = {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
};

export type CareerAiReport = {
  provider: "local" | "gigachat" | "gemini";
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
  nextSteps: string[];
  parentExplanation: string;
  lockedFullReportNote: string;
};

export function buildBehaviorProfile(payload: CareerAiPayload) {
  const traitCounts = new Map<string, number>();
  for (const answer of payload.answers) {
    for (const trait of answer.traits) {
      traitCounts.set(trait, (traitCounts.get(trait) ?? 0) + 1);
    }
  }

  const topTraits = [...traitCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([trait, count]) => ({ trait, count }));

  return {
    player: payload.account?.name ?? "Игрок",
    grade: payload.account?.grade ?? "не указан",
    avatar: payload.avatar,
    answers: payload.answers,
    exactEvidence: buildExactEvidence(payload.answers),
    totalAnswers: payload.answers.length,
    topTraits,
    methodologyContext: careerMethodologies
  };
}

export function buildExactEvidence(answers: MissionAnswer[]) {
  return answers.map((answer) => `${answer.sceneTitle}: выбран вариант «${answer.choice}». Сигнал: ${answer.signal}`);
}

export function normalizeAiReport(report: CareerAiReport, payload: CareerAiPayload): CareerAiReport {
  const exactEvidence = buildExactEvidence(payload.answers);
  return {
    ...report,
    evidence: exactEvidence.length ? exactEvidence : report.evidence,
    strengths: Array.isArray(report.strengths) ? report.strengths : [],
    growthAreas: Array.isArray(report.growthAreas) ? report.growthAreas : [],
    recommendedCareers: Array.isArray(report.recommendedCareers) ? report.recommendedCareers : [],
    nextSteps: Array.isArray(report.nextSteps) ? report.nextSteps : []
  };
}

export function buildLocalCareerReport(payload: CareerAiPayload): CareerAiReport {
  const profile = buildBehaviorProfile(payload);
  const traits = profile.topTraits.map((item) => item.trait);
  const hasData = traits.some((trait) => ["data", "аналитика", "анализ данных", "системность", "моделирование"].includes(trait));
  const hasProduct = traits.some((trait) => ["UX", "продукт", "коммуникация", "приоритеты", "прототипирование"].includes(trait));
  const hasLeadership = traits.some((trait) => ["лидерство", "менеджмент", "командность", "ответственность"].includes(trait));

  const archetype = hasLeadership
    ? "Стратег-коммуникатор"
    : hasProduct
      ? "Продуктовый исследователь"
      : hasData
        ? "Системный аналитик"
        : "Стратег-исследователь";

  return {
    provider: "local",
    archetype,
    summary:
      "AI-анализ beta-миссий показывает склонность к задачам, где нужно разбирать причины, видеть систему и принимать решения в условиях ограниченных ресурсов. Это предварительная гипотеза, которую стоит уточнить в полной диагностике.",
    evidence: buildExactEvidence(payload.answers).slice(0, 6),
    strengths: Array.from(new Set([...traits, "системное мышление", "самостоятельность"])).slice(0, 8),
    growthAreas: ["коммуникация результата", "портфолио проектов", "проверка гипотез на данных"],
    recommendedCareers: [
      {
        title: "Data / Product Analyst",
        why: "Подходит, если нравится искать закономерности, проверять гипотезы и помогать команде принимать решения.",
        adjacent: ["BI-аналитик", "UX Researcher", "Маркетинговый аналитик"],
        exams: ["профильная математика", "информатика", "русский язык"],
        universityTracks: ["прикладная информатика", "бизнес-информатика", "анализ данных"],
        salaryHint: "Junior: 70-120 тыс. руб.; Middle: 150-250 тыс. руб.; Senior: 250+ тыс. руб. в зависимости от рынка и портфолио."
      },
      {
        title: "Product Manager",
        why: "Подходит, если участник думает о пользователях, приоритетах, MVP и последствиях решений.",
        adjacent: ["Project Manager", "Product Owner", "Growth Manager"],
        exams: ["математика", "обществознание", "русский язык", "информатика для digital-треков"],
        universityTracks: ["менеджмент", "бизнес-информатика", "цифровые продукты"],
        salaryHint: "Junior: 90-140 тыс. руб.; Middle: 180-300 тыс. руб.; Senior/Lead: 300+ тыс. руб."
      },
      {
        title: "Системный аналитик",
        why: "Подходит, если сильны структурирование, причинно-следственное мышление и перевод хаоса в понятную схему.",
        adjacent: ["Бизнес-аналитик", "Solution Architect", "Технический аналитик"],
        exams: ["профильная математика", "информатика", "русский язык"],
        universityTracks: ["программная инженерия", "информационные системы", "системный анализ"],
        salaryHint: "Junior: 80-130 тыс. руб.; Middle: 160-280 тыс. руб.; Senior: 300+ тыс. руб."
      }
    ],
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
