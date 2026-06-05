"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AccountRegistration, type AccountState } from "@/components/game/account-registration";
import { AvatarCreator, type AvatarState } from "@/components/game/avatar-creator";
import { GameIntro } from "@/components/game/game-intro";
import { GameMap } from "@/components/game/game-map";
import type { MissionAnswer } from "@/components/game/mission-screen";
import { ResultScreen } from "@/components/game/result-screen";
import { careerMissions } from "@/data/site";
import { PlatformShell } from "@/components/platform/platform-shell";
import type { PlatformView } from "@/data/platform";
import { SubscriptionFlow, type SubscriptionState } from "@/components/game/subscription-flow";
import { SubscriptionSuccess } from "@/components/game/subscription-success";
import { FullReportScreen } from "@/components/game/full-report-screen";
import { TechnoQuarterApp, type TechnoQuarterCompletion } from "@/components/mission-lab/techno-quarter-app";
import { AiCareerAnalysis } from "@/components/game/ai-career-analysis";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Stage = "intro" | "register" | "avatar" | "technoQuarterMission" | "missionComplete" | "primaryAiAnalysis" | "app" | "report" | "subscription" | "subscriptionSuccess" | "fullReport";

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 }
};

const missionCompleteSections = [
  ["МИССИЯ ЗАВЕРШЕНА"],
  ["ТехноКвартал пережил кризис.", "Свет снова горит в окнах.", "Дроны вернулись в небо.", "Системы работают."],
  ["Но главный вопрос так и остался без ответа.", "Что делает человека человеком?", "И что происходит, когда машина начинает задавать те же вопросы?"],
  ["Сегодня вы приняли десятки решений.", "Некоторые были быстрыми.", "Некоторые — сложными.", "Некоторые повлияли на судьбы людей.", "И каждое из них оставило след.", "Не в городе.", "В вас."],
  ["━━━━━━━━━━━━━━", "ПЕРВИЧНЫЙ АНАЛИЗ ЗАВЕРШЁН"],
  [
    "Во время этой миссии система наблюдала не за тем, ЧТО вы выбирали.",
    "Она анализировала КАК вы думаете.",
    "Как принимаете решения под давлением.",
    "Как реагируете на неопределённость.",
    "Что для вас важнее — люди, данные, технологии или ответственность.",
    "На основе ваших действий уже начинает формироваться ваш профессиональный профиль.",
    "Но сейчас картина ещё неполная.",
    "Для точного определения ваших сильных сторон необходимо пройти остальные районы Неополиса-9."
  ],
  ["━━━━━━━━━━━━━━", "ЭТО ТОЛЬКО НАЧАЛО"],
  [
    "Неополис-9 всё ещё хранит множество тайн.",
    "Кортекс не дал всех ответов.",
    "Эрра знает больше, чем говорит.",
    "А некоторые события сегодняшней ночи только начинают складываться в единую картину.",
    "Город ждёт вашего возвращения."
  ]
];

function MissionCompleteScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1B0F33] text-white">
      <Image src="/mission-lab/engineer/13-ending-guardian.png" alt="ТехноКвартал после кризиса" fill sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,20,.72),rgba(27,15,51,.96))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-16 text-center sm:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-[34px] border border-white/15 bg-[#100821]/72 p-5 shadow-[0_0_90px_rgba(167,139,250,.2)] backdrop-blur-2xl sm:p-9">
          <Badge className="border-[#FFD166]/35 bg-[#FFD166]/12 text-[#FFD166]">ТехноКвартал / финал миссии</Badge>
          <div className="mt-7 grid gap-7">
            {missionCompleteSections.map((section, sectionIndex) => (
              <motion.div
                key={section.join("-")}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.08 }}
                className="grid gap-3"
              >
                {section.map((line) => {
                  const isHero = line === "МИССИЯ ЗАВЕРШЕНА";
                  const isHeading = line === "ПЕРВИЧНЫЙ АНАЛИЗ ЗАВЕРШЁН" || line === "ЭТО ТОЛЬКО НАЧАЛО";
                  const isDivider = line === "━━━━━━━━━━━━━━";
                  return (
                    <p
                      key={line}
                      className={
                        isHero
                          ? "text-4xl font-black tracking-wide text-white sm:text-6xl"
                          : isHeading
                            ? "text-2xl font-black text-[#FFD166] sm:text-3xl"
                            : isDivider
                              ? "font-black tracking-[0.24em] text-[#A78BFA]/70"
                              : "text-lg leading-8 text-[#F7F0FF]/82 sm:text-xl"
                      }
                    >
                      {line}
                    </p>
                  );
                })}
              </motion.div>
            ))}
          </div>
          <Button onClick={onContinue} size="lg" className="mt-10">
            Перейти к первичному AI-анализу
          </Button>
        </motion.div>
      </section>
    </main>
  );
}

