"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Hexagon, Lock, Play, X } from "lucide-react";
import { useMemo, useState } from "react";
import { careerMissions } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MapDistrict = {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  available: boolean;
  tier?: "free" | "premium";
  mission?: string;
  description?: string;
  skills?: string[];
  x: number;
  y: number;
  align?: "left" | "right";
};

const mapDistricts: MapDistrict[] = [
  {
    id: "tech",
    number: 1,
    name: "ТехноКвартал",
    subtitle: "технологии, ИИ, робототехника",
    available: true,
    tier: "free",
    mission: "Сбой транспортной сети",
    description: "Восстанови автоматические поезда и найди сбой в городской транспортной системе.",
    skills: ["системное мышление", "аналитика", "технологии", "инженерная логика"],
    x: 30,
    y: 29
  },
  {
    id: "media",
    number: 2,
    name: "МедиаСектор",
    subtitle: "медиа, коммуникации, креатив",
    available: true,
    tier: "free",
    mission: "Информационная паника",
    description: "Останови волну фейков и собери понятную коммуникацию для жителей города.",
    skills: ["критическое мышление", "медиа", "коммуникация", "сторителлинг"],
    x: 17,
    y: 55
  },
  {
    id: "analytics",
    number: 3,
    name: "Аналитический Купол",
    subtitle: "данные, аналитика, стратегия",
    available: true,
    tier: "free",
    mission: "Пропавшие данные Навигатора",
    description: "Восстанови данные Центрального Навигатора и собери карьерные гипотезы.",
    skills: ["анализ данных", "стратегия", "моделирование", "исследование"],
    x: 46,
    y: 55
  },
  {
    id: "business",
    number: 4,
    name: "БизнесЦентр",
    subtitle: "бизнес, финансы, управление",
    available: false,
    tier: "premium",
    x: 53,
    y: 26
  },
  {
    id: "bio",
    number: 5,
    name: "БиоСтанция",
    subtitle: "медицина, биотехнологии, здоровье",
    available: false,
    tier: "premium",
    x: 70,
    y: 31
  },
  {
    id: "engineering",
    number: 6,
    name: "Инженерный Комплекс",
    subtitle: "инженерия, производство, конструирование",
    available: false,
    tier: "premium",
    x: 71,
    y: 60
  },
  {
    id: "social",
    number: 7,
    name: "Социальный Центр",
    subtitle: "психология, образование, общество",
    available: false,
    tier: "premium",
    x: 27,
    y: 79
  },
  {
    id: "creative",
    number: 8,
    name: "Креативный Хаб",
    subtitle: "дизайн, искусство, музыка, культура",
    available: false,
    tier: "premium",
    x: 50,
    y: 82
  },
  {
    id: "eco",
    number: 9,
    name: "ЭкоЗона",
    subtitle: "экология, агротехнологии, устойчивое будущее",
    available: false,
    tier: "premium",
    x: 85,
    y: 43,
    align: "right"
  },
  {
    id: "science",
    number: 10,
    name: "Научный Архив",
    subtitle: "наука, исследования, инновации",
    available: false,
    tier: "premium",
    x: 72,
    y: 82
  }
];

