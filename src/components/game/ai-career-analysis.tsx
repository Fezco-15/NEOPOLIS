"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { MissionAnswer } from "@/components/game/mission-screen";
import type { CareerAiReport } from "@/lib/ai/career-analysis";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AiCareerAnalysis({
  account,
  avatar,
  answers
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
}) {
  const [report, setReport] = useState<CareerAiReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadReport() {
      setLoading(true);
      const response = await fetch("/api/ai/career-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account, avatar, answers })
      });
      const nextReport = (await response.json()) as CareerAiReport;
      if (active) {
        setReport(nextReport);
        setLoading(false);
      }
    }

    loadReport().catch(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [account, avatar, answers]);

  if (loading) {
    return (
      <Card className="mt-6 border-[#FF6B6B]/25">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[#FFD166]">
            <Loader2 className="size-6 animate-spin" />
            <h2 className="text-2xl font-black text-white">AI анализирует решения</h2>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!report) return null;

  return (
    <Card className="mt-6 border-[#FF6B6B]/25">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3">
            <BrainCircuit className="size-7 text-[#FF6B6B]" />
            <div>
              <h2 className="text-2xl font-black text-white">AI-анализ профориентации</h2>
              <p className="mt-1 text-sm font-semibold text-white/55">
                Провайдер: {report.provider === "gigachat" ? "GigaChat" : "локальный экспертный fallback"}
              </p>
            </div>
          </div>
          <Badge>{report.archetype}</Badge>
        </div>

        <p className="mt-5 text-lg leading-8 text-slate-300">{report.summary}</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/10 p-4">
            <h3 className="font-black text-white">Сильные сигналы</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {report.strengths.slice(0, 8).map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 p-4">
            <h3 className="font-black text-white">Зоны роста</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
              {report.growthAreas.map((item) => (
                <li key={item} className="flex gap-2">
                  <Sparkles className="mt-1 size-4 shrink-0 text-[#FFD166]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#FFD166]/20 bg-[#FFD166]/10 p-4">
            <h3 className="font-black text-white">Для родителей</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{report.parentExplanation}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {report.recommendedCareers.map((career) => (
            <div key={career.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#00D1C6]" />
                <h3 className="font-black text-white">{career.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{career.why}</p>
              <p className="mt-4 text-xs font-black uppercase text-white/45">ЕГЭ</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {career.exams.map((exam) => (
                  <span key={exam} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/75">
                    {exam}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-black uppercase text-white/45">Зарплаты</p>
              <p className="mt-2 text-xs leading-5 text-slate-300">{career.salaryHint}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="font-black text-white">На чем основан вывод</h3>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
            {report.evidence.slice(0, 5).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