function PrimaryAiAnalysisScreen({
  account,
  avatar,
  answers,
  technoQuarter,
  onContinue
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  technoQuarter: TechnoQuarterCompletion | null;
  onContinue: () => void;
}) {
  const [ready, setReady] = useState(false);
  const handleAiReady = useCallback(() => setReady(true), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1B0F33] py-16 text-white">
      <Image src="/neopolis-map-bg.png" alt="Неополис-9" fill sizes="100vw" className="object-cover opacity-35" />
      <div className="absolute inset-0 bg-black/[0.72] backdrop-blur-[2px]" />
      <section className="container relative">
        <div className="mx-auto max-w-6xl">
          <Badge className="border-[#00D1C6]/35 bg-[#00D1C6]/10 text-[#B8FFFB]">Первичная профориентация</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            AI собирает первые контуры твоего профессионального профиля
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Профиль строится на выбранном аватаре и решениях первой миссии. Это не финальный диагноз, а качественная стартовая гипотеза перед городом.
          </p>

          <AiCareerAnalysis
            account={account}
            avatar={avatar}
            answers={answers}
            technoQuarter={technoQuarter}
            onReady={handleAiReady}
          />

          <div className="mt-8 flex justify-center">
            <Button onClick={onContinue} disabled={!ready} size="lg">
              {ready ? "Продолжить путь →" : "AI анализирует ваш путь"}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function GamePage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [account, setAccount] = useState<AccountState | null>(null);
  const [avatar, setAvatar] = useState<AvatarState | null>(null);
  const [activeMissionId, setActiveMissionId] = useState(careerMissions[0].id);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<MissionAnswer[]>([]);
  const [technoQuarterResult, setTechnoQuarterResult] = useState<TechnoQuarterCompletion | null>(null);
  const [activeView, setActiveView] = useState<PlatformView>("home");
  const [subscription, setSubscription] = useState<SubscriptionState>({ status: "free", plan: null, start: null, end: null });
  const [fullReportUnlocked, setFullReportUnlocked] = useState(false);

  useEffect(() => {
    const status = window.localStorage.getItem("neopolis-subscription-status");
    if (status === "active") {
      setSubscription({
        status: "active",
        plan: window.localStorage.getItem("neopolis-subscription-plan") as SubscriptionState["plan"],
        start: window.localStorage.getItem("neopolis-subscription-start"),
        end: window.localStorage.getItem("neopolis-subscription-end")
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [stage, activeMissionId]);

  const subscriptionActive = subscription.status === "active";
  const allMissionsCompleted = completedMissionIds.length >= careerMissions.length;
  const firstMissionId = careerMissions[0]?.id ?? "transport";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute left-1/2 top-16 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#FF6B6B]/[0.12] blur-3xl" />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${stage}-${activeMissionId}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
        >
          {stage === "intro" && <GameIntro onStart={() => setStage("register")} />}
          {stage === "register" && (
            <AccountRegistration
              onComplete={(nextAccount) => {
                setAccount(nextAccount);
                setStage("avatar");
              }}
            />
          )}
          {stage === "avatar" && (
            <AvatarCreator
              onComplete={(nextAvatar) => {
                setAvatar(nextAvatar);
                setActiveView("home");
                setStage("technoQuarterMission");
              }}
            />
          )}
          {stage === "technoQuarterMission" && (
            <TechnoQuarterApp
              mode="embedded"
              onComplete={(result) => {
                setTechnoQuarterResult(result);
                setCompletedMissionIds((current) => (current.includes(firstMissionId) ? current : [...current, firstMissionId]));
                setActiveMissionId(firstMissionId);
                setActiveView("home");
                setStage("missionComplete");
              }}
            />
          )}
          {stage === "missionComplete" && (
            <MissionCompleteScreen onContinue={() => setStage("primaryAiAnalysis")} />
          )}
          {stage === "primaryAiAnalysis" && (
            <PrimaryAiAnalysisScreen
              account={account}
              avatar={avatar}
              answers={answers}
              technoQuarter={technoQuarterResult}
              onContinue={() => setStage("app")}
            />
          )}
          {stage === "app" && (
            <PlatformShell
              account={account}
                avatar={avatar}
                activeView={activeView}
                subscription={subscription}
                fullReportUnlocked={fullReportUnlocked}
                onOpenSubscription={() => setStage("subscription")}
                onViewChange={(view) => {
                  setActiveView(view);
                  setStage("app");
              }}
            >
              <GameMap
                completedMissionIds={completedMissionIds}
                subscriptionActive={subscriptionActive}
                onOpenSubscription={() => setStage("subscription")}
                onOpenMission={(missionId) => {
                  setActiveMissionId(missionId);
                  setActiveView("home");
                  setStage(missionId === firstMissionId ? "technoQuarterMission" : "app");
                }}
                onOpenReport={() => setStage(allMissionsCompleted ? "fullReport" : "report")}
              />
            </PlatformShell>
          )}
          {stage === "report" && (
            <PlatformShell
              account={account}
                avatar={avatar}
                activeView={activeView}
                subscription={subscription}
                fullReportUnlocked={fullReportUnlocked}
                onOpenSubscription={() => setStage("subscription")}
                onViewChange={(view) => {
                  setActiveView(view);
                  setStage("app");
              }}
            >
              <ResultScreen
                account={account}
                avatar={avatar}
                answers={answers}
                technoQuarter={technoQuarterResult}
                onBackToMap={() => setStage("app")}
                onOpenSubscription={() => setStage("subscription")}
                showAiForTesting={Boolean(technoQuarterResult)}
              />
            </PlatformShell>
          )}
          {stage === "subscription" && (
            <SubscriptionFlow
              onCancel={() => setStage("app")}
              onComplete={(nextSubscription) => {
                setSubscription(nextSubscription);
                setStage("subscriptionSuccess");
              }}
            />
          )}
          {stage === "subscriptionSuccess" && (
            <SubscriptionSuccess subscription={subscription} onContinue={() => setStage("app")} />
          )}
          {stage === "fullReport" && (
            <PlatformShell
              account={account}
              avatar={avatar}
              activeView={activeView}
              subscription={subscription}
              fullReportUnlocked={true}
              onOpenSubscription={() => setStage("subscription")}
              onViewChange={(view) => {
                setActiveView(view);
                setStage("app");
              }}
            >
              <FullReportScreen
                account={account}
                avatar={avatar}
                answers={answers}
                onBackToMap={() => setStage("app")}
                onOpenSimulators={() => {
                  setActiveView("simulators");
                  setStage("app");
                }}
              />
            </PlatformShell>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

