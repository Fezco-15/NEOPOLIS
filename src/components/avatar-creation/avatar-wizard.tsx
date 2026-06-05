"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, SkipForward } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  appearanceTabs,
  archetypes,
  auras,
  buildAvatarProfileSignals,
  defaultAvatarConfig,
  expressions,
  findAvatarOption,
  gadgets,
  hairColors,
  interactionStyles,
  specializations,
  visualStyles,
  type AvatarConfig,
  type AvatarOption,
  type AvatarProfileSignal
} from "@/data/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarPreview } from "./avatar-preview";
import { StepProgress } from "./step-progress";
import { OptionCard } from "./option-card";
import { AvatarPassport } from "./avatar-passport";

export type AvatarState = {
  style: string;
  styleImage: string;
  gadget: string;
  gadgetImage: string;
  approach: string;
  specialization: string;
  profileSignals: AvatarProfileSignal[];
  config?: AvatarConfig;
};

const totalSteps = 8;

type PanelContent = {
  title: string;
  subtitle: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

function splitOptions<T>(items: T[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)] as const;
}

function OptionColumn({
  options,
  selectedId,
  onSelect,
  accent,
  compact = false
}: {
  options: AvatarOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          selected={selectedId === option.id}
          onSelect={() => onSelect(option.id)}
          accent={option.color ?? accent}
          compact={compact}
        />
      ))}
    </div>
  );
}

