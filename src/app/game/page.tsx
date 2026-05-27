"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AccountRegistration, type AccountState } from "@/components/game/account-registration";
import { AvatarCreator, type AvatarState } from "@/components/game/avatar-creator";
import { GameIntro } from "@/components/game/game-intro";
import { GameMap } from "@/components/game/game-map";
import { MissionScreen, type MissionAnswer } from "@/components/game/mission-screen";
import { ResultScreen } from "@/components/game/result-screen";
import { careerMissions } from "@/data/site";
import { PlatformShell } from "@/components/platform/platform-shell";
import type { PlatformView } from "@/data/platform";
import { SubscriptionFlow, type SubscriptionState } from "@/components/game/subscription-flow";
import { SubscriptionSuccess } from "@/components/game/subscription-success";
import { FullReportScreen } from "@/components/game/full-report-screen";

type Stage = "intro" | "register" | "avatar" | "app" | "mission" | "report" | "subscription" | "subscriptionSuccess" | "fullReport";

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 }
};

export default function GamePage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [account, setAccount] = useState<AccountState | null>(null);
  const [avatar, setAvatar] = useState<AvatarState | null>(null);
  const [activeMissionId, setActiveMissionId] = useState(careerMissions[0].id);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<MissionAnswer[]>([]);
  const [activeView, setActiveView] = useState<PlatformView>("home");
  const [subscription, setSubscription] = useState<SubscriptionState>({ status: "free", plan: null, start: null, end: null });
  const [fullReportUnlocked, setFullReportUnlocked] = useState(false);
  const [testAiUnlocked, setTestAiUnlocked] = useState(false);

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

  const activeMission = careerMissions.find((mission) => mission.id === activeMissionId) ?? careerMissions[0];
  const subscriptionActive = subscription.status === "active";
  const allMissionsCompleted = completedMissionIds.length >= careerMissions.length;
  const betaMissionIds = careerMissions.filter((mission) => mission.tier !== "premium").slice(0, 3).map((mission) => mission.id);

  function openAiTestReport() {
    const betaMissions = careerMissions.filter((mission) => mission.tier !== "premium").slice(0, 3);
    const testAnswers = betaMissions.flatMap((mission, missionIndex) =>
      mission.scenes.map((scene, sceneIndex) => {
        const selected = scene.choices[(missionIndex + sceneIndex) % scene.choices.length];
        return {
          missionId: mission.id,
          sceneTitle: scene.title,
          choice: selected.text,
          traits: selected.traits,
          signal: selected.signal
        };
      })
    );

    setAccount((current) => current ?? { name: "Алекс", email: "demo@neopolis.ai", grade: "9 класс" });
    setAvatar((current) => current ?? {
      style: "Аналитик",
      styleImage: "/avatar-analyst.svg",
      gadget: "Дрон",
      gadgetImage: "/gadget-drone.svg",
      approach: "Сначала изучить данные",
      specialization: "Аналитика"
    });
    setAnswers(testAnswers);
    setCompletedMissionIds(betaMissionIds);
    setActiveMissionId(betaMissionIds[0] ?? careerMissions[0].id);
    setActiveView("home");
    setTestAiUnlocked(true);
    setStage("report");
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute left-1/2 top-16 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#FF6B6B]/[0.12] blur-3xl" />
      <button
        type="button"
        onClick={openAiTestReport}
        className="fixed right-4 top-4 z-[80] rounded-2xl border border-[#FFD166]/35 bg-[#1B0F33]/80 px-4 py-3 text-left text-xs font-black text-white shadow-[0_18px_60px_rgba(255,107,107,0.28)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-[#FF6B6B]/70 hover:bg-[#FF6B6B]/20 sm:right-6 sm:top-6"
      >
        <span className="block text-[#FFD166]">Тест AI</span>
        <span className="block text-white/80">3 миссии + профориентация</span>
      </button>
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
                setStage("app");
              }}
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
                  setStage("mission");
                }}
                onOpenReport={() => setStage(allMissionsCompleted ? "fullReport" : "report")}
              />
            </PlatformShell>
          )}
          {stage === "mission" && (
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
              <MissionScreen
                mission={activeMission}
                onComplete={(nextAnswers) => {
                  setAnswers((current) => [...current, ...nextAnswers]);
                  setCompletedMissionIds((current) =>
                    current.includes(activeMission.id) ? current : [...current, activeMission.id]
                  );
                  const nextCompleted = completedMissionIds.includes(activeMission.id)
                    ? completedMissionIds
                    : [...completedMissionIds, activeMission.id];
                  if (nextCompleted.length >= careerMissions.length) {
                    setFullReportUnlocked(true);
                    setStage("fullReport");
                  } else {
                    setStage("app");
                  }
                }}
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
                onBackToMap={() => setStage("app")}
                onOpenSubscription={() => setStage("subscription")}
                showAiForTesting={testAiUnlocked}
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

