"use client";

import { motion } from "framer-motion";

export function StepProgress({ step, total, accent }: { step: number; total: number; accent: string }) {
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black uppercase text-white">Шаг {step + 1} из {total}</p>
        <p className="text-sm font-bold text-white/60">{Math.round(progress)}%</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #FFD166)` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45 }}
        />
      </div>
    </div>
  );
}