function MissionModal({
  district,
  completed,
  onClose,
  onStart
}: {
  district: MapDistrict;
  completed: boolean;
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/62 px-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        className="w-full max-w-2xl rounded-2xl border border-[#FF6B6B]/35 bg-[#1B0F33]/88 shadow-[0_0_60px_rgba(255,107,107,0.22)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#FF6B6B]/18 p-6">
          <div>
            <Badge>{district.name}</Badge>
            <h2 className="mt-4 text-3xl font-black text-white">{district.mission}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-2 text-slate-300 transition hover:text-white"
            aria-label="Закрыть"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-lg leading-8 text-slate-300">{district.description}</p>
          <h3 className="mt-6 font-black text-white">Проверяемые навыки</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {district.skills?.map((skill) => <Badge key={skill}>{skill}</Badge>)}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onStart} disabled={completed} className="flex-1" size="lg">
              {completed ? "Миссия завершена" : "Начать"}
              <Play className="size-5" />
            </Button>
            <Button onClick={onClose} variant="secondary" className="flex-1" size="lg">
              Закрыть
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LockedModal({ district, onClose, onOpenSubscription }: { district: MapDistrict; onClose: () => void; onOpenSubscription: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/62 px-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        className="w-full max-w-xl rounded-2xl border border-[#A78BFA]/35 bg-[#1B0F33]/88 p-7 text-center shadow-[0_0_60px_rgba(167,139,250,0.25)] backdrop-blur-2xl"
      >
        <div className="mx-auto grid size-20 place-items-center text-[#d7b8ff]">
          <Hexagon className="absolute size-20" />
          <Lock className="relative size-9" />
        </div>
        <Badge variant="violet" className="mt-6">Premium</Badge>
        <h2 className="mt-4 text-3xl font-black text-white">{district.name}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Район закрыт. Открой полную версию, чтобы завершить карьерную диагностику.
        </p>
        <Button onClick={onOpenSubscription} className="mt-7 w-full" size="lg">
          Открыть подписку
        </Button>
        <button type="button" onClick={onClose} className="mt-3 text-sm font-bold text-white/55">Закрыть</button>
      </motion.div>
    </motion.div>
  );
}

function DistrictMarker({
  district,
  completed,
  onClick,
  index
}: {
  district: MapDistrict;
  completed: boolean;
  onClick: () => void;
  index: number;
}) {
  const locked = !district.available;
  return (
    <motion.button
      type="button"
      aria-label={`${district.name}: ${district.subtitle}`}
      onClick={onClick}
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-left transition hover:scale-105"
      style={{ left: `${district.x}%`, top: `${district.y}%` }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.42 }}
    >
      <span
        className={cn(
          "relative grid size-[clamp(2rem,3.9vw,4rem)] shrink-0 place-items-center",
          locked ? "text-[#d6b2ff] drop-shadow-[0_0_18px_rgba(167,139,250,0.75)]" : "text-[#FF6B6B] drop-shadow-[0_0_18px_rgba(255,107,107,0.9)]"
        )}
      >
        <Hexagon className="absolute size-full" strokeWidth={1.9} />
        {locked ? <Lock className="size-[42%]" /> : completed ? <CheckIcon /> : <Play className="size-[42%] fill-current" />}
      </span>
      <span
        className={cn(
          "w-[clamp(8.5rem,13vw,14rem)] rounded-2xl border bg-[#1B0F33]/62 px-[clamp(.45rem,.7vw,.75rem)] py-[clamp(.38rem,.58vw,.6rem)] backdrop-blur-md max-md:hidden",
          locked ? "border-[#A78BFA]/20 shadow-[0_0_24px_rgba(167,139,250,0.16)]" : "border-[#FF6B6B]/24 shadow-[0_0_24px_rgba(255,107,107,0.18)]",
          district.align === "right" && "order-first text-right"
        )}
      >
        <span className="flex items-center gap-2">
          <span className={cn("rounded bg-white/[0.06] px-2 py-1 text-[clamp(.62rem,.76vw,.88rem)] font-black", locked ? "text-[#d7b8ff]" : "text-[#FF6B6B]")}>
            {district.number}
          </span>
          <span className="text-[clamp(.72rem,.93vw,1rem)] font-black text-white">{district.name}</span>
        </span>
        <span className="mt-1 block text-[clamp(.52rem,.66vw,.75rem)] font-semibold uppercase leading-[1.35] text-slate-300">{district.subtitle}</span>
      </span>
    </motion.button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[42%]" fill="none">
      <path d="m6 12 4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative mx-auto size-32">
      <svg className="size-full -rotate-90" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={radius} stroke="rgba(15,23,42,.95)" strokeWidth="9" fill="none" />
        <motion.circle
          cx="55"
          cy="55"
          r={radius}
          stroke="#FF6B6B"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.75 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-3xl font-black text-white">{progress}%</div>
    </div>
  );
}

