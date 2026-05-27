"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  appearanceTabs,
  archetypes,
  auras,
  gadgets,
  hairColors,
  interactionStyles,
  specializations,
  visualStyles,
  expressions,
  type AvatarConfig
} from "@/data/avatar";
import { cn } from "@/lib/utils";
import { OptionCard } from "./option-card";

type UpdateAvatar = (patch: Partial<AvatarConfig>) => void;

export function ArchetypeSelector({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  return (
    <StepShell title="Кем ты хочешь стать?" subtitle="Выбери стартовый архетип. Он задает первые способности и тон профиля.">
      <div className="grid gap-3 md:grid-cols-2">
        {archetypes.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.archetype === option.id}
            onSelect={() => update({ archetype: option.id })}
            accent={accent}
          />
        ))}
      </div>
    </StepShell>
  );
}

export function VisualStyleSelector({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  return (
    <StepShell title="Какой стиль тебе ближе?" subtitle="Визуальный стиль меняет настроение цифрового образа и карточки preview.">
      <div className="grid gap-3 sm:grid-cols-2">
        {visualStyles.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.visualStyle === option.id}
            onSelect={() => update({ visualStyle: option.id })}
            accent={accent}
            compact
          />
        ))}
      </div>
    </StepShell>
  );
}

export function AppearanceCustomizer({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  const [activeTab, setActiveTab] = useState<(typeof appearanceTabs)[number]["id"]>("face");
  const tab = appearanceTabs.find((item) => item.id === activeTab) ?? appearanceTabs[0];

  function setAppearance(key: keyof AvatarConfig["appearance"], value: string) {
    update({ appearance: { ...config.appearance, [key]: value } });
  }

  return (
    <StepShell title="Создай свой образ" subtitle="Настрой детали внешности. Это не влияет на диагностику, но делает профиль личным.">
      <div className="flex flex-wrap gap-2">
        {appearanceTabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-black transition",
              activeTab === item.id ? "border-transparent text-white" : "border-white/12 bg-white/[0.06] text-white/70 hover:text-white"
            )}
            style={activeTab === item.id ? { background: `linear-gradient(90deg, ${accent}, #FFD166)` } : undefined}
          >
            {item.name}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 grid gap-3 sm:grid-cols-2"
      >
        {tab.options.map((item, index) => {
          const selected = config.appearance[activeTab] === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setAppearance(activeTab, item)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border bg-white/[0.06] p-3 text-left transition hover:scale-[1.01]",
                selected ? "border-transparent shadow-[0_18px_42px_rgba(255,107,107,.22)]" : "border-white/12 hover:border-white/25"
              )}
              style={selected ? { boxShadow: `0 0 0 1px ${accent}, 0 18px 42px ${accent}33` } : undefined}
            >
              <span
                className="grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-black text-white"
                style={{ background: `linear-gradient(135deg, ${accent}, ${index % 2 ? "#A78BFA" : "#FF9F43"})` }}
              >
                {index + 1}
              </span>
              <span className="font-black text-white">{item}</span>
            </button>
          );
        })}
      </motion.div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <MiniSelect title="Цвет волос" items={hairColors} value={config.appearance.hairColor} onChange={(value) => setAppearance("hairColor", value)} accent={accent} />
        <MiniSelect title="Выражение лица" items={expressions} value={config.appearance.expression} onChange={(value) => setAppearance("expression", value)} accent={accent} />
      </div>
    </StepShell>
  );
}

export function AuraSelector({ config, update }: { config: AvatarConfig; update: UpdateAvatar }) {
  return (
    <StepShell title="Выбери энергию личности" subtitle="Аура меняет свечение вокруг аватара и акцент кнопок на странице.">
      <div className="grid gap-3 sm:grid-cols-2">
        {auras.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.aura === option.id}
            onSelect={() => update({ aura: option.id })}
            accent={option.color ?? "#FF6B6B"}
            compact
          />
        ))}
      </div>
    </StepShell>
  );
}

export function GadgetSelector({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  return (
    <StepShell title="Выбери стартовый гаджет" subtitle="Гаджет добавляет первый бонус и сопровождает персонажа в миссиях.">
      <div className="grid gap-3 sm:grid-cols-2">
        {gadgets.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.gadget === option.id}
            onSelect={() => update({ gadget: option.id })}
            accent={accent}
          />
        ))}
      </div>
    </StepShell>
  );
}

export function InteractionSelector({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  return (
    <StepShell title="Как тебе комфортнее действовать?" subtitle="Этот выбор помогает системе сравнить заявленный стиль с решениями в миссиях.">
      <div className="grid gap-3 sm:grid-cols-2">
        {interactionStyles.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.interactionStyle === option.id}
            onSelect={() => update({ interactionStyle: option.id })}
            accent={accent}
            compact
          />
        ))}
      </div>
    </StepShell>
  );
}

export function SpecializationSelector({ config, update, accent }: { config: AvatarConfig; update: UpdateAvatar; accent: string }) {
  const selected = specializations.find((item) => item.id === config.specialization) ?? specializations[0];

  return (
    <StepShell title="Что тебе интересно сейчас?" subtitle="Выбери первую область. Позже карта города покажет соседние профессиональные треки.">
      <div className="grid gap-3 sm:grid-cols-2">
        {specializations.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={config.specialization === option.id}
            onSelect={() => update({ specialization: option.id })}
            accent={accent}
            compact
          />
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.06] p-4">
        <p className="text-sm font-black uppercase text-white/60">Может открыться позже</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.future?.map((item) => (
            <span key={item} className="rounded-full px-3 py-1.5 text-sm font-black text-white" style={{ background: `linear-gradient(90deg, ${accent}, #FF9F43)` }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </StepShell>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-white/68">{subtitle}</p>
      <div className="mt-6">{children}</div>
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
            className={cn("rounded-full border px-3 py-1.5 text-sm font-bold transition", value === item ? "border-transparent text-white" : "border-white/12 text-white/65 hover:text-white")}
            style={value === item ? { background: `linear-gradient(90deg, ${accent}, #FFD166)` } : undefined}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
