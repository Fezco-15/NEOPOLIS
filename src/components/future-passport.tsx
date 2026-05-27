import { CheckCircle2 } from "lucide-react";
import { passportItems } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FuturePassport() {
  return (
    <SectionReveal>
      <div className="container grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-[#FF6B6B]">Финальный результат</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Паспорт будущего</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Отчет собирает игровые выборы в понятную карту: кто ребенок сейчас, какие профессии
            ему близки и какие шаги помогут проверить гипотезы.
          </p>
        </div>
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-52 w-52 bg-[#FF6B6B]/[0.12] blur-3xl" />
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <Badge variant="violet">Mockup отчета</Badge>
                <h3 className="mt-3 text-2xl font-black text-white">AI-карта развития</h3>
              </div>
              <div className="rounded-2xl border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 px-4 py-3 text-sm font-semibold text-[#FFF3E0]">
                Готовность: 30%
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {passportItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <CheckCircle2 className="size-5 shrink-0 text-[#FF6B6B]" />
                  <span className="text-sm font-medium text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionReveal>
  );
}


