"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, Bot, BrainCircuit, CheckCircle2, Map, Pause, Radio, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { MissionAnswer } from "@/components/game/mission-screen";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const terminalLines = [
  "СИНХРОНИЗАЦИЯ...",
  "ПОИСК НОВОГО УЧАСТНИКА...",
  "ПОДКЛЮЧЕНИЕ К НЕОПОЛИСУ...",
  "ORION VOICE SLOT: READY"
];

const skillNodes = ["аналитика", "коммуникация", "стратегия", "креативность", "лидерство"];

const districts = [
  { name: "ТехноКвартал", note: "логика, системное мышление, связи", active: true },
  { name: "МедиаСектор", note: "информация, креативность, внимание", active: true },
  { name: "Аналитический Купол", note: "данные, аномалии, закономерности", active: true },
  { name: "БизнесЦентр", note: "ресурсы, управление, финансы", active: false },
  { name: "БиоСтанция", note: "здоровье, этика, исследование", active: false },
  { name: "Инженерный Комплекс", note: "конструирование, безопасность", active: false },
  { name: "Социальный Центр", note: "эмпатия, образование, общество", active: false },
  { name: "Креативный Хаб", note: "дизайн, культура, смысл", active: false },
  { name: "ЭкоЗона", note: "устойчивость, экология, ресурсы", active: false },
  { name: "Научный Архив", note: "гипотезы, наука, инновации", active: false }
];

const firstChoices = [
  {
    text: "Сразу бежать помогать",
    traits: ["эмпатия", "реакция", "ответственность"],
    signal: "Вы сначала реагируете на человеческую срочность и риск для людей."
  },
  {
    text: "Сначала проанализировать, почему произошел сбой",
    traits: ["аналитика", "системность", "причинно-следственное мышление"],
    signal: "Вы ищете причину события до действия и думаете системно."
  },
  {
    text: "Связаться с другими людьми и собрать команду",
    traits: ["командность", "лидерство", "коммуникация"],
    signal: "Вы быстро подключаете людей и распределяете ответственность."
  },
  {
    text: "Попытаться перезапустить дрон самостоятельно",
    traits: ["инициативность", "техническое мышление", "самостоятельность"],
    signal: "Вы берете задачу на себя и пробуете техническое решение."
  }
];

type NovelScene = {
  id: string;
  eyebrow: string;
  title: string;
  orion: string[];
  mode: "boot" | "city" | "answers" | "districts" | "profile" | "choice" | "warning";
};

const scenes: NovelScene[] = [
  {
    id: "connect",
    eyebrow: "Сцена 1 / Подключение",
    title: "Пробуждение НЕОПОЛИСА",
    mode: "boot",
    orion: [
      "Если ты видишь это — значит система выбрала тебя.",
      "Добро пожаловать в НЕОПОЛИС."
    ]
  },
  {
    id: "city",
    eyebrow: "Сцена 2 / Что такое НЕОПОЛИС",
    title: "Город будущего, который наблюдает за решениями",
    mode: "city",
    orion: [
      "НЕОПОЛИС — город будущего.",
      "Здесь не спрашивают: кем ты хочешь быть.",
      "Вместо тестов система наблюдает, как ты думаешь, что замечаешь и как принимаешь решения."
    ]
  },
  {
    id: "answers",
    eyebrow: "Сцена 3 / Нет правильных ответов",
    title: "Твой путь важнее одного ответа",
    mode: "answers",
    orion: [
      "В НЕОПОЛИСЕ нет правильных ответов.",
      "Есть твои решения, твой стиль мышления и твой путь.",
      "Каждое решение — это сигнал."
    ]
  },
  {
    id: "districts",
    eyebrow: "Сцена 4 / 10 районов",
    title: "Каждый район проверяет отдельный тип мышления",
    mode: "districts",
    orion: [
      "Ты не проходишь тест.",
      "Ты проживаешь решения.",
      "Каждый район НЕОПОЛИСА показывает, где твои способности раскрываются сильнее."
    ]
  },
  {
    id: "profile",
    eyebrow: "Сцена 5 / Как AI изучает тебя",
    title: "ORION строит гипотезы, а не диагнозы",
    mode: "profile",
    orion: [
      "Я анализирую не один выбор, а повторяющиеся паттерны.",
      "Ты выбираешь: риск или осторожность, скорость или глубину, одиночное действие или команду.",
      "Система не определяет твою судьбу. Она ищет, где ты можешь раскрыться сильнее."
    ]
  },
  {
    id: "first-choice",
    eyebrow: "Сцена 6 / Первый выбор",
    title: "Дрон доставки падает рядом с магистралью",
    mode: "choice",
    orion: [
      "Прежде чем ты войдешь в город, мне нужно понять, как ты принимаешь решения.",
      "Внутри дрона — важные медицинские данные. Времени мало."
    ]
  },
  {
    id: "warning",
    eyebrow: "Сцена 7 / Первая миссия",
    title: "TRANSPORT SYSTEM FAILURE",
    mode: "warning",
    orion: [
      "Похоже, у тебя не будет времени на теорию.",
      "Транспортная сеть НЕОПОЛИСА выходит из строя.",
      "Если ты готов — тогда начнем."
    ]
  }
];

