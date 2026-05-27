"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, SkipForward } from "lucide-react";
import { useState } from "react";
import {
  archetypes,
  auras,
  defaultAvatarConfig,
  findAvatarOption,
  gadgets,
  interactionStyles,
  specializations,
  type AvatarConfig
} from "@/data/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarPreview } from "./avatar-preview";
import { StepProgress } from "./step-progress";
import {
  AppearanceCustomizer,
  ArchetypeSelector,
  AuraSelector,
  GadgetSelector,
  InteractionSelector,
  SpecializationSelector,
  VisualStyleSelector
} from "./selectors";
import { AvatarPassport } from "./avatar-passport";

export type AvatarState = {
  style: string;
  styleImage: string;
  gadget: string;
  gadgetImage: string;
  approach: string;
  specialization: string;
  config?: AvatarConfig;
};

const totalSteps = 8;

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

  function saveAvatar() {
    window.localStorage.setItem("neopolis-avatar-config", JSON.stringify(config));
    setSaved(true);
    setToast("Аватар создан");
    window.setTimeout(() => setToast(""), 2200);
  }

  function completeAvatar() {
    if (!saved) {
      window.localStorage.setItem("neopolis-avatar-config", JSON.stringify(config));
      setSaved(true);
    }
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

  const steps = [
    <ArchetypeSelector key="archetype" config={config} update={update} accent={accent} />,
    <VisualStyleSelector key="style" config={config} update={update} accent={accent} />,
    <AppearanceCustomizer key="appearance" config={config} update={update} accent={accent} />,
    <AuraSelector key="aura" config={config} update={update} />,
    <GadgetSelector key="gadget" config={config} update={update} accent={accent} />,
    <InteractionSelector key="interaction" config={config} update={update} accent={accent} />,
    <SpecializationSelector key="specialization" config={config} update={update} accent={accent} />,
    <AvatarPassport
      key="passport"
      config={config}
      saved={saved}
      onSave={saveAvatar}
      onEdit={() => setStep(0)}
      onComplete={completeAvatar}
    />
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1B0F33] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,107,107,.26),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(167,139,250,.24),transparent_32%),radial-gradient(circle_at_48%_92%,rgba(255,209,102,.15),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase" style={{ color: accent }}>Создание аватара</p>
            <h1 className="mt-2 text-4xl font-black sm:text-6xl">Создание аватара</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Собери цифровую версию своей личности и начни путь к будущему.
            </p>
          </div>
          <div className="w-full lg:w-[360px]">
            <StepProgress step={step} total={totalSteps} accent={accent} />
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.92fr_0.82fr_0.62fr]">
          <aside className="order-2 xl:order-1">
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(27,15,51,0.22)] backdrop-blur-2xl">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setStep(index)}
                    className={cn(
                      "grid size-9 place-items-center rounded-full border text-sm font-black transition",
                      step === index ? "border-transparent text-white" : "border-white/12 bg-white/[0.06] text-white/55 hover:text-white"
                    )}
                    style={step === index ? { background: `linear-gradient(135deg, ${accent}, #FFD166)` } : undefined}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col">
                <Button type="button" onClick={back} disabled={step === 0} variant="secondary" className="flex-1">
                  <ArrowLeft className="size-4" />
                  Назад
                </Button>
                <Button type="button" onClick={next} className="flex-1" style={{ background: `linear-gradient(90deg, ${accent}, #FF9F43)` }}>
                  {step === totalSteps - 1 ? "Перейти к карте" : "Продолжить"}
                  <ArrowRight className="size-4" />
                </Button>
                <Button type="button" onClick={next} variant="secondary" className="flex-1">
                  <SkipForward className="size-4" />
                  Пропустить настройку
                </Button>
              </div>

              <button
                type="button"
                onClick={saveAvatar}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-black transition hover:scale-[1.01] hover:bg-white/[0.1]"
              >
                <Save className="size-4" />
                Сохранить аватар
              </button>
            </div>
          </aside>

          <section className="order-3 rounded-2xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_24px_70px_rgba(27,15,51,0.2)] backdrop-blur-2xl xl:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.99 }}
                transition={{ duration: 0.28 }}
              >
                {steps[step]}
              </motion.div>
            </AnimatePresence>
          </section>

          <aside className="order-1 xl:order-3">
            <AvatarPreview config={config} />
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/20 bg-[#1B0F33]/85 px-5 py-4 font-black text-white shadow-2xl backdrop-blur-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
