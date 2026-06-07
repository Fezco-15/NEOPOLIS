"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowLeft, ArrowRight, BookOpen, BrainCircuit, History, RotateCcw, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TechnoQuarterProvider, useTechnoQuarterGame } from "@/store/technoQuarterStore";
import type { ArchetypeSummary, GameState, NovelChoice, NovelFrame, NovelLine } from "@/types/techno-quarter-game";

export type TechnoQuarterCompletion = {
  state: GameState;
  summary: ArchetypeSummary;
};

function NoiseAndParticles({ danger }: { danger: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:6px_6px]" />
      {Array.from({ length: 7 }).map((_, index) => (
        <motion.span
          key={index}
          className={cn("absolute hidden h-px w-28 bg-gradient-to-r from-transparent to-transparent md:block", danger ? "via-[#FF6B6B]" : "via-[#00D1C6]")}
          style={{ top: `${8 + ((index * 11) % 86)}%`, left: `${(index * 19) % 100}%` }}
          animate={{ x: ["-14vw", "104vw"], opacity: [0, 0.52, 0] }}
          transition={{ duration: 8 + (index % 4), repeat: Infinity, delay: index * 0.58 }}
        />
      ))}
    </div>
  );
}

function ViOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute right-4 top-[12%] hidden w-[230px] overflow-hidden rounded-[28px] border border-[#00D1C6]/35 bg-[#061729]/60 shadow-[0_0_42px_rgba(0,209,198,0.24)] backdrop-blur-sm lg:block"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 0.86, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Image src="/mission-lab/prologue/05-vi-hologram.png" alt="ВИ" width={1024} height={1024} className="h-auto w-full opacity-90 mix-blend-screen" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[#00D1C6]/40 bg-[#071225]/70 p-3 text-center text-xs font-black uppercase tracking-[0.2em] text-[#B8FFFB]">
        ВИ // online
      </div>
    </motion.div>
  );
}

