"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle2, Lock, Sparkles, Zap } from "lucide-react";
import { careerReport, betaMissions } from "@/data/site";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { MissionAnswer } from "@/components/game/mission-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AiCareerAnalysis } from "@/components/game/ai-career-analysis";

function getTopTraits(answers: MissionAnswer[]) {
  const counts = new Map<string, number>();
  for (const trait of answers.flatMap((answer) => answer.traits)) {
    counts.set(trait, (counts.get(trait) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([trait]) => trait);
}

const lockedBlocks = [
  "итоговая профессия",
  "карьерная карта до 35 лет",
  "рекомендации вузов",
  "AI-анализ профориентации",
  "зарплатные прогнозы",
  "персональный план ЕГЭ"
];

export function ResultScreen({
  account,
  avatar,
  answers,
  onBackToMap,
  onOpenSubscription,
  showAiForTesting = false
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  onBackToMap: () => void;
  onOpenSubscription: () => void;
  showAiForTesting?: boolean;
}) {
  const topTraits = getTopTraits(answers);
  const totalXp = betaMissions.reduce((sum, mission) => sum + mission.xp, 0);
  const previewCareers = ["системная аналитика", "data-направление", "product/UX research", "цифровые коммуникации"];
  const adjacentAreas = ["продуктовый менеджмент", "бизнес-анализ", "EdTech-дизайн", "BI-аналитика", "медиааналитика"];

  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <Image src="/neopolis-map-bg.png" alt="Город НЕОПОЛИС" fill className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-black/[0.65] backdrop-blur-[2px]" />
      <div className="container relative">
        <Button onClick={onBackToMap} variant="secondary" className="mb-6">
          <ArrowLeft className="size-4" />
          Вернуться на карту
        </Button>

        <div className="mb-8 grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {avatar && (
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-[#FF6B6B]/25">
                    <Image src={avatar.styleImage} alt={avatar.style} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <Badge>Предварительная профориентация открыта</Badge>
                  <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                    {account?.name || "Игрок"}, beta-диагностика завершена
                  </h1>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="rounded-2xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/10 p-4">
                  <p className="text-slate-300">Предварительный архетип</p>
                  <p className="mt-1 text-xl font-black text-[#FFF3E0]">{careerReport.archetype}</p>
                </div>
                <div className="rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 p-4">
                  <p className="text-slate-300">Бета-диагностика</p>
                  <p className="mt-1 font-bold text-white">3 задания, 15 решений, {totalXp} XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-black text-white">Полный предварительный результат</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{careerReport.about}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...new Set([...topTraits, ...careerReport.strengths])].slice(0, 10).map((trait) => (
                  <Badge key={trait}>{trait}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="size-6 text-[#FF6B6B]" />
                <h2 className="text-2xl font-black text-white">Предварительные направления</h2>
              </div>
              <p className="mt-4 leading-7 text-slate-300">
                Это не финальный диагноз, а первые карьерные гипотезы по твоим решениям в бесплатных миссиях.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {previewCareers.map((career) => (
                  <div key={career} className="flex items-center gap-3 rounded-2xl border border-[#FF6B6B]/[0.18] bg-[#FF6B6B]/[0.08] p-3 text-sm font-semibold text-[#FFF3E0]">
                    <CheckCircle2 className="size-5 shrink-0 text-[#FF6B6B]" />
                    {career}
                  </div>
                ))}
              </div>
              <h3 className="mt-7 font-black text-white">Смежные области, которые стоит попробовать</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {adjacentAreas.map((area) => (
                  <Badge key={area} variant="violet">{area}</Badge>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#FFD166]/20 bg-[#FFD166]/10 p-4">
                <h3 className="font-black text-white">Предварительная рекомендация</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Сейчас видно направление интереса и стиль мышления. Для точной профессии, вузов,
                  ЕГЭ, зарплатных сценариев и AI-карты развития нужна полная подписка.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A78BFA]/25">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Lock className="size-6 text-[#A78BFA]" />
                <h2 className="text-2xl font-black text-white">Полный отчет закрыт</h2>
              </div>
              <p className="mt-4 leading-7 text-slate-300">
                Бесплатная версия показывает предварительную профориентацию. Полная подписка открывает
                глубокий AI-анализ, точные профессии, вузы, ЕГЭ, зарплаты и карьерную карту.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {lockedBlocks.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#A78BFA]/[0.18] bg-[#A78BFA]/[0.08] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <Lock className="size-4 text-[#A78BFA]" />
                      {item}
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800" />
                    <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-800" />
                  </div>
                ))}
              </div>
              <Button onClick={onOpenSubscription} className="mt-6 w-full" size="lg">
                  Открыть полную версию
                  <ArrowRight className="size-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Что делать сейчас</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {careerReport.nextSteps.map((step) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-200">
                  <Zap className="mt-0.5 size-4 shrink-0 text-[#FF6B6B]" />
                  {step}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {showAiForTesting ? (
          <Card className="mt-6 border-[#00D1C6]/35">
            <CardContent className="p-6 sm:p-8">
              <Badge>Тестовый режим</Badge>
              <h2 className="mt-4 text-2xl font-black text-white">AI-анализ открыт для проверки</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Этот блок получает 15 тестовых решений из первых трех beta-миссий. Так можно быстро проверить, что нейросеть анализирует реальные выборы игрока.
              </p>
              <AiCareerAnalysis account={account} avatar={avatar} answers={answers} />
            </CardContent>
          </Card>
        ) : (
          <PremiumAiAnalysisGate account={account} avatar={avatar} answers={answers} onOpenSubscription={onOpenSubscription} />
        )}
      </div>
    </div>
  );
}

function PremiumAiAnalysisGate({
  account,
  avatar,
  answers,
  onOpenSubscription
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  onOpenSubscription: () => void;
}) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#A78BFA]/25">
      <div className="pointer-events-none select-none blur-[4px] opacity-55">
        <AiCareerAnalysis account={account} avatar={avatar} answers={answers} />
      </div>
      <div className="absolute inset-0 grid place-items-center bg-[#1B0F33]/60 p-6 text-center backdrop-blur-[3px]">
        <div className="max-w-xl">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-[#FFD166]/35 bg-[#FFD166]/12 text-[#FFD166]">
            <BrainCircuit className="size-8" />
          </div>
          <h2 className="mt-5 text-3xl font-black text-white">AI-анализ профориентации по подписке</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Нейросеть разбирает все решения, стиль мышления, карьерные риски, профессии,
            ЕГЭ, вузы и зарплатные сценарии. Это часть полного отчета НЕОПОЛИС.
          </p>
          <Button onClick={onOpenSubscription} className="mt-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
              Открыть полную подписку
              <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}


