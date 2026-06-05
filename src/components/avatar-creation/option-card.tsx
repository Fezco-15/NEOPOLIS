"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { AvatarOption } from "@/data/avatar";
import { cn } from "@/lib/utils";

export function OptionCard({
  option,
  selected,
  onSelect,
  accent = "#FF6B6B",
  compact = false
}: {
  option: AvatarOption;
  selected: boolean;
  onSelect: () => void;
  accent?: string;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-4 text-left transition",
        "bg-white/[0.06] shadow-[0_18px_46px_rgba(27,15,51,0.16)] backdrop-blur-xl",
        selected ? "border-transparent" : "border-white/12 hover:border-white/25"
      )}
      style={{
        boxShadow: selected ? `0 0 0 1px ${accent}, 0 18px 54px ${accent}33` : undefined
      }}
    >
      {selected && (
        <div
          className="absolute inset-0 opacity-18"
          style={{ background: `linear-gradient(135deg, ${accent}, transparent 58%, #FFD166)` }}
        />
      )}
      <div className="relative flex gap-3">
        {option.image ? (
          <div className={cn("relative shrink-0 overflow-hidden rounded-2xl bg-white/8", compact ? "size-14" : "size-20")}>
            <Image src={option.image} alt={option.name} fill className="object-cover" />
          </div>
        ) : (
          <div
            className={cn("grid shrink-0 place-items-center rounded-2xl", compact ? "size-12" : "size-16")}
            style={{ background: `linear-gradient(135deg, ${option.color ?? accent}, #FFD166)` }}
          >
            <Sparkles className="size-6 text-white" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-white">{option.name}</h3>
            {selected && (
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-[#1B0F33]">
                <Check className="size-4" />
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-white/70">{option.description}</p>
        </div>
      </div>
    </motion.button>
  );
}