function ViCompanion({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none relative overflow-hidden border border-[#00D1C6]/30 bg-[#061729]/78 shadow-[0_0_34px_rgba(0,209,198,.2)]",
        compact
          ? "flex h-20 w-full max-w-[15rem] items-center gap-3 rounded-2xl px-3"
          : "hidden w-[190px] rounded-[26px] lg:block"
      )}
      initial={{ opacity: 0, y: compact ? 10 : 16 }}
      animate={{ opacity: compact ? 0.88 : 0.82, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={cn("relative shrink-0 overflow-hidden rounded-2xl bg-[#00D1C6]/10", compact ? "size-14" : "h-44 w-full")}>
        <Image src="/mission-lab/prologue/05-vi-hologram.png" alt="VI" fill sizes={compact ? "64px" : "190px"} className="object-cover opacity-90 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
      {compact ? (
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B8FFFB]">VI online</p>
          <p className="mt-1 text-xs leading-4 text-[#EDE7FF]/72">Mission support</p>
        </div>
      ) : (
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-[#00D1C6]/30 bg-[#071225]/72 p-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-[#B8FFFB]">
          VI online
        </div>
      )}
    </motion.div>
  );
}

function Background({ frame }: { frame: NovelFrame }) {
  const danger = frame.overlay === "danger";
  const overlayClass =
    frame.overlay === "final"
      ? "bg-[linear-gradient(90deg,rgba(4,8,20,.72),rgba(12,18,36,.38),rgba(4,8,20,.7))]"
      : danger
        ? "bg-[radial-gradient(circle_at_50%_42%,rgba(255,107,107,.18),transparent_36%),linear-gradient(180deg,rgba(5,3,16,.38),rgba(27,15,51,.78))]"
        : "bg-[linear-gradient(180deg,rgba(6,5,18,.25),rgba(27,15,51,.72))]";

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={frame.backgroundImage}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1.008 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
        >
          <Image src={frame.backgroundImage} alt={frame.title ?? "Сцена"} fill priority={frame.id === "prologue-01"} sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className={cn("absolute inset-0", overlayClass)} />
      <NoiseAndParticles danger={danger || Boolean(frame.glitch)} />
      {frame.glitch ? (
        <motion.div
          className="absolute inset-0 hidden bg-[linear-gradient(180deg,transparent_0%,rgba(255,107,107,.12)_48%,transparent_52%)] bg-[length:100%_12px] mix-blend-screen md:block"
          animate={{ opacity: [0.05, 0.32, 0.08], x: [0, -7, 3, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2 }}
        />
      ) : null}
    </div>
  );
}

function TopHud({ frame }: { frame: NovelFrame }) {
  const branchLabel =
    frame.chapter === "prologue"
      ? "ПРОЛОГ"
      : frame.chapter === "ending"
        ? "ФИНАЛ"
        : frame.chapter === "engineer"
          ? "ВЕТКА ИНЖЕНЕРА"
          : frame.chapter === "analyst"
            ? "ВЕТКА АНАЛИТИКА"
            : frame.chapter === "leader"
              ? "ВЕТКА ЛИДЕРА"
              : frame.chapter === "researcher"
                ? "ВЕТКА ИССЛЕДОВАТЕЛЯ"
                : "БУДУЩАЯ ВЕТКА";

  return (
    <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex flex-wrap items-start justify-between gap-3 md:left-7 md:right-7 md:top-6">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#A78BFA]/35 bg-[#120A28]/60 px-4 py-3 shadow-[0_0_34px_rgba(167,139,250,.18)] backdrop-blur-xl"
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6BFF]">ТехноКвартал</p>
        <p className="mt-1 text-sm font-bold text-white md:text-base">Атакующий код / {branchLabel}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="hidden max-w-md rounded-2xl border border-[#00D1C6]/30 bg-[#081225]/55 px-5 py-3 shadow-[0_0_36px_rgba(0,209,198,.16)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center gap-3">
          <BrainCircuit className="size-7 text-[#00D1C6]" />
          <div>
            <p className="font-black text-white">{frame.title ?? "Сцена"}</p>
            <p className="text-sm text-[#EDE7FF]/75">{frame.location ?? "НЕОПОЛИС-9"}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-right shadow-[0_0_34px_rgba(255,107,107,.12)] backdrop-blur-xl"
      >
        <p className="text-xs font-bold text-[#EDE7FF]/70">Этап</p>
        <p className="text-lg font-black text-white">{frame.chapter === "prologue" ? "0" : frame.stage} / 5</p>
      </motion.div>
    </div>
  );
}

function DialogueLine({ line, active }: { line: NovelLine; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: active ? 1 : 0.68, y: 0 }}
      className={cn("rounded-2xl border px-4 py-3", active ? "border-[#A78BFA]/40 bg-[#170D2F]/88" : "border-white/12 bg-[#120A28]/68")}
    >
      {line.speaker ? <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#FF9F43]">{line.speaker}</p> : null}
      <p className="text-base leading-7 text-[#F7F0FF] md:text-lg">{line.text}</p>
    </motion.div>
  );
}

