"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, BriefcaseBusiness, Building2, CheckCircle2, ExternalLink, GraduationCap, Loader2, MapPin, Sparkles, TrendingUp } from "lucide-react";
import type { AccountState } from "@/components/game/account-registration";
import type { AvatarState } from "@/components/game/avatar-creator";
import type { MissionAnswer } from "@/components/game/mission-screen";
import type { CareerAiReport } from "@/lib/ai/career-analysis";
import type { TechnoQuarterCompletion } from "@/components/mission-lab/techno-quarter-app";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function UniversityImage({ src, university }: { src: string; university: string }) {
  const [failed, setFailed] = useState(false);
  const initials = university
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 4);

  if (failed) {
    return (
      <div className="grid h-full min-h-40 w-full place-items-center bg-[radial-gradient(circle_at_35%_25%,rgba(0,209,198,.35),transparent_32%),linear-gradient(135deg,rgba(167,139,250,.45),rgba(255,107,107,.28),rgba(255,209,102,.22))]">
        <div className="rounded-3xl border border-white/20 bg-black/25 px-4 py-3 text-center backdrop-blur-md">
          <p className="text-3xl font-black text-white">{initials}</p>
          <p className="mt-1 text-xs font-bold text-white/70">{university}</p>
        </div>
      </div>
    );
  }

  return <img src={src} alt={university} className="h-full min-h-40 w-full object-cover" loading="lazy" onError={() => setFailed(true)} />;
}

export function AiCareerAnalysis({
  account,
  avatar,
  answers,
  technoQuarter,
  onReady
}: {
  account: AccountState | null;
  avatar: AvatarState | null;
  answers: MissionAnswer[];
  technoQuarter?: TechnoQuarterCompletion | null;
  onReady?: () => void;
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
        body: JSON.stringify({ account, avatar, answers, technoQuarter })
      });
      const nextReport = (await response.json()) as CareerAiReport;
      if (active) {
        setReport(nextReport);
        setLoading(false);
        onReady?.();
      }
    }

    loadReport().catch(() => {
      if (active) {
        setLoading(false);
        onReady?.();
      }
    });

    return () => {
      active = false;
    };
  }, [account, avatar, answers, technoQuarter, onReady]);

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
                Провайдер: {report.provider === "gigachat" ? "GigaChat" : report.provider === "gemini" ? "Gemini" : report.provider === "groq" ? "Groq" : "локальный экспертный fallback"}
              </p>
            </div>
          </div>
          <Badge>{report.archetype}</Badge>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <section className="rounded-3xl border border-[#00D1C6]/25 bg-[#00D1C6]/[0.07] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <GraduationCap className="size-6 text-[#00D1C6]" />
              <div>
                <h3 className="text-xl font-black text-white">Вузы и образовательные треки</h3>
                <p className="mt-1 text-sm text-slate-300">Конкретные варианты для России. Баллы указаны как ориентир конкурса, их нужно уточнять по году поступления.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              {report.educationMatches.slice(0, 4).map((item) => (
                <article key={`${item.university}-${item.program}`} className="overflow-hidden rounded-3xl border border-white/10 bg-[#081225]/70">
                  <div className="grid gap-0 md:grid-cols-[180px_1fr]">
                    <div className="relative min-h-40 overflow-hidden bg-white/10">
                      <UniversityImage src={item.imageUrl} university={item.university} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                      <a href={item.imageSourceUrl} target="_blank" rel="noreferrer" className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white/80 backdrop-blur">
                        {item.sourceLabel}
                      </a>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-bold text-[#B8FFFB]">
                            <Building2 className="size-4" />
                            {item.university}
                          </div>
                          {item.tier ? <p className="mt-1 text-xs font-black uppercase text-[#FFD166]">{item.tier}</p> : null}
                          <h4 className="mt-2 text-lg font-black text-white">{item.program}</h4>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-bold text-white/75">
                          <MapPin className="size-3.5" />
                          {item.city}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.fitReason}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/[0.06] p-3">
                          <p className="text-xs font-black uppercase text-white/45">Специальность</p>
                          <p className="mt-1 text-sm font-semibold text-white">{item.specialty}</p>
                        </div>
                        <div className="rounded-2xl bg-white/[0.06] p-3">
                          <p className="text-xs font-black uppercase text-white/45">Баллы</p>
                          <p className="mt-1 text-sm font-semibold text-[#FFD166]">{item.passingScore}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.exams.map((exam) => (
                          <span key={exam} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/75">{exam}</span>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.adjacentPrograms.map((program) => (
                          <span key={program} className="rounded-full border border-[#A78BFA]/25 bg-[#A78BFA]/10 px-2.5 py-1 text-xs font-bold text-[#F3E8FF]">{program}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#FFD166]/25 bg-[#FFD166]/[0.07] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="size-6 text-[#FFD166]" />
              <div>
                <h3 className="text-xl font-black text-white">Рынок труда и вакансии</h3>
                <p className="mt-1 text-sm text-slate-300">Роли, зарплатные вилки, компании и быстрые ссылки на актуальный HH-поиск.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              {report.laborMarket.slice(0, 4).map((item) => (
                <article key={item.role} className="rounded-3xl border border-white/10 bg-[#120A28]/62 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase text-[#FFD166]">{item.fit}</p>
                      <h4 className="mt-1 text-xl font-black text-white">{item.role}</h4>
                    </div>
                    <a href={item.hhSearchUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#00D1C6]/25 bg-[#00D1C6]/10 px-3 py-1.5 text-xs font-black text-[#B8FFFB] transition hover:bg-[#00D1C6]/18">
                      HH поиск
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.demand}</p>
                  <div className="mt-4 rounded-2xl border border-[#FFD166]/20 bg-[#FFD166]/10 p-3">
                    <div className="flex items-center gap-2 text-sm font-black text-[#FFD166]">
                      <TrendingUp className="size-4" />
                      Зарплатная траектория
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.salaryRange}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-black uppercase text-white/45">Компании, где встречается такой профиль</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.companies.map((company) => (
                        <span key={company} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/75">{company}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase text-white/45">Навыки</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-[#FF6B6B]/10 px-2.5 py-1 text-xs font-bold text-[#FFF3E0]">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-white/45">Смежные роли</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.adjacentRoles.map((role) => (
                          <span key={role} className="rounded-full bg-[#A78BFA]/10 px-2.5 py-1 text-xs font-bold text-[#F3E8FF]">{role}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-5">
          <h3 className="text-xl font-black text-white">Что это значит по-человечески</h3>
          <p className="mt-3 text-lg leading-8 text-slate-300">{report.summary}</p>
        </div>

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
