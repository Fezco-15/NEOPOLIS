"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import type { BetaMission } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MissionAnswer = {
  missionId: string;
  sceneTitle: string;
  choice: string;
  traits: string[];
  signal: string;
};

export function MissionScreen({
  mission,
  onComplete
}: {
  mission: BetaMission;
  onComplete: (answers: MissionAnswer[]) => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnswers] = useState<MissionAnswer[]>([]);
  const scene = mission.scenes[sceneIndex];
  const progress = Math.round(((sceneIndex + 1) / mission.scenes.length) * 100);

  const traitPreview = useMemo(() => {
    const traits = [...answers.flatMap((answer) => answer.traits), ...scene.choices[selectedIndex].traits];
    return Array.from(new Set(traits)).slice(0, 6);
  }, [answers, scene.choices, selectedIndex]);

  function submitChoice() {
    const selected = scene.choices[selectedIndex];
    const nextAnswers = [
      ...answers,
      {
        missionId: mission.id,
        sceneTitle: scene.title,
        choice: selected.text,
        traits: selected.traits,
        signal: selected.signal
      }
    ];

    if (sceneIndex === mission.scenes.length - 1) {
      onComplete(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setSceneIndex((current) => current + 1);
    setSelectedIndex(0);
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <Image src="/neopolis-city.svg" alt="Карта города будущего" fill className="object-cover opacity-36" />
      <div className="absolute inset-0 bg-[#1B0F33]/[0.72]" />
      <div className="container relative">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge>{mission.district}</Badge>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">{mission.title}</h1>
          </div>
          <div className="min-w-56 rounded-2xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 p-3">
            <div className="flex justify-between text-xs font-semibold text-[#FFF3E0]">
              <span>Сцена {sceneIndex + 1} / {mission.scenes.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-[#FF6B6B]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="h-fit">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase text-[#A78BFA]">Интерактивная новелла</p>
              <h2 className="mt-3 text-2xl font-black text-white">{scene.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{scene.story}</p>
              <div className="mt-8 rounded-2xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/[0.08] p-5">
                <div className="flex items-center gap-3 text-[#FFF3E0]">
                  <Activity className="size-5" />
                  <span className="font-semibold">Система анализирует цепочку решений</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {traitPreview.map((trait) => (
                    <Badge key={trait}>{trait}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-black text-white">Как поступишь?</h2>
              <div className="mt-6 grid gap-3">
                {scene.choices.map((item, index) => {
                  const active = selectedIndex === index;
                  return (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition active:scale-[0.99]",
                        active
                          ? "border-[#FF6B6B] bg-[#FF6B6B]/[0.14] shadow-[0_0_34px_rgba(255,107,107,0.28)]"
                          : "border-white/[0.12] bg-white/[0.04] hover:border-[#FF6B6B]/[0.45]"
                      )}
                    >
                      <div className="flex gap-4">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] font-black text-[#FFF3E0]">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{item.text}</p>
                          {active && <p className="mt-2 text-sm leading-6 text-slate-300">{item.signal}</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <Button onClick={submitChoice} className="mt-7 w-full" size="lg">
                {sceneIndex === mission.scenes.length - 1 ? "Завершить задание" : "Продолжить новеллу"}
                {sceneIndex === mission.scenes.length - 1 ? <CheckCircle2 className="size-5" /> : <ArrowRight className="size-5" />}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