function DialoguePanel({ frame, visibleLines }: { frame: NovelFrame; visibleLines: NovelLine[] }) {
  return (
    <motion.section
      key={`${frame.id}-${visibleLines.length}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-auto max-h-[48vh] w-full max-w-5xl overflow-y-auto rounded-[24px] border border-[#A78BFA]/35 bg-[#100821]/88 p-4 shadow-[0_0_54px_rgba(0,0,0,.42),0_0_30px_rgba(167,139,250,.13)] backdrop-blur-md md:rounded-[28px] md:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Badge className="border-[#00D1C6]/30 bg-[#00D1C6]/10 text-[#B8FFFB]">{frame.location ?? "НЕОПОЛИС"}</Badge>
        <div className="lg:hidden">
          <ViCompanion compact />
        </div>
      </div>
      <div className="space-y-3">
        {visibleLines.map((line, index) => (
          <DialogueLine key={`${frame.id}-${index}-${line.text}`} line={line} active={index === visibleLines.length - 1} />
        ))}
      </div>
    </motion.section>
  );
}

function ChoiceCard({ choice, index, onChoose }: { choice: NovelChoice; index: number; onChoose: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onChoose}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ opacity: { delay: index * 0.08 }, duration: 0.28 }}
      whileHover={{ scale: 1.025, y: -8 }}
      whileTap={{ scale: 0.985 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-[#A78BFA]/30 bg-[#120A28]/86 p-4 text-left shadow-[0_20px_56px_rgba(0,0,0,.24)] backdrop-blur-md transition hover:border-[#FF9F43]/70 hover:shadow-[0_0_34px_rgba(255,159,67,.22)] md:rounded-3xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/0 via-[#A78BFA]/0 to-[#00D1C6]/0 opacity-0 transition duration-300 group-hover:from-[#FF6B6B]/14 group-hover:via-[#A78BFA]/12 group-hover:to-[#00D1C6]/10 group-hover:opacity-100" />
      <div className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-[#FFD166] to-transparent opacity-0 transition group-hover:opacity-100 md:block" />
      <div className="relative flex min-w-0 gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#FF6B6B]/40 bg-[#FF6B6B]/20 text-xl font-black text-white shadow-[0_0_28px_rgba(255,107,107,.2)]">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="break-words text-base font-black leading-snug text-white md:text-lg">{choice.text}</p>
        </div>
      </div>
    </motion.button>
  );
}

function Choices({ frame }: { frame: NovelFrame }) {
  const { dispatch } = useTechnoQuarterGame();
  if (!frame.choices?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-auto grid w-full min-w-0 gap-3 md:grid-cols-2 lg:col-span-2 xl:grid-cols-4"
    >
      {frame.choices.map((choice, index) => (
        <ChoiceCard key={choice.id} choice={choice} index={index} onChoose={() => dispatch({ type: "CHOOSE", choice })} />
      ))}
    </motion.div>
  );
}

function NextArrow({ hidden }: { hidden: boolean }) {
  const { dispatch } = useTechnoQuarterGame();
  if (hidden) return null;

  return (
    <motion.button
      type="button"
      aria-label="Следующая сцена"
      onClick={() => dispatch({ type: "ADVANCE" })}
      className="pointer-events-auto fixed right-4 top-1/2 z-30 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#FF9F43]/45 bg-[#160B2F]/78 text-[#FFD166] shadow-[0_0_30px_rgba(255,159,67,.24)] backdrop-blur-md md:right-7 md:size-16"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
    >
      <ArrowRight className="size-7" />
    </motion.button>
  );
}

function UtilityBar() {
  const { dispatch } = useTechnoQuarterGame();
  return (
    <div className="pointer-events-auto absolute bottom-4 right-4 z-30 flex gap-2">
      <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "OPEN_HISTORY" })}>
        <History className="size-4" />
        История
      </Button>
      <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "RESET" })}>
        <RotateCcw className="size-4" />
        Заново
      </Button>
    </div>
  );
}

function NovelScreen() {
  const { state, currentFrame } = useTechnoQuarterGame();
  const visibleLines = currentFrame.lines.slice(0, state.lineIndex + 1);
  const choicesVisible = Boolean(currentFrame.choices?.length && state.lineIndex >= currentFrame.lines.length - 1);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#1B0F33] text-white">
      <Background frame={currentFrame} />
      {currentFrame.showVi ? <ViOverlay /> : null}
      <TopHud frame={currentFrame} />
      <div className="relative z-10 flex min-h-dvh flex-col justify-end gap-4 px-4 pb-24 pt-28 md:px-7 md:pb-20">
        <div className="flex min-w-0 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_190px] lg:items-end">
          <DialoguePanel frame={currentFrame} visibleLines={visibleLines} />
          <ViCompanion />
          <AnimatePresence>{choicesVisible ? <Choices key={currentFrame.id} frame={currentFrame} /> : null}</AnimatePresence>
        </div>
      </div>
      <NextArrow hidden={choicesVisible} />
      <UtilityBar />
    </main>
  );
}

function ResultScreen({
  mode,
  onComplete
}: {
  mode: "standalone" | "embedded";
  onComplete?: (result: TechnoQuarterCompletion) => void;
}) {
  const { state, summary, dispatch } = useTechnoQuarterGame();

  if (mode === "embedded") {
    return (
      <main className="relative min-h-dvh overflow-hidden bg-[#1B0F33] text-white">
        <div className="absolute inset-0">
          <Image src={summary.distribution.length ? "/mission-lab/engineer/13-ending-guardian.png" : "/mission-lab/prologue/01-city-night.png"} alt="Финал миссии" fill sizes="100vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,15,51,.58),rgba(27,15,51,.94))]" />
          <NoiseAndParticles danger={false} />
        </div>
        <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl items-center px-4 py-10 text-center md:px-8">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-[34px] border border-white/15 bg-white/[0.08] p-6 shadow-[0_0_90px_rgba(167,139,250,.25)] backdrop-blur-2xl md:p-10">
            <Badge className="border-[#FFD166]/35 bg-[#FFD166]/12 text-[#FFD166]">Первая миссия пройдена</Badge>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              След миссии сохранён
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#EDE7FF]">
              Система зафиксировала сюжетную ветку, решения, качества, риски и профессиональные гипотезы. Сейчас они будут переданы в первичный AI-анализ НЕОПОЛИСА.
            </p>
            <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#FF9F43]/25 bg-[#FF9F43]/10 p-5">
                <p className="text-sm font-bold text-[#FFD166]">Архетип миссии</p>
                <p className="mt-2 text-2xl font-black">{summary.primary}</p>
              </div>
              <div className="rounded-3xl border border-[#A78BFA]/25 bg-[#A78BFA]/10 p-5">
                <p className="text-sm font-bold text-[#EDE7FF]/75">Решений записано</p>
                <p className="mt-2 text-2xl font-black">{state.decisions.length}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => onComplete?.({ state, summary })}>
                <ArrowRight className="size-5" />
                Завершить миссию
              </Button>
              <Button size="lg" variant="secondary" onClick={() => dispatch({ type: "OPEN_HISTORY" })}>
                <BookOpen className="size-5" />
                История решений
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#1B0F33] text-white">
      <div className="absolute inset-0">
        <Image src="/mission-lab/engineer/13-ending-guardian.png" alt="Город Неополис" fill sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,15,51,.72),rgba(27,15,51,.94))]" />
        <NoiseAndParticles danger={false} />
      </div>
      <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl items-center px-4 py-10 md:px-8">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-[34px] border border-white/15 bg-white/[0.08] p-5 shadow-[0_0_90px_rgba(167,139,250,.25)] backdrop-blur-2xl md:p-9">
          <Badge className="border-[#FFD166]/35 bg-[#FFD166]/12 text-[#FFD166]">Диагностическая матрица</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Каждый выбор меняет не только историю.
            <span className="block bg-gradient-to-r from-[#FF6B6B] via-[#FF9F43] to-[#FFD166] bg-clip-text text-transparent">Он меняет тебя.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#EDE7FF]">{summary.explanation}</p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#FF9F43]/25 bg-[#FF9F43]/10 p-5">
                <p className="text-sm font-bold text-[#FFD166]">Главный архетип</p>
                <p className="mt-2 text-4xl font-black">{summary.primary}</p>
              </div>
              <div className="rounded-3xl border border-[#A78BFA]/25 bg-[#A78BFA]/10 p-5">
                <p className="text-sm font-bold text-[#EDE7FF]/75">Вторичный сигнал</p>
                <p className="mt-2 text-3xl font-black capitalize">{summary.secondary}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => dispatch({ type: "OPEN_HISTORY" })}>
                  <BookOpen className="size-5" />
                  История решений
                </Button>
                <Button size="lg" variant="secondary" onClick={() => dispatch({ type: "RESET" })}>
                  <RotateCcw className="size-5" />
                  Пройти заново
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/15 bg-[#120A28]/60 p-5">
                <div className="flex items-center gap-3">
                  <Activity className="size-5 text-[#00D1C6]" />
                  <h2 className="text-xl font-black">Распределение сигналов</h2>
                </div>
                <div className="mt-5 grid gap-3">
                  {summary.distribution.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="capitalize">{item.label}</span>
                        <span style={{ color: item.color }}>{item.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full" style={{ background: item.color }} initial={{ width: 0 }} animate={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-[#120A28]/60 p-5">
                <h2 className="text-xl font-black">Сильные качества</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {summary.strengths.map((item) => (
                    <Badge key={item} variant="violet">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-[#120A28]/60 p-5">
                <h2 className="text-xl font-black">Подходящие профессии</h2>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {summary.professions.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function HistoryScreen() {
  const { state, dispatch } = useTechnoQuarterGame();

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#1B0F33] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(167,139,250,.3),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(0,209,198,.18),transparent_24%),#1B0F33]" />
      <NoiseAndParticles danger={false} />
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge>История решений</Badge>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">Что увидит будущий AI</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => dispatch({ type: state.isComplete ? "OPEN_RESULT" : "BACK_TO_NOVEL" })}>
              <ArrowLeft className="size-4" />
              Назад
            </Button>
            <Button variant="ghost" onClick={() => dispatch({ type: "RESET" })}>
              <RotateCcw className="size-4" />
              Заново
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {state.decisions.length ? (
            state.decisions.map((decision, index) => (
              <motion.article
                key={`${decision.frameId}-${decision.choiceId}-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-3xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF9F43]">Сигнал {index + 1}</p>
                    <h2 className="mt-2 text-2xl font-black">{decision.choiceText}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#EDE7FF]/75">{decision.aiSignal}</p>
                    <p className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-[#EDE7FF]/65">{decision.narrativeContext}</p>
                  </div>
                  <div className="min-w-72">
                    <p className="text-sm font-black text-[#FFD166]">Качества</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {decision.qualities.map((quality) => (
                        <Badge key={quality}>{quality}</Badge>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-black text-[#B8FFFB]">Профессии</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {decision.professions.map((profession) => (
                        <Badge key={profession} variant="violet">
                          {profession}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-8 text-center backdrop-blur-2xl">
              <Sparkles className="mx-auto size-8 text-[#FFD166]" />
              <p className="mt-3 text-xl font-black">Решений пока нет</p>
              <p className="mt-2 text-[#EDE7FF]/75">Пройди пролог и выбери первый маршрут, чтобы увидеть структурированные события для AI.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function GameRouter({
  mode,
  onComplete
}: {
  mode: "standalone" | "embedded";
  onComplete?: (result: TechnoQuarterCompletion) => void;
}) {
  const { state } = useTechnoQuarterGame();
  if (state.view === "history") return <HistoryScreen />;
  if (state.view === "result") return <ResultScreen mode={mode} onComplete={onComplete} />;
  return <NovelScreen />;
}

export function TechnoQuarterApp({
  mode = "standalone",
  onComplete
}: {
  mode?: "standalone" | "embedded";
  onComplete?: (result: TechnoQuarterCompletion) => void;
}) {
  return (
    <TechnoQuarterProvider>
      <GameRouter mode={mode} onComplete={onComplete} />
    </TechnoQuarterProvider>
  );
}