function Compass() {
  return (
    <div className="pointer-events-none absolute bottom-10 right-10 z-30 hidden size-28 rounded-full border border-[#FF6B6B]/22 text-[#FF6B6B]/70 lg:block">
      <div className="absolute inset-3 rounded-full border border-[#FF6B6B]/14" />
      <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs">N</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs">S</div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">W</div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">E</div>
      <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 bg-[#FF6B6B]/45" />
      <div className="absolute left-1/2 top-1/2 h-20 w-px -translate-y-1/2 bg-[#FF6B6B]/45" />
      <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6B6B]" />
    </div>
  );
}

export function GameMap({
  completedMissionIds,
  subscriptionActive,
  onOpenMission,
  onOpenReport,
  onOpenSubscription
}: {
  completedMissionIds: string[];
  subscriptionActive: boolean;
  onOpenMission: (missionId: string) => void;
  onOpenReport: () => void;
  onOpenSubscription: () => void;
}) {
  const [selectedDistrict, setSelectedDistrict] = useState<MapDistrict | null>(null);
  const allCompleted = completedMissionIds.length >= careerMissions.length;
  const progress = Math.round((completedMissionIds.length / careerMissions.length) * 100);

  const nextMission = useMemo(() => {
    return careerMissions.find((mission) => {
      if (completedMissionIds.includes(mission.id)) return false;
      if (mission.tier === "premium" && !subscriptionActive) return false;
      return true;
    }) ?? careerMissions[0];
  }, [completedMissionIds, subscriptionActive]);

  function startMission(district: MapDistrict) {
    const mission = careerMissions.find((item) => item.districtId === district.id);
    if (!mission) return;
    setSelectedDistrict(null);
    onOpenMission(mission.id);
  }

  function continueMission() {
    if (allCompleted) {
      onOpenReport();
      return;
    }
    if (!subscriptionActive && completedMissionIds.length >= 3) {
      onOpenReport();
      return;
    }
    const district = mapDistricts.find((item) => item.id === nextMission.districtId);
    if (district) setSelectedDistrict(district);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1B0F33]">
      <div className="absolute left-1/2 top-1/2 aspect-video h-[min(100vh,56.25vw)] w-[min(100vw,177.7778vh)] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <Image src="/neopolis-map-bg.png" alt="Город НЕОПОЛИС" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#1B0F33]/[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_48%,rgba(255,107,107,0.16),transparent_32%),radial-gradient(circle_at_68%_33%,rgba(167,139,250,0.16),transparent_31%),linear-gradient(180deg,rgba(255,209,102,0.08),rgba(27,15,51,0.18))] backdrop-blur-[0.4px]" />

        {mapDistricts.map((district, index) => {
          const mission = careerMissions.find((item) => item.districtId === district.id);
          const completed = mission ? completedMissionIds.includes(mission.id) : false;
          const missionIndex = mission ? careerMissions.findIndex((item) => item.id === mission.id) : -1;
          const unlocked = district.tier !== "premium" || (subscriptionActive && missionIndex <= completedMissionIds.length);
          return (
            <DistrictMarker
              key={district.id}
              district={{ ...district, available: unlocked }}
              completed={completed}
              index={index}
              onClick={() => setSelectedDistrict(district)}
            />
          );
        })}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 aspect-video h-[min(100vh,56.25vw)] w-[min(100vw,177.7778vh)] -translate-x-1/2 -translate-y-1/2 p-[clamp(.75rem,1.7vw,2rem)]">
        <motion.div
          className="pointer-events-auto max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[clamp(1.6rem,3.2vw,3.2rem)] font-light tracking-[0.12em] text-white drop-shadow-[0_0_18px_rgba(255,107,107,0.5)]">
            НЕОПОЛИС
          </h1>
          <div className="mt-[clamp(.35rem,.8vw,.75rem)] h-px w-[min(18rem,28vw)] bg-gradient-to-r from-[#FF6B6B]/70 to-transparent" />
          <p className="mt-[clamp(.35rem,.8vw,.75rem)] text-[clamp(.56rem,.82vw,.88rem)] font-semibold uppercase tracking-[0.08em] text-[#FF6B6B]">
            Город твоих возможностей
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-auto mt-[clamp(1rem,3.4vw,3rem)] w-[clamp(9rem,14vw,14rem)] rounded-2xl border border-[#FF6B6B]/30 bg-[#1B0F33]/52 p-[clamp(.65rem,1vw,1.25rem)] backdrop-blur-xl max-md:hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <p className="text-[clamp(.6rem,.78vw,.85rem)] font-black uppercase text-[#FF6B6B]">Легенда</p>
          <div className="mt-[clamp(.6rem,1vw,1.2rem)] flex items-center gap-3 text-[clamp(.55rem,.72vw,.82rem)] font-semibold uppercase text-slate-300">
            <span className="relative grid size-8 place-items-center text-[#FF6B6B]">
              <Hexagon className="absolute size-8" />
              <span className="size-2 rounded-full bg-[#FF6B6B]" />
            </span>
            Доступно
          </div>
          <div className="mt-[clamp(.5rem,.8vw,1rem)] flex items-center gap-3 text-[clamp(.55rem,.72vw,.82rem)] font-semibold uppercase text-slate-300">
            <span className="relative grid size-8 place-items-center text-[#A78BFA]">
              <Hexagon className="absolute size-8" />
              <Lock className="size-4" />
            </span>
            Заблокировано
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-auto absolute right-[clamp(.75rem,1.7vw,2rem)] top-[clamp(.75rem,1.7vw,2rem)] w-[clamp(10rem,14vw,14.5rem)] rounded-2xl border border-[#FF6B6B]/28 bg-[#1B0F33]/54 p-[clamp(.65rem,1vw,1.25rem)] backdrop-blur-xl max-md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          <p className="text-[clamp(.6rem,.78vw,.85rem)] font-black uppercase text-[#FF6B6B]">Твой прогресс</p>
          <ProgressRing progress={progress} />
          <p className="mt-1 text-center text-[clamp(.6rem,.78vw,.85rem)] font-semibold text-[#FFF3E0]">{completedMissionIds.length} из 10 районов пройдено</p>
          <div className="mt-[clamp(.45rem,.8vw,1rem)] h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-[#FF6B6B]" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-auto absolute bottom-[clamp(.75rem,1.7vw,2rem)] left-[clamp(.75rem,1.7vw,2rem)] w-[clamp(11rem,15vw,15rem)] rounded-2xl border border-[#FF6B6B]/28 bg-[#1B0F33]/58 p-[clamp(.65rem,1vw,1.25rem)] backdrop-blur-xl max-md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <p className="text-[clamp(.6rem,.78vw,.85rem)] font-black uppercase text-[#FF6B6B]">Текущее задание</p>
          <p className="mt-[clamp(.7rem,1.2vw,1.25rem)] text-[clamp(.62rem,.78vw,.88rem)] leading-6 text-[#FFF3E0]">
            Продолжай миссии, чтобы открыть новые районы Неополиса
          </p>
          <button
            type="button"
            onClick={continueMission}
            className="mt-[clamp(.65rem,1vw,1rem)] flex w-full items-center justify-between rounded-2xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/10 px-4 py-3 text-[clamp(.62rem,.78vw,.88rem)] font-black text-[#FF6B6B] transition hover:bg-[#FF6B6B]/18"
          >
            {allCompleted ? "Полный отчет" : !subscriptionActive && completedMissionIds.length >= 3 ? "Предварительный профиль" : "Продолжить"}
            <ChevronRight className="size-5" />
          </button>
        </motion.div>

        <Compass />
      </div>

      <AnimatePresence>
        {selectedDistrict?.available && (
          <MissionModal
            district={selectedDistrict}
            completed={Boolean(
              careerMissions.find((mission) => mission.districtId === selectedDistrict.id && completedMissionIds.includes(mission.id))
            )}
            onClose={() => setSelectedDistrict(null)}
            onStart={() => startMission(selectedDistrict)}
          />
        )}
        {selectedDistrict && !selectedDistrict.available && (
          <LockedModal district={selectedDistrict} onClose={() => setSelectedDistrict(null)} onOpenSubscription={onOpenSubscription} />
        )}
      </AnimatePresence>
    </div>
  );
}


