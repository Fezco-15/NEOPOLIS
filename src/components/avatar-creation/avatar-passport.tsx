"use client";

import Image from "next/image";
import { ArrowLeft, Check, Map, Save } from "lucide-react";
import {
  archetypes,
  auras,
  findAvatarOption,
  gadgets,
  interactionStyles,
  specializations,
  visualStyles,
  type AvatarConfig
} from "@/data/avatar";
import { Button } from "@/components/ui/button";

export function AvatarPassport({
  config,
  onSave,
  onEdit,
  onComplete,
  saved
}: {
  config: AvatarConfig;
  onSave: () => void;
  onEdit: () => void;
  onComplete: () => void;
  saved: boolean;
}) {
  const archetype = findAvatarOption(archetypes, config.archetype);
  const style = findAvatarOption(visualStyles, config.visualStyle);
  const aura = findAvatarOption(auras, config.aura);
  const gadget = findAvatarOption(gadgets, config.gadget);
  const interaction = findAvatarOption(interactionStyles, config.interactionStyle);
  const specialization = findAvatarOption(specializations, config.specialization);
  return (
    <div>
      <h2 className="text-2xl font-black text-white sm:text-3xl">Твой цифровой профиль готов</h2>
      <p className="mt-3 leading-7 text-white/68">Проверь выбранный образ перед выходом в город.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_24px_70px_rgba(27,15,51,0.24)] backdrop-blur-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.55fr_1fr]">
          <div className="relative min-h-72 bg-gradient-to-br from-[#FF6B6B]/25 via-[#FF9F43]/16 to-[#A78BFA]/25 p-6">
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 44%, ${aura.color}55, transparent 45%)` }} />
            <div className="relative mx-auto size-60">
              <Image src={archetype.image ?? "/avatar-analyst.svg"} alt={archetype.name} fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#1B0F33]">Алекс</span>
              <span className="rounded-full px-3 py-1 text-sm font-black text-white" style={{ backgroundColor: aura.color }}>{aura.name}</span>
              {saved && <span className="rounded-full bg-[#00D46A]/20 px-3 py-1 text-sm font-black text-[#8cffb9]">Сохранено</span>}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <PassportRow label="Архетип" value={archetype.name} />
              <PassportRow label="Визуальный стиль" value={style.name} />
              <PassportRow label="Цветовая аура" value={aura.description} />
              <PassportRow label="Стартовый гаджет" value={gadget.name} />
              <PassportRow label="Способ взаимодействия" value={interaction.name} />
              <PassportRow label="Первая специализация" value={specialization.name} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Button type="button" onClick={onSave} variant={saved ? "secondary" : "default"} size="lg">
          {saved ? <Check className="size-5" /> : <Save className="size-5" />}
          {saved ? "Аватар сохранен" : "Сохранить аватар"}
        </Button>
        <Button type="button" onClick={onEdit} variant="secondary" size="lg">
          <ArrowLeft className="size-5" />
          Изменить выбор
        </Button>
        <Button type="button" onClick={onComplete} size="lg">
          <Map className="size-5" />
          Перейти к карте города
        </Button>
      </div>
    </div>
  );
}

function PassportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] p-3">
      <p className="text-xs font-black uppercase text-white/45">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}
