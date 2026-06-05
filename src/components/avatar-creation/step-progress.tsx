"use client";

import { motion } from "framer-motion";

export function StepProgress({ step, total, accent }: { step: number; total: number; accent: string }) {
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-3 backdrop-blur-xl sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-black uppercase text-white">Шаг {step + 1} из {total}</p>
        <p className="text-sm font-bold text-white/60">{Math.round(progress)}%</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10 sm:mt-3 sm:h-2">
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
