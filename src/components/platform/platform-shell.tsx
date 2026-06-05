"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  Flame,
  Lock,
  Menu,
  Moon,
  Sparkles,
  Star,
  Sun,
  Trophy,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  dailyQuests,
  growthSkills,
  platformNav,
  profileStats,
  simulatorCards,
  skillBranches,
  type PlatformView
} from "@/data/platform";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { SubscriptionState } from "@/components/game/subscription-flow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type Accent = "coral" | "orange" | "purple";

const accentMap = {
  coral: "#FF6B6B",
  orange: "#FF9F43",
  purple: "#A78BFA"
};

function platformCard(theme: Theme) {
  return theme === "dark"
    ? "border-white/10 bg-white/[0.06] text-white shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
    : "border-[#121A2E]/10 bg-white/80 text-[#121A2E] shadow-[0_20px_70px_rgba(18,26,46,0.1)]";
}

function ProgressBar({ value, accent = "#FF6B6B" }: { value: number; accent?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, #FFD166)` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7 }}
      />
    </div>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export function PlatformShell({
  account,
  avatar,
  activeView,
  subscription,
  fullReportUnlocked,
  onOpenSubscription,
  onViewChange,
  children
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  activeView: PlatformView;
  subscription: SubscriptionState;
  fullReportUnlocked: boolean;
  onOpenSubscription: () => void;
  onViewChange: (view: PlatformView) => void;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<Accent>("coral");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [achievement, setAchievement] = useState("");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("neopolis-theme") as Theme | null;
    const savedAccent = window.localStorage.getItem("neopolis-accent") as Accent | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedAccent) setAccent(savedAccent);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("neopolis-theme", theme);
    window.localStorage.setItem("neopolis-accent", accent);
  }, [theme, accent]);

  const accentColor = accentMap[accent];

  function showReward(message: string) {
    setToast(message);
    setAchievement("Новое достижение: импульс развития");
    window.setTimeout(() => setToast(""), 2200);
    window.setTimeout(() => setAchievement(""), 3200);
  }

  const page =
    activeView === "home" ? (
      children
    ) : activeView === "profile" ? (
      <ProfilePage theme={theme} avatar={avatar} account={account} accent={accentColor} subscription={subscription} onOpenSubscription={onOpenSubscription} />
    ) : activeView === "simulators" ? (
      subscription.status === "active" ? (
        <SimulatorsPage theme={theme} accent={accentColor} onReward={showReward} fullReportUnlocked={fullReportUnlocked} />
      ) : <PremiumFeaturePage
        theme={theme}
        accent={accentColor}
        kind="simulators"
        title="Симуляторы профессий"
        subtitle="Пробуй мышление Product Manager, UX/UI Designer, Data Analyst и других современных ролей."
        points={["5 этапов в каждом симуляторе", "оценка профессионального мышления", "XP и прокачка навыков"]}
        onOpenSubscription={onOpenSubscription}
      />
    ) : activeView === "daily" ? (
      subscription.status === "active" ? (
        <DailyPage theme={theme} accent={accentColor} onReward={showReward} />
      ) : <PremiumFeaturePage
        theme={theme}
        accent={accentColor}
        kind="daily"
        title="Ежедневные задания"
        subtitle="Каждый день развивай навыки, которые пригодятся в учебе, поступлении и будущей профессии."
        points={["daily streak", "персональная цель XP", "задания под слабые и сильные навыки"]}
        onOpenSubscription={onOpenSubscription}
      />
    ) : activeView === "skills" ? (
      subscription.status === "active" ? (
        <SkillTreePage theme={theme} accent={accentColor} />
      ) : <PremiumFeaturePage
        theme={theme}
        accent={accentColor}
        kind="skills"
        title="Древо навыков"
        subtitle="Большая RPG-карта навыков, веток развития и карьерных открытий."
        points={["ветки мышления, коммуникации и digital", "узлы навыков", "прогресс до следующего уровня"]}
        onOpenSubscription={onOpenSubscription}
      />
    ) : (
      <SettingsPage theme={theme} setTheme={setTheme} accent={accent} setAccent={setAccent} />
    );

  return (
    <div
      className={cn(
        theme,
        "min-h-screen overflow-hidden transition-colors duration-300",
        theme === "dark"
          ? "bg-[#1B0F33] text-white"
          : "bg-[#fffaf7] text-[#121A2E]"
      )}
      style={{ ["--platform-accent" as string]: accentColor }}
    >
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-0",
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_20%_10%,rgba(255,107,107,.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,.24),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_16%_8%,rgba(255,209,102,.32),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,107,107,.18),transparent_32%)]"
        )}
      />

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur lg:hidden"
        aria-label="Открыть меню"
      >
        <Menu className="size-5" />
      </button>

      <Sidebar
        theme={theme}
        activeView={activeView}
        onViewChange={(view) => {
          onViewChange(view);
          setMobileOpen(false);
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setTheme={setTheme}
        subscription={subscription}
      />

      <main className="relative z-10 min-h-screen lg:pl-[88px]">
        <AnimatePresence mode="wait">
          <Page key={activeView}>{page}</Page>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[80] rounded-2xl border border-white/20 bg-white/12 px-5 py-4 font-black text-white shadow-2xl backdrop-blur-2xl"
          >
            <Star className="mr-2 inline size-5 text-[#FFD166]" />
            {toast}
          </motion.div>
        )}
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed left-1/2 top-5 z-[80] -translate-x-1/2 rounded-2xl border border-[#FFD166]/40 bg-[#1B0F33]/85 px-5 py-4 font-bold text-white shadow-2xl backdrop-blur-2xl"
          >
            <Trophy className="mr-2 inline size-5 text-[#FFD166]" />
            {achievement}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({
  theme,
  activeView,
  onViewChange,
  mobileOpen,
  setMobileOpen,
  setTheme,
  subscription
}: {
  theme: Theme;
  activeView: PlatformView;
  onViewChange: (view: PlatformView) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  setTheme: (theme: Theme) => void;
  subscription: SubscriptionState;
}) {
  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 w-[260px] border-r p-4 backdrop-blur-2xl transition lg:w-[88px] lg:translate-x-0 lg:px-3",
          theme === "dark"
            ? "border-white/10 bg-[#1B0F33]/86"
            : "border-[#121A2E]/10 bg-white/88",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between lg:justify-center">
          <div className="lg:text-center">
            <p className="text-2xl font-black tracking-wide lg:grid lg:size-12 lg:place-items-center lg:rounded-2xl lg:border lg:border-[#FF6B6B]/25 lg:bg-[#FF6B6B]/10 lg:text-xl" style={{ color: "#FF6B6B" }}>
              <span className="lg:hidden">
              НЕОПОЛИС
              </span>
              <span className="hidden lg:inline">Н</span>
            </p>
            <p className="text-xs font-semibold opacity-70 lg:hidden">Архитектор будущего</p>
            <p className={cn("mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black lg:size-3 lg:p-0 lg:text-transparent", subscription.status === "active" ? "bg-[#00D1C6]/15 text-[#8cffef]" : "bg-[#FFD166]/15 text-[#FFD166]")}>
              {subscription.status === "active" ? "Premium active" : "Free beta"}
            </p>
          </div>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Закрыть меню">
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-8 grid gap-2 lg:justify-items-center">
          {platformNav.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition hover:translate-x-1 lg:size-12 lg:justify-center lg:px-0 lg:py-0 lg:hover:translate-x-0",
                  active
                    ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white shadow-[0_12px_32px_rgba(255,107,107,.35)]"
                    : theme === "dark"
                      ? "text-white/72 hover:bg-white/[0.08] hover:text-white"
                      : "text-[#121A2E]/70 hover:bg-[#FF6B6B]/8 hover:text-[#121A2E]"
                )}
                title={item.label}
              >
                <item.icon className="size-5" />
                <span className="lg:hidden">{item.label}</span>
                <span
                  className={cn(
                    "pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[90] hidden -translate-y-1/2 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-black opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:opacity-100 lg:block",
                    theme === "dark"
                      ? "border-white/12 bg-[#120A28]/92 text-white"
                      : "border-[#121A2E]/10 bg-white/95 text-[#121A2E]"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 grid gap-2 lg:left-3 lg:right-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group relative flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 text-sm font-black transition hover:scale-[1.02] lg:size-12 lg:px-0 lg:py-0"
            title={theme === "dark" ? "Светлая тема" : "Темная тема"}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="lg:hidden">{theme === "dark" ? "Светлая тема" : "Темная тема"}</span>
            <span
              className={cn(
                "pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[90] hidden -translate-y-1/2 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-black opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:opacity-100 lg:block",
                theme === "dark"
                  ? "border-white/12 bg-[#120A28]/92 text-white"
                  : "border-[#121A2E]/10 bg-white/95 text-[#121A2E]"
              )}
            >
              {theme === "dark" ? "Светлая тема" : "Темная тема"}
            </span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

function ProfilePage({
  theme,
  avatar,
  account,
  accent,
  subscription,
  onOpenSubscription
}: {
  theme: Theme;
  avatar: AvatarState | null;
  account: AccountState | null;
  accent: string;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
}) {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const completeDays = new Set([1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 16, 20, 21, 22, 24, 27]);
  const streakDays = new Set([20, 21, 22, 23, 24]);

  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <div className={cn("rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="relative size-24 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#A78BFA]">
            {avatar && <Image src={avatar.styleImage} alt={avatar.style} fill className="object-cover" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-black uppercase" style={{ color: accent }}>Профиль пользователя</p>
            <h1 className="mt-1 text-4xl font-black">Алекс</h1>
            <p className="mt-2 text-lg opacity-75">Уровень 12 · Исследователь будущего</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm font-bold">XP: 2450 / 3000</span>
              <div className="flex-1"><ProgressBar value={82} accent={accent} /></div>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FF6B6B] via-[#FF9F43] to-[#FFD166] p-5 text-white shadow-xl">
            <Flame className="size-8" />
            <p className="mt-2 text-3xl font-black">{subscription.status === "active" ? "Premium" : "Free"}</p>
            <p className="text-sm font-bold">{subscription.end ? `до ${new Date(subscription.end).toLocaleDateString("ru-RU")}` : "beta-доступ"}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {profileStats.map((stat) => (
          <motion.div key={stat.label} whileHover={{ y: -4 }} className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
            <stat.icon className="size-6" style={{ color: accent }} />
            <p className="mt-4 text-2xl font-black">{stat.value}</p>
            <p className="text-sm opacity-70">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        {subscription.status === "active" ? (
          <div className={cn("rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
            <h2 className="text-2xl font-black">Календарь развития</h2>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div key={day} className={cn("grid aspect-square place-items-center rounded-2xl text-sm font-black", streakDays.has(day) ? "bg-gradient-to-br from-[#FF6B6B] to-[#FF9F43] text-white" : completeDays.has(day) ? "bg-[#FFD166]/70 text-[#121A2E]" : theme === "dark" ? "bg-white/[0.06] text-white/35" : "bg-[#121A2E]/5 text-[#121A2E]/35")}>{day}</div>
              ))}
            </div>
          </div>
        ) : <PremiumBlurCard
          theme={theme}
          accent={accent}
          title="Календарь развития"
          description="История streak, выполненные дни, XP и прокачанные навыки доступны в полной подписке."
          onOpenSubscription={onOpenSubscription}
        >
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day}
                className={cn(
                  "grid aspect-square place-items-center rounded-2xl text-sm font-black",
                  streakDays.has(day)
                    ? "bg-gradient-to-br from-[#FF6B6B] to-[#FF9F43] text-white"
                    : completeDays.has(day)
                      ? "bg-[#FFD166]/70 text-[#121A2E]"
                      : theme === "dark"
                        ? "bg-white/[0.06] text-white/35"
                        : "bg-[#121A2E]/5 text-[#121A2E]/35"
                )}
              >
                {day}
              </div>
            ))}
          </div>
        </PremiumBlurCard>}
        {subscription.status === "active" ? (
          <div className={cn("rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
            <h2 className="text-2xl font-black">График развития</h2>
            <div className="mt-5 grid gap-4">
              {growthSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm font-bold"><span>{skill.name}</span><span>{skill.value}%</span></div>
                  <ProgressBar value={skill.value} accent={accent} />
                </div>
              ))}
            </div>
          </div>
        ) : <PremiumBlurCard
          theme={theme}
          accent={accent}
          title="График развития"
          description="Динамика логики, коммуникации, креативности, стратегии и digital-навыков открывается по подписке."
          onOpenSubscription={onOpenSubscription}
        >
          <div className="grid gap-4">
            {growthSkills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{skill.name}</span>
                  <span>{skill.value}%</span>
                </div>
                <ProgressBar value={skill.value} accent={accent} />
              </div>
            ))}
          </div>
        </PremiumBlurCard>}
      </div>
    </div>
  );
}

function SimulatorsPage({ theme, accent, onReward, fullReportUnlocked }: { theme: Theme; accent: string; onReward: (message: string) => void; fullReportUnlocked: boolean }) {
  const [active, setActive] = useState<(typeof simulatorCards)[number] | null>(null);
  const [stage, setStage] = useState(0);
  const [finished, setFinished] = useState(false);

  function open(card: (typeof simulatorCards)[number]) {
    setActive(card);
    setStage(0);
    setFinished(false);
  }

  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <h1 className="text-4xl font-black">Симуляторы профессий</h1>
      <p className="mt-3 max-w-3xl text-lg opacity-75">
        {fullReportUnlocked ? "Все симуляторы открыты после полного отчета." : "По подписке открыты Product Manager и Data Analyst. UX/UI Designer откроется после полного отчета."}
      </p>
      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        {simulatorCards.map((card) => (
          <motion.div key={card.id} whileHover={{ y: -6 }} className={cn("rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
            <card.icon className="size-9" style={{ color: accent }} />
            <h2 className="mt-5 text-2xl font-black">{card.title}</h2>
            <p className="mt-2 font-bold opacity-80">{card.subtitle}</p>
            <p className="mt-4 leading-7 opacity-70">{card.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.thinking.map((item) => <BadgePill key={item} theme={theme}>{item}</BadgePill>)}
            </div>
            <Button disabled={card.id === "ux" && !fullReportUnlocked} onClick={() => open(card)} className="mt-6 w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white">
              {card.id === "ux" && !fullReportUnlocked ? "Откроется после полного отчета" : "Начать симулятор"}
            </Button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={cn("w-full max-w-3xl rounded-2xl border p-6", platformCard(theme))} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase" style={{ color: accent }}>{active.title}</p>
                  <h2 className="mt-2 text-3xl font-black">{finished ? active.result : active.stages[stage].title}</h2>
                </div>
                <button onClick={() => setActive(null)}><X className="size-6" /></button>
              </div>
              {finished ? (
                <div className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {active.scoreLabels.map((label, index) => (
                      <div key={label}>
                        <div className="mb-2 flex justify-between text-sm font-bold"><span>{label}</span><span>{78 + index * 4}%</span></div>
                        <ProgressBar value={78 + index * 4} accent={accent} />
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => { onReward("+250 XP"); setActive(null); }} className="mt-6 w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] text-white">
                    Получить результат
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-lg opacity-75">{active.stages[stage].text}</p>
                  <div className="mt-5 grid gap-3">
                    {active.stages[stage].choices.map((choice) => (
                      <button key={choice} onClick={() => stage === active.stages.length - 1 ? setFinished(true) : setStage((s) => s + 1)} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left font-bold transition hover:scale-[1.01] hover:border-[#FF6B6B]/50">
                        {choice}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm opacity-60">Этап {stage + 1} / {active.stages.length}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DailyPage({ theme, accent, onReward }: { theme: Theme; accent: string; onReward: (message: string) => void }) {
  const [active, setActive] = useState<(typeof dailyQuests)[number] | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const dayXp = done.reduce((sum, title) => sum + (dailyQuests.find((q) => q.title === title)?.xp ?? 0), 0);

  function finishQuest() {
    if (!active) return;
    setDone((current) => [...new Set([...current, active.title])]);
    onReward(`+${active.xp} XP`);
    setActive(null);
  }

  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <h1 className="text-4xl font-black">Ежедневные задания</h1>
          <p className="mt-3 max-w-3xl text-lg opacity-75">
            Каждый день развивай навыки, которые пригодятся в учебе, поступлении и будущей профессии.
          </p>
        </div>
        <div className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
          <div className="flex gap-6">
            <div><p className="text-sm opacity-65">Streak</p><p className="text-3xl font-black text-[#FF6B6B]">9</p></div>
            <div><p className="text-sm opacity-65">Цель дня</p><p className="text-3xl font-black">{dayXp}/200 XP</p></div>
          </div>
          <div className="mt-3"><ProgressBar value={Math.min(100, (dayXp / 200) * 100)} accent={accent} /></div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dailyQuests.map((quest) => {
          const completed = done.includes(quest.title);
          return (
            <motion.div key={quest.title} whileHover={{ y: -4 }} className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <BadgePill theme={theme}>{quest.category}</BadgePill>
                  <h2 className="mt-3 text-xl font-black">{quest.title}</h2>
                </div>
                <span className="rounded-2xl bg-[#FFD166]/30 px-3 py-1 text-sm font-black">+{quest.xp} XP</span>
              </div>
              <p className="mt-3 leading-6 opacity-72">{quest.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">{quest.skills.map((skill) => <BadgePill key={skill} theme={theme}>{skill}</BadgePill>)}</div>
              <Button disabled={completed} onClick={() => setActive(quest)} className="mt-5 w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white">
                {completed ? "Выполнено" : "Выполнить"}
              </Button>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={cn("w-full max-w-xl rounded-2xl border p-6", platformCard(theme))} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <h2 className="text-3xl font-black">{active.title}</h2>
              <p className="mt-4 text-lg opacity-75">{active.description}</p>
              <div className="mt-5 grid gap-3">
                {["Проанализировать ситуацию", "Действовать наугад", "Отложить решение", "Спросить случайный совет"].map((choice) => (
                  <button key={choice} onClick={finishQuest} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left font-bold hover:border-[#FF6B6B]/50">
                    {choice}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SkillTreePage({ theme, accent }: { theme: Theme; accent: string }) {
  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <h1 className="text-4xl font-black">Древо навыков</h1>
      <p className="mt-3 max-w-3xl text-lg opacity-75">Большая RPG-карта навыков: открытые узлы, заблокированные ветки и прогресс до следующего уровня.</p>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {skillBranches.map((branch, branchIndex) => (
          <motion.div key={branch.title} whileHover={{ y: -4 }} className={cn("relative overflow-hidden rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
            <div className="absolute right-6 top-6 size-20 rounded-full blur-2xl" style={{ background: branch.color, opacity: 0.24 }} />
            <h2 className="text-2xl font-black" style={{ color: branch.color }}>{branch.title}</h2>
            <div className="mt-6 grid gap-4">
              {branch.skills.map((skill, index) => {
                const value = Math.min(100, 18 + branchIndex * 9 + index * 13);
                const locked = value < 35;
                return (
                  <div key={skill} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-black">{locked ? "🔒 " : ""}{skill}</p>
                        <p className="mt-1 text-sm opacity-65">{value <= 20 ? "новичок" : value <= 40 ? "базовый уровень" : value <= 60 ? "уверенный уровень" : value <= 80 ? "продвинутый уровень" : "мастерство"}</p>
                      </div>
                      <span className="font-black">{value}%</span>
                    </div>
                    <div className="mt-3"><ProgressBar value={value} accent={locked ? "#A78BFA" : accent} /></div>
                    <p className="mt-3 text-sm opacity-70">Качается через: {branch.sources.join(", ")}.</p>
                    <p className="mt-1 text-sm opacity-55">Следующий уровень откроет продвинутые задания и новые симуляции.</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({
  theme,
  setTheme,
  accent,
  setAccent
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}) {
  const [dailyGoal, setDailyGoal] = useState(200);
  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <h1 className="text-4xl font-black">Настройки</h1>
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <SettingsBlock title="Аккаунт" theme={theme}><p className="opacity-70">Алекс · Исследователь будущего · 9 класс</p></SettingsBlock>
        <SettingsBlock title="Тема интерфейса" theme={theme}>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setTheme("light")} variant={theme === "light" ? "default" : "secondary"}>Светлая</Button>
            <Button onClick={() => setTheme("dark")} variant={theme === "dark" ? "default" : "secondary"}>Темная</Button>
          </div>
          <div className="mt-4 flex gap-3">
            {(["coral", "orange", "purple"] as Accent[]).map((item) => (
              <button key={item} onClick={() => setAccent(item)} className={cn("size-10 rounded-2xl border-4 transition hover:scale-110", accent === item ? "border-white" : "border-transparent")} style={{ background: accentMap[item] }} />
            ))}
          </div>
        </SettingsBlock>
        <SettingsBlock title="Уведомления" theme={theme}>
          {["напоминать о daily quest", "напоминать о streak", "еженедельный отчет"].map((item) => <ToggleRow key={item} label={item} />)}
        </SettingsBlock>
        <SettingsBlock title="Цели развития" theme={theme}>
          <div className="flex flex-wrap gap-3">
            {[100, 200, 300].map((goal) => (
              <Button key={goal} onClick={() => setDailyGoal(goal)} variant={dailyGoal === goal ? "default" : "secondary"}>{goal} XP</Button>
            ))}
          </div>
        </SettingsBlock>
        <SettingsBlock title="Родительский доступ" theme={theme}><p className="opacity-70">Можно подключить еженедельный отчет для родителей.</p></SettingsBlock>
        <SettingsBlock title="Конфиденциальность" theme={theme}><p className="opacity-70">Данные диагностики используются только для персональных рекомендаций.</p></SettingsBlock>
      </div>
    </div>
  );
}

function PremiumFeaturePage({
  theme,
  accent,
  kind,
  title,
  subtitle,
  points,
  onOpenSubscription
}: {
  theme: Theme;
  accent: string;
  kind: "simulators" | "daily" | "skills";
  title: string;
  subtitle: string;
  points: string[];
  onOpenSubscription: () => void;
}) {
  return (
    <div className="h-screen overflow-y-auto p-5 pt-20 xl:p-8 xl:pt-8">
      <div className={cn("relative overflow-hidden rounded-2xl border p-8 backdrop-blur-2xl", platformCard(theme))}>
        <div className="absolute right-0 top-0 size-80 translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl" style={{ background: accent, opacity: 0.18 }} />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD166]/30 bg-[#FFD166]/10 px-4 py-2 text-sm font-black text-[#FFD166]">
            <Lock className="size-4" />
            Полная подписка
          </span>
          <h1 className="mt-5 text-4xl font-black sm:text-6xl">{title}</h1>
          <p className="mt-4 text-lg leading-8 opacity-75">{subtitle}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {points.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 font-bold opacity-80">
                {point}
              </div>
            ))}
          </div>
          <Button onClick={onOpenSubscription} className="mt-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
            Открыть подписку
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="pointer-events-none mt-6 blur-[2px] opacity-60">
        {kind === "simulators" ? (
          <div className="grid gap-5 md:grid-cols-3">
            {simulatorCards.map((card) => (
              <div key={card.id} className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
                <card.icon className="size-8" style={{ color: accent }} />
                <h2 className="mt-4 text-xl font-black">{card.title}</h2>
                <p className="mt-2 text-sm opacity-70">{card.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.thinking.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-bold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : kind === "daily" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dailyQuests.slice(0, 6).map((quest) => (
              <div key={quest.title} className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
                <BadgePill theme={theme}>{quest.category}</BadgePill>
                <h2 className="mt-3 text-lg font-black">{quest.title}</h2>
                <p className="mt-2 text-sm opacity-70">{quest.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-black">
                  <span>{quest.skills.slice(0, 2).join(" · ")}</span>
                  <span style={{ color: accent }}>+{quest.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillBranches.map((branch) => (
              <div key={branch.title} className={cn("rounded-2xl border p-5 backdrop-blur-2xl", platformCard(theme))}>
                <h2 className="text-xl font-black" style={{ color: branch.color }}>{branch.title}</h2>
                <div className="mt-4 grid gap-2">
                  {branch.skills.slice(0, 3).map((skill) => <div key={skill} className="rounded-xl bg-white/[0.06] px-3 py-2 text-sm font-bold">{skill}</div>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PremiumBlurCard({
  theme,
  accent,
  title,
  description,
  children,
  onOpenSubscription
}: {
  theme: Theme;
  accent: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onOpenSubscription: () => void;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}>
      <div className="pointer-events-none select-none blur-[3px] opacity-55">{children}</div>
      <div className="absolute inset-0 grid place-items-center bg-[#1B0F33]/35 p-5 text-center backdrop-blur-[2px]">
        <div className="max-w-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-[#FFD166]/35 bg-[#FFD166]/12 text-[#FFD166]">
            <Lock className="size-7" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-white">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/72">{description}</p>
          <Button onClick={onOpenSubscription} className="mt-5 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white">
            Открыть подписку
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    </div>
  );
}

function SettingsBlock({ title, theme, children }: { title: string; theme: Theme; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border p-6 backdrop-blur-2xl", platformCard(theme))}><h2 className="mb-4 text-2xl font-black">{title}</h2>{children}</div>;
}

function ToggleRow({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <button onClick={() => setOn((current) => !current)} className="flex w-full items-center justify-between rounded-2xl py-3 text-left font-semibold">
      {label}
      <span className={cn("flex h-7 w-12 items-center rounded-full p-1 transition", on ? "bg-[#FF6B6B]" : "bg-slate-400/40")}>
        <span className={cn("size-5 rounded-full bg-white transition", on && "translate-x-5")} />
      </span>
    </button>
  );
}

function BadgePill({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-black", theme === "dark" ? "bg-white/[0.08] text-white" : "bg-[#121A2E]/[0.06] text-[#121A2E]")}>
      {children}
    </span>
  );
}

