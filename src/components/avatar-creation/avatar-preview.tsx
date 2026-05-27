"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, Cpu, Sparkles } from "lucide-react";
import {
  auras,
  archetypes,
  findAvatarOption,
  gadgets,
  interactionStyles,
  specializations,
  visualStyles,
  type AvatarConfig
} from "@/data/avatar";

export function AvatarPreview({ config, compact = false }: { config: AvatarConfig; compact?: boolean }) {
  const archetype = findAvatarOption(archetypes, config.archetype);
  const style = findAvatarOption(visualStyles, config.visualStyle);
  const aura = findAvatarOption(auras, config.aura);
  const gadget = findAvatarOption(gadgets, config.gadget);
  const interaction = findAvatarOption(interactionStyles, config.interactionStyle);
  const specialization = findAvatarOption(specializations, config.specialization);
  const auraColor = aura.color ?? "#00D1C6";

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_24px_70px_rgba(27,15,51,0.22)] backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-white/70">
        <Bot className="size-4" />
        Live preview
      </div>
      <div className="relative mt-5 grid place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/12 via-white/[0.04] to-white/[0.08] p-5">
        <motion.div
          className="absolute size-56 rounded-full blur-3xl"
          style={{ backgroundColor: auraColor, opacity: 0.34 }}
          animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={compact ? "relative size-44" : "relative size-64"}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={archetype.image ?? "/avatar-analyst.svg"} alt={archetype.name} fill className="object-contain drop-shadow-2xl" />
        </motion.div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
          {[style.name, aura.name, gadget.name].map((item) => (
            <span key={item} className="rounded-full border border-white/15 bg-[#1B0F33]/45 px-3 py-1 text-xs font-black text-white backdrop-blur">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm">
        <PreviewRow label="Архетип" value={archetype.name} icon={<Sparkles className="size-4" />} />
        <PreviewRow label="Стиль" value={style.name} />
        <PreviewRow label="Аура" value={aura.name} color={auraColor} />
        <PreviewRow label="Гаджет" value={gadget.name} icon={<Cpu className="size-4" />} />
        <PreviewRow label="Специализация" value={specialization.name} />
        <PreviewRow label="Действие" value={interaction.name} />
      </div>
    </div>
  );
}

function PreviewRow({
  label,
  value,
  color,
  icon
}: {
  label: string;
  value: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.06] px-3 py-2.5">
      <span className="flex items-center gap-2 text-white/55">
        {color && <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />}
        {icon}
        {label}
      </span>
      <span className="text-right font-black text-white">{value}</span>
    </div>
  );
}