function MiniSelect({
  title,
  items,
  value,
  onChange,
  accent
}: {
  title: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
      <p className="text-sm font-black uppercase text-white/60">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-bold transition",
              value === item ? "border-transparent text-white" : "border-white/12 text-white/65 hover:text-white"
            )}
            style={value === item ? { background: `linear-gradient(90deg, ${accent}, #FFD166)` } : undefined}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function AppearanceColumn({
  tabIds,
  config,
  update,
  accent
}: {
  tabIds: (typeof appearanceTabs)[number]["id"][];
  config: AvatarConfig;
  update: (patch: Partial<AvatarConfig>) => void;
  accent: string;
}) {
  function setAppearance(key: keyof AvatarConfig["appearance"], value: string) {
    update({ appearance: { ...config.appearance, [key]: value } });
  }

  return (
    <div className="grid gap-4">
      {appearanceTabs
        .filter((tab) => tabIds.includes(tab.id))
        .map((tab) => (
          <div key={tab.id} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
            <p className="text-sm font-black uppercase text-white/60">{tab.name}</p>
            <div className="mt-3 grid gap-2">
              {tab.options.map((item, index) => {
                const selected = config.appearance[tab.id] === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAppearance(tab.id, item)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border bg-white/[0.06] p-3 text-left transition hover:scale-[1.01]",
                      selected ? "border-transparent shadow-[0_18px_42px_rgba(255,107,107,.22)]" : "border-white/12 hover:border-white/25"
                    )}
                    style={selected ? { boxShadow: `0 0 0 1px ${accent}, 0 18px 42px ${accent}33` } : undefined}
                  >
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-2xl text-sm font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${index % 2 ? "#A78BFA" : "#FF9F43"})` }}
                    >
                      {index + 1}
                    </span>
                    <span className="font-black text-white">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}

export function AvatarWizard({ onComplete }: { onComplete: (avatar: AvatarState) => void }) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");

  const aura = findAvatarOption(auras, config.aura);
  const accent = aura.color ?? "#FF6B6B";

  const update = (patch: Partial<AvatarConfig>) => {
    setSaved(false);
    setConfig((current) => ({ ...current, ...patch }));
  };

  const profileSignals = useMemo(() => buildAvatarProfileSignals(config), [config]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [step]);

  function saveAvatar() {
    window.localStorage.setItem("neopolis-avatar-config", JSON.stringify(config));
    window.localStorage.setItem("neopolis-avatar-profile-signals", JSON.stringify(profileSignals));
    setSaved(true);
    setToast("Аватар создан");
    window.setTimeout(() => setToast(""), 2200);
  }

  function completeAvatar() {
    if (!saved) saveAvatar();
    const archetype = findAvatarOption(archetypes, config.archetype);
    const gadget = findAvatarOption(gadgets, config.gadget);
    const interaction = findAvatarOption(interactionStyles, config.interactionStyle);
    const specialization = findAvatarOption(specializations, config.specialization);

    onComplete({
      style: archetype.name,
      styleImage: archetype.image ?? "/avatar-analyst.svg",
      gadget: gadget.name,
      gadgetImage: gadget.image ?? "/gadget-drone.svg",
      approach: interaction.name,
      specialization: specialization.name,
      profileSignals,
      config
    });
  }

  function next() {
    if (step === totalSteps - 1) {
      completeAvatar();
      return;
    }
    setStep((current) => Math.min(totalSteps - 1, current + 1));
  }

  function back() {
    setStep((current) => Math.max(0, current - 1));
  }

  const panel: PanelContent = (() => {
    const [archetypeLeft, archetypeRight] = splitOptions(archetypes);
    const [styleLeft, styleRight] = splitOptions(visualStyles);
    const [auraLeft, auraRight] = splitOptions(auras);
    const [gadgetLeft, gadgetRight] = splitOptions(gadgets);
    const [interactionLeft, interactionRight] = splitOptions(interactionStyles);
    const [specializationLeft, specializationRight] = splitOptions(specializations);

    if (step === 0) {
      return {
        title: "Кем ты хочешь стать?",
        subtitle: "Выбери образ, с которого начнется твой путь по Неополису.",
        left: <OptionColumn options={archetypeLeft} selectedId={config.archetype} onSelect={(id) => update({ archetype: id })} accent={accent} />,
        right: <OptionColumn options={archetypeRight} selectedId={config.archetype} onSelect={(id) => update({ archetype: id })} accent={accent} />
      };
    }

    if (step === 1) {
      return {
        title: "Какой стиль тебе ближе?",
        subtitle: "Стиль показывает, как ты хочешь презентовать себя в цифровой среде.",
        left: <OptionColumn options={styleLeft} selectedId={config.visualStyle} onSelect={(id) => update({ visualStyle: id })} accent={accent} compact />,
        right: <OptionColumn options={styleRight} selectedId={config.visualStyle} onSelect={(id) => update({ visualStyle: id })} accent={accent} compact />
      };
    }

    if (step === 2) {
      return {
        title: "Создай свой образ",
        subtitle: "Настрой детали внешности, чтобы персонаж ощущался твоим.",
        left: (
          <div className="grid gap-4">
            <AppearanceColumn tabIds={["face", "hair", "eyes"]} config={config} update={update} accent={accent} />
            <MiniSelect title="Цвет волос" items={hairColors} value={config.appearance.hairColor} onChange={(value) => update({ appearance: { ...config.appearance, hairColor: value } })} accent={accent} />
          </div>
        ),
        right: (
          <div className="grid gap-4">
            <AppearanceColumn tabIds={["outfit", "accessories"]} config={config} update={update} accent={accent} />
            <MiniSelect title="Выражение лица" items={expressions} value={config.appearance.expression} onChange={(value) => update({ appearance: { ...config.appearance, expression: value } })} accent={accent} />
          </div>
        )
      };
    }

    if (step === 3) {
      return {
        title: "Выбери энергию личности",
        subtitle: "Аура задает настроение персонажа и цвет интерфейса.",
        left: <OptionColumn options={auraLeft} selectedId={config.aura} onSelect={(id) => update({ aura: id })} accent={accent} compact />,
        right: <OptionColumn options={auraRight} selectedId={config.aura} onSelect={(id) => update({ aura: id })} accent={accent} compact />
      };
    }

    if (step === 4) {
      return {
        title: "Выбери стартовый гаджет",
        subtitle: "Гаджет будет сопровождать персонажа в первых миссиях.",
        left: <OptionColumn options={gadgetLeft} selectedId={config.gadget} onSelect={(id) => update({ gadget: id })} accent={accent} />,
        right: <OptionColumn options={gadgetRight} selectedId={config.gadget} onSelect={(id) => update({ gadget: id })} accent={accent} />
      };
    }

    if (step === 5) {
      return {
        title: "Как тебе комфортнее действовать?",
        subtitle: "Выбери стиль, который ближе твоему персонажу в сложной ситуации.",
        left: <OptionColumn options={interactionLeft} selectedId={config.interactionStyle} onSelect={(id) => update({ interactionStyle: id })} accent={accent} compact />,
        right: <OptionColumn options={interactionRight} selectedId={config.interactionStyle} onSelect={(id) => update({ interactionStyle: id })} accent={accent} compact />
      };
    }

    if (step === 6) {
      return {
        title: "Что тебе интересно сейчас?",
        subtitle: "Выбери направление, с которого хочется начать исследование города.",
        left: <OptionColumn options={specializationLeft} selectedId={config.specialization} onSelect={(id) => update({ specialization: id })} accent={accent} compact />,
        right: <OptionColumn options={specializationRight} selectedId={config.specialization} onSelect={(id) => update({ specialization: id })} accent={accent} compact />
      };
    }

    return {
      title: "Профиль готов",
      subtitle: "Проверь цифровой паспорт персонажа перед первой миссией.",
      left: <AvatarPassport config={config} saved={saved} onSave={saveAvatar} onEdit={() => setStep(0)} onComplete={completeAvatar} />,
      right: (
        <div className="rounded-2xl border border-[#FFD166]/20 bg-[#FFD166]/10 p-5">
          <p className="text-sm font-black uppercase text-[#FFD166]">Перед запуском</p>
          <div className="mt-4 grid gap-3">
            {[
              "Проверь, нравится ли тебе внешний вид персонажа.",
              "Сохрани аватар, чтобы он появился в городе.",
              "После первой миссии откроется карта Неополиса."
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                <p className="text-sm leading-6 text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )
    };
  })();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1B0F33] px-4 pb-56 pt-6 text-white sm:px-6 sm:pb-44 lg:px-8 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,107,107,.26),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(167,139,250,.24),transparent_32%),radial-gradient(circle_at_48%_92%,rgba(255,209,102,.15),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-[1680px] flex-col">
        <div className="text-center">
          <p className="text-sm font-black uppercase" style={{ color: accent }}>Создание аватара</p>
          <h1 className="mt-2 text-4xl font-black sm:text-6xl">{panel.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">{panel.subtitle}</p>
        </div>

        <div className="mt-7 grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)_minmax(0,1fr)] lg:items-start">
          <section className="order-2 rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(27,15,51,0.2)] backdrop-blur-2xl lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={`left-${step}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.24 }}>
                {panel.left}
              </motion.div>
            </AnimatePresence>
          </section>

          <aside className="order-1 lg:sticky lg:top-6 lg:order-2">
            <AvatarPreview config={config} />
          </aside>

          <section className="order-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(27,15,51,0.2)] backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={`right-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.24 }}>
                {panel.right}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 max-h-[46vh] overflow-y-auto border-t border-white/12 bg-[#120A28]/88 px-3 py-3 shadow-[0_-24px_70px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:px-4 sm:py-4 lg:max-h-none lg:overflow-visible">
        <div className="mx-auto grid max-w-[1680px] gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <StepProgress step={step} total={totalSteps} accent={accent} />
          <div className="grid gap-2">
            <div className="grid grid-cols-8 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setStep(index)}
                className={cn(
                  "grid size-8 place-items-center rounded-full border text-xs font-black transition sm:size-10 sm:text-sm",
                  step === index ? "border-transparent text-white" : "border-white/12 bg-white/[0.06] text-white/55 hover:text-white"
                )}
                style={step === index ? { background: `linear-gradient(135deg, ${accent}, #FFD166)` } : undefined}
              >
                {index + 1}
              </button>
            ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Button type="button" onClick={back} disabled={step === 0} variant="secondary" className="h-11 px-3 text-sm">
              <ArrowLeft className="size-4" />
              Назад
            </Button>
            <Button type="button" onClick={next} className="h-11 px-3 text-sm" style={{ background: `linear-gradient(90deg, ${accent}, #FF9F43)` }}>
              {step === totalSteps - 1 ? "Перейти к миссии" : "Продолжить"}
              <ArrowRight className="size-4" />
            </Button>
            <Button type="button" onClick={next} variant="secondary" className="h-11 px-3 text-sm">
              <SkipForward className="size-4" />
              Пропустить настройку
            </Button>
            <Button type="button" onClick={saveAvatar} variant="secondary" className="h-11 px-3 text-sm">
              <Save className="size-4" />
              {saved ? "Сохранено" : "Сохранить аватар"}
            </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-28 right-6 z-50 rounded-2xl border border-white/20 bg-[#1B0F33]/85 px-5 py-4 font-black text-white shadow-2xl backdrop-blur-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