export function AwakeningNovel({
  account,
  avatar,
  onComplete,
  onSkip
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  onComplete: (answers: MissionAnswer[]) => void;
  onSkip: () => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [choiceLocked, setChoiceLocked] = useState(false);
  const scene = scenes[sceneIndex];
  const progress = Math.round(((sceneIndex + 1) / scenes.length) * 100);

  const playerName = account?.name?.trim() || "новый житель";
  const selected = selectedChoice === null ? null : firstChoices[selectedChoice];

  const firstAnswer = useMemo<MissionAnswer[]>(() => {
    if (!selected || !choiceLocked) return [];
    return [
      {
        missionId: "awakening-orion-signal",
        sceneTitle: "Первый выбор: дрон с медицинскими данными",
        choice: selected.text,
        traits: selected.traits,
        signal: selected.signal
      }
    ];
  }, [choiceLocked, selected]);

  function completeIntro(answers: MissionAnswer[] = firstAnswer) {
    window.localStorage.setItem("neopolis-awakening-complete", "true");
    onComplete(answers);
  }

  function skipIntro() {
    window.localStorage.setItem("neopolis-awakening-complete", "true");
    onSkip();
  }

  function next() {
    if (scene.mode === "choice" && !choiceLocked) {
      if (selectedChoice === null) return;
      setChoiceLocked(true);
      return;
    }
    if (sceneIndex === scenes.length - 1) {
      completeIntro();
      return;
    }
    setSceneIndex((current) => current + 1);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#120B2C] text-white">
      <Image src="/neopolis-hero-bg.png" alt="НЕОПОЛИС" fill priority className="object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,8,30,.92)_0%,rgba(27,15,51,.78)_42%,rgba(27,15,51,.45)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,107,107,.26),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(167,139,250,.22),transparent_30%),radial-gradient(circle_at_58%_82%,rgba(255,209,102,.16),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative flex min-h-screen flex-col px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 backdrop-blur-2xl">
            <Radio className="size-5 text-[#FFD166]" />
            <div>
              <p className="text-xs font-black uppercase text-white/45">ORION channel</p>
              <p className="text-sm font-black text-white">Пробуждение НЕОПОЛИСА</p>
            </div>
          </div>
          <button
            type="button"
            onClick={skipIntro}
            className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-black text-white/76 backdrop-blur-2xl transition hover:border-[#FF9F43]/50 hover:bg-white/[0.1] hover:text-white"
          >
            Пропустить интро
          </button>
        </div>

        <div className="grid flex-1 items-center gap-6 py-6 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimatePresence mode="wait">
            <motion.section
              key={scene.id}
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-[24px] border border-white/12 bg-[#1B0F33]/58 p-5 shadow-[0_28px_90px_rgba(12,8,30,.38)] backdrop-blur-2xl sm:p-7"
            >
              <Badge>{scene.eyebrow}</Badge>
              <h1 className="mt-5 bg-gradient-to-r from-[#FF6B6B] via-[#FF9F43] to-[#FFD166] bg-clip-text text-4xl font-black leading-[0.98] text-transparent sm:text-5xl xl:text-6xl">
                {scene.title}
              </h1>

              <div className="mt-7 rounded-[24px] border border-[#A78BFA]/25 bg-[#A78BFA]/10 p-5">
                <div className="flex items-center gap-4">
                  <OrionSignal warning={scene.mode === "warning"} />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FFD166]">ORION</p>
                    <p className="mt-1 text-sm font-semibold text-white/58">голосовой канал: субтитры активны</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 text-lg leading-8 text-[#EDE7FF]">
                  {scene.orion.map((line) => (
                    <p key={line}>{line.replace("новый житель", playerName)}</p>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={next} disabled={scene.mode === "choice" && selectedChoice === null} size="lg" className="min-w-56">
                  {scene.mode === "choice" && !choiceLocked
                    ? "Зафиксировать сигнал"
                    : scene.mode === "warning"
                      ? "Подключиться к ТехноКварталу"
                      : "Продолжить"}
                  {scene.mode === "choice" && !choiceLocked ? <CheckCircle2 className="size-5" /> : <ArrowRight className="size-5" />}
                </Button>
                <div className="flex min-w-52 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-white/66">
                  <Pause className="size-4 text-[#FF9F43]" />
                  audio slot: v1 placeholder
                </div>
              </div>
            </motion.section>
          </AnimatePresence>

          <div className="rounded-[24px] border border-white/12 bg-white/[0.06] p-4 shadow-[0_28px_90px_rgba(12,8,30,.28)] backdrop-blur-2xl sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-black uppercase text-white/52">Сцена {sceneIndex + 1} / {scenes.length}</p>
              <p className="text-sm font-black text-[#FFD166]">{progress}%</p>
            </div>
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166]" animate={{ width: `${progress}%` }} />
            </div>
            <SceneVisual scene={scene} avatar={avatar} playerName={playerName} selectedChoice={selectedChoice} choiceLocked={choiceLocked} onChoice={setSelectedChoice} />
          </div>
        </div>
      </div>
    </div>
  );
}

function OrionSignal({ warning }: { warning: boolean }) {
  return (
    <div className={cn("relative grid size-16 shrink-0 place-items-center rounded-2xl border", warning ? "border-[#FF6B6B]/45 bg-[#FF6B6B]/15" : "border-[#00D1C6]/35 bg-[#00D1C6]/10")}>
      <motion.div
        className={cn("absolute inset-1 rounded-2xl", warning ? "bg-[#FF6B6B]/20" : "bg-[#00D1C6]/16")}
        animate={{ scale: [1, 1.16, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <Bot className={cn("relative size-8", warning ? "text-[#FF6B6B]" : "text-[#00D1C6]")} />
    </div>
  );
}

function SceneVisual({
  scene,
  avatar,
  playerName,
  selectedChoice,
  choiceLocked,
  onChoice
}: {
  scene: NovelScene;
  avatar: AvatarState | null;
  playerName: string;
  selectedChoice: number | null;
  choiceLocked: boolean;
  onChoice: (index: number) => void;
}) {
  if (scene.mode === "boot") {
    return (
      <div className="min-h-[440px] rounded-[22px] border border-white/10 bg-black/35 p-5">
        <div className="grid gap-3 font-mono text-sm text-[#00D1C6]">
          {terminalLines.map((line, index) => (
            <motion.p key={line} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.2 }}>
              {line}
            </motion.p>
          ))}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-[#FFD166]">
            ПРОФИЛЬ НАЙДЕН: {playerName.toUpperCase()}
          </motion.p>
        </div>
        <div className="mt-8 grid place-items-center">
          <motion.div className="size-56 rounded-full border border-[#A78BFA]/40 bg-[#A78BFA]/10 shadow-[0_0_80px_rgba(167,139,250,.35)]" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
            <div className="grid h-full place-items-center">
              <BrainCircuit className="size-20 text-[#FFD166]" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (scene.mode === "districts") {
    return (
      <div className="grid max-h-[520px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {districts.map((district, index) => (
          <motion.div
            key={district.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.035 }}
            className={cn("rounded-2xl border p-4", district.active ? "border-[#00D1C6]/35 bg-[#00D1C6]/10" : "border-[#A78BFA]/25 bg-[#A78BFA]/10 opacity-75")}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black text-white">{district.name}</h3>
              <span className="text-xs font-black text-[#FFD166]">{district.active ? "BETA" : "LOCKED"}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/66">{district.note}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  if (scene.mode === "profile") {
    return (
      <div className="rounded-[22px] border border-white/10 bg-black/25 p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative mx-auto size-36 overflow-hidden rounded-[28px] border border-[#FF9F43]/30 bg-white/10 sm:mx-0">
            {avatar?.styleImage ? <Image src={avatar.styleImage} alt={avatar.style} fill className="object-cover" /> : <Sparkles className="m-10 size-16 text-[#FFD166]" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-black uppercase text-white/45">Голографический профиль</p>
            <h3 className="mt-2 text-2xl font-black text-white">{playerName}</h3>
            <p className="mt-2 leading-7 text-white/64">Профиль начал формироваться. Система видит первые фрагменты, но еще не делает финальный вывод.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {skillNodes.map((skill, index) => (
            <motion.div key={skill} className="rounded-2xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 p-4" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }}>
              <p className="font-black text-white">{skill}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166]" initial={{ width: 0 }} animate={{ width: `${30 + index * 8}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (scene.mode === "choice") {
    return (
      <div className="grid gap-4">
        <div className="rounded-[22px] border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 p-5">
          <div className="flex items-center gap-3 text-[#FFD166]">
            <Zap className="size-6" />
            <h3 className="text-xl font-black text-white">Инцидент: медицинский дрон</h3>
          </div>
          <p className="mt-3 leading-7 text-white/70">Выбор не оценивается как правильный или неправильный. ORION фиксирует стиль реакции.</p>
        </div>
        {firstChoices.map((choice, index) => {
          const active = selectedChoice === index;
          return (
            <button
              key={choice.text}
              type="button"
              disabled={choiceLocked}
              onClick={() => onChoice(index)}
              className={cn("rounded-2xl border p-4 text-left transition", active ? "border-[#FFD166] bg-[#FFD166]/12 shadow-[0_0_42px_rgba(255,209,102,.22)]" : "border-white/10 bg-white/[0.05] hover:border-[#FF9F43]/55 hover:bg-white/[0.08]")}
            >
              <p className="font-black text-white">{choice.text}</p>
              {(active || choiceLocked) && <p className="mt-2 text-sm leading-6 text-white/64">{choice.signal}</p>}
            </button>
          );
        })}
        {choiceLocked && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[#00D1C6]/30 bg-[#00D1C6]/10 p-4 text-sm font-bold leading-6 text-[#D9FFFA]">
            Интересный подход. Система зафиксировала новый поведенческий сигнал.
          </motion.div>
        )}
      </div>
    );
  }

  if (scene.mode === "warning") {
    return (
      <div className="grid min-h-[440px] place-items-center rounded-[22px] border border-[#FF6B6B]/35 bg-[#FF6B6B]/10 p-6 text-center">
        <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <Activity className="mx-auto size-20 text-[#FF6B6B]" />
          <h3 className="mt-6 text-3xl font-black text-white">WARNING</h3>
          <p className="mt-3 font-mono text-xl font-black text-[#FFD166]">TRANSPORT SYSTEM FAILURE</p>
          <p className="mt-5 max-w-lg leading-7 text-white/70">Камера движется к ТехноКварталу. Первая миссия начинается там, где город дал сбой.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[440px] place-items-center rounded-[22px] border border-white/10 bg-black/25 p-6">
      <div className="grid gap-4 text-center">
        <Map className="mx-auto size-16 text-[#A78BFA]" />
        <div className="flex flex-wrap justify-center gap-2">
          {["ЛОГИКА", "КРЕАТИВНОСТЬ", "ЛИДЕРСТВО", "ЭМПАТИЯ", "СТРАТЕГИЯ", "АНАЛИТИКА"].map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-black text-white/78">
              {item}
            </span>
          ))}
        </div>
        {scene.mode === "answers" && (
          <div className="mx-auto mt-4 max-w-md rounded-2xl border border-[#00D1C6]/25 bg-[#00D1C6]/10 p-4 text-sm font-bold leading-6 text-[#D9FFFA]">
            <ShieldCheck className="mx-auto mb-2 size-6" />
            Ошибка здесь невозможна. Важен не ответ, а способ думать.
          </div>
        )}
      </div>
    </div>
  );
}
