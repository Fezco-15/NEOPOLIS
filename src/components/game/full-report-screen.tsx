"use client";

import { ArrowRight, BrainCircuit, CheckCircle2, GraduationCap, WalletCards } from "lucide-react";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { MissionAnswer } from "@/components/game/mission-screen";
import { AiCareerAnalysis } from "@/components/game/ai-career-analysis";
import { careerReport } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FullReportScreen({
  account,
  avatar,
  answers,
  onOpenSimulators,
  onBackToMap
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  onOpenSimulators: () => void;
  onBackToMap: () => void;
}) {
  return (
    <div className="min-h-screen overflow-y-auto bg-[#1B0F33] px-4 py-20 text-white">
      <div className="container">
        <Button onClick={onBackToMap} variant="secondary">Вернуться на карту</Button>
        <div className="mt-8 rounded-2xl border border-[#FFD166]/25 bg-gradient-to-br from-[#FF6B6B]/20 via-white/[0.06] to-[#A78BFA]/20 p-8 backdrop-blur-2xl">
          <Badge>10/10 миссий завершено</Badge>
          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            {account?.name || "Игрок"}, полный профориентационный лист готов
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/75">
            Мы собрали сигналы всех районов, проверили стиль мышления в новеллах и подготовили карьерную карту:
            профессии, смежные треки, ЕГЭ, вузовские направления и ориентиры по доходам.
          </p>
        </div>

        <AiCareerAnalysis account={account} avatar={avatar} answers={answers} />

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {careerReport.recommendations.map((item) => (
            <Card key={item.profession}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-black text-white">{item.profession}</h2>
                <p className="mt-2 text-sm font-black text-[#FFD166]">{item.fit}</p>
                <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.adjacent.map((adjacent) => <Badge key={adjacent}>{adjacent}</Badge>)}
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="flex gap-2 text-sm text-slate-300"><GraduationCap className="size-5 text-[#00D1C6]" />{item.universities.slice(0, 2).join(", ")}</div>
                  <div className="flex gap-2 text-sm text-slate-300"><WalletCards className="size-5 text-[#FF9F43]" />{item.salary.map((row) => `${row.grade}: ${row.value}`).join("; ")}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[#00D1C6]/25 bg-[#00D1C6]/10 p-8 text-center">
          <BrainCircuit className="mx-auto size-10 text-[#00D1C6]" />
          <h2 className="mt-4 text-3xl font-black">Попробуй себя в профессии</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
            Теперь открыты все симуляторы. Начни с рекомендованного профессионального мышления и проверь карьерную гипотезу на практике.
          </p>
          <Button onClick={onOpenSimulators} className="mt-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
            Перейти в симуляторы профессий
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
